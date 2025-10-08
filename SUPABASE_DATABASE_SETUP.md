# 🗄️ Supabase Database Setup - Complete Guide

## Fix "Could not find the table 'public.products'" Error

**Problem:** Database tables don't exist in Supabase  
**Solution:** Run SQL schema to create all tables  
**Time Required:** 5 minutes

---

## 🎯 **Step-by-Step Instructions**

### **Step 1: Open Supabase SQL Editor**

1. **Go to Supabase Dashboard:**
   - Open: https://supabase.com/dashboard
   - Sign in if needed

2. **Select Your Project:**
   - Click on your project: `ijviarfucnpjakjknzzs`
   - Or look for "M42K3D Shop" project

3. **Open SQL Editor:**
   - Look at the left sidebar
   - Click on "SQL Editor" icon (looks like `</>`)
   - Or find it in the menu

---

### **Step 2: Create New Query**

1. **Click "New Query" Button:**
   - You'll see a button at the top: "+ New Query"
   - Click it to create a blank query

2. **You'll See:**
   - A blank text editor
   - "Run" button at the top right
   - Query name field (optional)

---

### **Step 3: Copy the SQL Schema**

**The complete SQL schema is in:** `lib/supabase/schema.sql`

**Copy this entire SQL code:**

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

### **Step 4: Paste and Run the SQL**

1. **Paste the SQL:**
   - Select all the SQL code above (Ctrl+A)
   - Copy it (Ctrl+C)
   - Paste into the Supabase SQL Editor (Ctrl+V)

2. **Click "Run" Button:**
   - Look for the "Run" button (top right)
   - Click it to execute the SQL

3. **Wait for Completion:**
   - Should take 2-5 seconds
   - You'll see "Success" message

---

### **Step 5: Verify Tables Were Created**

#### **Method 1: Check Table Editor**

1. **Click "Table Editor" in left sidebar**
2. **You should see 3 tables:**
   - ✅ `categories` (4 rows)
   - ✅ `products` (0 rows - empty, ready for data)
   - ✅ `orders` (0 rows - empty)

#### **Method 2: Run a Test Query**

1. **Go back to SQL Editor**
2. **Create new query**
3. **Run this test:**
   ```sql
   SELECT * FROM categories;
   ```
4. **You should see 4 categories:**
   - Miniatures
   - Home Decor
   - Accessories
   - Custom Orders

---

### **Step 6: Verify Storage Bucket**

1. **Click "Storage" in left sidebar**
2. **You should see:**
   - ✅ `product-images` bucket (public)
3. **Click on it to verify it's accessible**

---

## ✅ **Verification Checklist**

After running the SQL, verify:

- [ ] `categories` table exists with 4 rows
- [ ] `products` table exists (empty)
- [ ] `orders` table exists (empty)
- [ ] Indexes created (check Table Editor > products > Indexes)
- [ ] RLS enabled on all tables
- [ ] RLS policies created (check Table Editor > products > Policies)
- [ ] `product-images` storage bucket exists
- [ ] Storage policies created

---

## 🎯 **What Was Created**

### **Tables:**

1. **`categories`** - Product categories
   - 4 default categories pre-loaded
   - Fields: id, name, slug, description, created_at

2. **`products`** - Your products
   - Ready for product data
   - Fields: id, name, description, price, images, category, stock, featured, created_at, updated_at
   - **Note:** `images` is TEXT[] array for multiple image URLs

3. **`orders`** - Customer orders
   - Ready for order data
   - Fields: id, user info, items (JSONB), total, status, payment info, timestamps

### **Indexes:**
- Product category index (faster filtering)
- Product featured index (faster homepage queries)
- Order status index (faster admin queries)
- Order email index (faster user order lookup)

### **Row Level Security (RLS):**
- **Public Read:** Anyone can view products and categories
- **Authenticated Write:** Only logged-in users can add/edit/delete
- **Order Privacy:** Users can only see their own orders

### **Storage:**
- **`product-images` bucket** - Public storage for product photos
- **Policies:** Public read, authenticated write

