'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { ArrowRight } from 'lucide-react';

interface CompactFeaturedItemsProps {
  products: Product[];
}

export default function CompactFeaturedItems({ products }: CompactFeaturedItemsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Featured Items</h2>
            <p className="text-gray-400 text-sm mt-1">Explore our latest 3D printed creations</p>
          </div>
          <Link href="/products" className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Compact Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {products.map((product) => {
            const imageUrl = product.images[0] || '/placeholder-product.jpg';

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group relative overflow-hidden rounded-lg"
              >
                {/* Image Container */}
                <div className="relative aspect-square bg-slate-700 rounded-lg overflow-hidden border border-slate-600 hover:border-red-500/50 transition-all duration-300">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                  />

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    {/* Hover Info */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <p className="text-white text-xs font-semibold px-2 line-clamp-2">
                        {product.name}
                      </p>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {product.featured && (
                    <span className="absolute top-1 right-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                      ⭐
                    </span>
                  )}

                  {/* Out of Stock Overlay */}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Product Name - Below Image */}
                <div className="mt-2 px-1">
                  <h3 className="text-xs md:text-sm font-medium text-white group-hover:text-red-400 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button - Mobile */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/products"
            className="px-6 py-2 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors font-medium text-sm"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

