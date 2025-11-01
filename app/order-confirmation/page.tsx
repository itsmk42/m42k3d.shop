'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import { CheckCircle, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Order {
  id: string;
  user_name: string;
  user_email: string;
  user_phone?: string;
  total: number;
  payment_method?: string;
  status: string;
  created_at: string;
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');
  const method = searchParams.get('method');

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!orderId) {
      router.push('/');
      return;
    }
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error: any) {
      console.error('Error fetching order:', error);
      toast.error('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const generateUPILink = () => {
    if (!order) return '';
    const upiLink = `upi://pay?pa=sparklesphere@upi&pn=SparkleSphere&am=${order.total}&cu=INR&tn=Order%20${order.id.slice(0, 8)}`;
    return upiLink;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Order not found</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isUPI = order.payment_method === 'upi';
  const isCOD = order.payment_method === 'cod';
  const upiLink = generateUPILink();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your order</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b">
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-semibold text-gray-900">#{order.id.slice(0, 12)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Order Date</p>
              <p className="font-semibold text-gray-900">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Customer Name</p>
              <p className="font-semibold text-gray-900">{order.user_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold text-gray-900">{order.user_email}</p>
            </div>
          </div>

          {/* Order Total */}
          <div className="mb-6 pb-6 border-b">
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-700">Order Total:</span>
              <span className="text-3xl font-bold text-green-600">₹{order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method Section */}
          {isUPI && (
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-indigo-900 mb-4">📱 UPI Payment</h2>
              <p className="text-indigo-800 mb-4">
                Complete your payment using any UPI app (Google Pay, PhonePe, Paytm, etc.)
              </p>

              {/* UPI Link Display */}
              <div className="bg-white rounded-lg p-4 mb-4 border border-indigo-200">
                <p className="text-sm text-gray-600 mb-2">Payment Link:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-gray-100 p-3 rounded text-sm text-gray-800 break-all">
                    {upiLink}
                  </code>
                  <button
                    onClick={() => copyToClipboard(upiLink)}
                    className="flex-shrink-0 p-2 hover:bg-gray-200 rounded transition-colors"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* UPI Payment Button */}
              <a href={upiLink} className="block mb-4">
                <Button className="w-full" size="lg">
                  Open UPI App to Pay
                </Button>
              </a>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>⏱️ Important:</strong> Your order will be confirmed once payment is received. 
                  You'll receive a confirmation email shortly.
                </p>
              </div>
            </div>
          )}

          {isCOD && (
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-orange-900 mb-4">💰 Cash on Delivery</h2>
              <p className="text-orange-800 mb-4">
                Your order will be delivered to your address. Please have ₹{order.total.toFixed(2)} ready for payment.
              </p>

              <div className="bg-white rounded-lg p-4 border border-orange-200">
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Delivery Address:</strong></p>
                  <p className="text-gray-600">
                    {order.user_name}<br />
                    {order.user_phone && <>{order.user_phone}<br /></>}
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-green-800">
                  <strong>✓ Order Confirmed:</strong> Your order has been confirmed and will be processed shortly.
                </p>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">📧 What's Next?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ You'll receive an order confirmation email</li>
              <li>✓ Your order will be processed and shipped soon</li>
              <li>✓ You'll get tracking information via email</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Link href="/products">
            <Button variant="outline" size="lg">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

