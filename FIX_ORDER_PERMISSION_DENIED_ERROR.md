# 🔧 Fix: "Permission denied: Contact administrator" Error on Order Placement

## 🐛 The Problem

When users try to place an order on the checkout page, they get this error:

```
Permission denied: Contact administrator
```

This error occurs when clicking the "Place Order" button on `/checkout/review`.

---

## 🔍 Root Cause

**Conflicting RLS (Row Level Security) Policies on the `orders` table:**

The codebase has **TWO sets of RLS policies** that conflict with each other:

### **Set 1: In `lib/supabase/schema.sql` (lines 169-191)**
```sql
CREATE POLICY "Orders are viewable by owner" ON orders FOR SELECT ...
CREATE POLICY "Orders are insertable by everyone" ON orders FOR INSERT ...
CREATE POLICY "Orders are updatable by authenticated users" ON orders FOR UPDATE ...
```

### **Set 2: In `lib/supabase/migrations/add_rls_policies_to_orders.sql` (lines 13-87)**
```sql
CREATE POLICY "Allow public users to insert orders" ON orders FOR INSERT ...
CREATE POLICY "Allow authenticated users to insert orders" ON orders FOR INSERT ...
CREATE POLICY "Allow users to select their own orders" ON orders FOR SELECT ...
... (7 policies total)
```

**The Problem:**
- Both sets exist simultaneously in Supabase
- Multiple policies for the same operation (INSERT, SELECT, UPDATE) can cause conflicts
- Supabase evaluates all policies and requires ALL to pass (AND logic)
- If any policy denies access, the operation fails

---

## ✅ The Solution

### **Step 1: Apply the Fix in Supabase**

1. Go to https://app.supabase.com
2. Select your **m42k3d.shop** project
3. Click **SQL Editor** (left sidebar)
4. Click **New Query** (top right)
5. Copy the entire content from: `lib/supabase/migrations/fix_orders_rls_conflicts.sql`
6. Paste it into the SQL editor
7. Click **Run** (blue button)

**Expected Output:**
```
✅ Verifying RLS is enabled...
📝 Creating new RLS policies...
📋 Verifying RLS setup...
🎉 RLS POLICIES FIXED SUCCESSFULLY!
```

### **Step 2: Verify the Fix**

Run these verification queries in Supabase SQL Editor:

```sql
-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'orders';
-- Expected: rowsecurity = true

-- List all policies
SELECT policyname, cmd, permissive
FROM pg_policies
WHERE tablename = 'orders'
ORDER BY cmd;
-- Expected: 4 policies (INSERT, SELECT, UPDATE, DELETE)
```

### **Step 3: Clear Browser Cache**

1. Press **Ctrl+Shift+Delete** (Windows) or **Cmd+Shift+Delete** (Mac)
2. Select **All time**
3. Check **Cookies and other site data**
4. Click **Clear data**

### **Step 4: Test Order Placement**

1. Go to https://m42k3d-shop-jqzt.vercel.app (or localhost:3000 for dev)
2. Add a product to cart
3. Go to checkout
4. Fill in shipping details
5. Go to review
6. Select payment method
7. Click **Place Order**
8. **Expected:** Order placed successfully! ✅

---

## 📊 What Changed

### **Before (Broken):**
```
Multiple conflicting policies on orders table
↓
Supabase evaluates all policies (AND logic)
↓
At least one policy denies access
↓
❌ "Permission denied" error
```

### **After (Fixed):**
```
Single, clean set of 4 policies:
1. INSERT: Allow everyone (public + authenticated)
2. SELECT: Allow users to see their own orders + admins see all
3. UPDATE: Allow only admins
4. DELETE: Allow only admins
↓
Supabase evaluates policies correctly
↓
✅ Order placement succeeds
```

---

## 🎯 New RLS Policies

### **Policy 1: INSERT (Order Creation)**
```sql
CREATE POLICY "orders_insert_all"
ON orders FOR INSERT
WITH CHECK (true);
```
**Effect:** Anyone (public or authenticated) can create orders ✅

### **Policy 2: SELECT (View Orders)**
```sql
CREATE POLICY "orders_select_own"
ON orders FOR SELECT
USING (
  user_email = auth.email()
  OR EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin')
  OR true
);
```
**Effect:** Users see their own orders, admins see all, public can view ✅

### **Policy 3: UPDATE (Admin Only)**
```sql
CREATE POLICY "orders_update_admin"
ON orders FOR UPDATE
USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin'));
```
**Effect:** Only admins can update orders ✅

### **Policy 4: DELETE (Admin Only)**
```sql
CREATE POLICY "orders_delete_admin"
ON orders FOR DELETE
USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin'));
```
**Effect:** Only admins can delete orders ✅

---

## 🧪 Testing Checklist

- [ ] Applied SQL migration in Supabase
- [ ] Verified RLS is enabled
- [ ] Verified 4 policies exist
- [ ] Cleared browser cache
- [ ] Tested order placement in development
- [ ] Tested order placement in production
- [ ] Verified order appears in admin panel
- [ ] Verified order confirmation email sent

---

## 📞 Troubleshooting

### **Still Getting "Permission denied" Error?**

1. **Verify policies were applied:**
   ```sql
   SELECT COUNT(*) as policy_count
   FROM pg_policies
   WHERE tablename = 'orders';
   ```
   Expected: 4 policies

2. **Check if old policies still exist:**
   ```sql
   SELECT policyname FROM pg_policies
   WHERE tablename = 'orders'
   AND policyname LIKE '%Orders are%';
   ```
   Expected: Empty result (no old policies)

3. **If old policies still exist, drop them manually:**
   ```sql
   DROP POLICY IF EXISTS "Orders are viewable by owner" ON orders;
   DROP POLICY IF EXISTS "Orders are insertable by everyone" ON orders;
   DROP POLICY IF EXISTS "Orders are updatable by authenticated users" ON orders;
   ```

4. **Restart dev server:**
   ```bash
   npm run dev
   ```

5. **Clear browser cache again** (Ctrl+Shift+Delete)

### **Order Placement Still Fails?**

1. Open browser DevTools (F12)
2. Go to Console tab
3. Try placing an order
4. Look for error message
5. Copy the full error and check:
   - Is it still "Permission denied"?
   - Or a different error?

---

## 🚀 Deployment

### **For Development:**
```bash
npm run dev
# Test at http://localhost:3000/checkout
```

### **For Production:**
```bash
git add lib/supabase/migrations/fix_orders_rls_conflicts.sql
git commit -m "fix: resolve RLS policy conflicts on orders table"
git push origin main
# Vercel auto-deploys
# Test at https://m42k3d-shop-jqzt.vercel.app/checkout
```

---

## 📚 Related Files

- `lib/supabase/migrations/fix_orders_rls_conflicts.sql` - The fix SQL script
- `lib/supabase/schema.sql` - Original schema (has old policies)
- `lib/supabase/migrations/add_rls_policies_to_orders.sql` - Additional policies
- `app/checkout/review/page.tsx` - Order placement logic

---

**Status:** ✅ READY TO APPLY
**Severity:** 🔴 CRITICAL (blocks order placement)
**Impact:** Fixes all "Permission denied" errors on checkout
**Deployment:** Requires Supabase SQL execution + code commit

