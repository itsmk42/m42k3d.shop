'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Loading from '@/components/ui/Loading';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { SEOSettings } from '@/types';

// India-optimized SEO defaults
const INDIA_SEO_DEFAULTS = {
  homepage: {
    meta_title: 'SparkleSphere - 3D Printed Products & Custom Designs India | ₹ Affordable',
    meta_description: 'Discover premium 3D printed products, custom designs & personalized gifts in India. Fast delivery, affordable prices. Shop now!',
    meta_keywords: '3D printing India, custom 3D printed products, personalized gifts India, 3D printed items online, affordable 3D printing, custom designs',
    og_image: 'https://m42k3d-shop-jqzt.vercel.app/og-image.jpg',
  },
  product: {
    meta_title: '{product_name} - 3D Printed | Custom Design | India | SparkleSphere',
    meta_description: 'Buy {product_name} - Premium 3D printed product with custom design options. Free shipping in India. ₹{price}. Order now!',
    meta_keywords: '3D printed {product_name}, custom {product_name}, {product_name} India, buy {product_name} online',
    og_image: '{product_image}',
  },
  category: {
    meta_title: '{category_name} - 3D Printed Products India | SparkleSphere',
    meta_description: 'Explore our collection of {category_name}. Premium 3D printed items with custom design options. Affordable prices, fast delivery in India.',
    meta_keywords: '{category_name} 3D printed, {category_name} India, custom {category_name}, buy {category_name} online',
    og_image: 'https://m42k3d-shop-jqzt.vercel.app/og-image.jpg',
  },
};

// Recommended keywords for Indian market
const RECOMMENDED_KEYWORDS = {
  homepage: [
    '3D printing India',
    'custom 3D printed products',
    'personalized gifts India',
    '3D printed items online',
    'affordable 3D printing',
    'custom designs India',
    '3D printed toys',
    '3D printed home decor',
    'made in India 3D printing',
    'buy 3D printed products online',
  ],
  product: [
    '3D printed [product name]',
    'custom [product name]',
    '[product name] India',
    'buy [product name] online',
    'affordable [product name]',
    'personalized [product name]',
    '[product name] with free shipping',
    '[product name] ₹ price',
  ],
  category: [
    '[category] 3D printed',
    '[category] India',
    'custom [category]',
    'buy [category] online',
    'affordable [category]',
    '[category] with free shipping',
    '[category] personalized',
  ],
};

