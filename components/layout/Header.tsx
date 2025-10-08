'use client';

import Link from 'next/link';
import { ShoppingCart, User, Menu, X, LogOut, UserCircle, Package, Settings } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/auth/context';
import Logo from '@/components/ui/Logo';

export default function Header() {
  const itemCount = useCartStore((state) => state.getItemCount());
  const { user, userProfile, signOut, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-blue-600 hover:text-blue-700 transition-colors">
            <Logo size="md" showText={true} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Admin Manage Products Button - Desktop */}
            {isAdmin && (
              <Link
                href="/admin/products"
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all shadow-sm hover:shadow-md"
                aria-label="Manage Products"
              >
                <Settings className="w-4 h-4" />
                <span>Manage Products</span>
              </Link>
            )}

            {/* User Menu */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                  aria-label="User menu"
                >
                  <User className="w-6 h-6" />
                  <span className="hidden md:inline text-sm font-medium">
                    {userProfile?.full_name || 'Account'}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {userProfile?.full_name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/account"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <UserCircle className="w-4 h-4" />
                      My Account
                    </Link>

                    <Link
                      href="/account"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Package className="w-4 h-4" />
                      My Orders
                    </Link>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 border-t border-gray-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        signOut();
                        setUserMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-200"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Auth Links */}
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <>
                    <Link
                      href="/account"
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors mb-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UserCircle className="w-5 h-5" />
                      My Account
                    </Link>
                    {isAdmin && (
                      <>
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-4"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <User className="w-5 h-5" />
                          Admin Panel
                        </Link>
                        <Link
                          href="/admin/products"
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all shadow-sm mb-4"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Manage Products
                        </Link>
                      </>
                    )}
                    <button
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block w-full text-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors mb-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block w-full text-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

