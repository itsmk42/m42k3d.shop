"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/lib/store/cart";
import { useCheckoutStore } from "@/lib/store/checkout";
import { formatPrice } from "@/utils/format";
import toast from "react-hot-toast";

export default function CheckoutReviewPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const checkout = useCheckoutStore();

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const placeOrder = async () => {
    try {
      toast.success("Order placed successfully!");
      clearCart();
      router.push("/");
      checkout.reset();
    } catch (e) {
      toast.error("Failed to process order. Please try again.");
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
            <h2 className="text-2xl font-bold mb-4">Payment</h2>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
              <p className="text-sm">
                <strong>Note:</strong> Payment integration is not yet configured. This is a demo checkout process.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/checkout" className="btn-secondary justify-center">
              Back to Shipping
            </Link>
            <Button className="flex-1 justify-center" size="lg" onClick={placeOrder}>
              Place Order
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

