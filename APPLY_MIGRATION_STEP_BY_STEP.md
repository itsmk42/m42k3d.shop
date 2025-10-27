# 🚀 Apply Database Migration - Step by Step

## ⚠️ Current Issue
You're getting this error when trying to save products with an original price:
```
Could not find the 'original_price' column of 'products' in the schema cache
```

**Why?** The migration hasn't been applied to your live Supabase database yet.

---

## ✅ Solution: Apply the Migration (5 minutes)

### **Step 1: Open Supabase Dashboard**
1. Go to: https://app.supabase.com
2. Log in with your credentials
3. You should see your projects listed

### **Step 2: Select Your Project**
1. Click on your project: **m42k3d.shop**
2. Wait for the dashboard to load

### **Step 3: Navigate to SQL Editor**
1. In the **left sidebar**, look for **SQL Editor**
2. Click on **SQL Editor**
3. You should see a list of recent queries (if any)

### **Step 4: Create a New Query**
1. Click the **New Query** button (top right)
   - OR press `Ctrl+K` on your keyboard
2. A blank SQL editor window will open

### **Step 5: Copy the Migration SQL**

Copy this exact SQL code:

```sql
-- Migration: Add original_price column to products table
-- This migration adds support for discount pricing

-- Add original_price column if it doesn't exist
ALTER TABLE products
ADD COLUMN IF NOT EXISTS original_price DECIMAL(10, 2);

-- Add comment to explain the column
COMMENT ON COLUMN products.original_price IS 'The original price before discount. If set and greater than price, a discount is shown.';
```

### **Step 6: Paste into the Editor**
1. Click in the SQL editor window
2. Paste the SQL code (Ctrl+V)
3. You should see the SQL code in the editor

### **Step 7: Execute the Query**
1. Click the **Run** button (blue button, top right)
   - OR press `Ctrl+Enter`
2. Wait for the query to complete (usually 1-2 seconds)

### **Step 8: Verify Success**
You should see this message:
```
Success. No rows returned
```

This is **GOOD** - it means the migration ran successfully!

---

## ✔️ Verify the Migration Was Applied

### **Option 1: Quick Verification (Recommended)**

Run this query to confirm the column exists:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name = 'original_price';
```

**Expected Result:**
```
column_name    | data_type | is_nullable
---------------|-----------|------------
original_price | numeric   | YES
```

### **Option 2: View All Columns**

Run this query to see all columns in the products table:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;
```

**Expected Result:** You should see `original_price` in the list

### **Option 3: Check in Table Editor**

1. Click **Table Editor** in the left sidebar
2. Click on the **products** table
3. Scroll right to see all columns
4. Look for **original_price** column

---

## 🎯 After Migration: Test It

### **Test 1: Create a Product with Discount**

1. Go to your website: https://m42k3d-shop-jqzt.vercel.app
2. Log in to Admin Panel
3. Go to **Admin** → **Manage Products**
4. Click **Add New Product**
5. Fill in the form:
   - Name: "Test Product"
   - Description: "Test description"
   - Price (Sale Price): 40.00
   - **Original Price: 50.00** ← This should now work!
   - Category: Select any category
   - Stock: 10
6. Click **Save Product**
7. You should see: ✅ "Product added successfully"

### **Test 2: View the Product**

1. Go to **Products** page
2. Find your "Test Product"
3. Click on it
4. You should see:
   - ~~$50.00~~ $40.00 [20% OFF]

---

## ⚠️ Troubleshooting

### **Problem: "Column already exists" error**
**Solution:** This is fine! The `IF NOT EXISTS` clause handles this. The migration is safe to run multiple times.

### **Problem: "Permission denied" error**
**Solution:**
- Make sure you're logged in as the project owner
- Check that you have admin/owner role in Supabase
- Try logging out and back in

### **Problem: Query times out**
**Solution:**
- This is unlikely for a simple ALTER TABLE
- Try refreshing the page and running again
- Check your internet connection

### **Problem: Column doesn't appear after running**
**Solution:**
1. Refresh the Supabase dashboard (F5)
2. Go to **Table Editor**
3. Click on the **products** table
4. Scroll right to see all columns
5. Look for **original_price** column

### **Problem: Still getting "Could not find 'original_price'" error**
**Solution:**
1. Make sure the migration ran successfully (check for "Success" message)
2. Refresh your browser (F5)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try again

---

## 📊 What This Migration Does

| Aspect | Details |
|--------|---------|
| **Column Name** | `original_price` |
| **Data Type** | DECIMAL(10, 2) |
| **Nullable** | YES (optional) |
| **Max Value** | $99,999.99 |
| **Decimal Places** | 2 (cents) |
| **Purpose** | Store original price before discount |
| **Safe to Run** | YES - uses `IF NOT EXISTS` |
| **Breaks Existing Data** | NO - only adds new column |

---

## 🔄 How It Works

### **Without Discount**
```
Product: Widget
Price: $50.00
Original Price: (empty/null)
Display: $50.00 (green)
```

### **With Discount**
```
Product: Widget
Price: $40.00 (sale price)
Original Price: $50.00
Display: ~~$50.00~~ $40.00 [20% OFF]
Discount: 20% OFF
```

---

## 📝 Migration Details

**File:** `lib/supabase/migrations/add_original_price_to_products.sql`

**SQL Code:**
```sql
ALTER TABLE products
ADD COLUMN IF NOT EXISTS original_price DECIMAL(10, 2);

COMMENT ON COLUMN products.original_price IS 'The original price before discount. If set and greater than price, a discount is shown.';
```

**Why `IF NOT EXISTS`?**
- Safe to run multiple times
- Won't error if column already exists
- Idempotent (same result every time)

---

## ✨ After Migration

Once the migration is complete:

✅ No more schema cache errors
✅ Admin panel can set original prices
✅ Product pages display discounts
✅ Discount percentages calculate automatically
✅ All pricing features work as designed

---

## 🎉 You're Ready!

Follow the steps above to apply the migration. It should take about 5 minutes total.

**Questions?** Refer to the troubleshooting section or let me know!

