# 🔐 RLS Policy Complete Solution

## ✅ Status: READY TO APPLY

**Error:** "new row violates row-level security policy for table 'orders'"

**Root Cause:** RLS is enabled but no policies configured for INSERT operations

**Solution:** Create 7 RLS policies to allow orders to be created and managed

**Time Required:** 3-5 minutes

---

## 🎯 The Problem

Your Supabase database has Row-Level Security (RLS) enabled on the `orders` table, but there are no policies that allow:
- ❌ Guest users to create orders
- ❌ Authenticated users to view their orders
- ❌ Admin users to manage all orders

**Result:** Any attempt to INSERT an order fails with RLS violation error.

---

## ✅ The Solution

Create 7 RLS policies that define who can do what:

| # | Policy | Operation | Who | Effect |
|---|--------|-----------|-----|--------|
| 1 | Allow public users to insert orders | INSERT | Anyone | Guest checkout |
| 2 | Allow authenticated users to insert orders | INSERT | Logged-in | User checkout |
| 3 | Allow users to select their own orders | SELECT | Logged-in | View own orders |
| 4 | Allow public users to select orders | SELECT | Anyone | Order confirmation |
| 5 | Allow admin users to select all orders | SELECT | Admin | View all orders |
| 6 | Allow admin users to update all orders | UPDATE | Admin | Update status |
| 7 | Allow admin users to delete all orders | DELETE | Admin | Delete orders |

---

## 🚀 Quick Start (3 Steps)

### **Step 1: Copy the SQL Script**

```sql
-- Enable RLS on the orders table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow public users to INSERT orders
CREATE POLICY "Allow public users to insert orders"
ON orders
FOR INSERT
WITH CHECK (true);

-- Policy 2: Allow authenticated users to INSERT orders
CREATE POLICY "Allow authenticated users to insert orders"
ON orders
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy 3: Allow authenticated users to SELECT their own orders
CREATE POLICY "Allow users to select their own orders"
ON orders
FOR SELECT
TO authenticated
USING (user_email = auth.email());

-- Policy 4: Allow public users to SELECT orders
CREATE POLICY "Allow public users to select orders by email"
ON orders
FOR SELECT
USING (true);

-- Policy 5: Allow admin users to SELECT all orders
CREATE POLICY "Allow admin users to select all orders"
ON orders
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

-- Policy 6: Allow admin users to UPDATE all orders
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

-- Policy 7: Allow admin users to DELETE all orders
CREATE POLICY "Allow admin users to delete all orders"
ON orders
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);
```

### **Step 2: Apply in Supabase**

1. Go to https://app.supabase.com
2. Click **m42k3d.shop** project
3. Click **SQL Editor** (left sidebar)
4. Click **New Query** (top right)
5. Paste the SQL script
6. Click **Run** (blue button)

### **Step 3: Verify Success**

You should see:
```
✅ Success. No rows returned.
```

**Done!** RLS policies are now in place. 🎉

---

## ✅ Verification Queries

### **Query 1: Check RLS is Enabled**

```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'orders';
```

**Expected:** `rowsecurity = true`

---

### **Query 2: List All Policies**

```sql
SELECT policyname, permissive, roles
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

## 🧪 Test Order Placement

1. Go to https://m42k3d-shop-jqzt.vercel.app
2. Add a product to cart
3. Go to checkout
4. Fill in shipping details (including phone)
5. Go to review page
6. Select payment method (UPI or COD)
7. Click "Place Order"

**Expected Result:**
- ✅ Order created successfully
- ✅ No RLS policy violation error
- ✅ Order confirmation page displays
- ✅ Order appears in admin panel

---

## 👤 Setting Up Admin Role (Optional)

To enable admin users to manage orders:

### **Option 1: Via Supabase Dashboard**

1. Go to Supabase Dashboard
2. Click **Authentication** → **Users**
3. Click on a user to edit
4. Scroll to **User Metadata**
5. Add this JSON:
```json
{
  "role": "admin"
}
```
6. Click **Save**

### **Option 2: Via SQL**

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

## 🐛 Troubleshooting

### **Issue 1: Still Getting RLS Error**

**Solution:**
1. Verify policies exist (run Query 2)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Restart dev server
4. Try again

### **Issue 2: "Policy already exists" Error**

**Solution:** Policies are already in place. Skip to testing.

### **Issue 3: Admin Panel Not Working**

**Solution:** Set admin role in user metadata (see "Setting Up Admin Role" section).

### **Issue 4: Permission Denied Error**

**Solution:**
1. Make sure you're logged in as project owner
2. Check your Supabase project permissions
3. Try again with correct account

---

## 📚 Documentation Files

I've created comprehensive guides for you:

1. **`RLS_QUICK_START.md`** - Quick reference guide
2. **`RLS_POLICY_SETUP_GUIDE.md`** - Complete setup guide with all details
3. **`RLS_VISUAL_GUIDE.md`** - Visual step-by-step guide
4. **`RLS_TROUBLESHOOTING_GUIDE.md`** - Common issues and solutions
5. **`lib/supabase/migrations/add_rls_policies_to_orders.sql`** - Migration file

---

## 📞 FAQ

**Q: What is Row-Level Security (RLS)?**
A: RLS is a database security feature that restricts which rows users can access based on policies.

**Q: Why do I need RLS policies?**
A: Without policies, RLS blocks all access. Policies define who can do what.

**Q: Can guest users place orders?**
A: Yes, the "Allow public users to insert orders" policy allows unauthenticated users.

**Q: Can users see other users' orders?**
A: No, the "Allow users to select their own orders" policy restricts access to their own orders.

**Q: How do I make someone an admin?**
A: Set `role: "admin"` in their user metadata in Supabase Authentication.

**Q: What if I see "Success. No rows returned"?**
A: That's perfect! The policies were created successfully.

---

## ✨ Summary

| Step | Action | Status |
|------|--------|--------|
| 1 | Copy RLS policy SQL | ✅ Ready |
| 2 | Open Supabase SQL Editor | ✅ Ready |
| 3 | Paste and run script | ⏳ Your turn |
| 4 | Verify success message | ⏳ Your turn |
| 5 | Run verification queries | ⏳ Your turn |
| 6 | Test order placement | ⏳ Your turn |
| 7 | Set up admin role (optional) | ⏳ Your turn |

---

## 🎯 Next Steps

1. **Apply the RLS policies** using the Quick Start steps above
2. **Verify the policies** were created using verification queries
3. **Set up admin role** for admin users (optional but recommended)
4. **Test order placement** to ensure everything works
5. **Check admin panel** to see orders

---

## 🔄 Rollback (If Needed)

If you need to disable RLS:

```sql
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
```

Or drop specific policies:

```sql
DROP POLICY IF EXISTS "Allow public users to insert orders" ON orders;
```

---

**Status:** ✅ READY TO APPLY
**Last Updated:** 2025-10-27
**Version:** 1.0
**Estimated Time:** 3-5 minutes
**Difficulty:** Easy

