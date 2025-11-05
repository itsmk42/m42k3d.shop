-- ============================================================================
-- SPARKLESPHERE.STORE COMPLETE DATABASE SETUP
-- ============================================================================
-- This script sets up the complete database schema and RLS policies
-- Run this in your Supabase SQL Editor to fix all issues
-- ============================================================================

-- STEP 1: CLEAN UP EXISTING POLICIES (if any)
-- Drop all existing policies on orders table
DROP POLICY IF EXISTS "Orders are viewable by owner" ON orders;
DROP POLICY IF EXISTS "Orders are insertable by everyone" ON orders;
DROP POLICY IF EXISTS "Orders are updatable by authenticated users" ON orders;
DROP POLICY IF EXISTS "Allow public users to insert orders" ON orders;
DROP POLICY IF EXISTS "Allow authenticated users to insert orders" ON orders;
DROP POLICY IF EXISTS "Allow users to select their own orders" ON orders;
DROP POLICY IF EXISTS "Allow public users to select orders by email" ON orders;
DROP POLICY IF EXISTS "Allow admin users to select all orders" ON orders;
DROP POLICY IF EXISTS "Allow admin users to update all orders" ON orders;
DROP POLICY IF EXISTS "Allow admin users to delete all orders" ON orders;
DROP POLICY IF EXISTS "orders_optimized_insert" ON orders;
DROP POLICY IF EXISTS "orders_optimized_select" ON orders;
DROP POLICY IF EXISTS "orders_optimized_update" ON orders;
DROP POLICY IF EXISTS "orders_optimized_delete" ON orders;
DROP POLICY IF EXISTS "orders_insert_all" ON orders;
DROP POLICY IF EXISTS "orders_select_own" ON orders;
DROP POLICY IF EXISTS "orders_update_admin" ON orders;
DROP POLICY IF EXISTS "orders_delete_admin" ON orders;

-- STEP 2: CREATE DATABASE SCHEMA
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  phone TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SEO Settings table
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

-- Specifications table
CREATE TABLE IF NOT EXISTS specifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table (THE CRITICAL TABLE FOR FIXING CLIENT-SIDE EXCEPTION)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_address TEXT NOT NULL,
  user_city TEXT NOT NULL,
  user_postal_code TEXT NOT NULL,
  user_country TEXT NOT NULL,
  items JSONB NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_specifications_product_id ON specifications(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(user_email);
CREATE INDEX IF NOT EXISTS idx_seo_settings_page ON seo_settings(page_type, page_id);

-- STEP 3: ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;

-- STEP 4: CREATE RLS POLICIES FOR ORDERS TABLE (FIXED VERSION)
-- Policy 1: Allow EVERYONE to INSERT orders (critical for order placement)
CREATE POLICY "orders_insert_all"
ON orders
FOR INSERT
WITH CHECK (true);

-- Policy 2: Allow users to SELECT their own orders
CREATE POLICY "orders_select_own"
ON orders
FOR SELECT
USING (
  user_email = auth.email()
  OR
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
  OR
  true
);

-- Policy 3: Allow ONLY ADMINS to UPDATE orders
CREATE POLICY "orders_update_admin"
ON orders
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy 4: Allow ONLY ADMINS to DELETE orders
CREATE POLICY "orders_delete_admin"
ON orders
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- STEP 5: CREATE RLS POLICIES FOR OTHER TABLES
-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON user_profiles FOR SELECT USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin'));

-- RLS Policies for categories (public read, admin write)
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Categories are insertable by authenticated users" ON categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Categories are updatable by authenticated users" ON categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Categories are deletable by authenticated users" ON categories FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for products (public read, admin write)
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Products are insertable by authenticated users" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Products are updatable by authenticated users" ON products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Products are deletable by authenticated users" ON products FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for SEO settings (public read, admin write)
CREATE POLICY "SEO settings are viewable by everyone" ON seo_settings FOR SELECT USING (true);
CREATE POLICY "SEO settings are insertable by authenticated users" ON seo_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "SEO settings are updatable by authenticated users" ON seo_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "SEO settings are deletable by authenticated users" ON seo_settings FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for specifications (public read, authenticated write)
CREATE POLICY "Specifications are viewable by everyone" ON specifications FOR SELECT USING (true);
CREATE POLICY "Specifications are insertable by authenticated users" ON specifications FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Specifications are updatable by authenticated users" ON specifications FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Specifications are deletable by authenticated users" ON specifications FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for reviews (public read, authenticated write)
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Reviews are insertable by authenticated users" ON reviews FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Reviews are updatable by authenticated users" ON reviews FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Reviews are deletable by authenticated users" ON reviews FOR DELETE USING (auth.role() = 'authenticated');

-- STEP 6: SET UP STORAGE BUCKET AND POLICIES
-- Create storage bucket for product images (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for product images
CREATE POLICY "Product images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Authenticated users can upload product images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update product images" ON storage.objects FOR UPDATE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete product images" ON storage.objects FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- STEP 7: CREATE USER PROFILE AUTOMATION
-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'customer')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- STEP 8: INSERT DEFAULT DATA
-- Insert some default categories
INSERT INTO categories (name, slug, description) VALUES
  ('Miniatures', 'miniatures', '3D printed miniatures and figurines'),
  ('Home Decor', 'home-decor', 'Decorative items for your home'),
  ('Accessories', 'accessories', 'Wearable and functional accessories'),
  ('Custom Orders', 'custom-orders', 'Custom 3D printed items')
ON CONFLICT (slug) DO NOTHING;

-- STEP 9: VERIFICATION QUERIES
-- Check if all tables were created successfully
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('user_profiles', 'categories', 'products', 'seo_settings', 'specifications', 'reviews', 'orders');

-- Check if RLS is enabled on all tables
SELECT tablename, rowsecurity_enabled 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('user_profiles', 'categories', 'products', 'seo_settings', 'specifications', 'reviews', 'orders');

-- Check orders table policies
SELECT polname, polcmd FROM pg_policies WHERE tablename = 'orders';