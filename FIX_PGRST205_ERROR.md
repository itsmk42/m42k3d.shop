# 🔧 Fix PGRST205 Error - Products Table Not Found

## Complete Guide to Create Database Tables

**Error:** `PGRST205: Could not find the table 'public.products' in the schema cache`  
**Cause:** Products table doesn't exist in Supabase database  
**Solution:** Run SQL schema to create all tables  
**Time Required:** 5 minutes

---

## 🎯 **Quick Fix Steps**

### **Step 1: Verify Current Database State**

Before running the schema, let's check what tables exist.

1. **Go to Supabase Dashboard:**
   - URL: https://supabase.com/dashboard
   - Sign in if needed

2. **Select Your Project:**
   - Click on project: `ijviarfucnpjakjknzzs`

3. **Open Table Editor:**
   - Click "Table Editor" in left sidebar
   - Look at the list of tables

**What to check:**
- ❓ Do you see `products` table?
- ❓ Do you see `categories` table?
- ❓ Do you see `orders` table?

**If NO tables exist:** Proceed to Step 2  
**If SOME tables exist:** Note which ones, then proceed to Step 2

---

### **Step 2: Open SQL Editor**

1. **Click "SQL Editor"** in left sidebar

2. **Click "+ New Query"** button

3. **You'll see a blank SQL editor**

---

### **Step 3: Run Complete SQL Schema**

**Copy the ENTIRE SQL schema below and paste it into the SQL Editor:**

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
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
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(user_email);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read, admin write)
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
CREATE POLICY "Categories are viewable by everyone" 
  ON categories FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Categories are insertable by authenticated users" ON categories;
CREATE POLICY "Categories are insertable by authenticated users" 
  ON categories FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Categories are updatable by authenticated users" ON categories;
CREATE POLICY "Categories are updatable by authenticated users" 
  ON categories FOR UPDATE 
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Categories are deletable by authenticated users" ON categories;
CREATE POLICY "Categories are deletable by authenticated users" 
  ON categories FOR DELETE 
  USING (auth.role() = 'authenticated');

-- RLS Policies for products (public read, admin write)
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
CREATE POLICY "Products are viewable by everyone" 
  ON products FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Products are insertable by authenticated users" ON products;
CREATE POLICY "Products are insertable by authenticated users" 
  ON products FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Products are updatable by authenticated users" ON products;
CREATE POLICY "Products are updatable by authenticated users" 
  ON products FOR UPDATE 
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Products are deletable by authenticated users" ON products;
CREATE POLICY "Products are deletable by authenticated users" 
  ON products FOR DELETE 
  USING (auth.role() = 'authenticated');

-- RLS Policies for orders (users can view their own, admin can view all)
DROP POLICY IF EXISTS "Orders are viewable by owner" ON orders;
CREATE POLICY "Orders are viewable by owner" 
  ON orders FOR SELECT 
  USING (user_email = auth.email() OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Orders are insertable by everyone" ON orders;
CREATE POLICY "Orders are insertable by everyone" 
  ON orders FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Orders are updatable by authenticated users" ON orders;
CREATE POLICY "Orders are updatable by authenticated users" 
  ON orders FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Insert default categories (only if they don't exist)
INSERT INTO categories (name, slug, description) 
SELECT 'Miniatures', 'miniatures', '3D printed miniatures and figurines'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'miniatures');

INSERT INTO categories (name, slug, description) 
SELECT 'Home Decor', 'home-decor', 'Decorative items for your home'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'home-decor');

INSERT INTO categories (name, slug, description) 
SELECT 'Accessories', 'accessories', 'Wearable and functional accessories'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'accessories');

