# 🔧 Order Status Update - Debug & Fix Guide

## ❌ Problem

**Error:** "Failed to update order status" when clicking status update buttons in admin panel

**Root Causes to Check:**
1. Admin user doesn't have `role: 'admin'` in user metadata
2. RLS UPDATE policy is not working correctly
3. Admin user is not authenticated properly
4. Browser cache issues

---

## ✅ Step 1: Verify Admin Role is Set

### **Check if your admin user has the role set:**

```sql
SELECT id, email, raw_user_meta_data
FROM auth.users
WHERE email = 'your-admin-email@example.com';
```

**Expected Result:**
```
id                                   | email                    | raw_user_meta_data
-------------------------------------+------------------------+-------------------
550e8400-e29b-41d4-a716-446655440000 | admin@example.com       | {"role": "admin"}
```

### **If role is NOT set, add it:**

```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'your-admin-email@example.com';
```

---

## ✅ Step 2: Verify RLS UPDATE Policy Exists

### **Check if UPDATE policy exists:**

```sql
SELECT policyname, permissive, roles, qual, with_check
FROM pg_policies
WHERE tablename = 'orders'
AND policyname = 'Allow admin users to update all orders';
```

**Expected Result:** Should show the policy details

### **If policy doesn't exist, create it:**

```sql
CREATE POLICY "Allow admin users to update all orders"
ON orders
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);
```

---

## ✅ Step 3: Test Admin UPDATE Permission

### **Test if admin can update orders:**

```sql
-- This query simulates what happens when admin tries to update
-- Replace 'your-order-id' with an actual order ID
UPDATE orders
SET status = 'processing'
WHERE id = 'your-order-id';
```

**Expected:** Update succeeds without error

---

## ✅ Step 4: Clear Browser Cache & Restart

1. **Clear browser cache:**
   - Press Ctrl+Shift+Delete
   - Select "All time"
   - Click "Clear data"

2. **Restart development server:**
   - Stop: Ctrl+C
   - Start: `npm run dev`

3. **Log out and log back in:**
   - Go to admin panel
   - Click Logout
   - Log in again

---

## ✅ Step 5: Check Browser Console for Errors

1. **Open DevTools:**
   - Press F12 or Ctrl+Shift+I

2. **Go to Console tab**

3. **Try updating an order status**

4. **Look for error messages:**
   - "new row violates row-level security policy"
   - "permission denied"
   - "relation does not exist"

5. **Copy the full error message**

---

## 🐛 Common Errors & Solutions

### **Error 1: "new row violates row-level security policy"**

**Cause:** UPDATE policy is not allowing the update

**Solution:**
1. Verify admin role is set (Step 1)
2. Verify UPDATE policy exists (Step 2)
3. Check if user is authenticated (should see session in console)

**Debug Query:**
```sql
-- Check if your user ID matches the admin check
SELECT auth.uid();

-- Check if your user has admin role
SELECT raw_user_meta_data->>'role' as role
FROM auth.users
WHERE id = auth.uid();
```

---

### **Error 2: "permission denied for schema public"**

**Cause:** User doesn't have permission to modify RLS policies

**Solution:**
1. Make sure you're logged in as project owner
2. Check Supabase project permissions
3. Try with a different account

---

### **Error 3: "relation 'orders' does not exist"**

**Cause:** Orders table doesn't exist

**Solution:**
1. Create the orders table using `lib/supabase/schema.sql`
2. Or run the migration: `lib/supabase/migrations/add_payment_method_to_orders.sql`

---

### **Error 4: Update works but no toast message**

**Cause:** Browser cache or session issue

**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart dev server
3. Log out and log back in
4. Try again

---

## 🧪 Manual Test Steps

### **Test 1: Verify Admin Can Fetch Orders**

1. Go to admin panel: http://localhost:3000/admin/orders
2. Should see list of orders
3. If not, check browser console for errors

### **Test 2: Verify Admin Can Update Status**

1. Click on an order to expand it
2. Click a status button (e.g., "Processing")
3. Should see success toast: "Order status updated"
4. Order status should change immediately

### **Test 3: Verify Update Persists**

1. Refresh the page (F5)
2. Order status should still be updated
3. If it reverted, the update didn't persist to database

---

## 📊 Verification Queries

### **Query 1: Check RLS is Enabled**

```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'orders';
```

**Expected:** `rowsecurity = true`

---

### **Query 2: List All RLS Policies**

```sql
SELECT policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'orders'
ORDER BY policyname;
```

**Expected:** 7 policies including "Allow admin users to update all orders"

---

### **Query 3: Check Admin User**

```sql
SELECT id, email, raw_user_meta_data
FROM auth.users
WHERE email = 'your-admin-email@example.com';
```

**Expected:** `raw_user_meta_data` contains `{"role": "admin"}`

---

### **Query 4: Check Order Exists**

```sql
SELECT id, status, user_email, created_at
FROM orders
LIMIT 5;
```

**Expected:** Should see orders in the table

---

## 🔄 Reset RLS (If Needed)

If you need to start over:

```sql
-- Disable RLS temporarily
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;

-- Try updating an order
UPDATE orders SET status = 'processing' WHERE id = 'test-id';

-- If update works, RLS was the issue
-- Re-enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Then apply policies from RLS_QUICK_START.md
```

---

## 📞 FAQ

**Q: Why is the update failing?**
A: Most likely the admin role is not set. Check Step 1.

**Q: How do I know if I'm logged in as admin?**
A: Check browser console: `console.log(session.user.user_metadata)`

**Q: Can I update orders without RLS?**
A: Yes, but it's not secure. Disable RLS only for testing.

**Q: How do I set admin role for multiple users?**
A: Run the SQL update for each email address.

---

## 🎯 Next Steps

1. ✅ Verify admin role is set
2. ✅ Verify RLS UPDATE policy exists
3. ✅ Clear browser cache and restart
4. ✅ Test order status update
5. ✅ Check browser console for errors
6. ✅ If still failing, run verification queries

---

**Status:** Ready to debug
**Last Updated:** 2025-10-27

