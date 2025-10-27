-- Table Structure Diagnostic Script
-- Run this FIRST to understand your actual table structure before optimization

-- ============================================================================
-- CHECK ALL TABLE STRUCTURES
-- ============================================================================

SELECT '📊 DATABASE STRUCTURE ANALYSIS' as analysis_type;

-- Check which tables exist
SELECT '📋 Tables that exist:' as check_type;
SELECT 
    table_name,
    CASE WHEN table_name IN ('user_profiles', 'products', 'categories', 'orders') 
         THEN '✅ EXPECTED' 
         ELSE '📝 OTHER' 
    END as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- ============================================================================
-- USER_PROFILES TABLE STRUCTURE
-- ============================================================================

SELECT '👤 USER_PROFILES table structure:' as table_info;
SELECT 
    column_name,
    data_type,
    is_nullable,
    COALESCE(column_default, 'NULL') as default_value
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
ORDER BY ordinal_position;

-- ============================================================================
-- PRODUCTS TABLE STRUCTURE
-- ============================================================================

SELECT '📦 PRODUCTS table structure:' as table_info;
SELECT 
    column_name,
    data_type,
    is_nullable,
    COALESCE(column_default, 'NULL') as default_value
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;

-- ============================================================================
-- CATEGORIES TABLE STRUCTURE
-- ============================================================================

SELECT '📂 CATEGORIES table structure:' as table_info;
SELECT 
    column_name,
    data_type,
    is_nullable,
    COALESCE(column_default, 'NULL') as default_value
FROM information_schema.columns 
WHERE table_name = 'categories' 
ORDER BY ordinal_position;

-- ============================================================================
-- ORDERS TABLE STRUCTURE (THE PROBLEMATIC ONE)
-- ============================================================================

SELECT '🛒 ORDERS table structure:' as table_info;
SELECT 
    column_name,
    data_type,
    is_nullable,
    COALESCE(column_default, 'NULL') as default_value
FROM information_schema.columns 
WHERE table_name = 'orders' 
ORDER BY ordinal_position;

-- Check if orders table exists at all
SELECT '🛒 Orders table existence check:' as check_type;
SELECT CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders') 
    THEN '✅ Orders table EXISTS' 
    ELSE '❌ Orders table DOES NOT EXIST' 
END as orders_status;

-- If orders table exists, show sample data structure
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders') THEN
        -- Check if there's any data
        PERFORM 1 FROM orders LIMIT 1;
        RAISE NOTICE '✅ Orders table has data - showing sample structure';
    ELSE
        RAISE NOTICE '❌ Orders table does not exist or has no data';
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE '⚠️ Could not access orders table: %', SQLERRM;
END $$;

-- ============================================================================
-- CURRENT RLS POLICIES ANALYSIS
-- ============================================================================

SELECT '🔒 Current RLS policies:' as policy_info;
SELECT 
    tablename,
    policyname,
    cmd as operation,
    permissive,
    CASE WHEN LENGTH(qual) > 50 
         THEN LEFT(qual, 50) || '...' 
         ELSE qual 
    END as condition_preview
FROM pg_policies 
WHERE tablename IN ('user_profiles', 'products', 'categories', 'orders')
ORDER BY tablename, cmd;

-- Check RLS status on all tables
SELECT '🛡️ RLS Status:' as rls_info;
SELECT 
    tablename,
    CASE WHEN rowsecurity THEN '✅ ENABLED' ELSE '❌ DISABLED' END as rls_status
FROM pg_tables 
WHERE tablename IN ('user_profiles', 'products', 'categories', 'orders')
ORDER BY tablename;

-- ============================================================================
-- ADMIN USER CHECK
-- ============================================================================

SELECT '👤 Admin user check:' as admin_info;
SELECT 
    email,
    role,
    CASE WHEN role = 'admin' THEN '✅ IS ADMIN' ELSE '❌ NOT ADMIN' END as admin_status
FROM user_profiles 
WHERE email = 'm42k@admin.com';

-- ============================================================================
-- RECOMMENDATIONS
-- ============================================================================

SELECT '💡 ANALYSIS COMPLETE' as final_status;
SELECT 'Check the orders table structure above to see what columns exist' as recommendation_1;
SELECT 'Look for columns like: user_id, user_email, customer_email, email, customer_id' as recommendation_2;
SELECT 'Then run the corrected optimize-rls-performance.sql script' as recommendation_3;
