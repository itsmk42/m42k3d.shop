import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import ProductCard from '@/components/products/ProductCard';
import Button from '@/components/ui/Button';
import { Product } from '@/types';
import { ArrowRight, Package, Truck, Shield, ShoppingBag, ImageIcon, KeyRound, Layers, Palette, Sparkles, CheckCircle } from 'lucide-react';

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
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--grad-primary-from)] to-[var(--grad-primary-to)] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6">Spark, Print, Shine.</h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90">
              Discover unique, custom-made 3D printed products crafted with precision and care.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/products">
                <Button size="lg" className="gap-2">
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about" className="px-4 py-2 rounded-lg border border-white/40 text-white/90 hover:bg-white/10 inline-flex items-center justify-center">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Choose Your Service</h2>
            <p className="text-xl text-gray-600">
              Explore our range of 3D printing services tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Option 1: Browse Our Designs - ACTIVE */}
            <Link href="/products" className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full border-2 border-transparent hover:border-blue-500">
                <div className="p-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <ShoppingBag className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Browse Our Designs</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Explore our collection of pre-made 3D printed items. From miniatures to home decor, find the perfect piece for you.
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                    Shop Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-800"></div>
              </div>
            </Link>

            {/* Option 2: Make Lithophane - COMING SOON */}
            <div className="relative group cursor-not-allowed">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full border-2 border-gray-200 opacity-75">
                <div className="p-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-400 rounded-2xl mb-6">
                    <ImageIcon className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">Make Lithophane</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Transform your favorite photos into stunning 3D lithophanes. Perfect for gifts and home decoration.
                  </p>
                  <div className="flex items-center text-gray-400 font-semibold gap-2">
                    Coming Soon
                  </div>
                </div>
                <div className="h-2 bg-gray-300"></div>
              </div>
              {/* Coming Soon Badge */}
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                Coming Soon
              </div>
            </div>

            {/* Option 3: Make Keychains & Fidgets - COMING SOON */}
            <div className="relative group cursor-not-allowed">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full border-2 border-gray-200 opacity-75">
                <div className="p-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-400 rounded-2xl mb-6">
                    <KeyRound className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">Keychains & Fidgets</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Create custom keychains and fidget toys. Personalize with names, logos, or unique designs.
                  </p>
                  <div className="flex items-center text-gray-400 font-semibold gap-2">
                    Coming Soon
                  </div>
                </div>
                <div className="h-2 bg-gray-300"></div>
              </div>
              {/* Coming Soon Badge */}
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                Coming Soon
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How 3D Printing Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How 3D Printing Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              3D printing, also known as additive manufacturing, creates physical objects layer by layer from digital designs.
              This revolutionary technology enables rapid prototyping, customization, and production of complex geometries that
              traditional manufacturing can't achieve.
            </p>
          </div>

          {/* Process Steps */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Step 1: Design */}
              <div className="relative">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <Palette className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Design</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Create or select a 3D model using CAD software or choose from our pre-designed collection
                  </p>
                </div>
                {/* Arrow for desktop */}
                <div className="hidden md:block absolute top-12 -right-4 text-blue-300">
                  <ArrowRight className="w-8 h-8" />
                </div>
              </div>

              {/* Step 2: Prepare */}
              <div className="relative">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <Layers className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Slice & Prepare</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Software slices the model into thin layers and generates printing instructions for optimal quality
                  </p>
                </div>
                <div className="hidden md:block absolute top-12 -right-4 text-blue-300">
                  <ArrowRight className="w-8 h-8" />
                </div>
              </div>

              {/* Step 3: Print */}
              <div className="relative">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <Package className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">3D Print</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Our printers build your object layer by layer with precision, using high-quality materials
                  </p>
                </div>
                <div className="hidden md:block absolute top-12 -right-4 text-blue-300">
                  <ArrowRight className="w-8 h-8" />
                </div>
              </div>

              {/* Step 4: Finish */}
              <div className="relative">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <Sparkles className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Finish & Ship</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Post-processing, quality check, and careful packaging before shipping to your door
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Materials & Applications Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Materials Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                Materials We Use
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">PLA (Polylactic Acid)</p>
                    <p className="text-sm text-gray-600">Eco-friendly, perfect for decorative items and prototypes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">ABS (Acrylonitrile Butadiene Styrene)</p>
                    <p className="text-sm text-gray-600">Durable and heat-resistant for functional parts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">PETG (Polyethylene Terephthalate Glycol)</p>
                    <p className="text-sm text-gray-600">Strong, flexible, and food-safe certified</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">TPU (Thermoplastic Polyurethane)</p>
                    <p className="text-sm text-gray-600">Flexible and rubber-like for special applications</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Applications Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                What We Can Create
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Miniatures & Figurines</p>
                    <p className="text-sm text-gray-600">Detailed models for gaming, collecting, or display</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Home Decor & Art</p>
                    <p className="text-sm text-gray-600">Unique decorative pieces and custom artwork</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Functional Parts & Tools</p>
                    <p className="text-sm text-gray-600">Replacement parts, organizers, and custom tools</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Prototypes & Concepts</p>
                    <p className="text-sm text-gray-600">Rapid prototyping for product development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" className="gap-2">
                Explore Our Products
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose M42K3D Shop</h2>
            <p className="text-lg text-gray-600">Quality, speed, and reliability in every print</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Made</h3>
              <p className="text-gray-600">
                Each item is carefully crafted to meet your specific needs
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                Quick and reliable delivery to your doorstep
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">
                Premium materials and attention to detail in every product
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">
                No featured products available yet.
              </p>
              <p className="text-gray-500">
                Check back soon for amazing 3D printed items!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Browse our collection and find the perfect 3D printed item for you
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-white !text-blue-600 hover:bg-gray-100 hover:!text-blue-700 font-semibold">
              Explore Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
