# ✅ Migration Checklist

Use this checklist to track your progress through the migration process.

---

## 📋 Pre-Migration Checklist

- [ ] I have access to Supabase dashboard
- [ ] I know my Supabase project name: **m42k3d.shop**
- [ ] I have admin/owner permissions in Supabase
- [ ] I have a stable internet connection
- [ ] I have the migration SQL code ready (see below)

---

## 🚀 Migration Steps

### Phase 1: Access Supabase

- [ ] Go to https://app.supabase.com
- [ ] Log in with my credentials
- [ ] I can see my projects listed
- [ ] I found the **m42k3d.shop** project
- [ ] I clicked on the project to open it

### Phase 2: Open SQL Editor

- [ ] I can see the left sidebar
- [ ] I found **SQL Editor** in the sidebar
- [ ] I clicked on **SQL Editor**
- [ ] The SQL editor page loaded
- [ ] I can see the editor area

### Phase 3: Create New Query

- [ ] I clicked the **New Query** button
- [ ] OR I pressed `Ctrl+K`
- [ ] A blank SQL editor opened
- [ ] The cursor is in the editor area

### Phase 4: Paste SQL Code

- [ ] I copied this SQL code:

```sql
-- Migration: Add original_price column to products table
-- This migration adds support for discount pricing

-- Add original_price column if it doesn't exist
ALTER TABLE products
ADD COLUMN IF NOT EXISTS original_price DECIMAL(10, 2);

-- Add comment to explain the column
COMMENT ON COLUMN products.original_price IS 'The original price before discount. If set and greater than price, a discount is shown.';
```

- [ ] I pasted the code into the editor (Ctrl+V)
- [ ] The SQL code is visible in the editor
- [ ] The code looks correct (no typos)

### Phase 5: Execute Query

- [ ] I clicked the **Run** button
- [ ] OR I pressed `Ctrl+Enter`
- [ ] The query started executing
- [ ] I waited for the result (1-2 seconds)

### Phase 6: Verify Success

- [ ] I see the message: **"Success. No rows returned"**
- [ ] There are no error messages
- [ ] The execution time is shown (e.g., "0.234s")

---

## ✔️ Post-Migration Verification

### Quick Verification

- [ ] I ran the verification query:
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name = 'original_price';
```

- [ ] The result shows:
  - [ ] column_name: `original_price`
  - [ ] data_type: `numeric`
  - [ ] is_nullable: `YES`

### Full Column List (Optional)

- [ ] I ran the full column query:
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;
```

- [ ] The result includes `original_price` in the list
- [ ] All other columns are present

### Table Editor Check (Optional)

- [ ] I went to **Table Editor** in the sidebar
- [ ] I clicked on the **products** table
- [ ] I scrolled right to see all columns
- [ ] I found the **original_price** column

---

## 🧪 Testing the Migration

### Test 1: Admin Panel

- [ ] I refreshed my browser (F5)
- [ ] I went to Admin → Manage Products
- [ ] I clicked "Add New Product"
- [ ] I filled in the form:
  - [ ] Name: "Test Product"
  - [ ] Description: "Test description"
  - [ ] Price: 40.00
  - [ ] **Original Price: 50.00** ← This field works!
  - [ ] Category: Selected
  - [ ] Stock: 10
- [ ] I clicked "Save Product"
- [ ] I saw: ✅ "Product added successfully"
- [ ] No error messages appeared

### Test 2: Product Display

- [ ] I went to the Products page
- [ ] I found my "Test Product"
- [ ] I clicked on it to view details
- [ ] I saw the price displayed as:
  - [ ] ~~$50.00~~ $40.00 [20% OFF]
  - [ ] Original price is crossed out
  - [ ] Sale price is in green
  - [ ] Discount percentage is shown

### Test 3: Edit Product

- [ ] I went back to Admin → Manage Products
- [ ] I found my "Test Product"
- [ ] I clicked "Edit"
- [ ] The form loaded with my data
- [ ] The "Original Price" field shows: 50.00
- [ ] I can modify the original price
- [ ] I clicked "Save"
- [ ] Changes were saved successfully

---

## 🎉 Migration Complete!

- [ ] All steps above are checked
- [ ] No errors occurred
- [ ] The original_price column is working
- [ ] Admin panel can set original prices
- [ ] Product pages display discounts correctly

---

## 📊 Summary

| Step | Status | Notes |
|------|--------|-------|
| Access Supabase | ✅ | |
| Open SQL Editor | ✅ | |
| Create New Query | ✅ | |
| Paste SQL Code | ✅ | |
| Execute Query | ✅ | |
| Verify Success | ✅ | |
| Test Admin Panel | ✅ | |
| Test Product Display | ✅ | |
| Test Edit Product | ✅ | |

---

## 🚀 Next Steps

Once all checks are complete:

1. **Delete Test Product** (Optional)
   - Go to Admin → Manage Products
   - Find "Test Product"
   - Click Delete
   - Confirm deletion

2. **Start Using Discounts**
   - Create real products with original prices
   - Set discounts as needed
   - Monitor discount displays

3. **Monitor Performance**
   - Check that products load quickly
   - Verify discounts display correctly
   - Monitor for any errors

---

## 📞 Troubleshooting

If any step fails:

1. **Check the error message** - It usually tells you what's wrong
2. **Verify you're in the correct project** - Make sure it's m42k3d.shop
3. **Check your permissions** - You need admin/owner role
4. **Try refreshing** - Sometimes the dashboard needs a refresh
5. **Check internet connection** - Make sure you're connected

---

## 💾 Backup Information

**Migration File Location:**
- `lib/supabase/migrations/add_original_price_to_products.sql`

**Migration SQL:**
```sql
ALTER TABLE products
ADD COLUMN IF NOT EXISTS original_price DECIMAL(10, 2);

COMMENT ON COLUMN products.original_price IS 'The original price before discount. If set and greater than price, a discount is shown.';
```

**Safe to Run:** YES - Uses `IF NOT EXISTS` clause

---

## ✨ You're All Set!

Print this checklist or bookmark it for reference. Follow each step and you'll have the migration applied successfully!

**Estimated Time:** 5-10 minutes

**Difficulty:** Easy ⭐

**Risk Level:** Very Low (Safe to run multiple times)

