import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // --- Staged rollout: redirect a percentage of homepage traffic to Soft theme ---
  const rolloutPercent = Number(process.env.NEXT_PUBLIC_SOFT_ROLLOUT_PERCENT ?? '0');
  const path = request.nextUrl.pathname;

  if (path === '/' && rolloutPercent > 0) {
    const cookieName = 'soft_rollout_v1';
    const existing = request.cookies.get(cookieName)?.value;

    // Decide stickiness and set cookie if absent
    let assigned = existing as 'on' | 'off' | undefined;
    if (!assigned) {
      const bucket = Math.floor(Math.random() * 100);
      assigned = bucket < rolloutPercent ? 'on' : 'off';
    }

    // If assigned "on", redirect to modern-home Soft theme
    if (assigned === 'on') {
      const url = request.nextUrl.clone();
      url.pathname = '/modern-home';
      url.searchParams.set('theme', 'soft');
      const redirect = NextResponse.redirect(url);
      redirect.cookies.set(cookieName, 'on', { path: '/', maxAge: 7 * 24 * 60 * 60 });
      return redirect;
    }

    // Persist "off" assignment and continue
    supabaseResponse.cookies.set(cookieName, 'off', { path: '/', maxAge: 7 * 24 * 60 * 60 });
  }

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Note: path is already defined above

  // Protected admin routes (excluding the public admin login page)
  if (path.startsWith('/admin') && path !== '/admin/login') {
    if (!user) {
      // Redirect to admin login if not authenticated
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('redirect', path);
      return NextResponse.redirect(url);
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      // Redirect non-admin users to home
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  // Protected user routes
  if (path.startsWith('/account')) {
    if (!user) {
      // Redirect to login if not authenticated
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('redirect', path);
      return NextResponse.redirect(url);
    }
  }

  // Redirect logged-in users away from login/register pages
  if ((path === '/login' || path === '/register') && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/account';
    return NextResponse.redirect(url);
  }

  // Redirect logged-in admins away from admin login
  if (path === '/admin/login' && user) {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role === 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/account/:path*',
    '/login',
    '/register',
    '/admin/login',
    '/',
  ],
};
