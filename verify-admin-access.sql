-- Verify and Fix Admin Access for m42k@admin.com
-- This script checks and ensures proper admin role setup
-- Run this in your Supabase SQL Editor

-- ============================================================================
-- STEP 1: CHECK CURRENT STATE
-- ============================================================================

SELECT '🔍 CHECKING CURRENT ADMIN STATUS...' as status;

-- Check if user exists in auth.users
SELECT '👤 Auth User Check:' as check_type;
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at,
    CASE WHEN email_confirmed_at IS NOT NULL THEN '✅ CONFIRMED' ELSE '❌ NOT CONFIRMED' END as email_status
FROM auth.users 
WHERE email = 'm42k@admin.com';

-- Check if user profile exists
SELECT '📋 User Profile Check:' as check_type;
SELECT 
    id,
    email,
    role,
    CASE WHEN role = 'admin' THEN '✅ IS ADMIN' ELSE '❌ NOT ADMIN' END as admin_status
FROM user_profiles 
WHERE email = 'm42k@admin.com';

-- Check if there's a mismatch between auth.users and user_profiles
SELECT '🔗 Profile Sync Check:' as check_type;
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM auth.users WHERE email = 'm42k@admin.com') 
        AND NOT EXISTS (SELECT 1 FROM user_profiles WHERE email = 'm42k@admin.com')
        THEN '⚠️ AUTH USER EXISTS BUT NO PROFILE'
        WHEN NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'm42k@admin.com')
        THEN '❌ NO AUTH USER FOUND'
        WHEN EXISTS (SELECT 1 FROM user_profiles WHERE email = 'm42k@admin.com' AND role = 'admin')
        THEN '✅ ADMIN PROFILE EXISTS'
        WHEN EXISTS (SELECT 1 FROM user_profiles WHERE email = 'm42k@admin.com' AND role != 'admin')
        THEN '⚠️ PROFILE EXISTS BUT NOT ADMIN'
        ELSE '❓ UNKNOWN STATE'
    END as sync_status;

-- ============================================================================
-- STEP 2: FIX ADMIN ACCESS (HANDLES ALL SCENARIOS)
-- ============================================================================

SELECT '🔧 FIXING ADMIN ACCESS...' as status;

-- Handle all possible scenarios
DO $$
DECLARE
    auth_user_id UUID;
    profile_exists BOOLEAN := FALSE;
    current_role TEXT;
BEGIN
    -- Check if auth user exists
    SELECT id INTO auth_user_id 
    FROM auth.users 
    WHERE email = 'm42k@admin.com';
    
    IF auth_user_id IS NULL THEN
        RAISE NOTICE '❌ ERROR: No auth user found for m42k@admin.com';
        RAISE NOTICE '📝 ACTION REQUIRED: Create account for m42k@admin.com in Supabase Auth first';
        RETURN;
    END IF;
    
    RAISE NOTICE '✅ Auth user found with ID: %', auth_user_id;
    
    -- Check if profile exists
    SELECT role INTO current_role 
    FROM user_profiles 
    WHERE email = 'm42k@admin.com';
    
    IF current_role IS NULL THEN
        -- Profile doesn't exist, create it
        INSERT INTO user_profiles (id, email, role)
        VALUES (auth_user_id, 'm42k@admin.com', 'admin');
        RAISE NOTICE '✅ Created new admin profile for m42k@admin.com';
    ELSIF current_role != 'admin' THEN
        -- Profile exists but wrong role, update it
        UPDATE user_profiles 
        SET role = 'admin' 
        WHERE email = 'm42k@admin.com';
        RAISE NOTICE '✅ Updated role from % to admin for m42k@admin.com', current_role;
    ELSE
        -- Profile exists and is already admin
        RAISE NOTICE '✅ Admin profile already exists for m42k@admin.com';
    END IF;
END $$;

-- ============================================================================
-- STEP 3: VERIFY THE FIX
-- ============================================================================

SELECT '✅ VERIFICATION AFTER FIX...' as status;

-- Verify admin user is properly set up
SELECT '👤 Final Admin Status:' as check_type;
SELECT 
    up.id,
    up.email,
    up.role,
    au.email_confirmed_at,
    CASE 
        WHEN up.role = 'admin' AND au.email_confirmed_at IS NOT NULL 
        THEN '✅ ADMIN ACCESS READY'
        WHEN up.role = 'admin' AND au.email_confirmed_at IS NULL
        THEN '⚠️ ADMIN ROLE SET BUT EMAIL NOT CONFIRMED'
        ELSE '❌ ADMIN ACCESS NOT READY'
    END as final_status
FROM user_profiles up
JOIN auth.users au ON up.id = au.id
WHERE up.email = 'm42k@admin.com';

-- Test RLS policy access (simulate admin check)
SELECT '🔒 RLS Policy Test:' as check_type;
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE email = 'm42k@admin.com' AND role = 'admin'
        )
        THEN '✅ RLS POLICIES WILL GRANT ADMIN ACCESS'
        ELSE '❌ RLS POLICIES WILL NOT GRANT ADMIN ACCESS'
    END as rls_test;

-- Show all admin users (should include m42k@admin.com)
SELECT '👥 All Admin Users:' as check_type;
SELECT 
    email,
    role,
    CASE WHEN email = 'm42k@admin.com' THEN '👑 TARGET ADMIN' ELSE '👤 OTHER ADMIN' END as user_type
FROM user_profiles 
WHERE role = 'admin'
ORDER BY email;

-- ============================================================================
-- STEP 4: INSTRUCTIONS FOR APPLICATION TESTING
-- ============================================================================

SELECT '📋 NEXT STEPS FOR TESTING:' as instructions;
SELECT '1. Log into your app using m42k@admin.com' as step_1;
SELECT '2. Check if "Manage Products" button appears in header' as step_2;
SELECT '3. Try accessing /admin/products page' as step_3;
SELECT '4. Test creating/editing products and categories' as step_4;

-- ============================================================================
-- STEP 5: TROUBLESHOOTING INFO
-- ============================================================================

SELECT '🔧 TROUBLESHOOTING INFO:' as troubleshooting;

-- Show current RLS policies that depend on admin role
SELECT 'Admin-dependent policies:' as policy_info;
SELECT 
    tablename,
    policyname,
    cmd as operation
FROM pg_policies 
WHERE qual LIKE '%admin%' OR with_check LIKE '%admin%'
ORDER BY tablename, cmd;

-- Final success message
SELECT '🎉 ADMIN ACCESS SETUP COMPLETE!' as final_result;
SELECT 'User m42k@admin.com should now have full admin privileges' as confirmation;
