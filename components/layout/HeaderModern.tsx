'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, User, Menu, X, LogOut, UserCircle, Package, Settings, ChevronDown, Search } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/auth/context';
import Logo from '@/components/ui/Logo';

export default function HeaderModern() {
  const pathname = usePathname();
  const router = useRouter();
  const itemCount = useCartStore((state) => state.getItemCount());
  const { user, userProfile, signOut, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Don't preload logo on checkout pages
  const shouldPreloadLogo = !pathname?.includes('/checkout');

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navigation items with modern structure
  const navItems = [
    { href: '/', label: 'Home', icon: null },
    { href: '/products', label: 'Products', icon: null },
    { href: '/about', label: 'About', icon: null },
    { href: '/contact', label: 'Contact', icon: null },
  ];

  return (
    <>
      <style jsx>{`
        .header-modern {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(229, 231, 235, 0.5);
          transition: all 0.3s ease;
        }

        .header-modern.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        }

        .nav-link {
          position: relative;
          color: #374151;
          font-weight: 500;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .nav-link:hover {
          color: #3b82f6;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: width 0.3s ease;
          border-radius: 1px;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link.active {
          color: #3b82f6;
        }

        .nav-link.active::after {
          width: 100%;
        }

        .action-button {
          position: relative;
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
          border: 1px solid rgba(229, 231, 235, 0.8);
          border-radius: 12px;
          padding: 8px 12px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .action-button:hover {
          background: linear-gradient(135deg, #e5e7eb, #d1d5db);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .cart-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          font-size: 10px;
          font-weight: 600;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .mobile-menu {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(229, 231, 235, 0.5);
        }

        .user-dropdown {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(229, 231, 235, 0.5);
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          animation: dropdownFade 0.2s ease;
        }

        @keyframes dropdownFade {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        

        .admin-badge {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>

      <header className="header-modern sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" aria-label="sparklespheres.store home" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
                <Logo size="md" showText={true} priority={shouldPreloadLogo} variant="light" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" aria-label="Main">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${pathname === item.href ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop extra actions removed: search container div deleted */}

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Search Button - Mobile */}
              <button
                className="md:hidden action-button header__search-btn"
                onClick={() => router.push('/products')}
                aria-label="Search products"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>

              {/* Admin Button - Desktop */}
              {isAdmin && (
                <Link
                  href="/admin/products"
                  className="hidden lg:flex items-center space-x-2 action-button"
                  aria-label="Manage Products"
                >
                  <Settings className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Admin</span>
                  <span className="admin-badge">Pro</span>
                </Link>
              )}

              {/* User Menu */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 action-button"
                    aria-label="User menu"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      {userProfile?.full_name?.split(' ')[0] || 'Account'}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="user-dropdown absolute right-0 mt-2 w-64 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">
                          {userProfile?.full_name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        {isAdmin && (
                          <span className="inline-block mt-1 admin-badge">Admin</span>
                        )}
                      </div>

                      <div className="py-2">
                        <Link
                          href="/account"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <UserCircle className="w-4 h-4" />
                          <span>My Account</span>
                        </Link>

                        <Link
                          href="/account"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Package className="w-4 h-4" />
                          <span>My Orders</span>
                        </Link>

                        {isAdmin && (
                          <>
                            <div className="border-t border-gray-100 my-2"></div>
                            <Link
                              href="/admin"
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <User className="w-4 h-4" />
                              <span>Admin Panel</span>
                            </Link>
                          </>
                        )}
                      </div>

                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={() => {
                            signOut();
                            setUserMenuOpen(false);
                          }}
                          className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link
                    href="/login"
                    className="header__login-btn"
                    aria-label="Log in to your account"
                  >
                    Login
                  </Link>
                </div>
              )}

              {/* Cart */}
              <Link
                href="/cart"
                className="relative action-button"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {itemCount > 0 && (
                  <span className="cart-badge">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden action-button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search input removed intentionally: search handled via icon navigation */}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="mobile-menu lg:hidden border-t border-gray-100">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-link text-lg ${pathname === item.href ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Section */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                {user ? (
                  <div className="space-y-4">
                    <Link
                      href="/account"
                      className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UserCircle className="w-5 h-5" />
                      <span>My Account</span>
                    </Link>

                    <Link
                      href="/account"
                      className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Package className="w-5 h-5" />
                      <span>My Orders</span>
                    </Link>

                    {isAdmin && (
                      <>
                        <Link
                          href="/admin"
                          className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <User className="w-5 h-5" />
                          <span>Admin Panel</span>
                        </Link>

                        <Link
                          href="/admin/products"
                          className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Settings className="w-5 h-5" />
                          <span>Manage Products</span>
                        </Link>
                      </>
                    )}

                    <button
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 text-red-600 hover:text-red-700 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link
                      href="/login"
                      className="block w-full text-center header__login-btn"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
