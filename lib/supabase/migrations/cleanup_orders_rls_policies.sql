-- ============================================================================
-- CLEANUP: REMOVE ALL RLS POLICIES FROM ORDERS TABLE
-- ============================================================================
-- Run this script to remove ALL policies (both old and new)
-- Then you can re-run the fix migration cleanly
-- ============================================================================

-- Step 1: Drop ALL policies on orders table
-- This includes both old conflicting policies and any new ones

-- Drop old policies from schema.sql
DROP POLICY IF EXISTS "Orders are viewable by owner" ON orders;
DROP POLICY IF EXISTS "Orders are insertable by everyone" ON orders;
DROP POLICY IF EXISTS "Orders are updatable by authenticated users" ON orders;

-- Drop policies from add_rls_policies_to_orders.sql
DROP POLICY IF EXISTS "Allow public users to insert orders" ON orders;
DROP POLICY IF EXISTS "Allow authenticated users to insert orders" ON orders;
DROP POLICY IF EXISTS "Allow users to select their own orders" ON orders;
DROP POLICY IF EXISTS "Allow public users to select orders by email" ON orders;
DROP POLICY IF EXISTS "Allow admin users to select all orders" ON orders;
DROP POLICY IF EXISTS "Allow admin users to update all orders" ON orders;
DROP POLICY IF EXISTS "Allow admin users to delete all orders" ON orders;

-- Drop new policies (in case they were partially created)
DROP POLICY IF EXISTS "orders_insert_all" ON orders;
DROP POLICY IF EXISTS "orders_select_own" ON orders;
DROP POLICY IF EXISTS "orders_update_admin" ON orders;
DROP POLICY IF EXISTS "orders_delete_admin" ON orders;

-- Drop optimized policies (from recent migrations)
DROP POLICY IF EXISTS "orders_optimized_insert" ON orders;
DROP POLICY IF EXISTS "orders_optimized_select" ON orders;
DROP POLICY IF EXISTS "orders_optimized_update" ON orders;
DROP POLICY IF EXISTS "orders_optimized_delete" ON orders;

-- Step 2: Verify all policies are removed
SELECT 
  COUNT(*) as remaining_policies
FROM pg_policies
WHERE tablename = 'orders';

-- Expected result: 0 (no policies remaining)

-- Step 3: Verify RLS is still enabled
SELECT 
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'orders';

-- Expected result: rowsecurity = true (RLS still enabled, just no policies)

