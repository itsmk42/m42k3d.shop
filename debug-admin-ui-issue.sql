-- Debug Admin UI Issue - Frontend vs Backend Mismatch
-- Run this to identify why database shows admin but UI doesn't

-- ============================================================================
-- STEP 1: VERIFY DATABASE STATE
-- ============================================================================

SELECT '🔍 DATABASE VERIFICATION' as check_type;

-- Check auth.users table
SELECT '👤 Auth Users Table:' as info;
SELECT 
    id,
    email,
    email_confirmed_at,
    CASE WHEN email_confirmed_at IS NOT NULL THEN '✅ CONFIRMED' ELSE '❌ NOT CONFIRMED' END as email_status,
    created_at
FROM auth.users 
WHERE email = 'm42k@admin.com';

-- Check user_profiles table
SELECT '📋 User Profiles Table:' as info;
SELECT 
    id,
    email,
    role,
    full_name,
    created_at,
    updated_at
FROM user_profiles 
WHERE email = 'm42k@admin.com';

-- Check if IDs match between auth.users and user_profiles
SELECT '🔗 ID Matching Check:' as info;
SELECT 
    au.id as auth_id,
    up.id as profile_id,
    au.email as auth_email,
    up.email as profile_email,
    up.role,
    CASE 
        WHEN au.id = up.id THEN '✅ IDs MATCH'
        ELSE '❌ ID MISMATCH - THIS IS THE PROBLEM!'
    END as id_match_status
FROM auth.users au
FULL OUTER JOIN user_profiles up ON au.id = up.id
WHERE au.email = 'm42k@admin.com' OR up.email = 'm42k@admin.com';

-- ============================================================================
-- STEP 2: SIMULATE FRONTEND QUERY
-- ============================================================================

SELECT '🖥️ FRONTEND SIMULATION' as check_type;

-- This simulates exactly what the frontend auth context does
-- fetchUserProfile function: .from('user_profiles').select('*').eq('id', userId).single()

-- First, get the user ID from auth.users
DO $$
DECLARE
    user_id UUID;
    profile_record RECORD;
BEGIN
    -- Get user ID (this is what the frontend gets from session.user.id)
    SELECT id INTO user_id FROM auth.users WHERE email = 'm42k@admin.com';
    
    IF user_id IS NULL THEN
        RAISE NOTICE '❌ No auth user found for m42k@admin.com';
        RETURN;
    END IF;
    
    RAISE NOTICE '✅ Auth user ID: %', user_id;
    
    -- Simulate the frontend query: .eq('id', userId)
    SELECT * INTO profile_record 
    FROM user_profiles 
    WHERE id = user_id;
    
    IF profile_record IS NULL THEN
        RAISE NOTICE '❌ CRITICAL: No user profile found for user ID %', user_id;
        RAISE NOTICE '🔧 SOLUTION: Profile exists but with wrong ID - need to fix the ID mismatch';
    ELSE
        RAISE NOTICE '✅ Profile found: email=%, role=%', profile_record.email, profile_record.role;
        
        IF profile_record.role = 'admin' THEN
            RAISE NOTICE '✅ Frontend should show isAdmin = true';
        ELSE
            RAISE NOTICE '❌ Frontend will show isAdmin = false (role is %)', profile_record.role;
        END IF;
    END IF;
END $$;

-- ============================================================================
-- STEP 3: CHECK FOR COMMON ISSUES
-- ============================================================================

SELECT '🔧 COMMON ISSUES CHECK' as check_type;

-- Issue 1: Multiple profiles for same email
SELECT '📊 Profile Count Check:' as info;
SELECT 
    email,
    COUNT(*) as profile_count,
    CASE 
        WHEN COUNT(*) > 1 THEN '⚠️ MULTIPLE PROFILES - DUPLICATE ISSUE'
        WHEN COUNT(*) = 1 THEN '✅ SINGLE PROFILE'
        ELSE '❌ NO PROFILE'
    END as status
FROM user_profiles 
WHERE email = 'm42k@admin.com'
GROUP BY email;

