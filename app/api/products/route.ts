import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Preview safeguard: if Supabase env is missing, provide a graceful fallback
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceKey) {
      console.warn('[api/products] Supabase env missing; returning empty list in preview.');
      return NextResponse.json({ products: [], total: 0 }, { status: 200 });
    }

    const searchParams = request.nextUrl.searchParams;
    const sortBy = searchParams.get('sortBy') || 'newest';
    const categories = searchParams.getAll('categories');
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || 'Infinity');
    const inStock = searchParams.get('inStock') === 'true';
    const featured = searchParams.get('featured') === 'true';

    const admin = createSupabaseClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    let query = admin.from('products').select('*');

    // Apply filters
    if (categories.length > 0) {
      query = query.in('category', categories);
    }

    if (minPrice > 0 || maxPrice !== Infinity) {
      query = query.gte('price', minPrice);
      if (maxPrice !== Infinity) {
        query = query.lte('price', maxPrice);
      }
    }

    if (inStock) {
      query = query.gt('stock', 0);
    }

    if (featured) {
      query = query.eq('featured', true);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        query = query.order('price', { ascending: true });
        break;
      case 'price-high':
        query = query.order('price', { ascending: false });
        break;
      case 'name-asc':
        query = query.order('name', { ascending: true });
        break;
      case 'name-desc':
        query = query.order('name', { ascending: false });
        break;
      case 'featured':
        query = query.order('featured', { ascending: false }).order('created_at', { ascending: false });
        break;
      case 'newest':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    const { data, error } = await query;

    if (error) {
      const isFetchFailed = typeof error?.message === 'string' && error.message.includes('fetch failed');
      console.error('Error fetching products:', error);
      if (isFetchFailed && process.env.NODE_ENV !== 'production') {
        console.warn('[api/products] Supabase fetch failed in preview; returning empty list.');
        return NextResponse.json({ products: [], total: 0 }, { status: 200 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ products: data || [], total: data?.length || 0 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
