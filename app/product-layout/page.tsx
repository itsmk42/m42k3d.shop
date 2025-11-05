import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/utils/format';
import { Truck, Shield, RotateCcw } from 'lucide-react';
import { MiniatureDecorIcon, ArtIcon, FunctionalIcon, PersonalisedKeychainIcon, PhotoBoxIcon } from '@/components/home/CategoryIcons';

export const revalidate = 0;

export default function ProductLayoutDemo() {
  const product = {
    name: 'Aurora Lamp – Ripple Glow',
    description:
      'A premium 3D-printed lamp with a ripple pattern and warm ambient glow. Built with durable materials and a smooth matte finish.',
    price: 79_00, // in minor units for formatPrice helper
    image: '/products/featured-product.png',
  };

  return (
    <div className="theme-red">
      {/* Featured Item */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-[var(--grad-primary-from)]/30 to-[var(--grad-primary-to)]/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-rose-400/20 to-red-500/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-12 md:py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="relative mx-auto h-72 w-72 sm:h-96 sm:w-96 rounded-3xl overflow-hidden ring-8 ring-red-500/40 shadow-2xl shadow-red-500/20">
              <Image
                src={product.image}
                alt={`${product.name} product image`}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Details */}
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">{product.name}</h1>
              <p className="text-white/85 mb-6 max-w-prose">{product.description}</p>
              <p className="text-red-400 text-2xl font-bold mb-6">{formatPrice(product.price)}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-2">Add to Cart</Button>
                <Link href="/products" className="px-4 py-2 rounded-lg border border-white/30 text-white/90 hover:bg-white/10 inline-flex items-center justify-center">View More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur p-4 flex items-center gap-3">
              <Truck className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm font-semibold text-white">Fast Shipping</p>
                <p className="text-xs text-gray-400">2–5 business days</p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur p-4 flex items-center gap-3">
              <Shield className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm font-semibold text-white">Secure Payments</p>
                <p className="text-xs text-gray-400">Visa · MasterCard · Stripe</p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur p-4 flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm font-semibold text-white">Money-back Guarantee</p>
                <p className="text-xs text-gray-400">30-day returns policy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white">Shop by Category</h2>
            <p className="text-gray-400">Browse favourites and best-sellers</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Miniatures */}
            <Link href="/products" className="group block">
              <div className="relative h-32 sm:h-48 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-2">
                  <div className="mb-1 transform group-hover:scale-110 transition-transform duration-300">
                    <MiniatureDecorIcon className="w-12 h-12 sm:w-20 sm:h-20 text-white/95" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-white font-bold text-base sm:text-lg">Miniatures</h3>
                    <p className="text-white/90 text-xs">Figures & collectibles</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Decor & Art */}
            <Link href="/products" className="group block">
              <div className="relative h-32 sm:h-48 rounded-xl overflow-hidden bg-gradient-to-br from-violet-500 to-violet-700 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-2">
                  <div className="mb-1 transform group-hover:scale-110 transition-transform duration-300">
                    <ArtIcon className="w-12 h-12 sm:w-20 sm:h-20 text-white/95" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-white font-bold text-base sm:text-lg">Decor & Art</h3>
                    <p className="text-white/90 text-xs">Home & office style</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Keychains */}
            <Link href="/products" className="group block">
              <div className="relative h-32 sm:h-48 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-700 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-2">
                  <div className="mb-1 transform group-hover:scale-110 transition-transform duration-300">
                    <PersonalisedKeychainIcon className="w-12 h-12 sm:w-20 sm:h-20 text-white/95" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-white font-bold text-base sm:text-lg">Keychains</h3>
                    <p className="text-white/90 text-xs">Personalised gifts</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Photo Box */}
            <Link href="/products" className="group block">
              <div className="relative h-32 sm:h-48 rounded-xl overflow-hidden bg-gradient-to-br from-amber-500 to-amber-700 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-2">
                  <div className="mb-1 transform group-hover:scale-110 transition-transform duration-300">
                    <PhotoBoxIcon className="w-12 h-12 sm:w-20 sm:h-20 text-white/95" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-white font-bold text-base sm:text-lg">Photo Box</h3>
                    <p className="text-white/90 text-xs">Memory storage</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Functional */}
            <Link href="/products" className="group block">
              <div className="relative h-32 sm:h-48 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500 to-cyan-700 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-2">
                  <div className="mb-1 transform group-hover:scale-110 transition-transform duration-300">
                    <FunctionalIcon className="w-12 h-12 sm:w-20 sm:h-20 text-white/95" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-white font-bold text-base sm:text-lg">Functional</h3>
                    <p className="text-white/90 text-xs">Tools & parts</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