-- Issue 2: Profile exists but with different ID than auth.users
SELECT '🆔 ID Mismatch Detection:' as info;
SELECT 
    'Profile ID: ' || up.id::text as profile_info,
    'Auth ID: ' || au.id::text as auth_info,
    CASE 
        WHEN up.id != au.id THEN '❌ ID MISMATCH - FRONTEND WILL FAIL'
        ELSE '✅ IDs MATCH'
    END as diagnosis
FROM user_profiles up, auth.users au
WHERE up.email = 'm42k@admin.com' AND au.email = 'm42k@admin.com';

-- Issue 3: Check RLS policies (might be blocking the query)
SELECT '🛡️ RLS Policy Check:' as info;
SELECT 
    tablename,
    policyname,
    cmd,
    permissive
FROM pg_policies 
WHERE tablename = 'user_profiles'
ORDER BY cmd;

-- ============================================================================
-- STEP 4: AUTOMATIC FIX (IF ID MISMATCH FOUND)
-- ============================================================================

SELECT '🔧 AUTOMATIC FIX ATTEMPT' as check_type;

-- Fix ID mismatch if found
DO $$
DECLARE
    auth_user_id UUID;
    profile_user_id UUID;
    profile_exists BOOLEAN := FALSE;
BEGIN
    -- Get the correct auth user ID
    SELECT id INTO auth_user_id FROM auth.users WHERE email = 'm42k@admin.com';
    
    IF auth_user_id IS NULL THEN
        RAISE NOTICE '❌ Cannot fix: No auth user found';
        RETURN;
    END IF;
    
    -- Check if profile exists with correct ID
    SELECT id INTO profile_user_id FROM user_profiles WHERE id = auth_user_id;
    
    IF profile_user_id IS NOT NULL THEN
        RAISE NOTICE '✅ Profile already has correct ID - no fix needed';
        RETURN;
    END IF;
    
    -- Check if profile exists with wrong ID (by email)
    SELECT EXISTS(SELECT 1 FROM user_profiles WHERE email = 'm42k@admin.com') INTO profile_exists;
    
    IF profile_exists THEN
        -- Update the profile to use correct ID
        UPDATE user_profiles 
        SET id = auth_user_id 
        WHERE email = 'm42k@admin.com';
        
        RAISE NOTICE '✅ FIXED: Updated profile ID to match auth user ID';
        RAISE NOTICE '🔄 Frontend should now work - try refreshing the page';
    ELSE
        -- Create new profile with correct ID
        INSERT INTO user_profiles (id, email, role)
        VALUES (auth_user_id, 'm42k@admin.com', 'admin');
        
        RAISE NOTICE '✅ CREATED: New profile with correct ID and admin role';
        RAISE NOTICE '🔄 Frontend should now work - try refreshing the page';
    END IF;
END $$;

-- ============================================================================
-- STEP 5: FINAL VERIFICATION
-- ============================================================================

SELECT '✅ FINAL VERIFICATION' as check_type;

-- Verify the fix worked
SELECT 'Final Status:' as info;
SELECT 
    au.email,
    up.role,
    CASE 
        WHEN au.id = up.id AND up.role = 'admin' 
        THEN '✅ READY - Frontend should show admin button'
        ELSE '❌ STILL BROKEN - Check the issues above'
    END as final_status
FROM auth.users au
JOIN user_profiles up ON au.id = up.id
WHERE au.email = 'm42k@admin.com';

-- Show what the frontend query will return
SELECT 'Frontend Query Result:' as info;
SELECT 
    id,
    email,
    role,
    full_name,
    'This is what useAuth().userProfile will contain' as note
FROM user_profiles 
WHERE id = (SELECT id FROM auth.users WHERE email = 'm42k@admin.com');

SELECT '🎯 NEXT STEPS:' as instructions;
SELECT '1. If fix was applied, refresh your browser page' as step_1;
SELECT '2. Check browser console for any errors' as step_2;
SELECT '3. Visit /debug-auth page to verify frontend sees the data' as step_3;
SELECT '4. Look for the "Manage Products" button in header' as step_4;
