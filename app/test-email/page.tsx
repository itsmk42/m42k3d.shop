'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

export default function TestEmailPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const testSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Check your email for confirmation link!');
        console.log('Signup response:', data);
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const testPasswordReset = async () => {
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Password reset email sent!');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error('Password reset error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Test Email Configuration</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Signup Email</h2>
          <form onSubmit={testSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="test@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Test Signup Email'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Password Reset Email</h2>
          <button
            onClick={testPasswordReset}
            disabled={loading || !email}
            className="w-full px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Test Password Reset Email'}
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Uses the email address from the form above
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">What to Check:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Email should come from "SparkleSphere Store"</li>
            <li>• Confirmation link should point to your Vercel URL</li>
            <li>• Clicking the link should redirect to /account</li>
            <li>• Check browser console for any errors</li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Current site URL: <code className="bg-gray-100 px-2 py-1 rounded">{window.location.origin}</code>
          </p>
        </div>
      </div>
    </div>
  );
}
