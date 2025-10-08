import type { Metadata } from 'next';
import { RotateCcw, CheckCircle, XCircle, AlertCircle, Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Returns & Refunds - SparkleSphere.store',
  description: 'Learn about our return and refund policy at SparkleSphere.store. Easy returns, hassle-free refunds, and customer satisfaction guaranteed.',
  keywords: ['returns', 'refunds', 'return policy', 'exchange', 'money back'],
};

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">Returns & Refunds Policy</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your satisfaction is our priority. We offer hassle-free returns and refunds to ensure you're completely happy with your purchase.
        </p>
      </div>

      {/* Return Policy Overview */}
      <div className="mb-16">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <RotateCcw className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Our Return Policy</h2>
          </div>
          <div className="space-y-4 text-lg text-gray-700">
            <p>
              At SparkleSphere.store, we stand behind the quality of our 3D printed products. If you're not completely 
              satisfied with your purchase, we offer a <strong>7-day return policy</strong> from the date of delivery.
            </p>
            <p>
              We accept returns for products that are defective, damaged during shipping, or significantly different 
              from the description. Custom-made items may have different return conditions (see below).
            </p>
          </div>
        </div>
      </div>

      {/* Return Eligibility */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Return Eligibility</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Eligible */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Eligible for Return</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Defective or damaged products</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Wrong item received</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Significantly different from description</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Missing parts or accessories</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Product unused and in original packaging</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Return initiated within 7 days of delivery</span>
              </li>
            </ul>
          </div>

          {/* Not Eligible */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-100 rounded-full p-3">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Not Eligible for Return</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Used or damaged products (by customer)</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Products without original packaging</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Custom-made items (unless defective)</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Products on clearance or final sale</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Return request after 7 days</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Change of mind (without valid reason)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Return Process */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">How to Return an Item</h2>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Contact Us</h3>
                <p className="text-gray-700">
                  Email us at <a href="mailto:info@sparklesphere.store" className="text-blue-600 hover:underline">info@sparklesphere.store</a> within 
                  7 days of receiving your order. Include your order number, reason for return, and photos of the product (if damaged or defective).
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Get Approval</h3>
                <p className="text-gray-700">
                  Our team will review your request within 24-48 hours. Once approved, we'll send you return instructions 
                  and a return authorization number (RAN).
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Pack the Item</h3>
                <p className="text-gray-700">
                  Carefully pack the item in its original packaging with all accessories, manuals, and tags. Include the 
                  return authorization number inside the package.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Ship the Return</h3>
                <p className="text-gray-700">
                  Ship the package to the address provided in our return instructions. We recommend using a trackable 
                  shipping method. For defective items, we'll provide a prepaid return label.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  5
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Receive Refund</h3>
                <p className="text-gray-700">
                  Once we receive and inspect your return, we'll process your refund within 5-7 business days. You'll 
                  receive a confirmation email when the refund is initiated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Refund Policy */}
      <div className="mb-16">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">Refund Policy</h2>
          </div>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Refund Processing Time</h3>
              <p className="mb-2">
                Refunds are processed within <strong>5-7 business days</strong> after we receive and inspect the returned item.
              </p>
              <ul className="ml-6 space-y-1">
                <li>• Credit/Debit Card: 5-7 business days</li>
                <li>• UPI/Net Banking: 3-5 business days</li>
                <li>• Wallet: 2-3 business days</li>
                <li>• COD Orders: Bank transfer within 7-10 business days</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Refund Amount</h3>
              <p>
                You'll receive a full refund of the product price. Shipping charges are non-refundable unless the return 
                is due to our error (defective product, wrong item, etc.). Return shipping costs are the customer's 
                responsibility unless otherwise specified.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exchange Policy */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Exchange Policy</h2>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-gray-700 mb-4">
            We currently do not offer direct exchanges. If you'd like a different product, please:
          </p>
          <ol className="list-decimal ml-6 space-y-2 text-gray-700 mb-6">
            <li>Return the original item following our return process</li>
            <li>Receive your refund</li>
            <li>Place a new order for the desired product</li>
          </ol>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-gray-700">
              <strong>Exception:</strong> For defective or damaged items, we'll expedite a replacement at no additional 
              cost. Contact our support team for assistance.
            </p>
          </div>
        </div>
      </div>

      {/* Special Cases */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Special Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Damaged During Shipping</h3>
            <p className="text-gray-700 mb-3">
              If your item arrives damaged, please:
            </p>
            <ul className="space-y-1 text-gray-700 ml-4">
              <li>• Take photos of the damaged item and packaging</li>
              <li>• Contact us within 48 hours of delivery</li>
              <li>• We'll arrange a free return pickup</li>
              <li>• Full refund or replacement provided</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Wrong Item Received</h3>
            <p className="text-gray-700 mb-3">
              If you received the wrong item:
            </p>
            <ul className="space-y-1 text-gray-700 ml-4">
              <li>• Contact us immediately with order details</li>
              <li>• We'll arrange free return pickup</li>
              <li>• Correct item shipped at no extra cost</li>
              <li>• Priority processing for replacement</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Custom Orders</h3>
            <p className="text-gray-700">
              Custom-made 3D printed items are generally non-returnable unless they're defective or don't match the 
              agreed specifications. We'll work with you to ensure satisfaction before production begins.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Partial Returns</h3>
            <p className="text-gray-700">
              For orders with multiple items, you can return individual items. The refund will be calculated based on 
              the returned item's price. Shipping charges may be adjusted proportionally.
            </p>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6 mb-16">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Important Notes</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• All returns must be initiated within 7 days of delivery</li>
              <li>• Products must be in original, unused condition with all packaging</li>
              <li>• Return shipping costs are customer's responsibility (except for defective items)</li>
              <li>• Refunds are processed to the original payment method</li>
              <li>• Custom orders require approval before return</li>
              <li>• We reserve the right to refuse returns that don't meet our policy criteria</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 rounded-full p-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-3 text-gray-900">Need Help with a Return?</h2>
        <p className="text-gray-600 mb-6">
          Our customer support team is here to assist you with any return or refund questions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:info@sparklesphere.store"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Email Support
          </a>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

