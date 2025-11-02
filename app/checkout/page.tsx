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
import { EmptyCartRedirect } from '@/components/checkout/EmptyCartRedirect';
import Loading from '@/components/ui/Loading';
import { getLocationFromPinCode, isValidPinCode, isValidIndianPhone } from '@/lib/utils/pincode';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart, _hasHydrated: cartHydrated } = useCartStore();
  const checkoutStore = useCheckoutStore();
  const [loading, setLoading] = useState(false);
  const [pinCodeError, setPinCodeError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    country: 'India',
  });

  // ✅ FIX: Wait for BOTH stores to hydrate before checking cart
  // This prevents hydration mismatch by ensuring server and client render the same content
  // The cart store's _hasHydrated flag is set by onRehydrateStorage callback
  const isHydrated = cartHydrated && checkoutStore._hasHydrated;

  // ✅ FIX: Show loading while stores are hydrating
  // This is safe because suppressHydrationWarning tells React to ignore the mismatch
  if (!isHydrated) {
    return (
      <div suppressHydrationWarning>
        <Loading />
      </div>
    );
  }

  // ✅ FIX: Only check cart items AFTER hydration completes
  // This prevents hydration mismatch because server and client will have same data
  if (items.length === 0) {
    return <EmptyCartRedirect />;
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

    // Handle PIN code with auto-fill
    if (name === 'pinCode') {
      const cleanValue = value.replace(/\D/g, '').slice(0, 6);
      setFormData((prev) => ({ ...prev, [name]: cleanValue }));
      checkoutStore.setField(name as any, cleanValue);

      // Auto-fill city and state when PIN code is complete
      if (cleanValue.length === 6) {
        const location = getLocationFromPinCode(cleanValue);
        if (location) {
          setFormData((prev) => ({
            ...prev,
            city: location.city,
            state: location.state,
          }));
          checkoutStore.setField('city', location.city);
          checkoutStore.setField('state', location.state);
          setPinCodeError('');
        } else {
          setPinCodeError('PIN code not found in our database. Please enter manually.');
        }
      }
      return;
    }

    // Handle phone number validation
    if (name === 'phone') {
      const cleanValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: cleanValue }));
      checkoutStore.setField(name as any, cleanValue);

      if (cleanValue.length === 10 && !isValidIndianPhone(cleanValue)) {
        setPhoneError('Please enter a valid Indian mobile number (starting with 6-9)');
      } else if (cleanValue.length === 10) {
        setPhoneError('');
      }
      return;
    }

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
        phone: checkoutStore.phone || prev.phone,
        address: checkoutStore.address || prev.address,
        city: checkoutStore.city || prev.city,
        state: checkoutStore.state || prev.state,
        pinCode: checkoutStore.pinCode || prev.pinCode,
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
                label="Full Name *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />

              <Input
                label="Email Address *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />

              <div>
                <Input
                  label="Phone Number (10 digits) *"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="9876543210"
                  maxLength={10}
                />
                {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
              </div>

              <Input
                label="House/Flat No. & Building Name *"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Flat 101, ABC Building"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="PIN Code (6 digits) *"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    required
                    placeholder="110001"
                    maxLength={6}
                  />
                  {pinCodeError && <p className="text-yellow-600 text-sm mt-1">{pinCodeError}</p>}
                </div>

                <Input
                  label="City *"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="New Delhi"
                  readOnly={formData.pinCode.length === 6}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="State *"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  placeholder="Delhi"
                  readOnly={formData.pinCode.length === 6}
                />

                <Input
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  disabled
                  placeholder="India"
                />
              </div>
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

