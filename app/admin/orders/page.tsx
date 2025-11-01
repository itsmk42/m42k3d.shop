'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import { ArrowLeft, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

interface Order {
  id: string;
  user_email: string;
  user_name: string;
  user_phone?: string;
  user_address: string;
  user_city: string;
  user_postal_code: string;
  user_country: string;
  items: any[];
  total: number;
  status: string;
  payment_method?: string;
  created_at: string;
  updated_at: string;
}

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    fetchOrders();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/staff-portal/login');
    }
  };

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch orders');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingOrderId(orderId);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success('Order status updated');
    } catch (error: any) {
      toast.error('Failed to update order status');
      console.error(error);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter((order) => order.status === statusFilter);

  const statusColors: { [key: string]: string } = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    'cod-pending': 'bg-orange-100 text-orange-800',
    'upi-pending': 'bg-indigo-100 text-indigo-800',
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-4xl font-bold">Manage Orders</h1>
        </div>

        {/* Status Filter */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cod-pending', 'upi-pending', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                statusFilter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {status === 'cod-pending' ? 'COD Pending' : status === 'upi-pending' ? 'UPI Pending' : status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== 'all' && ` (${orders.filter((o) => o.status === status).length})`}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500 text-lg">No orders found</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <button
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-semibold text-gray-900">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-gray-600">{order.user_name} • {order.user_email}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 flex gap-6 text-sm text-gray-600">
                      <span>Total: ₹{order.total.toFixed(2)}</span>
                      <span>Items: {order.items?.length || 0}</span>
                      <span>{new Date(order.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {expandedOrder === order.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {/* Order Details */}
                {expandedOrder === order.id && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-4">
                    {/* Customer Info */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <p className="font-medium">Name:</p>
                          <p>{order.user_name}</p>
                        </div>
                        <div>
                          <p className="font-medium">Email:</p>
                          <p>{order.user_email}</p>
                        </div>
                        {order.user_phone && (
                          <div>
                            <p className="font-medium">Phone:</p>
                            <p>{order.user_phone}</p>
                          </div>
                        )}
                        <div>
                          <p className="font-medium">Address:</p>
                          <p>{order.user_address}</p>
                        </div>
                        <div>
                          <p className="font-medium">City:</p>
                          <p>{order.user_city}</p>
                        </div>
                        <div>
                          <p className="font-medium">Postal Code:</p>
                          <p>{order.user_postal_code}</p>
                        </div>
                        <div>
                          <p className="font-medium">Country:</p>
                          <p>{order.user_country}</p>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Order Items</h3>
                      <div className="space-y-2">
                        {order.items?.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between text-sm text-gray-700 bg-white p-2 rounded">
                            <span>{item.name} x {item.quantity}</span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Total */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between font-semibold text-gray-900 mb-3">
                        <span>Total:</span>
                        <span>₹{order.total.toFixed(2)}</span>
                      </div>
                      {order.payment_method && (
                        <div className="flex justify-between text-sm text-gray-700">
                          <span className="font-medium">Payment Method:</span>
                          <span className="capitalize">
                            {order.payment_method === 'cod' ? 'Cash on Delivery' : order.payment_method === 'upi' ? 'UPI' : 'Stripe'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Status Update */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Update Status</h3>
                      <div className="flex gap-2 flex-wrap">
                        {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                          <Button
                            key={status}
                            onClick={() => updateOrderStatus(order.id, status)}
                            disabled={updatingOrderId === order.id || order.status === status}
                            variant={order.status === status ? 'primary' : 'outline'}
                            size="sm"
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Payment Status Actions */}
                    {(order.status === 'cod-pending' || order.status === 'upi-pending') && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-800 mb-2">
                          {order.status === 'cod-pending'
                            ? '💰 Awaiting cash payment on delivery'
                            : '📱 Awaiting UPI payment confirmation'}
                        </p>
                        <Button
                          onClick={() => updateOrderStatus(order.id, 'processing')}
                          disabled={updatingOrderId === order.id}
                          size="sm"
                          className="w-full"
                        >
                          {order.status === 'cod-pending' ? 'Mark as Processing' : 'Confirm Payment'}
                        </Button>
                      </div>
                    )}

                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

