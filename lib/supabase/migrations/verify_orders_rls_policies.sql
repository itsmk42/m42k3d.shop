-- ============================================================================
-- VERIFY ORDERS RLS POLICIES
-- ============================================================================
-- Run this script AFTER applying fix_orders_rls_conflicts.sql
-- to verify that the RLS policies were created correctly
-- ============================================================================

-- Check 1: Verify RLS is enabled on orders table
SELECT 
  tablename,
  rowsecurity,
  CASE WHEN rowsecurity THEN 'ENABLED' ELSE 'DISABLED' END as rls_status
FROM pg_tables
WHERE tablename = 'orders';

-- Check 2: Count total policies on orders table
SELECT 
  COUNT(*) as total_policies
FROM pg_policies
WHERE tablename = 'orders';

-- Check 3: List all policies with details
SELECT 
  policyname,
  cmd as operation,
  permissive,
  qual as condition
FROM pg_policies
WHERE tablename = 'orders'
ORDER BY cmd, policyname;

-- Check 4: Verify specific policies exist
SELECT 
  policyname,
  CASE 
    WHEN policyname = 'orders_insert_all' THEN 'INSERT policy'
    WHEN policyname = 'orders_select_own' THEN 'SELECT policy'
    WHEN policyname = 'orders_update_admin' THEN 'UPDATE policy'
    WHEN policyname = 'orders_delete_admin' THEN 'DELETE policy'
    ELSE 'UNKNOWN'
  END as policy_type,
  cmd as operation
FROM pg_policies
WHERE tablename = 'orders'
AND policyname IN ('orders_insert_all', 'orders_select_own', 'orders_update_admin', 'orders_delete_admin')
ORDER BY cmd;

-- Check 5: Verify no old conflicting policies exist
SELECT 
  policyname,
  cmd as operation
FROM pg_policies
WHERE tablename = 'orders'
AND policyname LIKE '%Orders are%'
OR policyname LIKE '%Allow%'
ORDER BY policyname;

