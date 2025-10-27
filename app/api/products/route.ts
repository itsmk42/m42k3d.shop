import { supabaseAdmin } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sortBy = searchParams.get('sortBy') || 'newest';
    const categories = searchParams.getAll('categories');
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || 'Infinity');
    const inStock = searchParams.get('inStock') === 'true';
    const featured = searchParams.get('featured') === 'true';

    let query = supabaseAdmin.from('products').select('*');

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
      console.error('Error fetching products:', error);
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

