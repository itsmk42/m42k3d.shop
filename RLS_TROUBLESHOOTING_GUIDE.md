# 🔧 RLS Policy Troubleshooting Guide

## Common Issues and Solutions

---

## ❌ Issue 1: "new row violates row-level security policy"

**Error Message:**
```
new row violates row-level security policy for table 'orders'
```

**Cause:** RLS is enabled but INSERT policies are not configured.

**Solution:**

1. **Check if RLS is enabled:**
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'orders';
```

2. **Check if INSERT policies exist:**
```sql
SELECT policyname, permissive, roles, qual, with_check
FROM pg_policies
WHERE tablename = 'orders'
AND cmd = 'INSERT';
```

3. **If no INSERT policies, apply them:**
   - Follow the steps in `RLS_QUICK_START.md`
   - Or run the migration: `lib/supabase/migrations/add_rls_policies_to_orders.sql`

4. **Clear browser cache and restart dev server:**
   - Press Ctrl+Shift+Delete to clear cache
   - Restart your development server
   - Try placing an order again

---

## ❌ Issue 2: "Policy already exists" Error

**Error Message:**
```
ERROR: policy "Allow public users to insert orders" for table "orders" already exists
```

**Cause:** The RLS policies were already created.

**Solution:**

This is fine! The policies are already in place. You can:

1. **Skip to testing** - Try placing an order
2. **Verify policies exist:**
```sql
SELECT policyname, permissive, roles
FROM pg_policies
WHERE tablename = 'orders'
ORDER BY policyname;
```

3. **If you want to recreate policies, drop them first:**
```sql
DROP POLICY IF EXISTS "Allow public users to insert orders" ON orders;
DROP POLICY IF EXISTS "Allow authenticated users to insert orders" ON orders;
DROP POLICY IF EXISTS "Allow users to select their own orders" ON orders;
DROP POLICY IF EXISTS "Allow public users to select orders by email" ON orders;
DROP POLICY IF EXISTS "Allow admin users to select all orders" ON orders;
DROP POLICY IF EXISTS "Allow admin users to update all orders" ON orders;
DROP POLICY IF EXISTS "Allow admin users to delete all orders" ON orders;
```

Then apply the policies again.

---

## ❌ Issue 3: "Permission denied" Error

**Error Message:**
```
ERROR: permission denied for schema public
```

**Cause:** You don't have permission to modify RLS policies.

**Solution:**

1. **Make sure you're logged in as project owner:**
   - Go to https://app.supabase.com
   - Check the account in top right corner
   - Make sure it's the project owner account

2. **Check project permissions:**
   - Click **Settings** → **Access Control**
   - Verify your account has owner/admin role

3. **Try again with correct account:**
   - Log out and log in with the correct account
   - Retry applying the policies

---

## ❌ Issue 4: Admin Panel Not Showing Orders

**Error Message:**
```
No orders visible in admin panel
```

**Cause:** Admin SELECT policy is not working (admin role not set up).

**Solution:**

1. **Check if admin role is set:**
```sql
SELECT id, email, raw_user_meta_data
FROM auth.users
WHERE email = 'your-admin-email@example.com';
```

2. **If role is not set, add it:**
```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'your-admin-email@example.com';
```

3. **Or use alternative admin check:**
   - Drop the admin policies
   - Use email-based admin check instead (see `RLS_POLICY_SETUP_GUIDE.md`)

---

## ❌ Issue 5: Syntax Error in SQL

**Error Message:**
```
ERROR: syntax error at or near...
```

**Cause:** The SQL script has a typo or formatting issue.

**Solution:**

1. **Copy the SQL script again carefully:**
   - Use `RLS_QUICK_START.md` or `RLS_POLICY_SETUP_GUIDE.md`
   - Make sure there are no extra characters

2. **Check for common issues:**
   - Missing semicolons at end of statements
   - Extra spaces or tabs
   - Mismatched quotes

3. **Try running it again:**
   - Paste the script again
   - Click Run

---

## ❌ Issue 6: RLS Still Blocking After Applying Policies

**Error Message:**
```
new row violates row-level security policy for table 'orders'
```

**Cause:** Policies were applied but Supabase cache hasn't updated.

**Solution:**

1. **Wait 30 seconds** for Supabase to update cache

2. **Clear browser cache:**
   - Press Ctrl+Shift+Delete
   - Select "All time"
   - Click "Clear data"

3. **Restart development server:**
   - Stop your dev server (Ctrl+C)
   - Start it again: `npm run dev`

4. **Verify policies exist:**
```sql
SELECT policyname, permissive, roles
FROM pg_policies
WHERE tablename = 'orders'
ORDER BY policyname;
```

5. **Try placing an order again**

---

## ❌ Issue 7: RLS Disabled Accidentally

**Error Message:**
```
No RLS policies found
```

**Cause:** RLS was disabled on the orders table.

**Solution:**

1. **Check if RLS is enabled:**
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'orders';
```

2. **If rowsecurity is false, enable it:**
```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
```

3. **Apply the policies again:**
   - Follow steps in `RLS_QUICK_START.md`

---

## ❌ Issue 8: Guest Orders Not Working

