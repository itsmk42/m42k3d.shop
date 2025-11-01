-- Migration: Add SEO Settings table
-- This migration adds support for managing SEO metadata for pages

-- Create SEO Settings table
CREATE TABLE IF NOT EXISTS seo_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_type TEXT NOT NULL CHECK (page_type IN ('homepage', 'product', 'category')),
  page_id TEXT,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  og_image TEXT,
  twitter_card TEXT DEFAULT 'summary_large_image',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(page_type, page_id)
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_seo_settings_page ON seo_settings(page_type, page_id);

-- Enable Row Level Security
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "SEO settings are viewable by everyone"
  ON seo_settings FOR SELECT
  USING (true);

CREATE POLICY "SEO settings are insertable by authenticated users"
  ON seo_settings FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "SEO settings are updatable by authenticated users"
  ON seo_settings FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "SEO settings are deletable by authenticated users"
  ON seo_settings FOR DELETE
  USING (auth.role() = 'authenticated');

