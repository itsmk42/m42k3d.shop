import Link from 'next/link';
import Image from 'next/image';
import { supabaseAdmin } from '@/lib/supabase/server';
import Button from '@/components/ui/Button';
import HeroQuote from '@/components/home/HeroQuote';
import FeaturedProductVideo from '@/components/home/FeaturedProductVideo';
import CompactFeaturedItems from '@/components/home/CompactFeaturedItems';
import CategoriesSection from '@/components/home/CategoriesSection';
import { Product } from '@/types';
import { ArrowRight, Package, Truck, Shield, ShoppingBag, ImageIcon, KeyRound, Layers, Palette, Sparkles, CheckCircle } from 'lucide-react';
import { formatPrice } from '@/utils/format';

async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(6);

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  return data || [];
  }

async function getSpotlightProduct(): Promise<Product | null> {
  const { data, error } = await supabaseAdmin
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

// Disable caching to always fetch fresh data
export const revalidate = 0;



export default async function Home() {
  const [spotlightProduct, featuredProducts] = await Promise.all([
    getSpotlightProduct(),
    getFeaturedProducts(),
  ]);

  // Array of featured product video URLs for sequential playback
  // Videos will play one after another in a continuous loop
  // NOTE: Update these paths to match your actual video files
  const featuredProductVideos = [
    '/products/featured-product-1.mp4',
    '/products/featured-product-2.mp4',
  ];

  const spotlightImage = (spotlightProduct?.images && spotlightProduct.images[0]) || '/products/featured-product.png';


  return (
    <div className="theme-red">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        {/* Banner background video or image */}
        <div className="absolute inset-0 -z-10">
          {process.env.NEXT_PUBLIC_BANNER_VIDEO_URL ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/banners/lamp-banner.png"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={process.env.NEXT_PUBLIC_BANNER_VIDEO_URL} type="video/mp4" />
            </video>
          ) : (
            <Image
              src="/banners/lamp-banner.png"
              alt="Ambient 3D-printed lamps in a modern room"
              fill
              priority
              className="object-cover"
            />
          )}
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="container mx-auto px-4 py-12 md:py-24 relative">
          {/* Rotating Quote Section - Mobile Only */}
          <div className="md:hidden mb-4">
            <HeroQuote />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="md:pt-0 pt-0">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur text-sm mb-5">
                <Sparkles className="w-4 h-4 text-yellow-300" /> Spotlight
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 md:mt-0 -mt-2">
                {spotlightProduct?.name ?? 'Featured Product'}
              </h1>
              {spotlightProduct && (
                <p className="text-white/90 font-semibold mb-6">Starting at {formatPrice(spotlightProduct.price)}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-4 md:mt-6">
                <Link href={spotlightProduct ? `/products/${spotlightProduct.id}` : '/products'}>
                  <Button size="lg" className="gap-2 transition-colors">
                    View Details
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/products" className="px-4 py-2 rounded-lg border border-white/30 text-white/90 hover:bg-white/20 transition-colors inline-flex items-center justify-center">
                  Shop All
                </Link>
              </div>
            </div>
            <div className="relative">
              {/* Featured Product Video - Sequential Playback */}
              <FeaturedProductVideo
                videoUrls={featuredProductVideos}
                posterImage={spotlightImage}
                className="mx-auto h-72 w-72 sm:h-96 sm:w-96 rounded-3xl ring-8 ring-red-500/40 shadow-2xl shadow-red-500/20 object-cover"
              />

              {/* Fallback to static image if no videos available */}
              {featuredProductVideos.length === 0 && (
                <div className="relative mx-auto h-72 w-72 sm:h-96 sm:w-96 rounded-3xl overflow-hidden ring-8 ring-red-500/40 shadow-2xl shadow-red-500/20">
                  <Image
                    src={spotlightImage}
                    alt={spotlightProduct?.name || 'Featured product'}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Decorative gradient background effect */}
              <div className="absolute inset-0 -z-10 m-auto h-[28rem] w-[28rem] sm:h-[32rem] sm:w-[32rem] rounded-full bg-gradient-to-tr from-rose-400/20 to-red-500/20 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items - Compact Visual Layout (moved directly below Hero) */}
      {featuredProducts.length > 0 ? (
        <CompactFeaturedItems products={featuredProducts} />
      ) : (
        <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400 text-lg mb-4">No products yet.</p>
            <p className="text-gray-500">Check back soon for amazing 3D printed items!</p>
          </div>
        </section>
      )}

      {/* Highlights Strip */}
      <section className="py-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur p-4 flex items-center gap-3 hover:border-red-500/50 transition-colors">
              <Truck className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm font-semibold text-white">Fast Shipping</p>
                <p className="text-xs text-gray-400">2–5 business days</p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur p-4 flex items-center gap-3 hover:border-red-500/50 transition-colors">
              <Shield className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm font-semibold text-white">Secure Payments</p>
                <p className="text-xs text-gray-400">Trusted checkout</p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur p-4 flex items-center gap-3 hover:border-red-500/50 transition-colors">
              <Package className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm font-semibold text-white">Quality Materials</p>
                <p className="text-xs text-gray-400">Premium filaments</p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur p-4 flex items-center gap-3 hover:border-red-500/50 transition-colors">
              <Sparkles className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm font-semibold text-white">Custom Orders</p>
                <p className="text-xs text-gray-400">Made just for you</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <CategoriesSection />

      {/* Story / Showcase Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-[var(--grad-primary-from)]/30 to-[var(--grad-primary-to)]/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-rose-400/20 to-red-500/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-20 relative">
          <div>
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
                <Link href="/about" className="px-4 py-2 rounded-lg border border-white/30 text-white/90 hover:bg-white/10 inline-flex items-center justify-center">Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-gradient-to-tr from-[var(--grad-primary-from)]/30 to-[var(--grad-primary-to)]/30 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-gradient-to-tr from-rose-400/20 to-red-500/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-16 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Print Your Vision?</h2>
          <p className="text-white/80 mb-8">Get a custom quote or browse all products.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button size="lg" className="gap-2">Get a Custom Quote <ArrowRight className="w-5 h-5" /></Button>
            </Link>
            <Link href="/products" className="px-4 py-2 rounded-lg border border-white/30 text-white/90 hover:bg-white/10 inline-flex items-center justify-center">Shop All</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
