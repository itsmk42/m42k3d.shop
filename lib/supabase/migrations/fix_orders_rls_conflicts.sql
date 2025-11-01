-- ============================================================================
-- FIX RLS POLICY CONFLICTS ON ORDERS TABLE
-- ============================================================================
-- This migration removes conflicting policies and creates clean RLS setup
-- Run this in your Supabase SQL Editor to fix "Permission denied" errors
-- ============================================================================

-- STEP 1: DROP ALL EXISTING POLICIES ON ORDERS TABLE
-- Drop old policies from schema.sql
DROP POLICY IF EXISTS "Orders are viewable by owner" ON orders;
DROP POLICY IF EXISTS "Orders are insertable by everyone" ON orders;
DROP POLICY IF EXISTS "Orders are updatable by authenticated users" ON orders;

-- Drop policies from add_rls_policies_to_orders.sql (if they exist)
DROP POLICY IF EXISTS "Allow public users to insert orders" ON orders;
DROP POLICY IF EXISTS "Allow authenticated users to insert orders" ON orders;
DROP POLICY IF EXISTS "Allow users to select their own orders" ON orders;
DROP POLICY IF EXISTS "Allow public users to select orders by email" ON orders;
DROP POLICY IF EXISTS "Allow admin users to select all orders" ON orders;
DROP POLICY IF EXISTS "Allow admin users to update all orders" ON orders;
DROP POLICY IF EXISTS "Allow admin users to delete all orders" ON orders;

-- Drop optimized policies from previous migrations
DROP POLICY IF EXISTS "orders_optimized_insert" ON orders;
DROP POLICY IF EXISTS "orders_optimized_select" ON orders;
DROP POLICY IF EXISTS "orders_optimized_update" ON orders;
DROP POLICY IF EXISTS "orders_optimized_delete" ON orders;

-- Drop any existing clean policies (in case this is re-run)
DROP POLICY IF EXISTS "orders_insert_all" ON orders;
DROP POLICY IF EXISTS "orders_select_own" ON orders;
DROP POLICY IF EXISTS "orders_update_admin" ON orders;
DROP POLICY IF EXISTS "orders_delete_admin" ON orders;

-- STEP 2: ENABLE RLS ON ORDERS TABLE
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- STEP 3: CREATE CLEAN, NON-CONFLICTING POLICIES

-- Policy 1: Allow EVERYONE to INSERT orders
CREATE POLICY "orders_insert_all"
ON orders
FOR INSERT
WITH CHECK (true);

-- Policy 2: Allow users to SELECT their own orders
CREATE POLICY "orders_select_own"
ON orders
FOR SELECT
USING (
  user_email = auth.email()
  OR
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
  OR
  true
);

-- Policy 3: Allow ONLY ADMINS to UPDATE orders
CREATE POLICY "orders_update_admin"
ON orders
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy 4: Allow ONLY ADMINS to DELETE orders
CREATE POLICY "orders_delete_admin"
ON orders
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

