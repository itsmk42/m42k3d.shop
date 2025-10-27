'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import { Product } from '@/types';
import { formatPrice } from '@/utils/format';
import { useCartStore } from '@/lib/store/cart';
import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        toast.error('Product not found');
        router.push('/products');
        return;
      }

      setProduct(data);
      setLoading(false);
    }

    fetchProduct();
  }, [params.id, router]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      toast.success(`Added ${quantity} item(s) to cart!`);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return null;
  }

  const images = product.images.length > 0 ? product.images : ['/placeholder-product.jpg'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-[4/3] lg:aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden mb-4 card">
            <Image
              src={images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300"
              priority
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 bg-gray-100 rounded-lg overflow-hidden border ${
                    selectedImage === index ? 'ring-2 ring-violet-500 border-transparent' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

          {/* Product Info */}
          <aside className="bg-slate-700/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:sticky md:top-24">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">{product.name}</h1>

            {/* Price Display */}
            <div className="mb-6">
              {product.original_price && product.original_price > product.price ? (
                <div className="flex items-center gap-3">
                  <p className="text-lg text-gray-400 line-through">
                    {formatPrice(product.original_price)}
                  </p>
                  <p className="text-3xl font-bold text-green-500">
                    {formatPrice(product.price)}
                  </p>
                  <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-sm font-semibold">
                    {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
                  </span>
                </div>
              ) : (
                <p className="text-3xl font-bold text-green-500">
                  {formatPrice(product.price)}
                </p>
              )}
            </div>

            <div className="mb-6">
              <span className="inline-block bg-red-500/20 text-red-200 px-3 py-1 rounded-full text-sm border border-red-500/30">
                {product.category}
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-white">Description</h2>
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-6">
              <p className="text-gray-300">
                <span className="font-semibold">Stock:</span>{' '}
                {product.stock > 0 ? (
                  <span className="text-green-400">{product.stock} available</span>
                ) : (
                  <span className="text-red-400">Out of stock</span>
                )}
              </p>
            </div>

            {product.stock > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-white/30 rounded-lg hover:bg-white/10 transition-colors text-white"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-12 text-center text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 border border-white/30 rounded-lg hover:bg-white/10 transition-colors text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => {
                  if (product) {
                    addItem(product, quantity);
                    toast.success(`Added ${quantity} item(s) to cart!`);
                    router.push('/cart');
                  }
                }}
                disabled={product.stock === 0}
                size="lg"
                className="w-full justify-center gap-2 bg-red-600 hover:bg-red-700"
              >
                {product.stock > 0 ? 'Buy Now' : 'Out of Stock'}
              </Button>
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                size="lg"
                className="w-full justify-center gap-2 bg-slate-600 hover:bg-slate-700"
              >
                <ShoppingCart className="w-5 h-5" />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

