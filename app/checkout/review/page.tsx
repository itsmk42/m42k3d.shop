"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/lib/store/cart";
import { useCheckoutStore } from "@/lib/store/checkout";
import { formatPrice } from "@/utils/format";
import toast from "react-hot-toast";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { EmptyCartRedirect } from "@/components/checkout/EmptyCartRedirect";

export default function CheckoutReviewPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const checkout = useCheckoutStore();
  const [loading, setLoading] = useState(false);

  // ✅ FIX: Move early return after all hooks are called
  // This prevents React Error #310: "Rendered more hooks than expected"
  if (items.length === 0) {
    return <EmptyCartRedirect />;
  }

  const placeOrder = async () => {
    setLoading(true);
    try {
      // Prepare order items
      const orderItems = items.map((item) => ({
        product_id: item.product.id,
        product_name: item.product.name,
        product_price: item.product.price,
        product_image: item.product.images[0] || "/placeholder-product.jpg",
        quantity: item.quantity,
      }));

      // Determine order status based on payment method
      let orderStatus = 'pending';
      if (checkout.paymentMethod === 'cod') {
        orderStatus = 'cod-pending';
      } else if (checkout.paymentMethod === 'upi') {
        orderStatus = 'upi-pending';
      }

      // Create order in database
      const { data: order, error } = await supabase
        .from('orders')
        .insert([
          {
            user_email: checkout.email,
            user_name: checkout.name,
            user_phone: checkout.phone,
            user_address: checkout.address,
            user_city: checkout.city,
            user_postal_code: checkout.postalCode,
            user_country: checkout.country,
            items: orderItems,
            total: getTotal(),
            status: orderStatus,
            payment_method: checkout.paymentMethod,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      toast.success("Order placed successfully!");
      clearCart();
      checkout.reset();

      // Redirect based on payment method
      if (checkout.paymentMethod === 'upi') {
        router.push(`/order-confirmation?orderId=${order.id}&method=upi`);
      } else if (checkout.paymentMethod === 'cod') {
        router.push(`/order-confirmation?orderId=${order.id}&method=cod`);
      } else {
        router.push(`/order-confirmation?orderId=${order.id}`);
      }
    } catch (e: any) {
      console.error('Order error:', e);
      toast.error(e.message || "Failed to process order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Review your order</h1>

      {/* Checkout Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <span className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">1</span>
            <span>Cart</span>
          </div>
          <span className="h-px w-10 bg-gray-300" />
          <div className="flex items-center gap-2 text-gray-500">
            <span className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">2</span>
            <span>Shipping</span>
          </div>
          <span className="h-px w-10 bg-gray-300" />
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--grad-primary-from)] to-[var(--grad-primary-to)] text-white flex items-center justify-center font-semibold">3</span>
            <span className="font-medium">Review</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Shipping + Payment */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Shipping details</h2>
              <Link href="/checkout" className="btn-secondary">
                Edit info
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{checkout.name || "—"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{checkout.email || "—"}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{checkout.address || "—"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="font-medium">{checkout.city || "—"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Postal Code</p>
                <p className="font-medium">{checkout.postalCode || "—"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Country</p>
                <p className="font-medium">{checkout.country || "—"}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-3">
              {/* UPI Payment Option */}
              <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors"
                style={{
                  borderColor: checkout.paymentMethod === 'upi' ? '#3b82f6' : '#e5e7eb',
                  backgroundColor: checkout.paymentMethod === 'upi' ? '#eff6ff' : '#f9fafb',
                }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={checkout.paymentMethod === 'upi'}
                  onChange={(e) => checkout.setPaymentMethod(e.target.value as 'upi' | 'cod' | 'stripe')}
                  className="w-4 h-4"
                />
                <div className="ml-3 flex-1">
                  <p className="font-semibold text-gray-900">UPI Payment</p>
                  <p className="text-sm text-gray-600">Pay using UPI (Google Pay, PhonePe, Paytm)</p>
                </div>
              </label>

              {/* Cash on Delivery Option */}
              <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors"
                style={{
                  borderColor: checkout.paymentMethod === 'cod' ? '#3b82f6' : '#e5e7eb',
                  backgroundColor: checkout.paymentMethod === 'cod' ? '#eff6ff' : '#f9fafb',
                }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={checkout.paymentMethod === 'cod'}
                  onChange={(e) => checkout.setPaymentMethod(e.target.value as 'upi' | 'cod' | 'stripe')}
                  className="w-4 h-4"
                />
                <div className="ml-3 flex-1">
                  <p className="font-semibold text-gray-900">Cash on Delivery</p>
                  <p className="text-sm text-gray-600">Pay when your order arrives</p>
                </div>
              </label>
            </div>

            {/* Payment Method Info */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
              {checkout.paymentMethod === 'upi' && (
                <p className="text-sm">
                  <strong>UPI Payment:</strong> You'll receive a payment link after placing the order. Complete payment to confirm your order.
                </p>
              )}
              {checkout.paymentMethod === 'cod' && (
                <p className="text-sm">
                  <strong>Cash on Delivery:</strong> Pay ₹{formatPrice(getTotal())} when your order arrives at your doorstep.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/checkout" className="btn-secondary justify-center">
              Back to Shipping
            </Link>
            <Button
              className="flex-1 justify-center"
              size="lg"
              onClick={placeOrder}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
        </div>

        {/* Right: Order summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="relative w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.images[0] || "/placeholder-product.jpg"}
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

