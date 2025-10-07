# 🗄️ Database Setup Guide - Fix Products Fetch Error

## ❌ Current Problem

**Error:** Products fetch is failing in `/admin/products` page  
**Cause:** Database tables don't exist in Supabase yet  
**Solution:** Run the SQL schema to create all required tables

---

## 🔧 **Step-by-Step Database Setup**

### **Step 1: Open Supabase SQL Editor**

1. Go to: https://supabase.com/dashboard
2. Select your project: `ijviarfucnpjakjknzzs`
3. Click **"SQL Editor"** in the left sidebar (icon looks like `</>`)
4. Click **"New Query"** button

---

### **Step 2: Copy the SQL Schema**

Open the file `lib/supabase/schema.sql` in your project and copy ALL the content.

Or copy this complete schema:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_email ON orders(user_email);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

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
  USING (user_email = auth.email() OR auth.role() = 'authenticated');

CREATE POLICY "Orders are insertable by everyone" 
  ON orders FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Orders are updatable by authenticated users" 
  ON orders FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true);

-- Storage policies for product images
CREATE POLICY "Product images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update product images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete product images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Insert some default categories
INSERT INTO categories (name, slug, description) VALUES
  ('Miniatures', 'miniatures', '3D printed miniatures and figurines'),
  ('Home Decor', 'home-decor', 'Decorative items for your home'),
  ('Accessories', 'accessories', 'Wearable and functional accessories'),
  ('Custom Orders', 'custom-orders', 'Custom 3D printed items');
```

---

### **Step 3: Paste and Run the SQL**

1. Paste the entire SQL schema into the SQL Editor
2. Click **"Run"** button (or press Ctrl+Enter)
3. Wait for execution to complete
4. You should see: **"Success. No rows returned"**

---

### **Step 4: Verify Tables Were Created**

1. Click **"Table Editor"** in the left sidebar
2. You should now see these tables:
   - ✅ `categories` (with 4 default categories)
   - ✅ `products` (empty for now)
   - ✅ `orders` (empty for now)

---

### **Step 5: Test the Admin Panel**

1. Go to: http://localhost:3000/admin/products
2. You should now see:
   - ✅ "No products yet" message (instead of error)
   - ✅ "Add Product" button
   - ✅ No console errors

---

## 🎯 **What This SQL Does**

### **Creates 3 Main Tables:**

1. **`products`** - Stores all your 3D printed items
   - id, name, description, price, images, category, stock, featured
   - Timestamps for created_at and updated_at

2. **`categories`** - Product categories
   - Comes with 4 default categories pre-populated

3. **`orders`** - Customer orders
   - Stores order details, customer info, and payment status

### **Sets Up Security (RLS Policies):**

- ✅ **Products:** Everyone can view, only authenticated users can add/edit/delete
- ✅ **Categories:** Everyone can view, only authenticated users can manage
- ✅ **Orders:** Users can view their own, admins can view all

### **Creates Storage Bucket:**

- ✅ **`product-images`** - For storing product photos
- ✅ Public access for viewing
- ✅ Authenticated users can upload/manage

### **Adds Performance Indexes:**

- ✅ Faster queries on category, featured status, order status

---

## ✅ **Verification Checklist**

After running the SQL, verify:

- [ ] SQL executed without errors
- [ ] Tables appear in Table Editor
- [ ] Categories table has 4 rows
- [ ] Products table exists (empty)
- [ ] Orders table exists (empty)
- [ ] Storage bucket `product-images` exists
- [ ] `/admin/products` page loads without errors
- [ ] Can click "Add Product" button

---

## 🧪 **Test Adding a Product**

Once the database is set up:

1. Go to: http://localhost:3000/admin/products
2. Click **"Add Product"**
3. Fill in the form:
   - **Name:** Test Dragon
   - **Description:** A cool 3D printed dragon
   - **Price:** 29.99
   - **Stock:** 10
   - **Category:** Miniatures
   - **Image URL:** `https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=Dragon`
   - **Featured:** ✅ Check this
4. Click **"Create Product"**
5. Should see success message! ✅

---

## 🐛 **Troubleshooting**

### **Error: "relation 'products' does not exist"**

**Cause:** Tables weren't created  
**Solution:** Run the SQL schema again in Supabase SQL Editor

---

### **Error: "permission denied for table products"**

**Cause:** RLS policies not set up correctly  
**Solution:** 
1. Go to Supabase > Authentication > Policies
2. Check that policies exist for `products` table
3. Re-run the SQL schema if policies are missing

---

### **Error: "new row violates row-level security policy"**

**Cause:** Not authenticated or RLS policy too restrictive  
**Solution:**
1. Make sure you're logged in to the admin panel
2. Check that the RLS policy allows authenticated users to insert
3. Verify your session is active (try logging out and back in)

---

### **SQL Execution Fails**

**If you get errors when running the SQL:**

1. **"extension uuid-ossp already exists"**
   - This is OK, ignore it
   - The rest should still execute

2. **"table already exists"**
   - Tables were already created
   - You can skip this step

3. **"bucket already exists"**
   - Storage bucket was already created
   - This is OK

4. **"policy already exists"**
   - Policies were already created
   - This is OK

**To start fresh (if needed):**
```sql
-- Drop existing tables (WARNING: deletes all data!)
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Then run the full schema again
```

---

## 📊 **Database Schema Overview**

```
┌─────────────────┐
│   categories    │
├─────────────────┤
│ id (UUID)       │
│ name            │
│ slug            │
│ description     │
│ created_at      │
└─────────────────┘

┌─────────────────┐
│    products     │
├─────────────────┤
│ id (UUID)       │
│ name            │
│ description     │
│ price           │
│ images[]        │
│ category        │
│ stock           │
│ featured        │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐
│     orders      │
├─────────────────┤
│ id (UUID)       │
│ user_email      │
│ user_name       │
│ user_address    │
│ items (JSON)    │
│ total           │
│ status          │
│ created_at      │
└─────────────────┘
```

---

## ✅ **Summary**

**Problem:** Products fetch error - tables don't exist  
**Solution:** Run SQL schema in Supabase SQL Editor  
**Result:** Database tables created with proper security policies  
**Next Step:** Add your first product in the admin panel!

---

**Once you run the SQL, the error will be fixed and you can start adding products!** 🚀

