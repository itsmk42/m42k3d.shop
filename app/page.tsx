import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import ProductCard from '@/components/products/ProductCard';
import Button from '@/components/ui/Button';
import { Product } from '@/types';
import { ArrowRight, Package, Truck, Shield, ShoppingBag, ImageIcon, KeyRound, Layers, Palette, Sparkles, CheckCircle } from 'lucide-react';
import { formatPrice } from '@/utils/format';

async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(6);

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  return data || [];
async function getSpotlightProduct(): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error fetching spotlight product:', error);
    return null;
  }

  return (data && data[0]) || null;
}



export default async function Home() {
  const [spotlightProduct, featuredProducts] = await Promise.all([
    getSpotlightProduct(),
    getFeaturedProducts(),
  ]);

  const spotlightVideo = process.env.NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL;
  const spotlightImage = (spotlightProduct?.images && spotlightProduct.images[0]) || '/placeholder-product.jpg';


  return (
    <div className="theme-red">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-[var(--grad-primary-from)]/40 to-[var(--grad-primary-to)]/40 blur-3xl" />
          <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-gradient-to-tr from-rose-400/25 to-red-500/25 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur text-sm mb-5">
                <Sparkles className="w-4 h-4 text-yellow-300" /> Spotlight
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                {spotlightProduct?.name ?? 'Featured Product'}
              </h1>
              {spotlightProduct && (
                <p className="text-lg md:text-xl text-white/80 mb-4">{spotlightProduct.description}</p>
              )}
              {spotlightProduct && (
                <p className="text-white/90 font-semibold mb-6">Starting at {formatPrice(spotlightProduct.price)}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={spotlightProduct ? `/products/${spotlightProduct.id}` : '/products'}>
                  <Button size="lg" className="gap-2">
                    View Details
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/products" className="px-4 py-2 rounded-lg border border-white/30 text-white/90 hover:bg-white/10 inline-flex items-center justify-center">
                  Shop All
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/15 text-white/90">
                  <Truck className="w-4 h-4 text-white/80" /> Fast Shipping
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/15 text-white/90">
                  <Shield className="w-4 h-4 text-white/80" /> Secure Payments
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/15 text-white/90">
                  <Package className="w-4 h-4 text-white/80" /> Quality Guaranteed
                </div>
              </div>
            </div>
            <div className="relative">
              {spotlightVideo ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={spotlightImage}
                  className="mx-auto h-72 w-72 sm:h-96 sm:w-96 rounded-3xl ring-8 ring-white/5 shadow-2xl object-cover"
                >
                  <source src={spotlightVideo} type="video/mp4" />
                </video>
              ) : (
                <div className="relative mx-auto h-72 w-72 sm:h-96 sm:w-96 rounded-3xl overflow-hidden ring-8 ring-white/5 shadow-2xl">
                  <Image src={spotlightImage} alt={spotlightProduct?.name || 'Featured product'} fill className="object-cover" />
                </div>
              )}
              <div className="absolute inset-0 -z-10 m-auto h-[28rem] w-[28rem] sm:h-[32rem] sm:w-[32rem] rounded-full bg-gradient-to-tr from-rose-400/20 to-red-500/20 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Banner Image Section */}
      <section className="w-full">
        <div className="relative h-[300px] md:h-[400px]">
          <Image
            src="/banners/lamp-banner.png"
            alt="Ambient 3D-printed lamps in a modern room"
            fill
            priority
            className="object-cover"
          />
          {/* subtle dark overlay for readability */}
          <div className="absolute inset-0 bg-black/35" />
          {/* centered CTA with its own semi-transparent backdrop */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-2">
              <Link href="/products">
                <Button size="lg" className="gap-2">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Highlights Strip */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card p-4 flex items-center gap-3">
              <Truck className=\"w-5 h-5 text-red-600\" />
              <div>
                <p className="text-sm font-semibold">Fast Shipping</p>
                <p className="text-xs text-gray-500">2–5 business days</p>
              </div>
            </div>
            <div className="card p-4 flex items-center gap-3">
              <Shield className=\"w-5 h-5 text-red-600\" />
              <div>
                <p className="text-sm font-semibold">Secure Payments</p>
                <p className="text-xs text-gray-500">Trusted checkout</p>
              </div>
            </div>
            <div className="card p-4 flex items-center gap-3">
              <Package className=\"w-5 h-5 text-red-600\" />
              <div>
                <p className="text-sm font-semibold">Quality Materials</p>
                <p className="text-xs text-gray-500">Premium filaments</p>
              </div>
            </div>
            <div className="card p-4 flex items-center gap-3">
              <Sparkles className=\"w-5 h-5 text-red-600\" />
              <div>
                <p className="text-sm font-semibold">Custom Orders</p>
                <p className="text-xs text-gray-500">Made just for you</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <p className="text-gray-600">Browse favourites and best-sellers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/products" className="group block">
              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--grad-primary-from)] to-[var(--grad-primary-to)]">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <Sparkles className="absolute right-4 top-4 w-10 h-10 text-white/80" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-bold text-2xl">Miniatures</h3>
                  <p className="text-white/85 text-sm">Figures & collectibles</p>
                </div>
              </div>
            </Link>
            <Link href="/products" className="group block">
              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--grad-secondary-from)] to-[var(--grad-secondary-to)]">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <Palette className="absolute right-4 top-4 w-10 h-10 text-white/80" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-bold text-2xl">Decor & Art</h3>
                  <p className="text-white/85 text-sm">Home & office style</p>
                </div>
              </div>
            </Link>
            <Link href="/products" className="group block">
              <div className=\"relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-red-600 to-rose-600\">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <Layers className="absolute right-4 top-4 w-10 h-10 text-white/80" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-bold text-2xl">Functional</h3>
                  <p className="text-white/85 text-sm">Tools & parts</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Story / Showcase Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-[var(--grad-primary-from)]/30 to-[var(--grad-primary-to)]/30 blur-3xl" />
          <div className=\"absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-rose-400/20 to-red-500/20 blur-3xl\" />
        </div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Made to Impress. Built to Last.</h2>
              <p className="text-white/80 mb-6">We obsess over layer lines, tolerances, and finish so your prints look and feel premiumwhether its a gift, display piece, or a functional part.</p>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" /><span>Quality checked by hand</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" /><span>Premium PLA / PETG / TPU options</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" /><span>Safe, secure packaging</span></li>
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/products">
                  <Button size="lg" className="gap-2">Shop Best Sellers <ArrowRight className="w-5 h-5" /></Button>
                </Link>
                <Link href=\"/about\" className=\"px-4 py-2 rounded-lg border border-white/30 text-white/90 hover:bg-white/10 inline-flex items-center justify-center\">Learn More</Link>
              </div>
            </div>
            <div className="relative">
              <div className="mx-auto h-72 w-72 sm:h-96 sm:w-96 rounded-3xl bg-gradient-to-tr from-[var(--grad-primary-from)] to-[var(--grad-primary-to)] opacity-90 shadow-2xl shadow-violet-500/20 ring-8 ring-white/5" />
              <div className=\"absolute -top-6 -right-6 h-40 w-40 rounded-full bg-gradient-to-tr from-rose-400/30 to-red-500/30 blur-2xl\" />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Picks */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Popular Picks</h2>
            <Link href="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No products yet.</p>
              <p className="text-gray-500">Check back soon for amazing 3D printed items!</p>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-gradient-to-tr from-[var(--grad-primary-from)]/30 to-[var(--grad-primary-to)]/30 blur-3xl" />
          <div className=\"absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-gradient-to-tr from-rose-400/20 to-red-500/20 blur-3xl\" />
        </div>
        <div className="container mx-auto px-4 py-16 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Print Your Vision?</h2>
          <p className="text-white/80 mb-8">Get a custom quote or browse all products.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button size="lg" className="gap-2">Get a Custom Quote <ArrowRight className="w-5 h-5" /></Button>
            </Link>
            <Link href=\"/products\" className=\"px-4 py-2 rounded-lg border border-white/30 text-white/90 hover:bg-white/10 inline-flex items-center justify-center\">Shop All</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
