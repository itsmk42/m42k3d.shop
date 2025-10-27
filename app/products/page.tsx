import { supabaseAdmin } from '@/lib/supabase/server';
import ProductsPageClient from '@/components/products/ProductsPageClient';
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

async function getCategories(): Promise<string[]> {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('category')
    .neq('category', null);

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  // Get unique categories
  const categories = Array.from(new Set(data?.map((item) => item.category) || []));
  return categories.sort();
}

// Disable caching to always fetch fresh data
export const revalidate = 0;

export const metadata = {
  title: 'Products - SparkleSphere.store',
  description: 'Browse our collection of quality 3D printed items at SparkleSphere.store',
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return <ProductsPageClient initialProducts={products} categories={categories} />;
}

