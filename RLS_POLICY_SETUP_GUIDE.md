# 🔐 Row-Level Security (RLS) Policy Setup Guide

## ✅ Status: READY TO APPLY

**Error:** "new row violates row-level security policy for table 'orders'"

**Root Cause:** The `orders` table has RLS enabled but no policies configured to allow INSERT operations.

**Solution:** Create RLS policies to allow orders to be created and managed.

**Time Required:** 3-5 minutes

---

## 🎯 What You Need to Do

### **The Problem**
Your database has Row-Level Security (RLS) enabled on the `orders` table, but there are no policies that allow:
- Guest users to create orders
- Authenticated users to view their orders
- Admin users to manage all orders

### **The Solution**
Create RLS policies that define who can INSERT, SELECT, UPDATE, and DELETE orders.

### **The Result**
Orders will be created successfully, and users will only see their own orders.

---

## 📋 RLS Policies to Create

### **Policy 1: Allow Public Users to INSERT Orders**
- **Purpose:** Allows guest checkout (unauthenticated users)
- **Effect:** Anyone can create an order without logging in

### **Policy 2: Allow Authenticated Users to INSERT Orders**
- **Purpose:** Allows logged-in users to place orders
- **Effect:** Authenticated users can create orders

### **Policy 3: Allow Users to SELECT Their Own Orders**
- **Purpose:** Users can view their own orders
- **Effect:** Authenticated users see only their orders (matched by email)

### **Policy 4: Allow Public Users to SELECT Orders**
- **Purpose:** Allows order confirmation page to display orders
- **Effect:** Anyone can view orders (used for confirmation after checkout)

### **Policy 5: Allow Admin Users to SELECT All Orders**
- **Purpose:** Admins can view all orders
- **Effect:** Admin users see all orders in the admin panel

### **Policy 6: Allow Admin Users to UPDATE All Orders**
- **Purpose:** Admins can update order status
- **Effect:** Admin users can change order status (e.g., mark as shipped)

### **Policy 7: Allow Admin Users to DELETE All Orders**
- **Purpose:** Admins can delete orders
- **Effect:** Admin users can remove orders from the system

---

## 📋 Complete RLS Policy SQL Script

Copy this entire script:

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

---

## 🚀 Step-by-Step Instructions

### **Step 1: Open Supabase Dashboard**
- Go to https://app.supabase.com
- Sign in with your account

### **Step 2: Select Your Project**
- Click on **m42k3d.shop** project
- Wait for dashboard to load

### **Step 3: Open SQL Editor**
- Click **SQL Editor** in left sidebar
- Click **New Query** button (top right)

### **Step 4: Paste the RLS Policy SQL**
- Click in the SQL editor
- Paste the complete RLS policy script above (Ctrl+V)

### **Step 5: Run the Policies**
- Click the **Run** button (blue button, top right)
- Or press Ctrl+Enter

### **Step 6: Verify Success**
- Look for: **"✅ Success. No rows returned."**
- If you see this, the RLS policies were created successfully!

---

## ✅ Verification Queries

### **Query 1: Check if RLS is Enabled**

```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'orders';
```

**Expected Result:**
```
tablename | rowsecurity
-----------+------------
orders    | true
```

---

### **Query 2: List All RLS Policies**

```sql
SELECT schemaname, tablename, policyname, permissive, roles, qual, with_check
FROM pg_policies
WHERE tablename = 'orders'
ORDER BY policyname;
```

**Expected Result:** You should see 7 policies:
1. Allow public users to insert orders
2. Allow authenticated users to insert orders
3. Allow users to select their own orders
4. Allow public users to select orders by email
5. Allow admin users to select all orders
6. Allow admin users to update all orders
7. Allow admin users to delete all orders

---

### **Query 3: Check Policy Details**

```sql
SELECT policyname, permissive, roles, qual, with_check
FROM pg_policies
WHERE tablename = 'orders'
AND policyname = 'Allow public users to insert orders';
```

**Expected Result:** Should show the policy details for public INSERT.

---

## 🧪 Test Order Placement

After applying the RLS policies:

1. Go to https://m42k3d-shop-jqzt.vercel.app
2. Add a product to cart
3. Go to checkout
4. Fill in shipping details (including phone number)
5. Go to review page
6. Select payment method (UPI or COD)
7. Click "Place Order"

**Expected Result:**
- ✅ Order created successfully
- ✅ No RLS policy violation error
- ✅ Order confirmation page displays
- ✅ Order appears in admin panel

