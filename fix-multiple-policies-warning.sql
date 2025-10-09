-- Fix Multiple Permissive Policies Performance Warnings
-- Resolves conflicts between FOR SELECT and FOR ALL policies
-- Run this in your Supabase SQL Editor

-- ============================================================================
-- PROBLEM: FOR ALL includes SELECT, causing multiple policies for SELECT ops
-- SOLUTION: Split admin policies into specific INSERT/UPDATE/DELETE policies
-- ============================================================================

BEGIN;

SELECT '🔧 Fixing Multiple Permissive Policies Warnings...' as status;

-- ============================================================================
-- 1. FIX CATEGORIES TABLE POLICIES
-- ============================================================================

SELECT '📂 Fixing categories table policies...' as status;

-- Drop the problematic FOR ALL policy
DROP POLICY IF EXISTS "categories_optimized_admin" ON categories;

-- Keep the SELECT policy (public access)
-- categories_optimized_select already exists and is correct

-- Create separate admin policies for INSERT, UPDATE, DELETE
CREATE POLICY "categories_admin_insert" ON categories
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles admin_check
            WHERE admin_check.id = (SELECT auth.uid())
            AND admin_check.role = 'admin'
        )
    );

CREATE POLICY "categories_admin_update" ON categories
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles admin_check
            WHERE admin_check.id = (SELECT auth.uid())
            AND admin_check.role = 'admin'
        )
    );

CREATE POLICY "categories_admin_delete" ON categories
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM user_profiles admin_check
            WHERE admin_check.id = (SELECT auth.uid())
            AND admin_check.role = 'admin'
        )
    );

-- ============================================================================
-- 2. FIX PRODUCTS TABLE POLICIES
-- ============================================================================

SELECT '📦 Fixing products table policies...' as status;

-- Drop the problematic FOR ALL policy
DROP POLICY IF EXISTS "products_optimized_admin" ON products;

-- Keep the SELECT policy (public access)
-- products_optimized_select already exists and is correct

-- Create separate admin policies for INSERT, UPDATE, DELETE
CREATE POLICY "products_admin_insert" ON products
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles admin_check
            WHERE admin_check.id = (SELECT auth.uid())
            AND admin_check.role = 'admin'
        )
    );

CREATE POLICY "products_admin_update" ON products
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles admin_check
            WHERE admin_check.id = (SELECT auth.uid())
            AND admin_check.role = 'admin'
        )
    );

CREATE POLICY "products_admin_delete" ON products
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM user_profiles admin_check
            WHERE admin_check.id = (SELECT auth.uid())
            AND admin_check.role = 'admin'
        )
    );

COMMIT;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check the corrected policy structure
SELECT '📋 Corrected Policy Structure:' as status;
SELECT 
    tablename,
    policyname,
    cmd as operation,
    CASE WHEN permissive = 'PERMISSIVE' THEN '✅ PERMISSIVE' ELSE '⚠️ RESTRICTIVE' END as type
FROM pg_policies 
WHERE tablename IN ('categories', 'products')
ORDER BY tablename, cmd;

-- Count policies per table and operation
SELECT '📊 Policies Per Operation:' as status;
SELECT 
    tablename,
    cmd as operation,
    COUNT(*) as policy_count,
    CASE 
        WHEN COUNT(*) = 1 THEN '✅ OPTIMIZED (1 policy)'
        ELSE '⚠️ MULTIPLE POLICIES (' || COUNT(*) || ')'
    END as optimization_status
FROM pg_policies 
WHERE tablename IN ('categories', 'products')
GROUP BY tablename, cmd
ORDER BY tablename, cmd;

-- Verify RLS is still enabled
SELECT '🛡️ RLS Status:' as status;
SELECT 
    tablename,
    CASE WHEN rowsecurity THEN '✅ ENABLED' ELSE '❌ DISABLED' END as rls_status
FROM pg_tables 
WHERE tablename IN ('categories', 'products')
ORDER BY tablename;

-- Test admin access
SELECT '👤 Admin User Check:' as status;
SELECT 
    email,
    role,
    CASE WHEN role = 'admin' THEN '✅ ADMIN ACCESS' ELSE '❌ NO ADMIN ACCESS' END as admin_status
FROM user_profiles 
WHERE email = 'm42k@admin.com';

-- Final success message
SELECT '✅ Multiple Permissive Policies Warnings Fixed!' as final_status;
SELECT 'Categories and Products now have optimized single-policy-per-operation structure' as result;
