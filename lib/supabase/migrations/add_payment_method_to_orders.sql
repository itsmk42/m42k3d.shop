-- Migration: Add Payment Method Support to Orders Table
-- This migration adds payment_method and user_phone columns to the orders table

-- Add payment_method column
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'stripe' CHECK (payment_method IN ('upi', 'cod', 'stripe'));

-- Add user_phone column
ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_phone TEXT;

-- Update status check constraint to include new payment statuses
-- Note: We need to drop and recreate the constraint if it exists
-- First, let's add the new statuses to the status column

-- Create an index for payment_method for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_payment_method ON orders(payment_method);

-- Create an index for status to help with filtering
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Add comment to document the new columns
COMMENT ON COLUMN orders.payment_method IS 'Payment method used for the order: upi, cod, or stripe';
COMMENT ON COLUMN orders.user_phone IS 'Customer phone number for order communication';

