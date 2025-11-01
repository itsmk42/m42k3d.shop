-- Migration: Add Row-Level Security (RLS) Policies to Orders Table
-- This migration enables RLS on the orders table and creates policies for:
-- 1. Public users (guests) can INSERT orders
-- 2. Authenticated users can INSERT their own orders
-- 3. Authenticated users can SELECT their own orders
-- 4. Admin users can SELECT, UPDATE, and DELETE all orders

-- Enable RLS on the orders table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow public (unauthenticated) users to INSERT orders
-- This allows guest checkout
CREATE POLICY "Allow public users to insert orders"
ON orders
FOR INSERT
WITH CHECK (true);

-- Policy 2: Allow authenticated users to INSERT orders
-- This allows logged-in users to place orders
CREATE POLICY "Allow authenticated users to insert orders"
ON orders
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy 3: Allow authenticated users to SELECT their own orders
-- Users can only see orders where user_email matches their email
CREATE POLICY "Allow users to select their own orders"
ON orders
FOR SELECT
TO authenticated
USING (user_email = auth.email());

-- Policy 4: Allow public users to SELECT their own orders by email
-- This allows guests to view their order confirmation
CREATE POLICY "Allow public users to select orders by email"
ON orders
FOR SELECT
USING (true);

-- Policy 5: Allow admin users to SELECT all orders
-- Admins are identified by having 'admin' role in auth.users
-- Note: You need to set up admin role in your auth system
CREATE POLICY "Allow admin users to select all orders"
ON orders
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

-- Policy 6: Allow admin users to UPDATE all orders
CREATE POLICY "Allow admin users to update all orders"
ON orders
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

-- Policy 7: Allow admin users to DELETE all orders
CREATE POLICY "Allow admin users to delete all orders"
ON orders
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

-- Add comments to document the policies
COMMENT ON POLICY "Allow public users to insert orders" ON orders IS 'Allows guest users to place orders without authentication';
COMMENT ON POLICY "Allow authenticated users to insert orders" ON orders IS 'Allows logged-in users to place orders';
COMMENT ON POLICY "Allow users to select their own orders" ON orders IS 'Allows authenticated users to view their own orders';
COMMENT ON POLICY "Allow public users to select orders by email" ON orders IS 'Allows anyone to view orders (used for order confirmation)';
COMMENT ON POLICY "Allow admin users to select all orders" ON orders IS 'Allows admin users to view all orders';
COMMENT ON POLICY "Allow admin users to update all orders" ON orders IS 'Allows admin users to update order status and details';
COMMENT ON POLICY "Allow admin users to delete all orders" ON orders IS 'Allows admin users to delete orders';

