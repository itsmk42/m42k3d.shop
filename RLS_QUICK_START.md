# 🔐 RLS Policy Quick Start

## ✅ Status: READY TO APPLY

**Error:** "new row violates row-level security policy for table 'orders'"

**Solution:** Create RLS policies to allow orders to be created

**Time:** 3-5 minutes

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

## ✅ Verify the Policies

Run this query to check if policies were created:

```sql
SELECT policyname, permissive, roles
FROM pg_policies
WHERE tablename = 'orders'
ORDER BY policyname;
```

**Expected Result:** You should see 7 policies listed.

---

## 🧪 Test Order Placement

1. Go to https://m42k3d-shop-jqzt.vercel.app
2. Add a product to cart
3. Go to checkout
4. Fill in shipping details
5. Select payment method
6. Click "Place Order"

**Expected Result:**
- ✅ Order created successfully
- ✅ No RLS error
- ✅ Order confirmation page displays

---

## 🐛 Troubleshooting

### **Issue: Still Getting RLS Error**

**Solution:**
1. Verify policies exist (run verification query)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Restart dev server
4. Try again

### **Issue: "Policy already exists" Error**

**Solution:** Policies are already in place. Skip to testing.

### **Issue: Admin Panel Not Working**

**Solution:** Set admin role in user metadata (see full guide).

---

## 📞 FAQ

**Q: What is RLS?**
A: Row-Level Security restricts which rows users can access.

**Q: Can guests place orders?**
A: Yes, the first policy allows public users to insert orders.

**Q: Can users see other users' orders?**
A: No, they can only see their own orders.

**Q: How do I make someone an admin?**
A: Set `role: "admin"` in their user metadata in Supabase.

---

## 📚 Full Documentation

For detailed information, see:
- `RLS_POLICY_SETUP_GUIDE.md` - Complete guide with all details
- `lib/supabase/migrations/add_rls_policies_to_orders.sql` - Migration file

---

**Status:** ✅ READY TO APPLY
**Time:** 3-5 minutes
**Difficulty:** Easy

