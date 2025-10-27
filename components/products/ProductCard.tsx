'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { formatPrice } from '@/utils/format';
import { useCartStore } from '@/lib/store/cart';
import Button from '@/components/ui/Button';
import { ShoppingCart, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    toast.success('Added to cart!');
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    toast.success('Added to cart! Redirecting to checkout...');
    setTimeout(() => {
      router.push('/checkout');
    }, 500);
  };

  const imageUrl = product.images[0] || '/placeholder-product.jpg';

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur overflow-hidden group hover:border-red-500/50 transition-colors">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[4/3] bg-slate-700">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.featured && (
            <span className="absolute top-2 right-2 bg-gradient-to-r from-[var(--grad-primary-from)] to-[var(--grad-primary-to)] text-white px-3 py-1 rounded-full text-xs font-medium">
              Featured
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white text-sm font-bold">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-3">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm md:text-base font-medium text-white mb-1 hover:text-red-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-400 text-xs mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="mb-3">
          <span className="text-xl md:text-2xl font-bold text-green-400 tracking-tight">
            {formatPrice(product.price)}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            size="sm"
            variant="primary"
            className="flex-1 flex items-center justify-center gap-1 text-xs md:text-sm"
          >
            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </Button>
          <Button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            size="sm"
            variant="secondary"
            className="flex-1 flex items-center justify-center gap-1 text-xs md:text-sm"
          >
            <Zap className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Buy Now</span>
            <span className="sm:hidden">Buy</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

