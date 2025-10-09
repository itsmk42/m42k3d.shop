'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Package, ShoppingBag, LogOut } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Logged in successfully!');
      setIsAuthenticated(true);
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto card p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-violet-50 border-blue-200/60">
            <p className="text-sm text-blue-800">
              <strong>Setup Required:</strong> You need to configure Supabase authentication 
              and create an admin user account in your Supabase dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout} variant="secondary" className="flex items-center gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/products">
          <div className="card p-8 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-4 bg-gradient-to-r from-[var(--grad-primary-from)] to-[var(--grad-primary-to)] text-white">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Manage Products</h2>
                <p className="text-gray-600">Add, edit, or remove products</p>
              </div>
            </div>
          </div>
        </Link>

        <div className="card p-8 opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-4 rounded-full">
              <ShoppingBag className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Manage Orders</h2>
              <p className="text-gray-600">View and manage customer orders</p>
              <p className="text-sm text-gray-500 mt-1">(Coming soon)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

