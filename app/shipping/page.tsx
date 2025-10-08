import type { Metadata } from 'next';
import { Package, Truck, Clock, MapPin, Shield, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping Information - SparkleSphere.store',
  description: 'Learn about our shipping methods, delivery times, and policies at SparkleSphere.store. Fast and reliable shipping across India.',
  keywords: ['shipping', 'delivery', 'shipping policy', 'delivery time', 'tracking'],
};

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">Shipping Information</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Fast, reliable, and secure shipping to bring your 3D printed treasures right to your doorstep
        </p>
      </div>

      {/* Shipping Methods */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Shipping Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Standard Shipping */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 rounded-full p-3">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Standard Shipping</h3>
            </div>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Delivery Time:</strong> 5-7 business days</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Cost:</strong> ₹99 (Free on orders above ₹999)</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Coverage:</strong> All major cities and towns across India</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Tracking:</strong> Full tracking available</span>
              </p>
            </div>
          </div>

          {/* Express Shipping */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-600 rounded-full p-3">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Express Shipping</h3>
                <span className="text-sm text-blue-600 font-semibold">Recommended</span>
              </div>
            </div>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Delivery Time:</strong> 2-3 business days</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Cost:</strong> ₹199 (Free on orders above ₹1,999)</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Coverage:</strong> Metro cities and major urban areas</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Tracking:</strong> Real-time tracking with SMS updates</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Processing */}
      <div className="mb-16">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Order Processing Time</h2>
          </div>
          <div className="space-y-4 text-gray-700">
            <p className="text-lg">
              <strong>Standard Products:</strong> Orders are typically processed and shipped within 1-2 business days 
              after payment confirmation. You'll receive a confirmation email once your order is dispatched.
            </p>
            <p className="text-lg">
              <strong>Custom Orders:</strong> Custom 3D printed items require additional production time. Processing 
              typically takes 3-5 business days, depending on the complexity of the design. We'll keep you updated 
              throughout the process.
            </p>
            <p className="text-lg">
              <strong>Pre-Orders:</strong> Pre-order items will be shipped according to the estimated availability 
              date mentioned on the product page.
            </p>
          </div>
        </div>
      </div>

      {/* Delivery Timeline */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Estimated Delivery Timeline</h2>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Region</th>
                <th className="px-6 py-4 text-left">Standard Shipping</th>
                <th className="px-6 py-4 text-left">Express Shipping</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Metro Cities</td>
                <td className="px-6 py-4 text-gray-700">4-5 business days</td>
                <td className="px-6 py-4 text-gray-700">2-3 business days</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Tier 1 Cities</td>
                <td className="px-6 py-4 text-gray-700">5-6 business days</td>
                <td className="px-6 py-4 text-gray-700">3-4 business days</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Tier 2/3 Cities</td>
                <td className="px-6 py-4 text-gray-700">6-7 business days</td>
                <td className="px-6 py-4 text-gray-700">4-5 business days</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Remote Areas</td>
                <td className="px-6 py-4 text-gray-700">7-10 business days</td>
                <td className="px-6 py-4 text-gray-700">5-7 business days</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          * Delivery times are estimates and may vary based on location, weather conditions, and courier availability. 
          Business days exclude Sundays and public holidays.
        </p>
      </div>

      {/* Tracking */}
      <div className="mb-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Order Tracking</h2>
          </div>
          <div className="space-y-4 text-gray-700">
            <p className="text-lg">
              Track your order every step of the way! Once your order is shipped, you'll receive:
            </p>
            <ul className="space-y-3 ml-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Shipping confirmation email with tracking number</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Real-time tracking link to monitor your package</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>SMS updates at key delivery milestones (Express Shipping)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Delivery notification when your package arrives</span>
              </li>
            </ul>
            <div className="bg-blue-50 rounded-lg p-4 mt-6">
              <p className="font-semibold text-gray-900 mb-2">How to Track Your Order:</p>
              <ol className="list-decimal ml-6 space-y-1 text-gray-700">
                <li>Check your email for the shipping confirmation</li>
                <li>Click on the tracking link provided</li>
                <li>Enter your tracking number on the courier's website</li>
                <li>View real-time updates on your package location</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Packaging */}
      <div className="mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8" />
            <h2 className="text-3xl font-bold">Secure Packaging</h2>
          </div>
          <div className="space-y-4 text-lg">
            <p>
              We take great care in packaging your 3D printed items to ensure they arrive in perfect condition:
            </p>
            <ul className="space-y-2 ml-6">
              <li>• Protective bubble wrap for delicate items</li>
              <li>• Sturdy corrugated boxes to prevent damage</li>
              <li>• Eco-friendly packaging materials whenever possible</li>
              <li>• Tamper-evident sealing for security</li>
              <li>• Clear labeling with "Fragile" stickers where needed</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Shipping Costs */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Shipping Costs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Free Shipping Offers</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Free standard shipping on orders above ₹999</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Free express shipping on orders above ₹1,999</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Special promotional offers during festive seasons</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Additional Charges</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Remote area delivery may incur additional charges</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>COD orders: ₹50 handling fee</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>All shipping costs are calculated at checkout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6 mb-16">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Important Shipping Notes</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Orders placed after 3 PM IST will be processed the next business day</li>
          <li>• Delivery times may be affected during peak seasons and festivals</li>
          <li>• Please ensure someone is available to receive the package at the delivery address</li>
          <li>• Incorrect or incomplete addresses may cause delivery delays</li>
          <li>• We currently ship only within India</li>
          <li>• For international shipping inquiries, please contact our support team</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-3 text-gray-900">Have Questions About Shipping?</h2>
        <p className="text-gray-600 mb-6">
          Our customer support team is here to help with any shipping-related queries.
        </p>
        <a
          href="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}

