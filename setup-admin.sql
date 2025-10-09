-- Quick Admin Setup Script
-- Run this in your Supabase SQL Editor to create the user_profiles table and set up admin access

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

-- 2. Enable RLS on user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS policies for user_profiles
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

-- 4. Create function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'customer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Create profiles for existing users (if any)
INSERT INTO user_profiles (id, email, role)
SELECT id, email, 'customer'
FROM auth.users
WHERE id NOT IN (SELECT id FROM user_profiles);

-- 7. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON user_profiles TO authenticated;
GRANT SELECT ON user_profiles TO anon;

-- 8. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);

-- 9. IMPORTANT: Set your user as admin
-- Replace 'your-email@example.com' with your actual email address
-- UPDATE user_profiles SET role = 'admin' WHERE email = 'your-email@example.com';

-- Setup complete!
-- Don't forget to uncomment and modify line 67 with your actual email address!
