# ⚡ Quick Start - Apply Specifications & Reviews Migration

## 🎯 Goal
Add the `specifications` and `reviews` tables to your Supabase database to enable product specifications and customer reviews functionality.

---

## 📋 Step-by-Step Instructions

### Step 1: Open Supabase Dashboard
Go to: https://app.supabase.com

### Step 2: Select Your Project
Click on your project: **m42k3d.shop**

### Step 3: Open SQL Editor
In the left sidebar, click **SQL Editor**

### Step 4: Create New Query
Click the **New Query** button (or press `Ctrl+K`)

### Step 5: Copy This SQL

```sql
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
```

### Step 6: Paste Into Editor
1. Click in the SQL editor window
2. Paste the SQL code (Ctrl+V)
3. You should see the SQL code in the editor

### Step 7: Execute the Query
1. Click the **Run** button (blue button, top right)
   - OR press `Ctrl+Enter`
2. Wait for the query to complete (usually 1-2 seconds)

### Step 8: Verify Success
You should see this message:
```
Success. No rows returned
```

This is **GOOD** - it means the migration ran successfully!

---

## ✔️ Verify the Migration

### Quick Verification

Run this query to confirm the tables exist:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_name IN ('specifications', 'reviews');
```

**Expected Result:**
```
table_name
specifications
reviews
```

---

## 🎉 Migration Complete!

Once you see the success message, the migration is complete.

**Next Steps:**
1. Refresh your browser
2. Go to Admin → Manage Products
3. Try creating a product with specifications
4. Try adding reviews to a product
5. View the product on the product detail page

---

## 🧪 Test It Out

### Test 1: Add Specifications
1. Go to Admin → Manage Products
2. Click "Add Product" or "Edit" on existing product
3. Scroll to "Product Specifications"
4. Add a specification:
   - Key: "Material"
   - Value: "PLA Plastic"
5. Click "Create Product" or "Update Product"
6. Should see: ✅ "Product created/updated successfully!"

### Test 2: Add Reviews
1. Go to Admin → Manage Products
2. Click "Edit" on a product
3. Scroll to "Customer Reviews"
4. Fill in review form:
   - Customer Name: "Test User"
   - Rating: 5 stars
   - Comment: "Great product!"
5. Click "Add Review"
6. Should see: ✅ "Review added successfully!"

### Test 3: View on Product Page
1. Go to Products page
2. Click on a product
3. Click "Specifications" section
4. Should see your specifications
5. Click "Customer Reviews" section
6. Should see your reviews

---

## ⚠️ Troubleshooting

### "Table already exists" error
**Solution:** This is fine! The `IF NOT EXISTS` clause handles this. The migration is safe to run multiple times.

### "Permission denied" error
**Solution:** 
- Make sure you're logged in as the project owner
- Check that you have admin/owner role in Supabase

### Query times out
**Solution:**
- Refresh the page and try again
- Check your internet connection

### Tables don't appear after running
**Solution:**
1. Refresh the Supabase dashboard (F5)
2. Go to **Table Editor**
3. Look for **specifications** and **reviews** tables
4. They should be listed

---

## 📊 What This Migration Does

| Table | Purpose | Fields |
|-------|---------|--------|
| **specifications** | Store product specifications | id, product_id, key, value, created_at, updated_at |
| **reviews** | Store customer reviews | id, product_id, customer_name, rating, comment, created_at, updated_at |

---

## 🔐 Security

- **Public Read:** Anyone can view specifications and reviews
- **Authenticated Write:** Only logged-in users can add/edit/delete
- **Row Level Security:** Enabled on both tables
- **Referential Integrity:** Specifications and reviews deleted when product is deleted

---

## 📁 Migration File

**Location:** `lib/supabase/migrations/add_specifications_and_reviews_tables.sql`

You can also copy the SQL from this file if needed.

---

## 🚀 You're All Set!

Follow the steps above to apply the migration. It should take about 2 minutes.

**Estimated Time:** 2 minutes
**Difficulty:** Easy ⭐
**Risk Level:** Very Low

Good luck! 🎊

