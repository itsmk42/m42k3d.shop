-- Migration: Add Tracking Number Support to Orders Table
-- This migration adds tracking_number column to the orders table for shipment tracking

-- Add tracking_number column
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_number TEXT;

-- Create an index for tracking_number for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_tracking_number ON orders(tracking_number);

-- Add a comment to the column for documentation
COMMENT ON COLUMN orders.tracking_number IS 'Tracking number for shipped orders (e.g., courier tracking ID)';

