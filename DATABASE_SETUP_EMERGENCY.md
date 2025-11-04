# 🚨 EMERGENCY DATABASE SETUP GUIDE - Fix Client-Side Exception

## ❌ Current Problem
**Client-side exception error:** "Application error: a client-side exception has occurred while loading sparklesphere.store"

**Root Cause:** Database tables don't exist in Supabase, causing server-side API calls to fail

**Solution:** Set up the database schema immediately

---

## 🔧 **IMMEDIATE ACTION REQUIRED**

### **Step 1: Open Supabase Dashboard**
1. Go to: https://supabase.com/dashboard
2. Select your project: `ijviarfucnpjakjknzzs`
3. Click **"SQL Editor"** in the left sidebar (icon looks like `</>`)
4. Click **"New Query"** button

### **Step 2: Copy & Execute Database Schema**
Copy the ENTIRE content from `/Users/mk42/Downloads/sparklesphere.store/m42k3d.shop/lib/supabase/schema.sql` and paste it into the SQL Editor.

**OR** copy this complete schema:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles table (extends Supabase auth.users)
CREATE TABLE user_profiles (
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
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table (CRITICAL - This is what's missing!)
CREATE TABLE products (
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
CREATE TABLE seo_settings (
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
CREATE TABLE specifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
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
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_specifications_product_id ON specifications(product_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_email ON orders(user_email);
CREATE INDEX idx_seo_settings_page ON seo_settings(page_type, page_id);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON user_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for categories (public read, admin write)
CREATE POLICY "Categories are viewable by everyone" 
  ON categories FOR SELECT 
  USING (true);

CREATE POLICY "Categories are insertable by authenticated users" 
  ON categories FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Categories are updatable by authenticated users" 
  ON categories FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Categories are deletable by authenticated users" 
  ON categories FOR DELETE 
  USING (auth.role() = 'authenticated');

-- RLS Policies for products (public read, admin write)
CREATE POLICY "Products are viewable by everyone" 
  ON products FOR SELECT 
  USING (true);

CREATE POLICY "Products are insertable by authenticated users" 
  ON products FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Products are updatable by authenticated users" 
  ON products FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Products are deletable by authenticated users" 
  ON products FOR DELETE 
  USING (auth.role() = 'authenticated');

-- RLS Policies for orders (users can view their own, admin can view all)
CREATE POLICY "Orders are viewable by owner"
  ON orders FOR SELECT
  USING (
    user_id = auth.uid() OR
    user_email = auth.email() OR
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Orders are insertable by everyone"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Orders are updatable by authenticated users"
  ON orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for SEO settings (public read, admin write)
CREATE POLICY "SEO settings are viewable by everyone"
  ON seo_settings FOR SELECT
  USING (true);

CREATE POLICY "SEO settings are insertable by authenticated users"
  ON seo_settings FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
```

### **Step 3: Execute the SQL**
1. Click the **"Run"** button in Supabase SQL Editor
2. Wait for the query to complete (should show success message)
3. **IMPORTANT:** This will create all required tables including the `products` table

---

## ✅ **VERIFICATION STEPS**

### **Step 4: Verify Database Setup**
1. Go to **"Table Editor"** in Supabase dashboard
2. You should see these tables:
   - `products` ✅ (This was missing!)
   - `categories`
   - `user_profiles`
   - `orders`
   - `reviews`
   - `specifications`
   - `seo_settings`

### **Step 5: Add Test Data (Optional)**
If you want to test immediately, run this SQL:

```sql
-- Insert a test category
INSERT INTO categories (name, slug, description) VALUES 
('3D Printed Lamps', '3d-printed-lamps', 'Beautiful 3D printed ambient lighting');

-- Insert a test product
INSERT INTO products (name, description, price, category, stock, featured, images) VALUES 
('Ambient Desk Lamp', 'A beautiful 3D printed desk lamp with warm ambient lighting', 89.99, '3D Printed Lamps', 10, true, ARRAY['https://ijviarfucnpjakjknzzs.supabase.co/storage/v1/object/public/products/lamp1.jpg']);
```

---

## 🧪 **TEST THE FIX**

### **Step 6: Restart Development Server**
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

### **Step 7: Test the Application**
1. Open http://localhost:3000
2. The client-side exception should be **GONE**
3. Homepage should load without errors
4. Products should display correctly

---

## 🔍 **DEBUGGING CHECKLIST**

If you still see errors:

- [ ] Database tables created successfully?
- [ ] Supabase URL and keys correct in `.env.local`?
- [ ] Server restarted after database setup?
- [ ] Check browser console for specific error messages
- [ ] Check terminal for server-side error logs

---

## 📞 **NEED HELP?**

**Common Issues:**
1. **"relation products does not exist"** → Database not set up
2. **"fetch failed"** → Check network/supabase connection
3. **"permission denied"** → Check RLS policies

**Next Steps:**
- Add your first product via admin panel
- Configure payment methods
- Set up shipping rates
- Test the complete order flow

---

**🎯 Once database is set up, the client-side exception will be completely resolved!**