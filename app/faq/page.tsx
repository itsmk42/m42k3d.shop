'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, ShoppingCart, Truck, RotateCcw, Package, Wrench } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: React.ReactNode;
  faqs: FAQItem[];
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (categoryIndex: number, faqIndex: number) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const faqCategories: FAQCategory[] = [
    {
      title: 'Ordering & Payment',
      icon: <ShoppingCart className="w-6 h-6" />,
      faqs: [
        {
          question: 'How do I place an order?',
          answer: 'Browse our products, click on an item you like, select quantity, and click "Add to Cart". Once you\'ve added all desired items, go to your cart, review your order, and proceed to checkout. Fill in your shipping details and payment information to complete your order.',
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept multiple payment methods including Credit/Debit Cards (Visa, Mastercard, RuPay), UPI (Google Pay, PhonePe, Paytm), Net Banking, and Cash on Delivery (COD) for eligible orders. All payments are processed securely.',
        },
        {
          question: 'Is it safe to use my credit card on your website?',
          answer: 'Yes, absolutely! We use industry-standard SSL encryption to protect your payment information. We never store your complete card details on our servers. All transactions are processed through secure payment gateways.',
        },
        {
          question: 'Can I modify or cancel my order after placing it?',
          answer: 'You can modify or cancel your order within 2 hours of placing it by contacting our support team immediately. Once the order is processed for shipping, modifications may not be possible. Contact us at info@sparklesphere.store for assistance.',
        },
        {
          question: 'Do you offer Cash on Delivery (COD)?',
          answer: 'Yes, we offer COD for orders up to ₹5,000. A nominal handling fee of ₹50 applies to COD orders. Please note that COD may not be available for all locations or custom orders.',
        },
      ],
    },
    {
      title: 'Shipping & Delivery',
      icon: <Truck className="w-6 h-6" />,
      faqs: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping takes 5-7 business days, while Express shipping takes 2-3 business days. Delivery times vary based on your location. Metro cities typically receive orders faster. Custom orders may require additional 3-5 days for production.',
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Currently, we only ship within India. We\'re working on expanding our shipping to international locations. If you\'re interested in international shipping, please contact us at info@sparklesphere.store and we\'ll notify you when it becomes available.',
        },
        {
          question: 'How can I track my order?',
          answer: 'Once your order ships, you\'ll receive a tracking number via email and SMS. Click the tracking link to monitor your package in real-time. You can also check your order status by logging into your account on our website.',
        },
        {
          question: 'What if I\'m not available to receive my package?',
          answer: 'Our courier partners will attempt delivery 2-3 times. If you\'re unavailable, they\'ll leave a notification with instructions. You can also contact the courier directly to reschedule delivery or arrange pickup from their local office.',
        },
        {
          question: 'Are there any additional shipping charges?',
          answer: 'Standard shipping is ₹99 (free on orders above ₹999). Express shipping is ₹199 (free on orders above ₹1,999). Remote areas may incur additional charges. All shipping costs are displayed at checkout before payment.',
        },
      ],
    },
    {
      title: 'Returns & Refunds',
      icon: <RotateCcw className="w-6 h-6" />,
      faqs: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 7-day return policy from the date of delivery. Items must be unused, in original packaging, and in the same condition you received them. Contact us within 7 days to initiate a return. Custom-made items have different return conditions.',
        },
        {
          question: 'How do I return an item?',
          answer: 'Email us at info@sparklesphere.store with your order number, reason for return, and photos (if applicable). We\'ll review your request within 24-48 hours and provide return instructions. Pack the item securely and ship it to the provided address.',
        },
        {
          question: 'When will I receive my refund?',
          answer: 'Refunds are processed within 5-7 business days after we receive and inspect your return. The refund will be credited to your original payment method. Credit/Debit cards take 5-7 days, UPI/Net Banking takes 3-5 days, and Wallets take 2-3 days.',
        },
        {
          question: 'Can I exchange an item instead of returning it?',
          answer: 'We currently don\'t offer direct exchanges. Please return the original item for a refund and place a new order for the desired product. For defective items, we\'ll expedite a replacement at no additional cost.',
        },
        {
          question: 'What if my item arrives damaged?',
          answer: 'If your item arrives damaged, contact us within 48 hours with photos of the damage. We\'ll arrange a free return pickup and provide a full refund or replacement. Your satisfaction is our priority.',
        },
      ],
    },
    {
      title: 'Product Information',
      icon: <Package className="w-6 h-6" />,
      faqs: [
        {
          question: 'What materials are used for 3D printing?',
          answer: 'We use high-quality materials including PLA (Polylactic Acid), ABS (Acrylonitrile Butadiene Styrene), PETG, and resin depending on the product. Each product page specifies the material used. All materials are safe, durable, and tested for quality.',
        },
        {
          question: 'Are your products safe and non-toxic?',
          answer: 'Yes, all our products are made from safe, non-toxic materials. PLA is biodegradable and made from renewable resources. We follow strict quality standards and safety guidelines. Products intended for children meet all safety requirements.',
        },
        {
          question: 'Can I see the product before purchasing?',
          answer: 'Each product page includes multiple high-quality photos showing different angles. We also provide detailed descriptions, dimensions, and specifications. If you need additional photos or information, contact our support team.',
        },
        {
          question: 'Do products come assembled?',
          answer: 'Most products come fully assembled and ready to use. Some larger items may require minimal assembly, which will be clearly mentioned on the product page. Assembly instructions are included when needed.',
        },
        {
          question: 'How do I care for my 3D printed items?',
          answer: 'Clean with a soft, dry cloth. Avoid harsh chemicals or abrasive cleaners. Keep away from direct sunlight and extreme temperatures. For detailed care instructions specific to your product, refer to the care guide included with your order.',
        },
      ],
    },
    {
      title: '3D Printing Process',
      icon: <Wrench className="w-6 h-6" />,
      faqs: [
        {
          question: 'How long does it take to 3D print an item?',
          answer: 'Print time varies based on size and complexity. Small items take 2-4 hours, medium items 4-8 hours, and large items can take 12-24 hours or more. Standard products are pre-printed and ship within 1-2 days. Custom orders require 3-5 days for production.',
        },
        {
          question: 'Why do 3D printed items have visible layers?',
          answer: 'Layer lines are a natural characteristic of 3D printing technology. We use high-resolution printing to minimize visibility. Some products are post-processed (sanded, painted) for a smoother finish. The product photos accurately represent the final appearance.',
        },
        {
          question: 'Can you print in different colors?',
          answer: 'Yes! Many products are available in multiple colors. Select your preferred color from the options on the product page. If you need a custom color not listed, contact us for custom order inquiries.',
        },
        {
          question: 'What is the quality of your 3D prints?',
          answer: 'We use professional-grade 3D printers with high precision. Every product undergoes quality inspection before shipping. We maintain strict quality standards for layer adhesion, dimensional accuracy, and surface finish. If you\'re not satisfied, our return policy has you covered.',
        },
        {
          question: 'Do you offer post-processing services?',
          answer: 'Yes, many products include post-processing like sanding, painting, or coating for a premium finish. This is mentioned on the product page. For custom orders, you can request specific finishing options.',
        },
      ],
    },
    {
      title: 'Custom Orders',
      icon: <HelpCircle className="w-6 h-6" />,
      faqs: [
        {
          question: 'Do you accept custom design requests?',
          answer: 'Yes! We love bringing unique ideas to life. Contact us with your design concept, reference images, or 3D files. Our team will review feasibility, provide a quote, and estimated timeline. Custom orders typically take 5-10 business days depending on complexity.',
        },
        {
          question: 'Can I provide my own 3D model file?',
          answer: 'Absolutely! We accept STL, OBJ, and other common 3D file formats. Email your file to info@sparklesphere.store with specifications (size, color, material preferences). We\'ll review it and provide a quote within 48 hours.',
        },
        {
          question: 'How much do custom orders cost?',
          answer: 'Custom order pricing depends on size, complexity, material, and finishing requirements. We provide a detailed quote after reviewing your requirements. Generally, custom orders start from ₹500 and can vary significantly based on specifications.',
        },
        {
          question: 'Can I cancel a custom order?',
          answer: 'Custom orders can be cancelled before production begins. Once production starts, cancellation may not be possible. We\'ll keep you updated throughout the process. Contact us immediately if you need to make changes.',
        },
        {
          question: 'Do you offer bulk or wholesale pricing?',
          answer: 'Yes, we offer discounted pricing for bulk orders (typically 10+ units). Contact us with your requirements, and we\'ll provide a custom quote. Bulk orders may require longer production time.',
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions about our products, ordering, shipping, and more.
        </p>
      </div>

      {/* FAQ Categories */}
      <div className="space-y-8">
        {faqCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Category Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold">{category.title}</h2>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="divide-y divide-gray-200">
              {category.faqs.map((faq, faqIndex) => {
                const key = `${categoryIndex}-${faqIndex}`;
                const isOpen = openItems[key];

                return (
                  <div key={faqIndex} className="p-6">
                    <button
                      onClick={() => toggleItem(categoryIndex, faqIndex)}
                      className="w-full flex items-start justify-between gap-4 text-left group"
                    >
                      <span className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {faq.question}
                      </span>
                      <span className="flex-shrink-0 text-blue-600">
                        {isOpen ? (
                          <ChevronUp className="w-6 h-6" />
                        ) : (
                          <ChevronDown className="w-6 h-6" />
                        )}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="mt-4 text-gray-700 leading-relaxed pl-0">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Still Have Questions */}
      <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Still Have Questions?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Can't find the answer you're looking for? Our customer support team is here to help!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </a>
          <a
            href="mailto:info@sparklesphere.store"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}

