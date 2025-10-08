import type { Metadata } from 'next';
import { Sparkles, Target, Award, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - SparkleSphere.store',
  description: 'Learn about SparkleSphere.store, your trusted source for quality 3D printed items. Discover our mission, values, and commitment to excellence.',
  keywords: ['about us', '3D printing', 'SparkleSphere', 'company information', 'our story'],
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">About SparkleSphere.store</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted partner in bringing imagination to life through precision 3D printing technology
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-16">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            At SparkleSphere.store, we are dedicated to making high-quality 3D printed products accessible to everyone. 
            Our mission is to transform creative ideas into tangible reality through cutting-edge 3D printing technology, 
            exceptional craftsmanship, and unwavering commitment to customer satisfaction.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We believe that every product should sparkle with quality, precision, and attention to detail. Whether you're 
            looking for unique miniatures, elegant home decor, functional accessories, or custom creations, we're here to 
            bring your vision to life.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="mb-4">
            SparkleSphere.store was founded with a passion for innovation and a vision to democratize access to 
            high-quality 3D printed products. What started as a small workshop with a single 3D printer has grown 
            into a comprehensive online store serving customers across India and beyond.
          </p>
          <p className="mb-4">
            Our journey began when we recognized the incredible potential of 3D printing technology to create 
            unique, customized products that traditional manufacturing simply couldn't match. We saw an opportunity 
            to combine artistic creativity with technological precision, and SparkleSphere.store was born.
          </p>
          <p>
            Today, we continue to push the boundaries of what's possible with 3D printing, constantly exploring 
            new materials, techniques, and designs to offer our customers the very best in quality and innovation.
          </p>
        </div>
      </div>

      {/* Values Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quality */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 rounded-full p-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-center text-gray-900">Quality Excellence</h3>
            <p className="text-gray-600 text-center">
              We never compromise on quality. Every product undergoes rigorous quality checks to ensure it meets 
              our high standards before reaching your hands.
            </p>
          </div>

          {/* Innovation */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 rounded-full p-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-center text-gray-900">Innovation First</h3>
            <p className="text-gray-600 text-center">
              We stay at the forefront of 3D printing technology, continuously adopting new techniques and 
              materials to deliver cutting-edge products.
            </p>
          </div>

          {/* Customer Focus */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 rounded-full p-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-center text-gray-900">Customer Satisfaction</h3>
            <p className="text-gray-600 text-center">
              Your satisfaction is our priority. We're committed to providing exceptional service, from browsing 
              to delivery and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* What We Offer */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Premium 3D Printed Products</h3>
            <p className="text-gray-700">
              From intricate miniatures to functional home decor, our catalog features a wide range of 
              high-quality 3D printed items designed to inspire and delight.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Custom Design Services</h3>
            <p className="text-gray-700">
              Have a unique idea? We offer custom 3D printing services to bring your specific vision to life 
              with precision and care.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Fast & Reliable Delivery</h3>
            <p className="text-gray-700">
              We understand the excitement of receiving your order. That's why we ensure quick processing and 
              reliable shipping across India.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Expert Support</h3>
            <p className="text-gray-700">
              Our knowledgeable team is always ready to assist you with product selection, customization 
              options, and any questions you may have.
            </p>
          </div>
        </div>
      </div>

      {/* Quality Commitment */}
      <div className="bg-blue-600 text-white rounded-2xl p-8 md:p-12 mb-16">
        <h2 className="text-3xl font-bold mb-6">Our Quality Commitment</h2>
        <div className="space-y-4 text-lg">
          <p>
            <strong>Premium Materials:</strong> We use only high-quality, tested materials that ensure durability 
            and excellent finish for every product.
          </p>
          <p>
            <strong>Precision Manufacturing:</strong> Our state-of-the-art 3D printers deliver exceptional detail 
            and accuracy, ensuring every product meets exact specifications.
          </p>
          <p>
            <strong>Quality Inspection:</strong> Every item undergoes thorough inspection before packaging to 
            guarantee it meets our stringent quality standards.
          </p>
          <p>
            <strong>Customer Satisfaction Guarantee:</strong> We stand behind our products. If you're not completely 
            satisfied, we'll make it right.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Why Choose SparkleSphere.store?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
            <p className="text-gray-700">Unique Products</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
            <p className="text-gray-700">Happy Customers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
            <p className="text-gray-700">Customer Support</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
            <p className="text-gray-700">Quality Guaranteed</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Experience the Sparkle?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Explore our collection of premium 3D printed products and discover the perfect item for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/products"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse Products
          </a>
          <a
            href="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

