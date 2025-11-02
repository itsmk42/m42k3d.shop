'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import ProductFilters, { FilterState } from './ProductFilters';

interface ProductsPageClientProps {
  initialProducts: Product[];
  categories: string[];
}

export default function ProductsPageClient({
  initialProducts,
  categories,
}: ProductsPageClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredCount, setFilteredCount] = useState(initialProducts.length);
  const [loading, setLoading] = useState(false);
  const [_hasHydrated, setHasHydrated] = useState(false);

  // Hydration tracking to prevent SSR/client mismatch
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const handleFilterChange = useCallback(async (filters: FilterState) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('sortBy', filters.sortBy);

      filters.categories.forEach((cat) => {
        params.append('categories', cat);
      });

      params.set('minPrice', filters.priceRange[0].toString());
      params.set('maxPrice', filters.priceRange[1].toString());
      params.set('inStock', filters.inStock.toString());
      params.set('featured', filters.featured.toString());

      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();

      setProducts(data.products || []);
      setFilteredCount(data.total || 0);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Only render after hydration to prevent SSR/client mismatch
  if (!_hasHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-semibold mb-8 text-white">Our Products</h1>
          <div className="flex gap-8">
            <div className="hidden lg:block w-1/4" />
            <div className="w-full lg:w-3/4">
              {/* Skeleton loader */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-slate-700 bg-slate-800/50 animate-pulse h-80" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-semibold mb-8 text-white">Our Products</h1>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-1/4">
            <ProductFilters
              categories={categories}
              onFilterChange={handleFilterChange}
              totalProducts={initialProducts.length}
              filteredCount={filteredCount}
            />
          </div>

          {/* Mobile Filters + Products */}
          <div className="w-full lg:w-3/4">
            <div className="lg:hidden mb-6">
              <ProductFilters
                categories={categories}
                onFilterChange={handleFilterChange}
                totalProducts={initialProducts.length}
                filteredCount={filteredCount}
              />
            </div>

            {/* Products Grid with smooth transition */}
            <div className={`transition-opacity duration-300 ${loading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
              {products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-300 text-xl mb-4">
                    No products found matching your filters.
                  </p>
                  <p className="text-gray-400">
                    Try adjusting your filters or browse all products.
                  </p>
                </div>
              )}
            </div>

            {/* Loading indicator */}
            {loading && (
              <div className="fixed bottom-8 right-8 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-gray-300 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Updating products...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

