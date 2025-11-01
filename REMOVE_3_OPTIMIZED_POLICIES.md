# 🔧 Remove 3 Remaining Optimized Policies

## 🐛 The Problem

The cleanup script didn't remove the 3 "optimized" policies:
- `orders_optimized_insert`
- `orders_optimized_select`
- `orders_optimized_update`

These are leftover from a previous migration and are still blocking order placement.

---

## ✅ Solution: Run Updated Cleanup Script

I've updated the cleanup script to include these 3 policies. Now run it again:

### **Step 1: Run Updated Cleanup Script**

**File:** `lib/supabase/migrations/cleanup_orders_rls_policies.sql`

**In Supabase SQL Editor:**
1. Go to https://app.supabase.com
2. Select **m42k3d.shop** project
3. Click **SQL Editor** → **New Query**
4. Copy entire content from: `lib/supabase/migrations/cleanup_orders_rls_policies.sql`
5. Click **Run**

**Expected Result:**
```
remaining_policies: 0
rowsecurity: true
```

---

### **Step 2: Verify All Policies Removed**

**In Supabase SQL Editor:**
1. Click **New Query**
2. Run this query:

```sql
SELECT COUNT(*) as total_policies FROM pg_policies WHERE tablename = 'orders';
```

**Expected Result:**
```
total_policies: 0
```

---

### **Step 3: Re-run Fix Migration**

**File:** `lib/supabase/migrations/fix_orders_rls_conflicts.sql`

**In Supabase SQL Editor:**
1. Click **New Query**
2. Copy entire content from: `lib/supabase/migrations/fix_orders_rls_conflicts.sql`
3. Click **Run**

**Expected Result:**
- No errors
- 4 new policies created

---

### **Step 4: Verify Fix**

**In Supabase SQL Editor:**
1. Click **New Query**
2. Run this query:

```sql
SELECT COUNT(*) as total_policies FROM pg_policies WHERE tablename = 'orders';
```

**Expected Result:**
```
total_policies: 4
```

---

### **Step 5: List New Policies**

**In Supabase SQL Editor:**
1. Click **New Query**
2. Run this query:

```sql
SELECT policyname, cmd as operation FROM pg_policies WHERE tablename = 'orders' ORDER BY cmd, policyname;
```

**Expected Result:**
```
policyname              | operation
orders_delete_admin     | DELETE
orders_insert_all       | INSERT
orders_select_own       | SELECT
orders_update_admin     | UPDATE
```

---

### **Step 6: Clear Browser Cache & Test**

1. Press **Ctrl+Shift+Delete**
2. Select **All time**
3. Check **Cookies and other site data**
4. Click **Clear data**
5. Go to https://sparklesphere.store/checkout/review
6. Try to place an order
7. **Expected:** ✅ Order placed successfully!

---

## ✅ Checklist

- [ ] Run updated `cleanup_orders_rls_policies.sql`
- [ ] Verify `remaining_policies: 0`
- [ ] Run `fix_orders_rls_conflicts.sql`
- [ ] Verify `total_policies: 4`
- [ ] List policies and verify 4 clean ones
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Test order placement
- [ ] ✅ Order placed successfully!

---

## 📊 What Changed

### **Before (3 remaining policies):**
```
orders_optimized_insert (INSERT)
orders_optimized_select (SELECT)
orders_optimized_update (UPDATE)
```

### **After (4 clean policies):**
```
orders_delete_admin (DELETE)
orders_insert_all (INSERT)
orders_select_own (SELECT)
orders_update_admin (UPDATE)
```

---

## 📝 Updated Cleanup Script

The cleanup script now includes:

```sql
-- Drop optimized policies (from recent migrations)
DROP POLICY IF EXISTS "orders_optimized_insert" ON orders;
DROP POLICY IF EXISTS "orders_optimized_select" ON orders;
DROP POLICY IF EXISTS "orders_optimized_update" ON orders;
DROP POLICY IF EXISTS "orders_optimized_delete" ON orders;
```

---

## 🎯 Next Steps

1. **Run:** Updated `cleanup_orders_rls_policies.sql`
2. **Verify:** `remaining_policies: 0`
3. **Run:** `fix_orders_rls_conflicts.sql`
4. **Verify:** `total_policies: 4`
5. **Clear:** Browser cache
6. **Test:** Order placement
7. **Done!** ✅

---

**Status:** ✅ READY TO EXECUTE
**Time:** 5 minutes
**Expected Result:** Order placement works! ✅
**Last Updated:** 2025-10-27
**Commit:** `9dc4b2e`

