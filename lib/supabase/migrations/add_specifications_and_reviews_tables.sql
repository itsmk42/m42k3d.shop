-- Migration: Add specifications and reviews tables
-- This migration adds support for product specifications and customer reviews

-- Create specifications table
CREATE TABLE IF NOT EXISTS specifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_specifications_product_id ON specifications(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- Enable Row Level Security (RLS)
ALTER TABLE specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for specifications (public read, authenticated write)
CREATE POLICY "Specifications are viewable by everyone" 
  ON specifications FOR SELECT 
  USING (true);

CREATE POLICY "Specifications are insertable by authenticated users" 
  ON specifications FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Specifications are updatable by authenticated users" 
  ON specifications FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Specifications are deletable by authenticated users" 
  ON specifications FOR DELETE 
  USING (auth.role() = 'authenticated');

-- RLS Policies for reviews (public read, authenticated write)
CREATE POLICY "Reviews are viewable by everyone" 
  ON reviews FOR SELECT 
  USING (true);

CREATE POLICY "Reviews are insertable by authenticated users" 
  ON reviews FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Reviews are updatable by authenticated users" 
  ON reviews FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Reviews are deletable by authenticated users" 
  ON reviews FOR DELETE 
  USING (auth.role() = 'authenticated');

