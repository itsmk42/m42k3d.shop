'use client';

import { useState, useEffect } from 'react';
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

  const handleFilterChange = async (filters: FilterState) => {
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
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-semibold mb-8">Our Products</h1>

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

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${loading ? 'opacity-50' : ''}`}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 text-xl mb-4">
                No products found matching your filters.
              </p>
              <p className="text-gray-500">
                Try adjusting your filters or browse all products.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

