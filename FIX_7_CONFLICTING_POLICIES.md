# 🔧 Fix 7 Conflicting Policies - Action Plan

## 🐛 The Problem

You have **7 policies** on the orders table instead of the expected **4**.

This means there are **conflicting policies** that are preventing order placement.

---

## ✅ Solution: 3-Step Fix

### **Step 1: Identify Which Policies Exist** (2 minutes)

**File:** `lib/supabase/migrations/list_all_policies.sql`

**In Supabase SQL Editor:**
1. Go to https://app.supabase.com
2. Select **m42k3d.shop** project
3. Click **SQL Editor** → **New Query**
4. Copy entire content from: `lib/supabase/migrations/list_all_policies.sql`
5. Click **Run**

**Look at the results:**
```
policyname                          | operation | permissive
------------------------------------|-----------|----------
?                                   | ?         | ?
```

**Report back:**
- List all 7 policies
- What operations do they have?
- Are there duplicates for the same operation?

---

### **Step 2: Run Cleanup Script** (1 minute)

**File:** `lib/supabase/migrations/cleanup_orders_rls_policies.sql`

**In Supabase SQL Editor:**
1. Click **New Query**
2. Copy entire content from: `lib/supabase/migrations/cleanup_orders_rls_policies.sql`
3. Click **Run**

**Expected Result:**
- No errors
- All policies removed
- `remaining_policies: 0`

---

### **Step 3: Re-run Fix Migration** (1 minute)

**File:** `lib/supabase/migrations/fix_orders_rls_conflicts.sql`

**In Supabase SQL Editor:**
1. Click **New Query**
2. Copy entire content from: `lib/supabase/migrations/fix_orders_rls_conflicts.sql`
3. Click **Run**

**Expected Result:**
- No errors
- 4 new policies created

---

### **Step 4: Verify Fix** (1 minute)

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

### **Step 5: Clear Cache & Test** (3 minutes)

1. **Clear browser cache:**
   - Press **Ctrl+Shift+Delete**
   - Select **All time**
   - Check **Cookies and other site data**
   - Click **Clear data**

2. **Test order placement:**
   - Go to https://sparklesphere.store/checkout/review
   - Try to place an order
   - **Expected:** ✅ Order placed successfully!

---

## 📊 What's Happening

### **Before (7 conflicting policies):**
```
Supabase RLS Logic: ALL policies must pass for operation to succeed

INSERT operation:
- Policy 1: ✅ Allow
- Policy 2: ❌ Deny (conflict!)
- Result: ❌ DENIED (because one policy denies)

SELECT operation:
- Policy 1: ✅ Allow
- Policy 2: ✅ Allow
- Policy 3: ❌ Deny (conflict!)
- Result: ❌ DENIED (because one policy denies)
```

### **After (4 clean policies):**
```
INSERT operation:
- Policy 1: ✅ Allow
- Result: ✅ ALLOWED

SELECT operation:
- Policy 1: ✅ Allow
- Result: ✅ ALLOWED
```

---

## 🚀 Quick Summary

| Step | Action | Time |
|------|--------|------|
| 1 | List all 7 policies | 2 min |
| 2 | Run cleanup script | 1 min |
| 3 | Re-run fix migration | 1 min |
| 4 | Verify 4 policies exist | 1 min |
| 5 | Clear cache & test | 3 min |
| **Total** | | **8 minutes** |

---

## ✅ Checklist

- [ ] Run `list_all_policies.sql`
- [ ] Note which 7 policies exist
- [ ] Run `cleanup_orders_rls_policies.sql`
- [ ] Run `fix_orders_rls_conflicts.sql`
- [ ] Verify total_policies = 4
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Test order placement
- [ ] ✅ Order placed successfully!

---

## 📝 Report Back

After running `list_all_policies.sql`, please share:

```
Total policies: 7

Policies:
1. policyname: ?, operation: ?
2. policyname: ?, operation: ?
3. policyname: ?, operation: ?
4. policyname: ?, operation: ?
5. policyname: ?, operation: ?
6. policyname: ?, operation: ?
7. policyname: ?, operation: ?
```

---

## 📚 Related Files

- `lib/supabase/migrations/list_all_policies.sql` - List all policies
- `lib/supabase/migrations/cleanup_orders_rls_policies.sql` - Cleanup script
- `lib/supabase/migrations/fix_orders_rls_conflicts.sql` - Fix migration
- `CLIENT_SIDE_ERROR_COMPLETE_GUIDE.md` - Debugging guide

---

**Status:** ✅ READY TO FIX
**Severity:** 🔴 CRITICAL
**Impact:** Fixes conflicting policies blocking order placement
**Time to Apply:** 8 minutes
**Last Updated:** 2025-10-27