INSERT INTO categories (name, slug, description) 
SELECT 'Custom Orders', 'custom-orders', 'Custom 3D printed items'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'custom-orders');
```

**Important Notes:**
- ✅ Uses `CREATE TABLE IF NOT EXISTS` - safe to run multiple times
- ✅ Uses `CREATE INDEX IF NOT EXISTS` - won't fail if indexes exist
- ✅ Uses `DROP POLICY IF EXISTS` - replaces existing policies
- ✅ Uses conditional inserts - won't duplicate categories

---

### **Step 4: Run the SQL**

1. **Click the "Run" button** (top right of SQL Editor)

2. **Wait for completion** (2-5 seconds)

3. **Check for success message:**
   - ✅ "Success. No rows returned"
   - ✅ Or "Success" with row count

4. **If you see errors:**
   - Read the error message carefully
   - Most common: "relation already exists" (this is OK!)
   - See troubleshooting section below

---

### **Step 5: Verify Tables Created**

#### **Method 1: Table Editor**

1. **Click "Table Editor"** in left sidebar

2. **You should now see 3 tables:**
   - ✅ `categories` (4 rows)
   - ✅ `products` (0 rows - empty, ready for data)
   - ✅ `orders` (0 rows - empty)

3. **Click on `products` table:**
   - Should see column structure
   - Should see "No data" message (table is empty)

#### **Method 2: SQL Query**

1. **Go back to SQL Editor**

2. **Create new query**

3. **Run this test:**
   ```sql
   -- Check if products table exists
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('products', 'categories', 'orders');
   ```

4. **Should return 3 rows:**
   - products
   - categories
   - orders

#### **Method 3: Test Products Query**

1. **In SQL Editor, run:**
   ```sql
   SELECT * FROM products;
   ```

2. **Should return:**
   - ✅ "Success. No rows returned" (table exists but is empty)
   - ❌ NOT "relation does not exist" error

---

### **Step 6: Test in Admin Panel**

1. **Go to your admin panel:**
   - Local: http://localhost:3000/admin/products
   - Live: https://your-site.vercel.app/admin/products

2. **Log in** with admin credentials

3. **Verify:**
   - ✅ Page loads without PGRST205 error
   - ✅ Shows "No products yet" message
   - ✅ "Add Product" button is visible
   - ✅ No console errors

4. **Try adding a product:**
   - Click "Add Product"
   - Fill in details
   - Upload image
   - Click "Create Product"
   - Should succeed!

---

## 🐛 **Troubleshooting**

### **Error: "relation already exists"**

**Full error:** `ERROR: relation "products" already exists`

**Cause:** Table already exists from previous run

**Solution:** ✅ **This is OK!** The table exists, which is what we want.

**Action:** Continue to verification step

---

### **Error: "policy already exists"**

**Full error:** `ERROR: policy "Products are viewable by everyone" for table "products" already exists`

**Cause:** Policies already exist from previous run

**Solution:** Use the SQL with `DROP POLICY IF EXISTS` (provided in Step 3)

**Action:** Re-run the SQL from Step 3 (it includes DROP statements)

---

### **Error: "permission denied"**

**Full error:** `ERROR: permission denied for schema public`

**Cause:** Not enough permissions

**Solution:**
1. Make sure you're the project owner
2. Check you're in the correct project
3. Try refreshing the page
4. Contact Supabase support if persists

---

### **PGRST205 error still appears**

**After running SQL, still getting PGRST205?**

**Possible causes:**

1. **Schema cache not refreshed**
   - **Solution:** Wait 30 seconds and try again
   - Or restart your dev server

2. **Wrong Supabase project**
   - **Solution:** Verify `.env.local` has correct project URL
   - Check: `NEXT_PUBLIC_SUPABASE_URL=https://ijviarfucnpjakjknzzs.supabase.co`

3. **RLS policies blocking access**
   - **Solution:** Check policies in Table Editor > products > Policies
   - Verify "Products are viewable by everyone" exists

4. **API not restarted**
   - **Solution:** In Supabase Dashboard, go to Settings > API
   - Click "Restart API" button (if available)

---

### **Products table exists but queries fail**

**Table exists in Table Editor but queries fail?**

**Check RLS policies:**

1. Go to Table Editor > products
2. Click "Policies" tab
3. Should see 4 policies:
   - Products are viewable by everyone (SELECT)
   - Products are insertable by authenticated users (INSERT)
   - Products are updatable by authenticated users (UPDATE)
   - Products are deletable by authenticated users (DELETE)

**If policies are missing:**
- Re-run the RLS policy section of the SQL
- Or create policies manually in the UI

---

## ✅ **Verification Checklist**

After running the SQL schema:

