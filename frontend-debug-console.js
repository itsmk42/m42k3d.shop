// Frontend Debug Console Script
// Copy and paste this into your browser console while logged in as m42k@admin.com
// This will help identify why the admin button isn't showing

console.log('🔍 DEBUGGING ADMIN UI ISSUE');
console.log('=============================');

// Check if we're on the right page
console.log('Current URL:', window.location.href);

// Check if React DevTools can access the auth context
try {
  // Try to access the auth context through React DevTools
  console.log('🔍 Checking for auth context...');
  
  // Look for auth-related elements in the DOM
  const userMenu = document.querySelector('[aria-label="User menu"]');
  const manageProductsButton = document.querySelector('a[href="/admin/products"]');
  
  console.log('User menu found:', !!userMenu);
  console.log('Manage Products button found:', !!manageProductsButton);
  
  if (userMenu) {
    console.log('✅ User is logged in (user menu exists)');
  } else {
    console.log('❌ User appears to be logged out (no user menu)');
  }
  
  if (manageProductsButton) {
    console.log('✅ Admin button is present');
  } else {
    console.log('❌ Admin button is missing - this is the issue');
  }
  
} catch (error) {
  console.error('Error checking DOM elements:', error);
}

// Check localStorage for any cached auth data
console.log('🔍 Checking localStorage...');
const authKeys = Object.keys(localStorage).filter(key => 
  key.includes('supabase') || key.includes('auth') || key.includes('session')
);
console.log('Auth-related localStorage keys:', authKeys);

// Check sessionStorage
console.log('🔍 Checking sessionStorage...');
const sessionAuthKeys = Object.keys(sessionStorage).filter(key => 
  key.includes('supabase') || key.includes('auth') || key.includes('session')
);
console.log('Auth-related sessionStorage keys:', sessionAuthKeys);

// Check cookies
console.log('🔍 Checking cookies...');
const authCookies = document.cookie.split(';').filter(cookie => 
  cookie.includes('supabase') || cookie.includes('auth') || cookie.includes('session')
);
console.log('Auth-related cookies:', authCookies);

// Try to access Supabase client if available
console.log('🔍 Checking Supabase client...');
if (typeof window !== 'undefined') {
  // Check if there's a global supabase client
  if (window.supabase) {
    console.log('✅ Global Supabase client found');
    
    // Try to get current session
    window.supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('❌ Error getting session:', error);
      } else if (session) {
        console.log('✅ Session found:', {
          user_id: session.user.id,
          email: session.user.email,
          role: session.user.role
        });
        
        // Try to fetch user profile
        window.supabase
          .from('user_profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error('❌ Error fetching profile:', error);
              console.log('🔧 This might be the issue - profile fetch is failing');
            } else {
              console.log('✅ Profile data:', data);
              console.log('Is Admin:', data?.role === 'admin');
              
              if (data?.role === 'admin') {
                console.log('✅ Database shows admin role - UI should show button');
                console.log('🔧 If button is missing, there might be a React state issue');
              } else {
                console.log('❌ Database shows role:', data?.role);
                console.log('🔧 This is why admin button is not showing');
              }
            }
          });
      } else {
        console.log('❌ No session found - user is not logged in');
      }
    });
  } else {
    console.log('❌ No global Supabase client found');
  }
}

// Instructions for manual testing
console.log('');
console.log('📋 MANUAL TESTING STEPS:');
console.log('1. Open Network tab in DevTools');
console.log('2. Refresh the page');
console.log('3. Look for requests to user_profiles table');
console.log('4. Check if the profile query returns role: "admin"');
console.log('5. If profile query fails, that\'s the issue');
console.log('6. If profile query succeeds but button missing, it\'s a React state issue');

console.log('');
console.log('🔧 QUICK FIXES TO TRY:');
console.log('1. Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)');
console.log('2. Clear browser cache and cookies');
console.log('3. Log out and log back in');
console.log('4. Check /debug-auth page for detailed auth status');

console.log('');
console.log('✅ Debug script complete - check the output above');
