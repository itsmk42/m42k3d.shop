-- Fix RLS Security Issue on user_profiles table
-- Run this in your Supabase SQL Editor to enable Row Level Security

-- 1. First, check if the table exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'user_profiles') THEN
        RAISE NOTICE 'Creating user_profiles table...';
        
        -- Create the table if it doesn't exist
        CREATE TABLE user_profiles (
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
    ELSE
        RAISE NOTICE 'user_profiles table already exists';
    END IF;
END $$;

-- 2. ENABLE ROW LEVEL SECURITY (This is the critical step!)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON user_profiles;

-- 4. Create comprehensive RLS policies

-- Policy 1: Users can view their own profile
CREATE POLICY "Users can view their own profile" 
    ON user_profiles FOR SELECT 
    USING (auth.uid() = id);

-- Policy 2: Users can update their own profile
CREATE POLICY "Users can update their own profile" 
    ON user_profiles FOR UPDATE 
    USING (auth.uid() = id);

-- Policy 3: Users can insert their own profile (for new signups)
CREATE POLICY "Users can insert their own profile" 
    ON user_profiles FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- Policy 4: Admins can view all profiles
CREATE POLICY "Admins can view all profiles" 
    ON user_profiles FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Policy 5: Admins can update all profiles
CREATE POLICY "Admins can update all profiles" 
    ON user_profiles FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 5. Create function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, role)
    VALUES (NEW.id, NEW.email, 'customer');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Create trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. Create profiles for existing users (if any don't have profiles)
INSERT INTO user_profiles (id, email, role)
SELECT id, email, 'customer'
FROM auth.users
WHERE id NOT IN (SELECT id FROM user_profiles);

-- 8. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON user_profiles TO authenticated;
GRANT SELECT ON user_profiles TO anon;

-- 9. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);

-- 10. Verify RLS is enabled
DO $$
BEGIN
    IF (SELECT rowsecurity FROM pg_tables WHERE tablename = 'user_profiles') THEN
        RAISE NOTICE '✅ SUCCESS: Row Level Security is now ENABLED on user_profiles table';
    ELSE
        RAISE EXCEPTION '❌ ERROR: Row Level Security is still DISABLED on user_profiles table';
    END IF;
END $$;

-- 11. Show current policies
SELECT 'Current RLS Policies:' as status;
SELECT policyname, cmd, permissive 
FROM pg_policies 
WHERE tablename = 'user_profiles';

-- IMPORTANT: Set your user as admin (replace with your actual email)
-- Uncomment and modify the line below:
-- UPDATE user_profiles SET role = 'admin' WHERE email = 'your-email@example.com';

-- Security check complete!
SELECT '🔒 RLS Security Fix Applied Successfully!' as result;