**Error Message:**
```
new row violates row-level security policy for table 'orders'
```

**Cause:** Public INSERT policy is missing or not working.

**Solution:**

1. **Check if public INSERT policy exists:**
```sql
SELECT policyname, permissive, roles, qual, with_check
FROM pg_policies
WHERE tablename = 'orders'
AND policyname = 'Allow public users to insert orders';
```

2. **If it doesn't exist, create it:**
```sql
CREATE POLICY "Allow public users to insert orders"
ON orders
FOR INSERT
WITH CHECK (true);
```

3. **Make sure the policy allows unauthenticated users:**
   - The policy should NOT have `TO authenticated` clause
   - It should have `WITH CHECK (true)` to allow all

4. **Test guest checkout:**
   - Don't log in
   - Try placing an order as guest

---

## ❌ Issue 9: Authenticated Users Can't See Their Orders

**Error Message:**
```
No orders found
```

**Cause:** SELECT policy is not matching user email correctly.

**Solution:**

1. **Check if SELECT policy exists:**
```sql
SELECT policyname, permissive, roles, qual
FROM pg_policies
WHERE tablename = 'orders'
AND policyname = 'Allow users to select their own orders';
```

2. **Verify the policy uses correct email matching:**
```sql
SELECT policyname, qual
FROM pg_policies
WHERE tablename = 'orders'
AND policyname = 'Allow users to select their own orders';
```

3. **Check if user_email column matches auth.email():**
```sql
SELECT id, user_email FROM orders LIMIT 5;
SELECT auth.email();
```

4. **If emails don't match, update the policy:**
```sql
DROP POLICY "Allow users to select their own orders" ON orders;

CREATE POLICY "Allow users to select their own orders"
ON orders
FOR SELECT
TO authenticated
USING (user_email = auth.email());
```

---

## ❌ Issue 10: Orders Table Not Found

**Error Message:**
```
relation "orders" does not exist
```

**Cause:** The orders table doesn't exist or has a different name.

**Solution:**

1. **Check if orders table exists:**
```sql
SELECT tablename FROM pg_tables 
WHERE tablename = 'orders';
```

2. **List all tables:**
```sql
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;
```

3. **If orders table doesn't exist:**
   - Create it first (check your database schema)
   - Then apply RLS policies

---

## ✅ Verification Queries

### **Query 1: Check RLS Status**
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'orders';
```

**Expected:** `rowsecurity = true`

---

### **Query 2: List All Policies**
```sql
SELECT policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'orders'
ORDER BY policyname;
```

**Expected:** 7 policies listed

---

### **Query 3: Check Policy Details**
```sql
SELECT policyname, permissive, roles, qual, with_check
FROM pg_policies
WHERE tablename = 'orders'
AND policyname = 'Allow public users to insert orders';
```

**Expected:** Policy details shown

---

### **Query 4: Check User Email**
```sql
SELECT auth.email();
```

**Expected:** Your email address

---

### **Query 5: Check Orders by Email**
```sql
SELECT id, user_email, created_at 
FROM orders 
WHERE user_email = auth.email()
LIMIT 5;
```

**Expected:** Your orders listed

---

## 🔄 Reset RLS (If Needed)

If you need to start over:

```sql
-- Disable RLS
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;

-- Drop all policies
DROP POLICY IF EXISTS "Allow public users to insert orders" ON orders;
DROP POLICY IF EXISTS "Allow authenticated users to insert orders" ON orders;
DROP POLICY IF EXISTS "Allow users to select their own orders" ON orders;
DROP POLICY IF EXISTS "Allow public users to select orders by email" ON orders;
DROP POLICY IF EXISTS "Allow admin users to select all orders" ON orders;
DROP POLICY IF EXISTS "Allow admin users to update all orders" ON orders;
DROP POLICY IF EXISTS "Allow admin users to delete all orders" ON orders;

-- Re-enable RLS and apply policies
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Then apply policies from RLS_QUICK_START.md
```

---

## 📞 FAQ

**Q: How do I know if RLS is enabled?**
A: Run: `SELECT rowsecurity FROM pg_tables WHERE tablename = 'orders';` - Should return `true`.

**Q: How do I check if policies exist?**
A: Run: `SELECT policyname FROM pg_policies WHERE tablename = 'orders';` - Should list 7 policies.

**Q: Can I test RLS without applying it?**
A: Yes, you can enable RLS without policies to see what breaks, then add policies.

**Q: What if I accidentally delete a policy?**
A: Just recreate it using the SQL from `RLS_QUICK_START.md`.

**Q: How do I debug RLS issues?**
A: Check browser console for error messages, verify policies exist, and check user email matching.

---

## 📚 Related Documentation

- `RLS_QUICK_START.md` - Quick start guide
- `RLS_POLICY_SETUP_GUIDE.md` - Complete setup guide
- `RLS_VISUAL_GUIDE.md` - Visual step-by-step guide
- `lib/supabase/migrations/add_rls_policies_to_orders.sql` - Migration file

---

**Status:** ✅ TROUBLESHOOTING GUIDE
**Last Updated:** 2025-10-27
**Version:** 1.0

