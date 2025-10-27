# Database Migration Guide - Add original_price Column

## 🔴 Current Issue

The application is trying to use an `original_price` column in the `products` table, but it doesn't exist in your Supabase database yet. This causes the error:

```
Could not find the 'original_price' column of 'products' in the schema cache
```

---

## ✅ Solution: Apply the Migration

### Step 1: Access Supabase Dashboard

1. Open [https://app.supabase.com](https://app.supabase.com)
2. Log in with your credentials
3. Select your project: **m42k3d.shop**

### Step 2: Open SQL Editor

1. In the left sidebar, click **SQL Editor**
2. Click the **New Query** button (or press `Ctrl+K`)
3. A new SQL editor window will open

### Step 3: Copy the Migration SQL

Copy the following SQL code:

```sql
-- Migration: Add original_price column to products table
-- This migration adds support for discount pricing

-- Add original_price column if it doesn't exist
ALTER TABLE products
ADD COLUMN IF NOT EXISTS original_price DECIMAL(10, 2);

-- Add comment to explain the column
COMMENT ON COLUMN products.original_price IS 'The original price before discount. If set and greater than price, a discount is shown.';
```

### Step 4: Paste and Execute

1. Paste the SQL code into the editor
2. Click the **Run** button (or press `Ctrl+Enter`)
3. Wait for the query to complete

**Expected Result:**
```
Success. No rows returned
```

---

## ✔️ Verify the Migration

Run this verification query to confirm the column was added:

```sql
-- Verify the column exists
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;
```

**Expected Output:**
You should see a table with all columns including:
```
column_name      | data_type | is_nullable
-----------------|-----------|-----------
id               | uuid      | NO
name             | text      | NO
description      | text      | NO
price            | numeric   | NO
original_price   | numeric   | YES
images           | text[]    | YES
category         | text      | NO
stock            | integer   | YES
featured         | boolean   | YES
created_at       | timestamp | YES
updated_at       | timestamp | YES
```

---

## 🎯 What This Migration Does

| Aspect | Details |
|--------|---------|
| **Column Name** | `original_price` |
| **Data Type** | DECIMAL(10, 2) |
| **Nullable** | YES (optional) |
| **Max Value** | $99,999.99 |
| **Decimal Places** | 2 (cents) |
| **Purpose** | Store the original price before discount |

---

## 💡 How It Works

### Without Discount
```
Product: Widget
Price: $50.00
Original Price: (empty/null)
Display: $50.00 (green)
```

### With Discount
```
Product: Widget
Price: $40.00 (sale price)
Original Price: $50.00
Display: ~~$50.00~~ $40.00 [20% OFF]
```

---

## 🔧 Using the Column in Admin Panel

Once the migration is applied, you can:

1. **Create a Product with Discount:**
   - Go to Admin Panel → Manage Products
   - Fill in "Price (Sale Price)": $40.00
   - Fill in "Original Price (Optional)": $50.00
   - Save the product
   - Discount will automatically calculate: 20% OFF

2. **Edit Existing Products:**
   - Go to Admin Panel → Manage Products
   - Click Edit on any product
   - Add an "Original Price" value
   - Save
   - Discount will display on the product page

3. **View on Product Pages:**
   - Product Detail Page: Shows both prices with discount badge
   - Product Cards: Shows sale price in green

---

## ⚠️ Troubleshooting

### Issue: "Column already exists"
**Solution:** This is fine! The `IF NOT EXISTS` clause handles this. The migration is idempotent (safe to run multiple times).

### Issue: "Permission denied"
**Solution:** 
- Ensure you're logged in as the project owner
- Check that you have admin/owner role in Supabase
- Try logging out and back in

### Issue: Query times out
**Solution:**
- This is unlikely for a simple ALTER TABLE
- Try refreshing the page and running again
- Check your internet connection

### Issue: Column doesn't appear after running
**Solution:**
1. Refresh the Supabase dashboard (F5)
2. Go to Table Editor
3. Select the `products` table
4. Scroll right to see all columns
5. Look for `original_price` column

---

## 📊 Database Schema After Migration

Your `products` table will have this structure:

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),  -- ← NEW COLUMN
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## ✨ After Migration

Once the migration is complete:

1. ✅ No more schema cache errors
2. ✅ Admin panel can set original prices
3. ✅ Product pages display discounts
4. ✅ Discount percentages calculate automatically
5. ✅ All pricing features work as designed

---

## 📝 Migration Files

The migration SQL is stored in:
- **File:** `lib/supabase/migrations/add_original_price_to_products.sql`
- **Also in:** `DATABASE_MIGRATION_GUIDE.md` (this file)

---

## 🚀 Next Steps

1. **Apply the migration** using the steps above
2. **Verify** the column was added
3. **Test** by creating a product with a discount in the admin panel
4. **Verify** the discount displays on the product page

---

## 📞 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify you're in the correct Supabase project
3. Ensure you have admin permissions
4. Try refreshing the dashboard
5. Check your internet connection

The migration is safe and can be run multiple times without issues!