---

## 🐛 Troubleshooting

### **Issue 1: "Policy already exists" Error**

**Error Message:**
```
ERROR: policy "Allow public users to insert orders" for table "orders" already exists
```

**Cause:** The policies were already created

**Solution:** This is fine! The policies are already in place. Skip to "Test Order Placement".

---

### **Issue 2: Still Getting RLS Violation Error**

**Error Message:**
```
new row violates row-level security policy for table 'orders'
```

**Cause:** RLS is enabled but policies weren't applied correctly

**Solution:**
1. Verify RLS is enabled (run Query 1)
2. Verify policies exist (run Query 2)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Restart your development server
5. Try placing an order again

---

### **Issue 3: "Permission denied" Error**

**Error Message:**
```
ERROR: permission denied for schema public
```

**Cause:** You don't have permission to modify RLS policies

**Solution:**
1. Make sure you're logged in as project owner
2. Check your Supabase project permissions
3. Try again with correct account

---

### **Issue 4: Admin Users Can't Access Admin Panel**

**Error Message:**
```
No orders visible in admin panel
```

**Cause:** Admin role not set up in auth.users

**Solution:**
1. Set admin role in user metadata (see "Setting Up Admin Role" section)
2. Or use a simpler admin check (see "Alternative Admin Check" section)

---

## 👤 Setting Up Admin Role

To enable admin users to manage orders, you need to set the `role` in user metadata.

### **Option 1: Set Admin Role via Supabase Dashboard**

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

### **Option 2: Set Admin Role via SQL**

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

## 🔄 Alternative Admin Check (Simpler)

If you want a simpler admin check without setting up roles, use this policy instead:

```sql
-- Alternative: Allow specific admin emails to manage all orders
CREATE POLICY "Allow admin emails to manage all orders"
ON orders
FOR ALL
TO authenticated
USING (
  auth.email() IN ('admin@example.com', 'admin2@example.com')
)
WITH CHECK (
  auth.email() IN ('admin@example.com', 'admin2@example.com')
);
```

Replace `admin@example.com` with your actual admin email addresses.

---

## 📊 RLS Policy Summary

| Policy | Operation | Who | Condition |
|--------|-----------|-----|-----------|
| Public INSERT | INSERT | Anyone | Always allowed |
| Auth INSERT | INSERT | Authenticated | Always allowed |
| User SELECT | SELECT | Authenticated | Own orders only |
| Public SELECT | SELECT | Anyone | All orders |
| Admin SELECT | SELECT | Admin | All orders |
| Admin UPDATE | UPDATE | Admin | All orders |
| Admin DELETE | DELETE | Admin | All orders |

---

## 🔄 Disable RLS (If Needed)

If you need to disable RLS temporarily:

```sql
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
```

**Warning:** This removes all RLS protection. Only do this for testing.

---

## 🔄 Drop All Policies (If Needed)

If you need to remove all policies and start over:

```sql
DROP POLICY IF EXISTS "Allow public users to insert orders" ON orders;
DROP POLICY IF EXISTS "Allow authenticated users to insert orders" ON orders;
DROP POLICY IF EXISTS "Allow users to select their own orders" ON orders;
DROP POLICY IF EXISTS "Allow public users to select orders by email" ON orders;
DROP POLICY IF EXISTS "Allow admin users to select all orders" ON orders;
DROP POLICY IF EXISTS "Allow admin users to update all orders" ON orders;
DROP POLICY IF EXISTS "Allow admin users to delete all orders" ON orders;
```

---

## 📞 FAQ

**Q: What is Row-Level Security (RLS)?**
A: RLS is a database security feature that restricts which rows users can access based on policies.

**Q: Why do I need RLS policies?**
A: Without policies, RLS blocks all access. Policies define who can do what.

**Q: Can guest users place orders?**
A: Yes, the "Allow public users to insert orders" policy allows unauthenticated users to create orders.

**Q: Can users see other users' orders?**
A: No, the "Allow users to select their own orders" policy restricts access to their own orders only.

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

---

## 🎯 Next Steps

1. **Apply the RLS policies** using the steps above
2. **Verify the policies** were created using verification queries
3. **Set up admin role** for admin users (optional but recommended)
4. **Test order placement** to ensure everything works
5. **Check admin panel** to see orders

---

**Status:** ✅ READY TO APPLY
**Last Updated:** 2025-10-27
**Version:** 1.0
**Estimated Time:** 3-5 minutes

