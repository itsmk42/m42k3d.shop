'use client';

import { useState, useRef, useEffect } from 'react';
import CompactFeaturedItems from '@/components/home/CompactFeaturedItems';
import { Product } from '@/types';
import { Truck, Shield, Package, Sparkles } from 'lucide-react';

interface HomeTabsProps {
  products: Product[];
}

type TabId = 'featured' | 'shipping' | 'secure' | 'materials' | 'custom';

export default function HomeTabs({ products }: HomeTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('featured');
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const tabs: Array<{ id: TabId; label: string; icon: React.ReactNode }> = [
    { id: 'featured', label: 'Featured Items', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'shipping', label: 'Fast Shipping', icon: <Truck className="w-4 h-4" /> },
    { id: 'secure', label: 'Secure Payments', icon: <Shield className="w-4 h-4" /> },
    { id: 'materials', label: 'Quality Materials', icon: <Package className="w-4 h-4" /> },
    { id: 'custom', label: 'Custom Orders', icon: <Sparkles className="w-4 h-4" /> },
  ];

  useEffect(() => {
    tabsRef.current[0]?.focus();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    if (e.key === 'ArrowRight') {
      const nextIndex = (currentIndex + 1) % tabs.length;
      setActiveTab(tabs[nextIndex].id);
      tabsRef.current[nextIndex]?.focus();
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[prevIndex].id);
      tabsRef.current[prevIndex]?.focus();
      e.preventDefault();
    } else if (e.key === 'Home') {
      setActiveTab(tabs[0].id);
      tabsRef.current[0]?.focus();
      e.preventDefault();
    } else if (e.key === 'End') {
      const last = tabs.length - 1;
      setActiveTab(tabs[last].id);
      tabsRef.current[last]?.focus();
      e.preventDefault();
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <div
          role="tablist"
          aria-label="Homepage sections"
          className="flex flex-wrap items-center gap-2 border-b border-slate-700 pb-3 mb-6"
          onKeyDown={onKeyDown}
        >
          {tabs.map((tab, index) => {
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                ref={(el) => (tabsRef.current[index] = el)}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-t-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                  selected
                    ? 'bg-slate-800 text-red-400 border-b-2 border-red-500'
                    : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span className={selected ? 'text-red-400' : 'text-red-500'}>{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div>
          {activeTab === 'featured' && (
            <div role="tabpanel" id="panel-featured" aria-labelledby="tab-featured" className="focus:outline-none">
              <CompactFeaturedItems products={products} />
            </div>
          )}

          {activeTab === 'shipping' && (
            <div role="tabpanel" id="panel-shipping" aria-labelledby="tab-shipping" className="focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Truck className="w-5 h-5 text-red-500" />
                    <h3 className="text-white text-lg font-semibold">Fast Shipping</h3>
                  </div>
                  <p className="text-gray-300 text-sm">We dispatch orders within 2–5 business days with tracked delivery. You’ll receive status updates as your item moves through the network.</p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Package className="w-5 h-5 text-red-500" />
                    <h3 className="text-white text-lg font-semibold">Secure Packaging</h3>
                  </div>
                  <p className="text-gray-300 text-sm">Every print is padded and boxed for safety. We use premium materials to ensure your product arrives in perfect condition.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'secure' && (
            <div role="tabpanel" id="panel-secure" aria-labelledby="tab-secure" className="focus:outline-none">
              <div className="rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-red-500" />
                  <h3 className="text-white text-lg font-semibold">Secure Payments</h3>
                </div>
                <p className="text-gray-300 text-sm">Checkout is powered by trusted providers. Your information is encrypted end-to-end and never stored on our servers.</p>
              </div>
            </div>
          )}

          {activeTab === 'materials' && (
            <div role="tabpanel" id="panel-materials" aria-labelledby="tab-materials" className="focus:outline-none">
              <div className="rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-5 h-5 text-red-500" />
                  <h3 className="text-white text-lg font-semibold">Quality Materials</h3>
                </div>
                <p className="text-gray-300 text-sm">We print with premium PLA, PETG, and TPU. Each material is selected to balance visual finish, strength, and durability.</p>
              </div>
            </div>
          )}

          {activeTab === 'custom' && (
            <div role="tabpanel" id="panel-custom" aria-labelledby="tab-custom" className="focus:outline-none">
              <div className="rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-5 h-5 text-red-500" />
                  <h3 className="text-white text-lg font-semibold">Custom Orders</h3>
                </div>
                <p className="text-gray-300 text-sm">Have a project in mind? We offer bespoke 3D printing services tailored to your specs. Get in touch for a quote.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

