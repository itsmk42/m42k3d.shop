-- Authentication System Migration
-- Run this in your Supabase SQL Editor to set up the authentication system

-- 1. Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  phone TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Add user_id column to orders table (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'orders' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE orders ADD COLUMN user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL;
  END IF;
END $$;

-- 3. Enable RLS on user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;

-- 5. Create RLS policies for user_profiles
CREATE POLICY "Users can view their own profile" 
  ON user_profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON user_profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
  ON user_profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 6. Update orders RLS policies
DROP POLICY IF EXISTS "Orders are viewable by owner" ON orders;
DROP POLICY IF EXISTS "Orders are updatable by authenticated users" ON orders;

CREATE POLICY "Orders are viewable by owner" 
  ON orders FOR SELECT 
  USING (
    user_id = auth.uid() OR 
    user_email = auth.email() OR
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Orders are updatable by authenticated users" 
  ON orders FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 7. Create function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'customer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 9. Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. Create an admin user (CHANGE THESE CREDENTIALS!)
-- This will create a user profile with admin role
-- You need to first create the user in Supabase Auth, then run this:
-- 
-- Example: After creating admin@sparklesphere.store in Supabase Auth:
-- UPDATE user_profiles 
-- SET role = 'admin' 
-- WHERE email = 'admin@sparklesphere.store';

-- 11. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON user_profiles TO authenticated;
GRANT SELECT ON user_profiles TO anon;

-- 12. Create index for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

-- Migration complete!
-- Next steps:
-- 1. Create an admin user in Supabase Auth Dashboard
-- 2. Update their role to 'admin' using:
--    UPDATE user_profiles SET role = 'admin' WHERE email = 'your-admin-email@example.com';

