# 📸 Visual Guide - Database Migration

## 🎯 Quick Overview

This guide shows you exactly where to click and what to do in the Supabase dashboard.

---

## 📍 Step 1: Supabase Dashboard

**URL:** https://app.supabase.com

**What you'll see:**
```
┌─────────────────────────────────────────┐
│ Supabase Dashboard                      │
├─────────────────────────────────────────┤
│ Your Projects:                          │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ m42k3d.shop                         │ │ ← CLICK HERE
│ │ Production Database                 │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Other Project                       │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Action:** Click on **m42k3d.shop** project

---

## 📍 Step 2: Project Dashboard

**What you'll see:**
```
┌──────────────────────────────────────────────────┐
│ m42k3d.shop                                      │
├──────────────────────────────────────────────────┤
│ LEFT SIDEBAR:                                    │
│                                                  │
│ 📊 Dashboard                                     │
│ 📋 SQL Editor          ← CLICK HERE              │
│ 📁 Table Editor                                  │
│ 🔐 Authentication                               │
│ ⚙️  Settings                                     │
│                                                  │
├──────────────────────────────────────────────────┤
│ MAIN AREA:                                       │
│ (Shows project overview)                         │
└──────────────────────────────────────────────────┘
```

**Action:** Click on **SQL Editor** in the left sidebar

---

## 📍 Step 3: SQL Editor

**What you'll see:**
```
┌──────────────────────────────────────────────────┐
│ SQL Editor                                       │
├──────────────────────────────────────────────────┤
│ [New Query] [Run] [Format]                       │
├──────────────────────────────────────────────────┤
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ (Empty editor - ready for SQL)               │ │
│ │                                              │ │
│ │                                              │ │
│ │                                              │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Action:** Click **New Query** button (or press Ctrl+K)

---

## 📍 Step 4: Paste SQL Code

**What you'll do:**
1. Click in the editor area
2. Paste this SQL:

```sql
-- Migration: Add original_price column to products table
-- This migration adds support for discount pricing

-- Add original_price column if it doesn't exist
ALTER TABLE products
ADD COLUMN IF NOT EXISTS original_price DECIMAL(10, 2);

-- Add comment to explain the column
COMMENT ON COLUMN products.original_price IS 'The original price before discount. If set and greater than price, a discount is shown.';
```

**What you'll see:**
```
┌──────────────────────────────────────────────────┐
│ SQL Editor                                       │
├──────────────────────────────────────────────────┤
│ [New Query] [Run] [Format]                       │
├──────────────────────────────────────────────────┤
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ -- Migration: Add original_price column...   │ │
│ │ ALTER TABLE products                         │ │
│ │ ADD COLUMN IF NOT EXISTS original_price...   │ │
│ │ COMMENT ON COLUMN products.original_price... │ │
│ │                                              │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Action:** Paste the SQL code

---

## 📍 Step 5: Run the Query

**What you'll do:**
1. Click the **Run** button (blue button, top right)
2. OR press `Ctrl+Enter`

**What you'll see:**
```
┌──────────────────────────────────────────────────┐
│ SQL Editor                                       │
├──────────────────────────────────────────────────┤
│ [New Query] [Run] [Format]                       │
├──────────────────────────────────────────────────┤
│ (SQL code shown above)                           │
├──────────────────────────────────────────────────┤
│ RESULTS:                                         │
│ ✅ Success. No rows returned                     │
│                                                  │
│ Execution time: 0.234s                           │
└──────────────────────────────────────────────────┘
```

**Action:** Click **Run** button

---

## ✅ Step 6: Verify Success

**Expected Result:**
```
✅ Success. No rows returned
```

This means the migration ran successfully!

---

## 🔍 Step 7: Verify the Column Exists (Optional)

**Run this verification query:**

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name = 'original_price';
```

**Expected Result:**
```
┌────────────────┬───────────┬─────────────┐
│ column_name    │ data_type │ is_nullable │
├────────────────┼───────────┼─────────────┤
│ original_price │ numeric   │ YES         │
└────────────────┴───────────┴─────────────┘
```

---

## 📊 Step 8: View All Columns (Optional)

**Run this query to see all columns:**

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;
```

**Expected Result:**
```
┌────────────────┬──────────────────────┬─────────────┐
│ column_name    │ data_type            │ is_nullable │
├────────────────┼──────────────────────┼─────────────┤
│ id             │ uuid                 │ NO          │
│ name           │ text                 │ NO          │
│ description    │ text                 │ NO          │
│ price          │ numeric              │ NO          │
│ original_price │ numeric              │ YES         │ ← NEW!
│ images         │ text[]               │ YES         │
│ category       │ text                 │ NO          │
│ stock          │ integer              │ YES         │
│ featured       │ boolean              │ YES         │
│ created_at     │ timestamp with tz    │ YES         │
│ updated_at     │ timestamp with tz    │ YES         │
└────────────────┴──────────────────────┴─────────────┘
```

---

## 🎉 Migration Complete!

Once you see the success message, the migration is complete.

**Next Steps:**
1. Refresh your browser
2. Go to Admin → Manage Products
3. Try creating a product with an original price
4. It should work without errors!

---

## 📱 Mobile View

If you're on mobile, the steps are the same:
1. Go to https://app.supabase.com
2. Tap on your project
3. Tap SQL Editor
4. Tap New Query
5. Paste the SQL
6. Tap Run

---

## 💡 Tips

- **Keyboard Shortcut:** Press `Ctrl+Enter` to run the query instead of clicking Run
- **Format SQL:** Click Format button to auto-format the SQL code
- **Save Query:** You can save queries for later use
- **Multiple Queries:** You can run multiple queries in sequence

---

## ⚠️ Common Issues

### Issue: "Column already exists"
**Solution:** This is fine! The `IF NOT EXISTS` clause prevents errors.

### Issue: Nothing happens when I click Run
**Solution:** 
- Make sure you've pasted the SQL code
- Check your internet connection
- Try refreshing the page

### Issue: Error message appears
**Solution:**
- Check that you're in the correct project
- Verify you have admin permissions
- Try running the verification query to check status

---

## 🚀 You're All Set!

Follow these steps and your migration will be applied successfully!

