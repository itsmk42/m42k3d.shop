'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(formData.email, formData.password);

      if (error) {
        toast.error('Invalid admin credentials');
        return;
      }

      // The middleware will check if user is admin and redirect accordingly
      toast.success('Welcome, Admin!');
      router.push('/admin');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-300">Secure access for administrators only</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-300" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="admin@sparklesphere.store"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-300" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full pl-10 pr-10 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-300 hover:text-white" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-300 hover:text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3">
              <p className="text-xs text-yellow-100 flex items-start gap-2">
                <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  This is a secure admin area. All login attempts are monitored and logged.
                </span>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Admin Sign In
                </>
              )}
            </button>
          </form>

          {/* Back to User Login */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              ← Back to Customer Login
            </Link>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
}

