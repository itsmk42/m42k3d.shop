import { supabaseAdmin } from '@/lib/supabase/server';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/types';

async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}

// Disable caching to always fetch fresh data
export const revalidate = 0;

export const metadata = {
  title: 'Products - M42K3D Shop',
  description: 'Browse our collection of quality 3D printed items',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600 text-xl mb-4">
            No products available yet.
          </p>
          <p className="text-gray-500">
            Check back soon for amazing 3D printed items!
          </p>
        </div>
      )}
    </div>
  );
}

