'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice } from '@/utils/format';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useCheckoutStore } from '@/lib/store/checkout';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const checkoutStore = useCheckoutStore();

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement Stripe payment integration
      // For now, we'll just simulate a successful order

      toast.success('Order placed successfully!');
      clearCart();
      router.push('/');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to process order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    checkoutStore.setField(name as any, value);
  };

  // Prefill from store once
  useEffect(() => {
    if (!checkoutStore) return;
    if (checkoutStore.name || checkoutStore.address || checkoutStore.email) {
      setFormData((prev) => ({
        ...prev,
        name: checkoutStore.name || prev.name,
        email: checkoutStore.email || prev.email,
        address: checkoutStore.address || prev.address,
        city: checkoutStore.city || prev.city,
        postalCode: checkoutStore.postalCode || prev.postalCode,
        country: checkoutStore.country || prev.country,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      {/* Checkout Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <span className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">1</span>
            <span>Cart</span>
          </div>
          <span className="h-px w-10 bg-gray-300" />
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--grad-primary-from)] to-[var(--grad-primary-to)] text-white flex items-center justify-center font-semibold">2</span>
            <span className="font-medium">Shipping</span>
          </div>
          <span className="h-px w-10 bg-gray-300" />
          <div className="flex items-center gap-2 text-gray-500">
            <span className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">3</span>
            <span>Review</span>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="card p-6">
            <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>

            <div className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />

              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="123 Main St"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="New York"
                />

                <Input
                  label="Postal Code"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  placeholder="10001"
                />
              </div>

              <Input
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                placeholder="United States"
              />
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Payment integration is not yet configured.
                This is a demo checkout process.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                type="button"
                size="lg"
                className="w-full"
                onClick={() => router.push('/checkout/review')}
              >
                Continue to Review
              </Button>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </Button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="relative w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.images[0] || '/placeholder-product.jpg'}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-sm">{item.product.name}</p>
                    <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2 border-t">
                <span>Total</span>
                <span className="text-blue-600">{formatPrice(getTotal())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

