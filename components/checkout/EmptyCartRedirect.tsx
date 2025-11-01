'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Component to handle empty cart redirects
 * This component is used to redirect users to the cart page when they try to access
 * checkout pages with an empty cart.
 * 
 * This component is necessary because React hooks must be called before any early returns.
 * By using this component, we can safely redirect without violating the Rules of Hooks.
 */
export function EmptyCartRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to cart page
    router.push('/cart');
  }, [router]);

  // Return null while redirecting
  return null;
}

