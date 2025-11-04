-- Migration: Add user_state column to orders table
-- This migration adds the user_state column to store the state from PIN code lookup
-- This is required for India-specific checkout with PIN code to location conversion

-- Add user_state column
ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_state TEXT;

-- Create an index for user_state for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_user_state ON orders(user_state);

-- Add a comment to the column for documentation
COMMENT ON COLUMN orders.user_state IS 'State from PIN code lookup (e.g., Delhi, Maharashtra, Karnataka)';

-- Verify the column was added
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'orders' AND column_name = 'user_state'
ORDER BY ordinal_position;

