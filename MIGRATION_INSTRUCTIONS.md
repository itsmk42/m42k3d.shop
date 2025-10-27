# Database Migration Instructions

## Issue: Missing 'original_price' Column

The application expects an `original_price` column in the `products` table, but it hasn't been added to your Supabase database yet.

---

## How to Apply the Migration

### Step 1: Open Supabase SQL Editor
1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Select your project (m42k3d.shop)
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query** button

### Step 2: Copy and Run the Migration SQL
Copy the following SQL code and paste it into the SQL editor:

```sql
-- Migration: Add original_price column to products table
-- This migration adds support for discount pricing

-- Add original_price column if it doesn't exist
ALTER TABLE products
ADD COLUMN IF NOT EXISTS original_price DECIMAL(10, 2);

-- Add comment to explain the column
COMMENT ON COLUMN products.original_price IS 'The original price before discount. If set and greater than price, a discount is shown.';
```

### Step 3: Execute the Query
1. Click the **Run** button (or press `Ctrl+Enter`)
2. You should see a success message: "Success. No rows returned"

### Step 4: Verify the Column Was Added
Run this verification query:

```sql
-- Verify the column exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'products' AND column_name = 'original_price';
```

You should see:
```
column_name      | data_type
-----------------|-----------
original_price   | numeric
```

---

## What This Migration Does

- **Adds `original_price` column** to the `products` table
- **Data type:** DECIMAL(10, 2) - supports prices up to $99,999.99 with 2 decimal places
- **Optional field** - existing products don't need this value
- **Enables discount pricing** - when `original_price > price`, a discount badge is shown

---

## After Migration

Once the migration is applied:
1. ✅ The database schema error will be resolved
2. ✅ You can set original prices in the admin panel
3. ✅ Discount percentages will automatically calculate and display
4. ✅ Product detail pages will show both original and sale prices

---

## Troubleshooting

**If you get an error:**
- The column might already exist (this is fine - the `IF NOT EXISTS` clause handles it)
- Check that you're connected to the correct Supabase project
- Ensure you have admin/owner permissions in Supabase

**If the query runs but nothing happens:**
- This is normal - the `IF NOT EXISTS` clause means the column already exists
- Run the verification query to confirm

---

## Font Styling Changes for Prices

For the second issue about price font styling, please clarify:

1. **What specific changes do you want?**
   - Larger/smaller font size?
   - Different font weight (bolder/lighter)?
   - Different font family (serif, monospace, etc.)?
   - Letter spacing adjustments?
   - Text transformation (uppercase, lowercase)?

2. **Which prices should be affected?**
   - Just the sale price (green)?
   - Both original price (strikethrough) and sale price?
   - Product cards on the listing page too?

3. **Any specific styling inspiration?**
   - Examples: "Make it look like a price tag", "More premium/elegant", "More bold/prominent", etc.

Once you clarify, I can apply the changes immediately!

