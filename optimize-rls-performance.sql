-- RLS Performance Optimization Script
-- Fixes: 1) Function re-evaluation inefficiency, 2) Multiple redundant policies
-- Run this in your Supabase SQL Editor for m42k@admin.com

-- ============================================================================
-- PERFORMANCE ISSUES BEING FIXED:
-- 1. auth.uid() → (SELECT auth.uid()) - Single evaluation per query vs per row
-- 2. Multiple policies → Single consolidated policies with OR logic
-- 3. Redundant admin checks → Optimized admin role verification
-- ============================================================================

-- Start transaction to ensure atomicity
BEGIN;

-- First, let's check what tables and columns actually exist
SELECT '📋 Table Structure Analysis:' as status;

-- Check orders table structure
SELECT 'Orders table columns:' as table_info;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'orders'
ORDER BY ordinal_position;

-- Check if orders table exists
SELECT 'Orders table exists:' as table_check;
SELECT CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_name = 'orders'
) THEN '✅ YES' ELSE '❌ NO' END as orders_exists;

-- Show current policies before optimization
SELECT '📋 Current Policies Before Optimization:' as status;
SELECT tablename, policyname, cmd, permissive
FROM pg_policies
WHERE tablename IN ('user_profiles', 'products', 'categories', 'orders')
ORDER BY tablename, cmd;

-- ============================================================================
-- 1. OPTIMIZE USER_PROFILES TABLE POLICIES
-- ============================================================================

SELECT '🔧 Optimizing user_profiles table policies...' as status;

-- Drop ALL existing policies (covers various naming patterns)
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_select_policy" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_update_policy" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_insert_policy" ON user_profiles;

-- OPTIMIZED: Single SELECT policy (consolidates multiple policies + subquery optimization)
CREATE POLICY "user_profiles_optimized_select" ON user_profiles
    FOR SELECT USING (
        -- OPTIMIZATION 1: (SELECT auth.uid()) called once per query, not per row
        -- OPTIMIZATION 2: Single policy with OR logic instead of multiple policies
        (SELECT auth.uid()) = id
        OR
        EXISTS (
            SELECT 1 FROM user_profiles admin_check
            WHERE admin_check.id = (SELECT auth.uid())
            AND admin_check.role = 'admin'
        )
    );

-- OPTIMIZED: Single UPDATE policy
CREATE POLICY "user_profiles_optimized_update" ON user_profiles
    FOR UPDATE USING (
        -- Users can update own profile OR admins can update any profile
        (SELECT auth.uid()) = id
        OR
        EXISTS (
            SELECT 1 FROM user_profiles admin_check
            WHERE admin_check.id = (SELECT auth.uid())
            AND admin_check.role = 'admin'
        )
    );

-- OPTIMIZED: INSERT policy (users can only create their own profile)
CREATE POLICY "user_profiles_optimized_insert" ON user_profiles
    FOR INSERT WITH CHECK (
        (SELECT auth.uid()) = id
    );

-- ============================================================================
-- 2. OPTIMIZE PRODUCTS TABLE POLICIES
-- ============================================================================

SELECT '🔧 Optimizing products table policies...' as status;

-- Drop ALL existing policies (covers various naming patterns)
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
DROP POLICY IF EXISTS "Products are manageable by admins" ON products;
DROP POLICY IF EXISTS "Admins can insert products" ON products;
DROP POLICY IF EXISTS "Admins can update products" ON products;
DROP POLICY IF EXISTS "Admins can delete products" ON products;
DROP POLICY IF EXISTS "products_select_policy" ON products;
DROP POLICY IF EXISTS "products_admin_policy" ON products;
DROP POLICY IF EXISTS "products_public_select" ON products;
DROP POLICY IF EXISTS "products_admin_all" ON products;

-- OPTIMIZED: Public SELECT policy (products are viewable by everyone)
CREATE POLICY "products_optimized_select" ON products
    FOR SELECT USING (true); -- No auth needed for viewing products

-- OPTIMIZED: Admin-only management policy (INSERT, UPDATE, DELETE)
CREATE POLICY "products_optimized_admin" ON products
    FOR ALL USING (
        -- OPTIMIZATION: (SELECT auth.uid()) called once per query
        EXISTS (
            SELECT 1 FROM user_profiles admin_check
            WHERE admin_check.id = (SELECT auth.uid())
            AND admin_check.role = 'admin'
        )
    )
    WITH CHECK (
        -- Same check for INSERT operations
        EXISTS (
            SELECT 1 FROM user_profiles admin_check
            WHERE admin_check.id = (SELECT auth.uid())
            AND admin_check.role = 'admin'
        )
    );

