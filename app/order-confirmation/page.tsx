'use client';

import { Suspense } from 'react';
import OrderConfirmationContent from './order-confirmation-content';
import Loading from '@/components/ui/Loading';

// Loading fallback component
function OrderConfirmationFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 flex items-center justify-center">
      <Loading />
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<OrderConfirmationFallback />}>
      <OrderConfirmationContent />
    </Suspense>
  );
}

