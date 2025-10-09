-- Quick Admin Access Verification
-- Run this anytime to check if m42k@admin.com has proper admin access

-- Single query to check everything
SELECT 
    'ADMIN ACCESS STATUS' as check_type,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM user_profiles up
            JOIN auth.users au ON up.id = au.id
            WHERE up.email = 'm42k@admin.com' 
            AND up.role = 'admin'
            AND au.email_confirmed_at IS NOT NULL
        )
        THEN '✅ FULL ADMIN ACCESS READY'
        WHEN EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE email = 'm42k@admin.com' AND role = 'admin'
        )
        THEN '⚠️ ADMIN ROLE SET BUT CHECK EMAIL CONFIRMATION'
        WHEN EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE email = 'm42k@admin.com'
        )
        THEN '❌ USER EXISTS BUT NOT ADMIN'
        ELSE '❌ NO USER PROFILE FOUND'
    END as status;

-- Show the actual user details
SELECT 
    'USER DETAILS' as info_type,
    up.email,
    up.role,
    CASE WHEN au.email_confirmed_at IS NOT NULL THEN 'CONFIRMED' ELSE 'NOT CONFIRMED' END as email_status
FROM user_profiles up
LEFT JOIN auth.users au ON up.id = au.id
WHERE up.email = 'm42k@admin.com';
