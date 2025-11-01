-- ============================================================================
-- LIST ALL POLICIES ON ORDERS TABLE
-- ============================================================================
-- Run this to see exactly which policies exist
-- ============================================================================

SELECT 
  policyname,
  cmd as operation,
  permissive
FROM pg_policies
WHERE tablename = 'orders'
ORDER BY cmd, policyname;

