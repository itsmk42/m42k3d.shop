'use client';

import { useAuth } from '@/lib/auth/context';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function DebugAuthPage() {
  const { user, userProfile, isAdmin, loading } = useAuth();
  const [dbProfile, setDbProfile] = useState<any>(null);
  const [dbLoading, setDbLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        setDbProfile(data);
        setDbLoading(false);
        
        if (error) {
          console.error('Error fetching profile:', error);
        }
      } else {
        setDbLoading(false);
      }
    }
    
    fetchProfile();
  }, [user]);

  if (loading || dbLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Auth Debug Page</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Auth Debug Page</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
          <div className="space-y-2">
            <p><strong>Logged In:</strong> {user ? '✅ Yes' : '❌ No'}</p>
            <p><strong>Is Admin:</strong> {isAdmin ? '✅ Yes' : '❌ No'}</p>
          </div>
        </div>

        {user && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">User Object (from Auth)</h2>
              <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">User Profile (from Context)</h2>
              <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                {JSON.stringify(userProfile, null, 2)}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">User Profile (from Database)</h2>
              <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                {JSON.stringify(dbProfile, null, 2)}
              </pre>
            </div>

            {!isAdmin && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-yellow-800">How to Become Admin</h2>
                <p className="mb-4 text-yellow-700">
                  You are currently logged in but not an admin. To see the "Manage Products" button, you need to:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-yellow-700">
                  <li>Go to your Supabase Dashboard</li>
                  <li>Navigate to SQL Editor</li>
                  <li>Run this SQL command:</li>
                </ol>
                <pre className="bg-yellow-100 p-4 rounded mt-4 text-sm overflow-auto">
{`UPDATE user_profiles 
SET role = 'admin' 
WHERE email = '${user.email}';`}
                </pre>
                <p className="mt-4 text-yellow-700">
                  After running this command, refresh this page to see the updated status.
                </p>
              </div>
            )}

            {isAdmin && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-green-800">✅ You are an Admin!</h2>
                <p className="text-green-700">
                  You should see the "Manage Products" button in the header. If you don't see it:
                </p>
                <ol className="list-decimal list-inside space-y-2 mt-4 text-green-700">
                  <li>Try refreshing the page (Ctrl+R or Cmd+R)</li>
                  <li>Clear your browser cache</li>
                  <li>Check the browser console for errors (F12)</li>
                  <li>Make sure you're looking at the header navigation bar</li>
                </ol>
              </div>
            )}
          </>
        )}

        {!user && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">Not Logged In</h2>
            <p className="mb-4 text-blue-700">
              You need to log in to see the "Manage Products" button. Please:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-blue-700">
              <li>Go to <a href="/login" className="underline">/login</a> or <a href="/admin/login" className="underline">/admin/login</a></li>
              <li>Log in with your admin credentials</li>
              <li>Come back to this page to verify your admin status</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

