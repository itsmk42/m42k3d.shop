# 🎯 Complete Database Migration Guide

## 📌 Overview

This guide will help you apply the `original_price` column migration to your Supabase database. This is required to fix the error you're experiencing when trying to save products with original prices.

---

## ⚠️ The Problem

**Error Message:**
```
Could not find the 'original_price' column of 'products' in the schema cache
```

**Why?** The migration hasn't been applied to your live Supabase database yet.

**Solution:** Follow this guide to apply the migration.

---

## 📚 Available Guides

Choose the guide that works best for you:

### 1. **APPLY_MIGRATION_STEP_BY_STEP.md** ⭐ RECOMMENDED
- Detailed step-by-step instructions
- Includes troubleshooting section
- Best for first-time users
- **Time:** 5 minutes

### 2. **MIGRATION_VISUAL_GUIDE.md**
- Visual descriptions of each step
- Shows what you'll see in the dashboard
- ASCII diagrams for clarity
- **Time:** 5 minutes

### 3. **QUICK_START_MIGRATION.md**
- Quick 2-minute version
- For experienced users
- Minimal explanation
- **Time:** 2 minutes

### 4. **MIGRATION_CHECKLIST.md**
- Checklist format
- Track your progress
- Includes testing steps
- **Time:** 10 minutes (with testing)

---

## 🚀 Quick Start (2 Minutes)

If you're in a hurry, here's the quick version:

### Step 1: Go to Supabase
https://app.supabase.com → Select **m42k3d.shop** project

### Step 2: Open SQL Editor
Click **SQL Editor** in the left sidebar → Click **New Query**

### Step 3: Paste This SQL
```sql
ALTER TABLE products
ADD COLUMN IF NOT EXISTS original_price DECIMAL(10, 2);

COMMENT ON COLUMN products.original_price IS 'The original price before discount. If set and greater than price, a discount is shown.';
```

### Step 4: Run It
Click **Run** button (or press Ctrl+Enter)

### Step 5: Verify
You should see: **"Success. No rows returned"**

**Done!** ✅

---

## 📋 Detailed Steps (5 Minutes)

For more detailed instructions, see **APPLY_MIGRATION_STEP_BY_STEP.md**

---

## 🔍 Verification Queries

### Verify the Column Exists
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name = 'original_price';
```

**Expected Result:**
```
column_name    | data_type | is_nullable
original_price | numeric   | YES
```

### View All Columns
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;
```

---

## 🧪 Testing After Migration

### Test 1: Create Product with Discount
1. Go to Admin → Manage Products
2. Click "Add New Product"
3. Fill in:
   - Name: "Test Product"
   - Price: 40.00
   - **Original Price: 50.00** ← Should work now!
4. Click Save
5. Should see: ✅ "Product added successfully"

### Test 2: View Product
1. Go to Products page
2. Click on "Test Product"
3. Should see: ~~$50.00~~ $40.00 [20% OFF]

---

## ⚠️ Troubleshooting

### "Column already exists" error
**Solution:** This is fine! The `IF NOT EXISTS` clause handles this.

### "Permission denied" error
**Solution:** 
- Make sure you're logged in as project owner
- Check that you have admin role in Supabase

### Query times out
**Solution:**
- Refresh the page and try again
- Check your internet connection

### Still getting schema cache error
**Solution:**
1. Verify migration ran successfully
2. Refresh your browser (F5)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try again

---

## 📊 Migration Details

| Property | Value |
|----------|-------|
| **Column Name** | `original_price` |
| **Data Type** | DECIMAL(10, 2) |
| **Nullable** | YES (optional) |
| **Max Value** | $99,999.99 |
| **Decimal Places** | 2 (cents) |
| **Safe to Run** | YES |
| **Breaks Data** | NO |
| **Idempotent** | YES (safe to run multiple times) |

---

## 🎯 How It Works

### Without Discount
```
Product: Widget
Price: $50.00
Original Price: (empty)
Display: $50.00
```

### With Discount
```
Product: Widget
Price: $40.00 (sale price)
Original Price: $50.00
Display: ~~$50.00~~ $40.00 [20% OFF]
```

---

## 📁 Migration File

**Location:** `lib/supabase/migrations/add_original_price_to_products.sql`

**Content:**
```sql
-- Migration: Add original_price column to products table
-- This migration adds support for discount pricing

-- Add original_price column if it doesn't exist
ALTER TABLE products
ADD COLUMN IF NOT EXISTS original_price DECIMAL(10, 2);

-- Add comment to explain the column
COMMENT ON COLUMN products.original_price IS 'The original price before discount. If set and greater than price, a discount is shown.';
```

---

## ✅ After Migration

Once complete, you'll be able to:

✅ Set original prices in admin panel
✅ Create products with discounts
✅ View discount percentages on product pages
✅ Edit products with original prices
✅ No more schema cache errors

---

## 🎉 Success Indicators

You'll know the migration was successful when:

1. ✅ You see "Success. No rows returned" message
2. ✅ Verification query shows the column exists
3. ✅ Admin panel accepts original price values
4. ✅ Product pages display discounts correctly
5. ✅ No error messages appear

---

## 📞 Need Help?

1. **Quick questions?** Check the troubleshooting section above
2. **Step-by-step help?** Read APPLY_MIGRATION_STEP_BY_STEP.md
3. **Visual guide?** Check MIGRATION_VISUAL_GUIDE.md
4. **Tracking progress?** Use MIGRATION_CHECKLIST.md

---

## 🚀 You're Ready!

Choose your preferred guide above and follow the steps. The migration should take about 5 minutes.

**Estimated Time:** 5 minutes
**Difficulty:** Easy ⭐
**Risk Level:** Very Low

Good luck! 🎊