export default function AdminSEOPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [seoSettings, setSeoSettings] = useState<SEOSettings[]>([]);
  const [activeTab, setActiveTab] = useState<'homepage' | 'product' | 'category'>('homepage');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    og_image: '',
    twitter_card: 'summary_large_image',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    fetchSEOSettings();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/staff-portal/login');
    }
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const applyDefault = (field: keyof typeof INDIA_SEO_DEFAULTS[typeof activeTab]) => {
    const defaultValue = INDIA_SEO_DEFAULTS[activeTab][field];
    setFormData({ ...formData, [field]: defaultValue });
    toast.success(`Applied India-optimized ${field.replace(/_/g, ' ')}`);
  };

  const applyAllDefaults = () => {
    const defaults = INDIA_SEO_DEFAULTS[activeTab];
    setFormData({
      meta_title: defaults.meta_title,
      meta_description: defaults.meta_description,
      meta_keywords: defaults.meta_keywords,
      og_image: defaults.og_image,
      twitter_card: 'summary_large_image',
    });
    toast.success('Applied all India-optimized defaults');
  };

  const fetchSEOSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSeoSettings(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch SEO settings');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        page_type: activeTab,
        page_id: activeTab === 'homepage' ? 'homepage' : null,
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
        meta_keywords: formData.meta_keywords,
        og_image: formData.og_image,
        twitter_card: formData.twitter_card,
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        const { error } = await supabase
          .from('seo_settings')
          .update(data)
          .eq('id', editingId);

        if (error) throw error;
        toast.success('SEO settings updated');
      } else {
        const { error } = await supabase
          .from('seo_settings')
          .insert([data]);

        if (error) throw error;
        toast.success('SEO settings created');
      }

      setFormData({
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        og_image: '',
        twitter_card: 'summary_large_image',
      });
      setEditingId(null);
      fetchSEOSettings();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save SEO settings');
      console.error(error);
    }
  };

  const handleEdit = (setting: SEOSettings) => {
    setEditingId(setting.id);
    setFormData({
      meta_title: setting.meta_title || '',
      meta_description: setting.meta_description || '',
      meta_keywords: setting.meta_keywords || '',
      og_image: setting.og_image || '',
      twitter_card: setting.twitter_card || 'summary_large_image',
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this SEO setting?')) return;

    try {
      const { error } = await supabase
        .from('seo_settings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('SEO setting deleted');
      fetchSEOSettings();
    } catch (error: any) {
      toast.error('Failed to delete SEO setting');
      console.error(error);
    }
  };

  const currentSettings = seoSettings.filter((s) => s.page_type === activeTab);

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
          <h1 className="text-4xl font-bold">SEO Management</h1>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b">
          {(['homepage', 'product', 'category'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setEditingId(null);
                setShowRecommendations(false);
                setFormData({
                  meta_title: '',
                  meta_description: '',
                  meta_keywords: '',
                  og_image: '',
                  twitter_card: 'summary_large_image',
                });
              }}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {editingId ? 'Edit' : 'Add'} {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} SEO Settings
              </h2>
              <button
                type="button"
                onClick={() => setShowRecommendations(!showRecommendations)}
                className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              >
                {showRecommendations ? 'Hide' : 'Show'} Tips
              </button>
            </div>

            {/* India-Optimized Defaults Info */}
            {!editingId && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-3">🇮🇳 India-Optimized Defaults</h3>
                <p className="text-sm text-green-800 mb-3">
                  Pre-filled with SEO best practices for Indian market. Customize as needed.
                </p>
                <Button
                  type="button"
                  onClick={applyAllDefaults}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Apply All India-Optimized Defaults
                </Button>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Meta Title ({formData.meta_title.length}/60)
                  </label>
                  {formData.meta_title && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formData.meta_title, 'title')}
                      className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                    >
                      {copiedField === 'title' ? (
                        <>
                          <Check className="w-3 h-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
                <Input
                  value={formData.meta_title}
                  onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                  placeholder="e.g., SparkleSphere - 3D Printed Products India | ₹ Affordable"
                  maxLength={60}
                />
                {showRecommendations && (
                  <p className="text-xs text-gray-600 mt-1">
                    💡 Include: Brand name, main keyword, location (India), and unique value (₹ price/free shipping)
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Meta Description ({formData.meta_description.length}/160)
                  </label>
                  {formData.meta_description && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formData.meta_description, 'description')}
                      className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                    >
                      {copiedField === 'description' ? (
                        <>
                          <Check className="w-3 h-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
                <textarea
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  placeholder="e.g., Discover premium 3D printed products & custom designs in India. Fast delivery, affordable prices. Shop now!"
                  maxLength={160}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {showRecommendations && (
                  <p className="text-xs text-gray-600 mt-1">
                    💡 Include: Main keyword, location (India), unique value proposition, and call-to-action. Keep 150-160 characters.
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">Meta Keywords</label>
                  {formData.meta_keywords && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formData.meta_keywords, 'keywords')}
                      className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                    >
                      {copiedField === 'keywords' ? (
                        <>
                          <Check className="w-3 h-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
                <Input
                  value={formData.meta_keywords}
                  onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                  placeholder="e.g., 3D printing India, custom 3D printed products, personalized gifts"
                />
                {showRecommendations && (
                  <div className="text-xs text-gray-600 mt-2 p-2 bg-gray-50 rounded">
                    <p className="font-medium mb-1">💡 Recommended keywords for {activeTab}:</p>
                    <div className="flex flex-wrap gap-1">
                      {RECOMMENDED_KEYWORDS[activeTab].slice(0, 5).map((keyword, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            const current = formData.meta_keywords ? formData.meta_keywords + ', ' : '';
                            setFormData({ ...formData, meta_keywords: current + keyword });
                          }}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-xs"
                        >
                          + {keyword}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">OG Image URL</label>
                  {formData.og_image && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formData.og_image, 'og_image')}
                      className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                    >
                      {copiedField === 'og_image' ? (
                        <>
                          <Check className="w-3 h-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
                <Input
                  value={formData.og_image}
                  onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                  placeholder="https://m42k3d-shop-jqzt.vercel.app/og-image.jpg"
                />
                {showRecommendations && (
                  <p className="text-xs text-gray-600 mt-1">
                    💡 Use 1200x630px image for best results on WhatsApp, Facebook, and Instagram. Ensure image includes brand name and key message.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter Card Type
                </label>
                <select
                  value={formData.twitter_card}
                  onChange={(e) => setFormData({ ...formData, twitter_card: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="summary">Summary</option>
                  <option value="summary_large_image">Summary Large Image</option>
                  <option value="player">Player</option>
                </select>
                {showRecommendations && (
                  <p className="text-xs text-gray-600 mt-1">
                    💡 Use "Summary Large Image" for better visibility on Twitter/X and social media.
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingId ? 'Update' : 'Create'} SEO Settings
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        meta_title: '',
                        meta_description: '',
                        meta_keywords: '',
                        og_image: '',
                        twitter_card: 'summary_large_image',
                      });
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>

            {/* SEO Tips Section */}
            {showRecommendations && (
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">🇮🇳 India-Specific SEO Best Practices</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="p-3 bg-blue-50 rounded">
                    <p className="font-medium text-blue-900">📱 Mobile-First Optimization</p>
                    <p className="text-blue-800 mt-1">India has 90%+ mobile users. Ensure fast loading times and mobile-responsive design.</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded">
                    <p className="font-medium text-green-900">💰 Include Pricing & Currency</p>
                    <p className="text-green-800 mt-1">Use ₹ (Indian Rupee) symbol and mention "affordable", "budget-friendly", or specific prices.</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded">
                    <p className="font-medium text-purple-900">🚚 Highlight Delivery Benefits</p>
                    <p className="text-purple-800 mt-1">Mention "Free shipping in India", "Fast delivery", or "Pan-India delivery" in descriptions.</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded">
                    <p className="font-medium text-orange-900">🎯 Use Location Keywords</p>
                    <p className="text-orange-800 mt-1">Include "India", "Indian", or specific regions (Delhi, Mumbai, Bangalore) in keywords.</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded">
                    <p className="font-medium text-red-900">📱 Social Media Optimization</p>
                    <p className="text-red-800 mt-1">Optimize for WhatsApp, Facebook, Instagram sharing. Use engaging OG images and descriptions.</p>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded">
                    <p className="font-medium text-indigo-900">🔍 Long-Tail Keywords</p>
                    <p className="text-indigo-800 mt-1">Use specific phrases like "buy 3D printed gifts online India" instead of just "3D printing".</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recommended Keywords */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold mb-4">🎯 Recommended Keywords</h3>
              <div className="space-y-2">
                {RECOMMENDED_KEYWORDS[activeTab].map((keyword, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      const current = formData.meta_keywords ? formData.meta_keywords + ', ' : '';
                      setFormData({ ...formData, meta_keywords: current + keyword });
                      toast.success('Keyword added!');
                    }}
                    className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-blue-50 rounded border border-gray-200 hover:border-blue-300 transition-colors truncate"
                    title={keyword}
                  >
                    + {keyword}
                  </button>
                ))}
              </div>
            </div>

            {/* Default Values */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold mb-4">📋 Default Values</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-700 mb-1">Title:</p>
                  <p className="text-gray-600 text-xs bg-gray-50 p-2 rounded truncate" title={INDIA_SEO_DEFAULTS[activeTab].meta_title}>
                    {INDIA_SEO_DEFAULTS[activeTab].meta_title}
                  </p>
                  <button
                    type="button"
                    onClick={() => applyDefault('meta_title')}
                    className="mt-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Apply →
                  </button>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Description:</p>
                  <p className="text-gray-600 text-xs bg-gray-50 p-2 rounded line-clamp-2" title={INDIA_SEO_DEFAULTS[activeTab].meta_description}>
                    {INDIA_SEO_DEFAULTS[activeTab].meta_description}
                  </p>
                  <button
                    type="button"
                    onClick={() => applyDefault('meta_description')}
                    className="mt-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Apply →
                  </button>
                </div>
              </div>
            </div>

            {/* Existing Settings */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-bold mb-4">📝 Existing Settings</h2>
              <div className="space-y-2">
                {currentSettings.length === 0 ? (
                  <p className="text-gray-500 text-sm">No SEO settings yet</p>
                ) : (
                  currentSettings.map((setting) => (
                    <div key={setting.id} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                      <p className="font-medium text-sm text-gray-900 truncate" title={setting.meta_title}>
                        {setting.meta_title || 'Untitled'}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(setting)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(setting.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

