# ⚡ Quick Start - Database Migration (2 Minutes)

## 🎯 Goal
Add the `original_price` column to your Supabase database to enable discount pricing.

---

## 📋 Step-by-Step Instructions

### Step 1: Open Supabase
Go to: https://app.supabase.com

### Step 2: Select Your Project
Click on your project: **m42k3d.shop**

### Step 3: Open SQL Editor
In the left sidebar, click **SQL Editor**

### Step 4: Create New Query
Click the **New Query** button (or press `Ctrl+K`)

### Step 5: Copy This SQL

```sql
-- Migration: Add original_price column to products table
-- This migration adds support for discount pricing

-- Add original_price column if it doesn't exist
ALTER TABLE products
ADD COLUMN IF NOT EXISTS original_price DECIMAL(10, 2);

-- Add comment to explain the column
COMMENT ON COLUMN products.original_price IS 'The original price before discount. If set and greater than price, a discount is shown.';
```

### Step 6: Paste Into Editor
Paste the SQL code into the SQL editor window

### Step 7: Run the Query
Click the **Run** button (or press `Ctrl+Enter`)

### Step 8: Verify Success
You should see:
```
Success. No rows returned
```

---

## ✅ Verification (Optional)

Run this query to confirm the column was added:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;
```

You should see `original_price` in the list with data type `numeric`.

---

## 🎉 Done!

The migration is complete. Your database now supports discount pricing!

---

## 🧪 Test It Out

### In Admin Panel:
1. Go to Admin → Manage Products
2. Create a new product:
   - Name: "Test Product"
   - Price (Sale Price): $40.00
   - Original Price: $50.00
   - Save

### On Product Page:
1. Go to Products
2. Click on "Test Product"
3. You should see:
   - ~~$50.00~~ $40.00 [20% OFF]

---

## ⚠️ Troubleshooting

**Q: I got an error**
A: Check that you're in the correct Supabase project and have admin permissions

**Q: Nothing happened**
A: The column might already exist (that's fine). Run the verification query to check.

**Q: I don't see the column**
A: Refresh the page and try again

---

## 📞 Need Help?

Refer to `DATABASE_MIGRATION_GUIDE.md` for detailed instructions and troubleshooting.

---

## 🚀 That's It!

Your database is now ready for discount pricing. The styling is already live on your website!

