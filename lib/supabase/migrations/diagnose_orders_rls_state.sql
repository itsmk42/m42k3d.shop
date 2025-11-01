-- ============================================================================
-- DIAGNOSE CURRENT RLS POLICY STATE ON ORDERS TABLE
-- ============================================================================
-- Run this script to see what policies currently exist
-- This will help determine what needs to be cleaned up
-- ============================================================================

-- Check 1: Is RLS enabled on orders table?
SELECT 
  tablename,
  rowsecurity,
  CASE WHEN rowsecurity THEN 'YES - RLS ENABLED' ELSE 'NO - RLS DISABLED' END as rls_status
FROM pg_tables
WHERE tablename = 'orders';

-- Check 2: How many policies exist on orders table?
SELECT 
  COUNT(*) as total_policies
FROM pg_policies
WHERE tablename = 'orders';

-- Check 3: List ALL policies on orders table with details
SELECT 
  policyname,
  cmd as operation,
  permissive,
  qual as condition_logic
FROM pg_policies
WHERE tablename = 'orders'
ORDER BY cmd, policyname;

-- Check 4: Check for NEW policies (the ones we're trying to create)
SELECT 
  policyname,
  cmd as operation,
  'NEW POLICY' as type
FROM pg_policies
WHERE tablename = 'orders'
AND policyname IN ('orders_insert_all', 'orders_select_own', 'orders_update_admin', 'orders_delete_admin')
ORDER BY policyname;

-- Check 5: Check for OLD policies (the ones we're trying to drop)
SELECT 
  policyname,
  cmd as operation,
  'OLD POLICY' as type
FROM pg_policies
WHERE tablename = 'orders'
AND (
  policyname LIKE '%Orders are%'
  OR policyname LIKE '%Allow%'
)
ORDER BY policyname;

-- Check 6: Summary - Count by operation type
SELECT 
  cmd as operation,
  COUNT(*) as count
FROM pg_policies
WHERE tablename = 'orders'
GROUP BY cmd
ORDER BY cmd;

-- Check 7: Check if orders table exists and is accessible
SELECT 
  table_name,
  table_schema
FROM information_schema.tables
WHERE table_name = 'orders';

-- Check 8: Check orders table structure
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'orders'
ORDER BY ordinal_position;

