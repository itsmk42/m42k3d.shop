'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/modern-themes.css';
import { Menu, X, ShoppingCart, User, ArrowRight, Sparkles, Package, Shield, Truck } from 'lucide-react';

const themes = ['minimal', 'vivid', 'soft'] as const;
type Theme = typeof themes[number];

export default function ModernHomePage() {
  const [theme, setTheme] = useState<Theme>('soft');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Initialize theme from query param, defaulting to Soft
  useEffect(() => {
    try {
      const t = new URLSearchParams(window.location.search).get('theme');
      if (t && (t === 'minimal' || t === 'vivid' || t === 'soft')) {
        setTheme(t as Theme);
      } else {
        setTheme('soft');
      }
    } catch (_) {
      setTheme('soft');
    }
  }, []);

  return (
    <div className="min-h-screen" data-theme={theme}>
      {/* Theme Selector */}
      <div className="fixed top-4 right-4 z-50">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as Theme)}
          className="input-modern text-sm"
        >
          <option value="minimal">Minimal</option>
          <option value="vivid">Vivid</option>
          <option value="soft">Soft</option>
        </select>
      </div>

      {/* Modern Navigation */}
      <nav className="nav-modern">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-soft)] rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-[var(--text-primary)]">ModernShop</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="#" className="nav-modern__link">Products</Link>
          <Link href="#" className="nav-modern__link">About</Link>
          <Link href="#" className="nav-modern__link">Contact</Link>
          <Link href="#" className="nav-modern__link">FAQ</Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu-modern ${mobileMenuOpen ? 'mobile-menu-modern--open' : ''}`}>
        <div className="flex justify-between items-center mb-8">
          <span className="font-bold text-lg text-[var(--text-primary)]">Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <Link href="#" className="nav-modern__link text-lg" onClick={() => setMobileMenuOpen(false)}>Products</Link>
          <Link href="#" className="nav-modern__link text-lg" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="#" className="nav-modern__link text-lg" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <Link href="#" className="nav-modern__link text-lg" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-modern">
        <div className="container mx-auto px-4">
          <h1 className="hero-modern__title">
            Crafted with Precision,
            <br />
            Designed for You
          </h1>
          <p className="hero-modern__subtitle">
            Discover premium 3D printed products that combine innovation with artistry. Each piece is meticulously crafted to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="btn-modern btn-modern--primary">
              Explore Products
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn-modern btn-modern--secondary">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="feature-grid-modern">
            <div className="card-modern p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-soft)] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Premium Quality</h3>
              <p className="text-[var(--text-secondary)]">Every product undergoes rigorous quality checks to ensure exceptional standards.</p>
            </div>

            <div className="card-modern p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-soft)] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Secure & Reliable</h3>
              <p className="text-[var(--text-secondary)]">Your data and payments are protected with enterprise-grade security.</p>
            </div>

            <div className="card-modern p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-soft)] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Fast Delivery</h3>
              <p className="text-[var(--text-secondary)]">Quick processing and shipping to get your custom creations to you faster.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Featured Creations</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Explore our curated collection of standout pieces that showcase the possibilities of 3D printing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="card-modern group">
                <div className="aspect-square bg-gradient-to-br from-[var(--accent-soft)] to-[var(--accent)] rounded-t-xl relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/20 rounded-2xl backdrop-blur-sm" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-white/90 text-[var(--text-primary)] text-xs font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Designer Lamp {item}</h3>
                  <p className="text-[var(--text-secondary)] text-sm mb-4">Modern lighting solution with customizable colors</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-[var(--text-primary)]">₹2,499</span>
                    <button className="btn-modern btn-modern--primary text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn-modern btn-modern--ghost">
              View All Products
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
            Whether you have a specific design in mind or need help bringing your ideas to life, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-modern btn-modern--primary">
              Start Custom Order
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn-modern btn-modern--secondary">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--surface)] py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-soft)] rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg text-[var(--text-primary)]">ModernShop</span>
              </div>
              <p className="text-[var(--text-secondary)] text-sm">
                Premium 3D printed products crafted with precision and passion.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Home Decor</Link></li>
                <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Lighting</Link></li>
                <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Custom Orders</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">FAQ</Link></li>
                <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[var(--border)] mt-8 pt-8 text-center text-sm text-[var(--text-secondary)]">
            <p>&copy; 2024 ModernShop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
