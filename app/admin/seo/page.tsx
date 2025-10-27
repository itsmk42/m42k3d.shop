'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Loading from '@/components/ui/Loading';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { SEOSettings } from '@/types';

export default function AdminSEOPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [seoSettings, setSeoSettings] = useState<SEOSettings[]>([]);
  const [activeTab, setActiveTab] = useState<'homepage' | 'product' | 'category'>('homepage');
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
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? 'Edit' : 'Add'} {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} SEO Settings
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <Input
                label="Meta Title"
                value={formData.meta_title}
                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                placeholder="Page title for search engines"
                maxLength={60}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description ({formData.meta_description.length}/160)
                </label>
                <textarea
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  placeholder="Page description for search engines"
                  maxLength={160}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <Input
                label="Meta Keywords"
                value={formData.meta_keywords}
                onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                placeholder="Comma-separated keywords"
              />

              <Input
                label="OG Image URL"
                value={formData.og_image}
                onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />

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
          </div>

          {/* List */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Existing Settings</h2>
            <div className="space-y-2">
              {currentSettings.length === 0 ? (
                <p className="text-gray-500 text-sm">No SEO settings yet</p>
              ) : (
                currentSettings.map((setting) => (
                  <div key={setting.id} className="p-3 border border-gray-200 rounded-lg">
                    <p className="font-medium text-sm text-gray-900 truncate">
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
  );
}