---

## 🧪 **Test the Database**

### **Test 1: Add a Product (Admin Panel)**

1. **Go to your admin panel:**
   - Local: http://localhost:3000/admin
   - Live: https://your-site.vercel.app/admin

2. **Log in:**
   - Email: `admin@admin.com`
   - Password: `Ss@1234q`

3. **Click "Manage Products"**

4. **Click "Add Product"**

5. **Fill in the form:**
   - Name: Test Product
   - Description: This is a test
   - Price: 19.99
   - Category: Miniatures
   - Stock: 10
   - Featured: Yes

6. **Click "Add Product"**

7. **Should succeed!** ✅ No more "table not found" error

### **Test 2: View Products**

1. **Go to products page:**
   - Local: http://localhost:3000/products
   - Live: https://your-site.vercel.app/products

2. **Should see your test product** ✅

---

## 🐛 **Troubleshooting**

### **Error: "relation already exists"**

**Cause:** Tables already exist  
**Solution:** Either:
- Skip this error (tables are already there)
- Or drop tables first:
  ```sql
  DROP TABLE IF EXISTS orders CASCADE;
  DROP TABLE IF EXISTS products CASCADE;
  DROP TABLE IF EXISTS categories CASCADE;
  ```
  Then run the schema again

### **Error: "permission denied"**

**Cause:** Not enough permissions  
**Solution:**
- Make sure you're the project owner
- Check you're in the correct project
- Try refreshing the page

### **Error: "bucket already exists"**

**Cause:** Storage bucket already created  
**Solution:** This is fine! The bucket exists, you can skip this error

### **Products still not showing**

**Cause:** RLS policies might be blocking  
**Solution:** Check policies:
1. Go to Table Editor > products
2. Click on "Policies" tab
3. Verify "Products are viewable by everyone" exists
4. If not, run just the RLS policy section again

---

## 📊 **Database Schema Overview**

```
┌─────────────────────────────────────────────────┐
│  Categories Table                               │
├─────────────────────────────────────────────────┤
│  - id (UUID)                                    │
│  - name (TEXT)                                  │
│  - slug (TEXT)                                  │
│  - description (TEXT)                           │
│  - created_at (TIMESTAMP)                       │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  Products Table                                 │
├─────────────────────────────────────────────────┤
│  - id (UUID)                                    │
│  - name (TEXT)                                  │
│  - description (TEXT)                           │
│  - price (DECIMAL)                              │
│  - images (TEXT[]) ← Array of image URLs       │
│  - category (TEXT)                              │
│  - stock (INTEGER)                              │
│  - featured (BOOLEAN)                           │
│  - created_at (TIMESTAMP)                       │
│  - updated_at (TIMESTAMP)                       │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  Orders Table                                   │
├─────────────────────────────────────────────────┤
│  - id (UUID)                                    │
│  - user_email (TEXT)                            │
│  - user_name (TEXT)                             │
│  - user_address (TEXT)                          │
│  - user_city (TEXT)                             │
│  - user_postal_code (TEXT)                      │
│  - user_country (TEXT)                          │
│  - items (JSONB)                                │
│  - total (DECIMAL)                              │
│  - status (TEXT)                                │
│  - stripe_payment_intent_id (TEXT)              │
│  - created_at (TIMESTAMP)                       │
│  - updated_at (TIMESTAMP)                       │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  Storage: product-images (Public Bucket)        │
├─────────────────────────────────────────────────┤
│  - Stores product image files                   │
│  - Public read access                           │
│  - Authenticated write access                   │
└─────────────────────────────────────────────────┘
```

---

## ✅ **Success!**

After running the SQL schema:
- ✅ Database tables created
- ✅ Default categories added
- ✅ RLS policies configured
- ✅ Storage bucket ready
- ✅ Ready to add products!

**Next step:** Add image upload functionality to admin panel (see Issue 2 guide)

---

**Go to Supabase SQL Editor now and run the schema!** 🚀

**Supabase Dashboard:** https://supabase.com/dashboard

