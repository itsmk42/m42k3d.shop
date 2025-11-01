-- ============================================================================
-- QUICK POLICY CHECK - See exactly what policies exist
-- ============================================================================
-- Run this to quickly see all policies on the orders table
-- ============================================================================

-- MAIN QUERY: List ALL policies on orders table
SELECT 
  policyname,
  cmd as operation,
  permissive,
  qual as condition_logic
FROM pg_policies
WHERE tablename = 'orders'
ORDER BY cmd, policyname;

-- SUMMARY: Count policies by operation
SELECT 
  cmd as operation,
  COUNT(*) as count
FROM pg_policies
WHERE tablename = 'orders'
GROUP BY cmd
ORDER BY cmd;

-- TOTAL: How many policies total?
SELECT 
  COUNT(*) as total_policies
FROM pg_policies
WHERE tablename = 'orders';

