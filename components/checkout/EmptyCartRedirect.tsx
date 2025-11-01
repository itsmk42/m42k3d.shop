'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Component to handle empty cart redirects
 *
 * This component is used to redirect users to the cart page when they try to access
 * checkout pages with an empty cart.
 *
 * Why this component exists:
 * - React hooks must be called before any early returns (Rules of Hooks)
 * - We can't call useRouter() and then return early in the parent component
 * - By using this component, we can safely redirect without violating React rules
 *
 * How it works:
 * 1. Parent component checks if cart is empty
 * 2. If empty, returns <EmptyCartRedirect /> instead of null
 * 3. This component calls useRouter() hook (satisfies Rules of Hooks)
 * 4. useEffect redirects to /cart after component mounts (client-side only)
 * 5. Returns null while redirecting (no visible content)
 *
 * Why it doesn't cause hydration errors:
 * - useRouter is called (hook count is consistent)
 * - Redirect happens in useEffect (after hydration completes)
 * - No server/client render mismatch
 */
export function EmptyCartRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to cart page after component mounts
    // This happens client-side only, after hydration completes
    router.push('/cart');
  }, [router]);

  // Return null while redirecting
  // This is safe because the redirect happens immediately
  return null;
}