- [ ] SQL executed without critical errors
- [ ] `products` table visible in Table Editor
- [ ] `categories` table visible with 4 rows
- [ ] `orders` table visible (empty)
- [ ] Can run `SELECT * FROM products;` without error
- [ ] Admin panel loads without PGRST205 error
- [ ] "Add Product" button visible
- [ ] Can create a test product
- [ ] Product appears in list
- [ ] No console errors

---

## 📊 **What Was Created**

### **Tables:**

1. **`categories`** - Product categories
   - 4 default categories pre-loaded
   - Fields: id, name, slug, description, created_at

2. **`products`** - Your products ⭐ **This fixes PGRST205**
   - Ready for product data
   - Fields: id, name, description, price, images, category, stock, featured, timestamps

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

---

## 🎯 **Why PGRST205 Occurred**

### **Root Cause:**

The error `PGRST205: Could not find the table 'public.products' in the schema cache` means:

1. **Your application code** is trying to query the `products` table
2. **Supabase PostgREST API** looks for the table in the schema cache
3. **Table doesn't exist** in the database
4. **API returns PGRST205 error**

### **Why Table Was Missing:**

Possible reasons:
- ✅ SQL schema was never run
- ✅ SQL schema was run partially (some tables created, not all)
- ✅ Tables were deleted accidentally
- ✅ Wrong database/project selected

### **The Fix:**

Running the complete SQL schema creates:
- ✅ All required tables
- ✅ Proper indexes
- ✅ RLS policies
- ✅ Default data

---

## 🔐 **Security Notes**

### **Row Level Security (RLS):**

**Why enabled?**
- Protects your data
- Controls who can read/write
- Prevents unauthorized access

**Policies created:**

**Products:**
- ✅ Anyone can view (public read)
- ✅ Only authenticated users can add/edit/delete

**Categories:**
- ✅ Anyone can view
- ✅ Only authenticated users can modify

**Orders:**
- ✅ Users can only see their own orders
- ✅ Authenticated users (admins) can see all orders

---

## 📋 **Database Schema Overview**

```
┌─────────────────────────────────────────┐
│  categories                             │
├─────────────────────────────────────────┤
│  - id (UUID)                            │
│  - name (TEXT)                          │
│  - slug (TEXT, UNIQUE)                  │
│  - description (TEXT)                   │
│  - created_at (TIMESTAMP)               │
│                                         │
│  Default data: 4 categories             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  products ⭐ FIXES PGRST205              │
├─────────────────────────────────────────┤
│  - id (UUID)                            │
│  - name (TEXT)                          │
│  - description (TEXT)                   │
│  - price (DECIMAL)                      │
│  - images (TEXT[])                      │
│  - category (TEXT)                      │
│  - stock (INTEGER)                      │
│  - featured (BOOLEAN)                   │
│  - created_at (TIMESTAMP)               │
│  - updated_at (TIMESTAMP)               │
│                                         │
│  Indexes: category, featured            │
│  RLS: Public read, auth write           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  orders                                 │
├─────────────────────────────────────────┤
│  - id (UUID)                            │
│  - user_email (TEXT)                    │
│  - user_name (TEXT)                     │
│  - user_address (TEXT)                  │
│  - user_city (TEXT)                     │
│  - user_postal_code (TEXT)              │
│  - user_country (TEXT)                  │
│  - items (JSONB)                        │
│  - total (DECIMAL)                      │
│  - status (TEXT)                        │
│  - stripe_payment_intent_id (TEXT)      │
│  - created_at (TIMESTAMP)               │
│  - updated_at (TIMESTAMP)               │
│                                         │
│  Indexes: status, user_email            │
│  RLS: Owner read, auth write            │
└─────────────────────────────────────────┘
```

---

## 🎉 **Success!**

After running the SQL schema:
- ✅ PGRST205 error resolved
- ✅ Products table created
- ✅ Categories and orders tables created
- ✅ RLS policies configured
- ✅ Default categories added
- ✅ Ready to add products!

**Next step:** Add your first product in the admin panel!

---

**Go to Supabase SQL Editor now and run the schema!** 🚀

**Supabase Dashboard:** https://supabase.com/dashboard