-- ============================================================================
-- 3. OPTIMIZE CATEGORIES TABLE POLICIES
-- ============================================================================

SELECT '🔧 Optimizing categories table policies...' as status;

-- Drop ALL existing policies (covers various naming patterns)
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
DROP POLICY IF EXISTS "Categories are manageable by admins" ON categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
DROP POLICY IF EXISTS "categories_select_policy" ON categories;
DROP POLICY IF EXISTS "categories_admin_policy" ON categories;
DROP POLICY IF EXISTS "categories_public_select" ON categories;
DROP POLICY IF EXISTS "categories_admin_all" ON categories;

-- OPTIMIZED: Public SELECT policy (categories are viewable by everyone)
CREATE POLICY "categories_optimized_select" ON categories
    FOR SELECT USING (true); -- No auth needed for viewing categories

-- OPTIMIZED: Admin-only management policy (INSERT, UPDATE, DELETE)
CREATE POLICY "categories_optimized_admin" ON categories
    FOR ALL USING (
        -- OPTIMIZATION: (SELECT auth.uid()) called once per query
        EXISTS (
            SELECT 1 FROM user_profiles admin_check
            WHERE admin_check.id = (SELECT auth.uid())
            AND admin_check.role = 'admin'
        )
    )
    WITH CHECK (
        -- Same check for INSERT operations
        EXISTS (
            SELECT 1 FROM user_profiles admin_check
            WHERE admin_check.id = (SELECT auth.uid())
            AND admin_check.role = 'admin'
        )
    );

-- ============================================================================
-- 4. OPTIMIZE ORDERS TABLE POLICIES (DYNAMIC COLUMN DETECTION)
-- ============================================================================

SELECT '🔧 Optimizing orders table policies...' as status;

-- Check if orders table exists before proceeding
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders') THEN
        RAISE NOTICE 'Orders table does not exist - skipping orders policies';
    ELSE
        RAISE NOTICE 'Orders table found - proceeding with optimization';

        -- Drop ALL existing policies (covers various naming patterns)
        EXECUTE 'DROP POLICY IF EXISTS "Orders are viewable by owner" ON orders';
        EXECUTE 'DROP POLICY IF EXISTS "Orders are updatable by authenticated users" ON orders';
        EXECUTE 'DROP POLICY IF EXISTS "Users can view their own orders" ON orders';
        EXECUTE 'DROP POLICY IF EXISTS "Admins can view all orders" ON orders';
        EXECUTE 'DROP POLICY IF EXISTS "Admins can update orders" ON orders';
        EXECUTE 'DROP POLICY IF EXISTS "orders_select_policy" ON orders';
        EXECUTE 'DROP POLICY IF EXISTS "orders_insert_policy" ON orders';
        EXECUTE 'DROP POLICY IF EXISTS "orders_update_policy" ON orders';
        EXECUTE 'DROP POLICY IF EXISTS "orders_owner_select" ON orders';
        EXECUTE 'DROP POLICY IF EXISTS "orders_admin_all" ON orders';
        EXECUTE 'DROP POLICY IF EXISTS "orders_optimized_select" ON orders';
        EXECUTE 'DROP POLICY IF EXISTS "orders_optimized_insert" ON orders';
        EXECUTE 'DROP POLICY IF EXISTS "orders_optimized_update" ON orders';
    END IF;
END $$;

-- Create optimized policies based on actual column structure
DO $$
DECLARE
    has_user_id BOOLEAN := FALSE;
    has_user_email BOOLEAN := FALSE;
    has_customer_email BOOLEAN := FALSE;
    has_email BOOLEAN := FALSE;
    select_condition TEXT := '';
    insert_condition TEXT := '';
