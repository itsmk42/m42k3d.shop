# 📸 RLS Policy Visual Guide

## Step 1: Go to Supabase Dashboard

**URL:** https://app.supabase.com

```
┌─────────────────────────────────────────────────────────┐
│  Supabase                                               │
│  ┌─────────────────────────────────────────────────────┐│
│  │ Your Projects                                       ││
│  │                                                     ││
│  │ 📦 m42k3d.shop                                      ││
│  │    Production Database                              ││
│  │    [Click here]                                     ││
│  │                                                     ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

---

## Step 2: Click on m42k3d.shop Project

```
┌─────────────────────────────────────────────────────────┐
│  m42k3d.shop                                            │
│  ┌─────────────────────────────────────────────────────┐│
│  │ Left Sidebar:                                       ││
│  │ 📊 Dashboard                                        ││
│  │ 🗄️  SQL Editor  ← CLICK HERE                        ││
│  │ 📋 Tables                                           ││
│  │ 🔐 Authentication                                   ││
│  │ ⚙️  Settings                                        ││
│  │                                                     ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

---

## Step 3: Click "SQL Editor" in Left Sidebar

```
┌─────────────────────────────────────────────────────────┐
│  SQL Editor                                             │
│  ┌─────────────────────────────────────────────────────┐│
│  │ [New Query] ← CLICK HERE (top right)               ││
│  │                                                     ││
│  │ Recent Queries:                                     ││
│  │ • Query 1                                           ││
│  │ • Query 2                                           ││
│  │                                                     ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

---

## Step 4: Click "New Query" Button

A blank SQL editor will open.

```
┌─────────────────────────────────────────────────────────┐
│  New Query                                              │
│  ┌─────────────────────────────────────────────────────┐│
│  │ [Run] [Format] [Save]                              ││
│  │                                                     ││
│  │ ┌─────────────────────────────────────────────────┐││
│  │ │                                                 │││
│  │ │  (Blank SQL editor - paste here)                │││
│  │ │                                                 │││
│  │ │                                                 │││
│  │ └─────────────────────────────────────────────────┘││
│  │                                                     ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

---

## Step 5: Copy the RLS Policy SQL Script

The complete script is in `RLS_QUICK_START.md` or `RLS_POLICY_SETUP_GUIDE.md`.

---

## Step 6: Paste into SQL Editor

Click in the editor and paste (Ctrl+V):

```
┌─────────────────────────────────────────────────────────┐
│  New Query                                              │
│  ┌─────────────────────────────────────────────────────┐│
│  │ [Run] [Format] [Save]                              ││
│  │                                                     ││
│  │ ┌─────────────────────────────────────────────────┐││
│  │ │ -- Enable RLS on the orders table               │││
│  │ │ ALTER TABLE orders ENABLE ROW LEVEL SECURITY;   │││
│  │ │                                                 │││
│  │ │ -- Policy 1: Allow public users to INSERT...   │││
│  │ │ CREATE POLICY "Allow public users to insert...  │││
│  │ │ ...                                             │││
│  │ └─────────────────────────────────────────────────┘││
│  │                                                     ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

---

## Step 7: Click "Run" Button

```
┌─────────────────────────────────────────────────────────┐
│  New Query                                              │
│  ┌─────────────────────────────────────────────────────┐│
│  │ [Run] ← CLICK HERE                                 ││
│  │                                                     ││
│  │ ┌─────────────────────────────────────────────────┐││
│  │ │ -- Enable RLS on the orders table               │││
│  │ │ ALTER TABLE orders ENABLE ROW LEVEL SECURITY;   │││
│  │ │ ...                                             │││
│  │ └─────────────────────────────────────────────────┘││
│  │                                                     ││
│  │ ⏳ Running query...                                 ││
│  │                                                     ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

---

## Step 8: Wait for Success Message

```
┌─────────────────────────────────────────────────────────┐
│  New Query                                              │
│  ┌─────────────────────────────────────────────────────┐│
│  │ [Run] [Format] [Save]                              ││
│  │                                                     ││
│  │ ┌─────────────────────────────────────────────────┐││
│  │ │ -- Enable RLS on the orders table               │││
│  │ │ ALTER TABLE orders ENABLE ROW LEVEL SECURITY;   │││
│  │ │ ...                                             │││
│  │ └─────────────────────────────────────────────────┘││
│  │                                                     ││
│  │ ✅ Success. No rows returned.                       ││
│  │                                                     ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

**If you see "✅ Success. No rows returned." - You're done!** ✅

---

## Step 9: Verify the Policies (Optional)

Run this verification query to confirm policies were created:

```sql
SELECT policyname, permissive, roles
FROM pg_policies
WHERE tablename = 'orders'
ORDER BY policyname;
```

```
┌─────────────────────────────────────────────────────────┐
│  Verification Query                                     │
│  ┌─────────────────────────────────────────────────────┐│
│  │ [Run]                                              ││
│  │                                                     ││
│  │ ┌─────────────────────────────────────────────────┐││
│  │ │ SELECT policyname, permissive, roles...         │││
│  │ └─────────────────────────────────────────────────┘││
│  │                                                     ││
│  │ Results:                                            ││
│  │ ┌─────────────────────────────────────────────────┐││
│  │ │ policyname                          │ permissive│││
│  │ │─────────────────────────────────────┼───────────│││
│  │ │ Allow public users to insert orders │ true  ✅  │││
│  │ │ Allow authenticated users to insert │ true  ✅  │││
│  │ │ Allow users to select their own...  │ true  ✅  │││
│  │ │ Allow public users to select orders │ true  ✅  │││
│  │ │ Allow admin users to select all...  │ true  ✅  │││
│  │ │ Allow admin users to update all...  │ true  ✅  │││
│  │ │ Allow admin users to delete all...  │ true  ✅  │││
│  │ └─────────────────────────────────────┼───────────┘││
│  │                                                     ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

**Look for 7 policies in the results!** ✅

---

## Step 10: Test Order Placement

1. Go to https://m42k3d-shop-jqzt.vercel.app
2. Add a product to cart
3. Go to checkout
4. Fill in shipping details (including phone)
5. Select payment method (UPI or COD)
6. Click "Place Order"

**Expected Result:**
- ✅ Order created successfully
- ✅ No RLS policy violation error
- ✅ Order confirmation page displays
- ✅ Order appears in admin panel

---

## ✅ You're Done!

The RLS policies have been successfully applied! 🎉

Your database now has:
- ✅ RLS enabled on orders table
- ✅ 7 policies for different user types
- ✅ Guest checkout support
- ✅ User order privacy
- ✅ Admin management capabilities

Orders can now be placed successfully! 🚀

---

## 🆘 Need Help?

**Q: I don't see the success message**
A: Check the error message. If it says "policy already exists", the policies were already applied.

**Q: The policies don't appear in verification**
A: Wait 30 seconds and try again. Supabase caches policy information.

**Q: Still getting RLS error?**
A: Clear browser cache (Ctrl+Shift+Delete) and restart your dev server.

---

**Last Updated:** 2025-10-27
**Status:** Ready to apply

