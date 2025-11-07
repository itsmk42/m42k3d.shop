import Link from 'next/link';
import Image from 'next/image';
import '@/styles/home-mockups.css';
import Button from '@/components/ui/Button';
import CompactFeaturedItems from '@/components/home/CompactFeaturedItems';
import CategoriesSection from '@/components/home/CategoriesSection';
import { supabaseAdmin } from '@/lib/supabase/server';
import { Product } from '@/types';
import { ArrowRight, CheckCircle } from 'lucide-react';
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

export const revalidate = 0;

export default async function HomePreview({
  searchParams,
}: {
  searchParams?: { scheme?: string; theme?: string };
}) {
  const [spotlightProduct, featuredProducts] = await Promise.all([
    getSpotlightProduct(),
    getFeaturedProducts(),
  ]);

  const scheme = (searchParams?.scheme as 'quartz' | 'midnight' | 'forest') || 'quartz';
  const theme = (searchParams?.theme as 'light' | 'dark') || 'light';

  const spotlightImage = spotlightProduct?.images?.[0] ?? null;

  return (
    <main className="mock-root" data-scheme={scheme} data-theme={theme}>
      <div className="mock-container">
        {/* Hero Section */}
        <section className="mock-hero">
          <div className="mock-hero-content">
            <div className="mock-kicker">Spotlight</div>
            <h1 className="mock-hero-title">
              {spotlightProduct?.name ?? 'Featured Product'}
            </h1>
            {spotlightProduct && (
              <p className="mock-hero-sub">Starting at {formatPrice(spotlightProduct.price)}</p>
            )}
            <div className="mock-cta-row">
              <Link href={spotlightProduct ? `/products/${spotlightProduct.id}` : '/products'} className="mock-cta-primary">
                View Details <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/products" className="mock-cta-secondary">
                Shop All
              </Link>
            </div>
          </div>
          {spotlightProduct && spotlightImage && (
            <div className="mock-hero-media" aria-hidden>
              <div className="mock-hero-media-inner">
                <Image
                  src={spotlightImage}
                  alt={spotlightProduct?.name || 'Featured product'}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 36vw"
                  priority
                />
              </div>
            </div>
          )}
        </section>

        {/* Feature Highlights */}
        <section className="mock-highlights" aria-label="Shop highlights">
          <div className="mock-highlights-grid">
            {[
              { title: 'Fast Shipping', note: '2–5 business days' },
              { title: 'Secure Payments', note: 'Trusted checkout' },
              { title: 'Quality Materials', note: 'Premium filaments' },
              { title: 'Custom Orders', note: 'Made just for you' },
            ].map((item) => (
              <div key={item.title} className="mock-highlight-card">
                <CheckCircle className="w-4 h-4 text-[var(--primary)]" />
                <div>
                  <p className="mock-highlight-title">{item.title}</p>
                  <p className="mock-highlight-note">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Items */}
        {featuredProducts.length > 0 ? (
          <CompactFeaturedItems products={featuredProducts} />
        ) : (
          <section className="mock-section">
            <div className="mock-section-inner">
              <p className="mock-muted">No products yet.</p>
              <p className="mock-muted">Check back soon for amazing 3D printed items!</p>
            </div>
          </section>
        )}

        {/* Info / Story */}
        <section className="mock-info" aria-labelledby="info-title">
          <div className="mock-info-inner">
            <h2 id="info-title" className="mock-info-title">Made to Impress. Built to Last.</h2>
            <p className="mock-info-lead">We obsess over layer lines, tolerances, and finish so your prints look and feel premium — whether it’s a gift, display piece, or a functional part.</p>
            <ul className="mock-info-list">
              <li className="mock-info-item"><CheckCircle className="w-5 h-5 text-emerald-500" /><span>Quality checked by hand</span></li>
              <li className="mock-info-item"><CheckCircle className="w-5 h-5 text-emerald-500" /><span>Premium PLA / PETG / TPU options</span></li>
              <li className="mock-info-item"><CheckCircle className="w-5 h-5 text-emerald-500" /><span>Safe, secure packaging</span></li>
            </ul>
            <div className="mock-cta-row">
              <Link href="/products" className="mock-cta-primary">
                Shop Best Sellers <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/about" className="mock-cta-secondary">Learn More</Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <CategoriesSection />

        {/* Final CTA */}
        <section className="mock-final" aria-label="Get started">
          <div className="mock-final-inner">
            <h2 className="mock-final-title">Ready to Print Your Vision?</h2>
            <p className="mock-final-lead">Get a custom quote or browse all products.</p>
            <div className="mock-cta-row center">
              <Link href="/contact" className="mock-cta-primary">
                Get a Custom Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/products" className="mock-cta-secondary">Shop All</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