BEGIN
    -- Check which user identification columns exist
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'orders' AND column_name = 'user_id'
    ) INTO has_user_id;

    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'orders' AND column_name = 'user_email'
    ) INTO has_user_email;

    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'orders' AND column_name = 'customer_email'
    ) INTO has_customer_email;

    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'orders' AND column_name = 'email'
    ) INTO has_email;

    -- Build conditions based on available columns
    IF has_user_id THEN
        select_condition := select_condition || 'user_id = (SELECT auth.uid()) OR ';
        insert_condition := insert_condition || 'user_id = (SELECT auth.uid()) OR ';
    END IF;

    IF has_user_email THEN
        select_condition := select_condition || 'user_email = (SELECT auth.email()) OR ';
    END IF;

    IF has_customer_email THEN
        select_condition := select_condition || 'customer_email = (SELECT auth.email()) OR ';
    END IF;

    IF has_email THEN
        select_condition := select_condition || 'email = (SELECT auth.email()) OR ';
    END IF;

    -- Add admin condition
    select_condition := select_condition || 'EXISTS (
        SELECT 1 FROM user_profiles admin_check
        WHERE admin_check.id = (SELECT auth.uid())
        AND admin_check.role = ''admin''
    )';

    insert_condition := insert_condition || 'EXISTS (
        SELECT 1 FROM user_profiles admin_check
        WHERE admin_check.id = (SELECT auth.uid())
        AND admin_check.role = ''admin''
    )';

    -- Only create policies if orders table exists
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders') THEN
        -- Create SELECT policy
        EXECUTE 'CREATE POLICY "orders_optimized_select" ON orders FOR SELECT USING (' || select_condition || ')';

        -- Create INSERT policy
        EXECUTE 'CREATE POLICY "orders_optimized_insert" ON orders FOR INSERT WITH CHECK (' || insert_condition || ')';

        -- Create UPDATE policy (admin only)
        EXECUTE 'CREATE POLICY "orders_optimized_update" ON orders FOR UPDATE USING (
            EXISTS (
                SELECT 1 FROM user_profiles admin_check
                WHERE admin_check.id = (SELECT auth.uid())
                AND admin_check.role = ''admin''
            )
        )';

        RAISE NOTICE 'Orders policies created with conditions: %', select_condition;
    END IF;
END $$;

-- Commit all changes
COMMIT;

-- ============================================================================
-- COMPREHENSIVE VERIFICATION QUERIES
-- ============================================================================

-- Show optimized policies that were created
SELECT '📋 Optimized Policies Created:' as status;
SELECT
    tablename,
    policyname,
    cmd as operation,
    CASE WHEN permissive = 'PERMISSIVE' THEN '✅ PERMISSIVE' ELSE '⚠️ RESTRICTIVE' END as type
FROM pg_policies
WHERE tablename IN ('user_profiles', 'products', 'categories', 'orders')
ORDER BY tablename, cmd;

-- Verify RLS is enabled on all tables
SELECT '🛡️ RLS Status Verification:' as status;
SELECT
    tablename,
    CASE WHEN rowsecurity THEN '✅ ENABLED' ELSE '❌ DISABLED' END as rls_status
FROM pg_tables
WHERE tablename IN ('user_profiles', 'products', 'categories', 'orders')
ORDER BY tablename;

-- Count policies per table (should be fewer after optimization)
SELECT '📊 Policy Count Per Table:' as status;
SELECT
    tablename,
    COUNT(*) as policy_count,
    CASE
        WHEN COUNT(*) <= 3 THEN '✅ OPTIMIZED'
        ELSE '⚠️ MAY NEED MORE OPTIMIZATION'
    END as optimization_status
FROM pg_policies
WHERE tablename IN ('user_profiles', 'products', 'categories', 'orders')
GROUP BY tablename
ORDER BY tablename;

-- Verify admin user exists and has correct role
SELECT '👤 Admin User Verification:' as status;
SELECT
    email,
    role,
    CASE WHEN role = 'admin' THEN '✅ ADMIN ACCESS' ELSE '❌ NO ADMIN ACCESS' END as admin_status
FROM user_profiles
WHERE email = 'm42k@admin.com';

-- Performance optimization summary
SELECT '⚡ Performance Optimizations Applied:' as summary;
SELECT
    '1. Function calls optimized: auth.uid() → (SELECT auth.uid())' as optimization_1
UNION ALL
SELECT
    '2. Multiple policies consolidated into single policies with OR logic' as optimization_2
UNION ALL
SELECT
    '3. Redundant admin checks eliminated' as optimization_3
UNION ALL
SELECT
    '4. Query plan optimization enabled through policy consolidation' as optimization_4;

-- Final success message
SELECT '🚀 RLS Performance Optimization Complete!' as final_status;
SELECT 'All policies optimized for m42k@admin.com admin access' as admin_confirmation;
