'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import { ArrowLeft, ChevronDown, ChevronUp, Eye, Search, CheckSquare, Square } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendOrderNotificationEmail } from '@/lib/email/service';
import Image from 'next/image';

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
  tracking_number?: string;
  created_at: string;
  updated_at: string;
}

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [trackingNumbers, setTrackingNumbers] = useState<{ [key: string]: string }>({});
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<{ [orderId: string]: number[] }>({});
  const [itemDetails, setItemDetails] = useState<{ [key: string]: { description?: string; images?: string[]; price?: number; name?: string } }>({});

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
      const updateData: any = {
        status: newStatus,
        updated_at: new Date().toISOString()
      };

      // Add tracking number if updating to 'shipped' status
      if (newStatus === 'shipped' && trackingNumbers[orderId]) {
        updateData.tracking_number = trackingNumbers[orderId];
      }

      const { error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId);

      if (error) {
        console.error('Update error details:', error);
        throw error;
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: newStatus,
                tracking_number: updateData.tracking_number || order.tracking_number
              }
            : order
        )
      );

      // Clear tracking number input after successful update
      if (newStatus === 'shipped') {
        setTrackingNumbers((prev) => {
          const updated = { ...prev };
          delete updated[orderId];
          return updated;
        });
      }

      // Send email notification
      const order = orders.find(o => o.id === orderId);
      if (order) {
        try {
          await sendOrderNotificationEmail({
            orderId: order.id,
            customerName: order.user_name,
            customerEmail: order.user_email,
            orderTotal: order.total,
            orderItems: order.items.map((item: any) => ({
              name: item.product_name || item.name,
              quantity: item.quantity,
              price: item.product_price || item.price,
            })),
            orderStatus: newStatus,
            paymentMethod: order.payment_method,
            trackingNumber: updateData.tracking_number,
            orderDate: order.created_at,
          });
          toast.success(`Order status updated to ${newStatus} and email sent`);
        } catch (emailError) {
          console.error('Email sending error:', emailError);
          toast.success(`Order status updated to ${newStatus} (email failed)`);
        }
      } else {
        toast.success(`Order status updated to ${newStatus}`);
      }
    } catch (error: any) {
      console.error('Full error:', error);
      const errorMessage = error?.message || 'Failed to update order status';

      // Provide more specific error messages
      if (errorMessage.includes('row-level security')) {
        toast.error('Permission denied: Check if you have admin role');
      } else if (errorMessage.includes('permission denied')) {
        toast.error('Permission denied: Contact administrator');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter((order) => order.status === statusFilter);

  const filteredByPayment = paymentFilter === 'all'
    ? filteredOrders
    : filteredOrders.filter((o) => (o.payment_method || '').toLowerCase() === paymentFilter);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const fullyFiltered = normalizedQuery
    ? filteredByPayment.filter((o) => {
        const id = o.id?.toLowerCase() || '';
        const name = o.user_name?.toLowerCase() || '';
        const email = o.user_email?.toLowerCase() || '';
        const phone = o.user_phone?.toLowerCase() || '';
        return (
          id.includes(normalizedQuery) ||
          name.includes(normalizedQuery) ||
          email.includes(normalizedQuery) ||
          phone.includes(normalizedQuery)
        );
      })
    : filteredByPayment;

  const isSelected = (orderId: string) => selectedOrders.includes(orderId);
  const toggleSelect = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };
  const selectAllVisible = () => setSelectedOrders(fullyFiltered.map((o) => o.id));
  const clearSelection = () => setSelectedOrders([]);

  const toggleItemExpanded = (orderId: string, index: number) => {
    setExpandedItems((prev) => {
      const setForOrder = new Set(prev[orderId] || []);
      if (setForOrder.has(index)) {
        setForOrder.delete(index);
      } else {
        setForOrder.add(index);
      }
      return { ...prev, [orderId]: Array.from(setForOrder) };
    });
  };

  const fetchProductDetails = async (orderId: string, productId: string) => {
    const key = `${orderId}:${productId}`;
    if (itemDetails[key]) return; // cached
    try {
      const { data, error } = await supabase
        .from('products')
        .select('description, images, price, name')
        .eq('id', productId)
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      if (data) {
        setItemDetails((prev) => ({ ...prev, [key]: data }));
      }
    } catch (err: any) {
      console.error('Failed to fetch product details:', err?.message || err);
      toast.error('Failed to load product details');
    }
  };

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

        {/* Filters & Search */}
        <div className="mb-6 flex flex-col gap-3">
          <div className="flex gap-2 flex-wrap">
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
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search by ID, name, email, phone"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 md:w-96 outline-none text-sm"
              />
            </div>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Payments</option>
              <option value="cod">Cash on Delivery</option>
              <option value="upi">UPI</option>
              <option value="stripe">Stripe</option>
            </select>
            {selectedOrders.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Selected: {selectedOrders.length}</span>
                <Button size="sm" variant="outline" onClick={selectAllVisible}>Select All (visible)</Button>
                <Button size="sm" variant="outline" onClick={clearSelection}>Clear</Button>
                <div className="flex gap-2">
                  {['processing', 'delivered', 'cancelled'].map((bulkStatus) => (
                    <Button
                      key={bulkStatus}
                      size="sm"
                      onClick={async () => {
                        for (const id of selectedOrders) {
                          await updateOrderStatus(id, bulkStatus);
                        }
                        toast.success(`Updated ${selectedOrders.length} orders to ${bulkStatus}`);
                        clearSelection();
                      }}
                    >
                      Bulk: {bulkStatus.charAt(0).toUpperCase() + bulkStatus.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {fullyFiltered.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500 text-lg">No orders found</p>
            </div>
          ) : (
            fullyFiltered.map((order) => (
              <div key={order.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <button
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleSelect(order.id); }}
                        className="p-1 rounded hover:bg-gray-100"
                        aria-label={isSelected(order.id) ? 'Deselect Order' : 'Select Order'}
                      >
                        {isSelected(order.id) ? (
                          <CheckSquare className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      <div>
                        <p className="font-semibold text-gray-900">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-gray-600">{order.user_name} • {order.user_email}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 flex gap-6 flex-wrap text-sm text-gray-600">
                      <span className="font-medium">Total: ₹{order.total.toFixed(2)}</span>
                      <span>Items: {order.items?.length || 0}</span>
                      <span>Placed: {new Date(order.created_at).toLocaleString()}</span>
                      {order.payment_method && (
                        <span>Payment: {order.payment_method === 'cod' ? 'Cash on Delivery' : order.payment_method === 'upi' ? 'UPI' : 'Stripe'}</span>
                      )}
                      {order.tracking_number && (
                        <span>Tracking: <span className="font-mono">{order.tracking_number}</span></span>
                      )}
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
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
                      <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                      <div className="space-y-3">
                        {order.items?.map((item: any, index: number) => {
                          const productId = item.product_id || item.id;
                          const name = item.product_name || item.name;
                          const unitPrice = item.product_price ?? item.price ?? 0;
                          const thumb = item.product_image || (item.images?.[0]) || '/placeholder-product.jpg';
                          const totalPrice = unitPrice * (item.quantity || 1);
                          const key = `${order.id}:${productId}`;
                          const details = itemDetails[key];
                          const isItemExpanded = (expandedItems[order.id] || []).includes(index);
                          return (
                            <div key={index} className="bg-white rounded-lg border border-gray-200">
                              <div className="p-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100">
                                    <Image src={thumb} alt={name || 'Item'} fill sizes="64px" className="object-cover" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-medium text-gray-900">{name}</span>
                                    <span className="text-xs text-gray-600">Qty: {item.quantity} • Unit: ₹{unitPrice.toFixed(2)}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="font-semibold text-gray-900">₹{totalPrice.toFixed(2)}</span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={async () => {
                                      toggleItemExpanded(order.id, index);
                                      if (!details && productId) {
                                        await fetchProductDetails(order.id, productId);
                                      }
                                    }}
                                  >
                                    {isItemExpanded ? 'Hide Details' : 'View Details'}
                                  </Button>
                                </div>
                              </div>
                              {isItemExpanded && (
                                <div className="border-t border-gray-200 p-3">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-2">
                                      <p className="text-sm text-gray-700">
                                        {details?.description || item.description || 'No description available.'}
                                      </p>
                                      <div className="mt-3 flex gap-2 flex-wrap">
                                        {(details?.images || item.images || []).slice(0, 4).map((img: string, i: number) => (
                                          <div key={i} className="relative w-20 h-20 rounded overflow-hidden bg-gray-100">
                                            <Image src={img} alt={`${name} ${i+1}`} fill sizes="80px" className="object-cover" />
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-3 text-sm">
                                      <p className="text-gray-600">Pricing</p>
                                      <div className="mt-1 flex justify-between">
                                        <span>Unit:</span>
                                        <span className="font-medium">₹{unitPrice.toFixed(2)}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Quantity:</span>
                                        <span className="font-medium">{item.quantity}</span>
                                      </div>
                                      <div className="mt-2 pt-2 border-t flex justify-between">
                                        <span>Total:</span>
                                        <span className="font-semibold">₹{totalPrice.toFixed(2)}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
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

                    {/* Tracking Number Input (for shipped status) */}
                    {order.status === 'shipped' || (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          📦 Tracking Number (for shipped orders)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter tracking number (e.g., TRK123456789)"
                            value={trackingNumbers[order.id] || ''}
                            onChange={(e) => setTrackingNumbers((prev) => ({
                              ...prev,
                              [order.id]: e.target.value
                            }))}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <Button
                            onClick={() => updateOrderStatus(order.id, 'shipped')}
                            disabled={updatingOrderId === order.id || !trackingNumbers[order.id]}
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            Mark Shipped
                          </Button>
                        </div>
                        {order.tracking_number && (
                          <p className="text-xs text-gray-600 mt-2">
                            Current tracking: <span className="font-mono font-semibold">{order.tracking_number}</span>
                          </p>
                        )}
                      </div>
                    )}

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
