# Quick Authentication Setup Guide

## 🚀 Get Started in 5 Minutes

Follow these steps to set up the authentication system for SparkleSphere.store.

---

## Step 1: Run Database Migration (2 minutes)

1. Open your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Open the file `lib/supabase/auth-migration.sql` in your code editor
5. Copy the entire SQL script
6. Paste it into the Supabase SQL Editor
7. Click **Run** (or press Ctrl+Enter)
8. Wait for "Success. No rows returned" message

✅ **Database is now ready!**

---

## Step 2: Create Your Admin Account (2 minutes)

### Option A: Using Supabase Dashboard (Recommended)

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter your admin email (e.g., `admin@sparklesphere.store`)
4. Enter a strong password
5. Click **Create user**
6. Go back to **SQL Editor**
7. Run this query (replace with your email):
   ```sql
   UPDATE user_profiles 
   SET role = 'admin' 
   WHERE email = 'admin@sparklesphere.store';
   ```

### Option B: Using the Registration Page

1. Visit `http://localhost:3002/register`
2. Create an account with your admin email
3. Verify your email (check inbox)
4. Go to Supabase **SQL Editor**
5. Run this query (replace with your email):
   ```sql
   UPDATE user_profiles 
   SET role = 'admin' 
   WHERE email = 'your-email@example.com';
   ```

✅ **Admin account is ready!**

---

## Step 3: Test the System (1 minute)

### Test User Registration:
1. Visit: `http://localhost:3002/register`
2. Create a test customer account
3. Check your email for verification link
4. Click the verification link

### Test User Login:
1. Visit: `http://localhost:3002/login`
2. Log in with your test account
3. You should be redirected to `/account`
4. Check that the header shows your name

### Test Admin Login:
1. Visit: `http://localhost:3002/admin/login`
2. Log in with your admin credentials
3. You should be redirected to `/admin`
4. Verify you can access the admin panel

✅ **Everything is working!**

---

## 🎯 Quick Reference

### **URLs:**
- User Login: `http://localhost:3002/login`
- User Registration: `http://localhost:3002/register`
- User Account: `http://localhost:3002/account`
- Admin Login: `http://localhost:3002/admin/login`
- Admin Panel: `http://localhost:3002/admin`

### **Default Credentials:**
Create your own admin account using the steps above.

### **Test Accounts:**
Create test accounts using the registration page.

---

## 🔧 Troubleshooting

### **Problem: "Failed to fetch" error**
**Solution:** Make sure the dev server is running:
```bash
npm run dev
```

### **Problem: Can't access admin panel**
**Solution:** Make sure you set the role to 'admin':
```sql
UPDATE user_profiles SET role = 'admin' WHERE email = 'your-email@example.com';
```

### **Problem: Profile not created on signup**
**Solution:** Run the migration script again:
- Go to Supabase SQL Editor
- Run the entire `auth-migration.sql` script

### **Problem: "User already registered" error**
**Solution:** The email is already in use. Either:
- Use a different email
- Delete the existing user in Supabase Auth dashboard
- Reset the password using "Forgot Password"

---

## 📝 What's Next?

After setup is complete, you can:

1. **Customize the UI:**
   - Edit `app/login/page.tsx` for login page
   - Edit `app/register/page.tsx` for registration page
   - Edit `app/account/page.tsx` for account page

2. **Add More Features:**
   - Forgot password flow
   - Email verification customization
   - Social login (Google, GitHub, etc.)
   - Two-factor authentication

3. **Deploy to Production:**
   - Push changes to GitHub
   - Vercel will auto-deploy
   - Update Supabase settings for production URL

---

## ✅ Checklist

- [ ] Database migration completed
- [ ] Admin account created
- [ ] Admin role assigned
- [ ] User registration tested
- [ ] User login tested
- [ ] Admin login tested
- [ ] Account page accessible
- [ ] Admin panel accessible
- [ ] Header shows auth UI
- [ ] Sign out works

---

## 🆘 Need Help?

Check the complete documentation: `AUTHENTICATION_SYSTEM_COMPLETE.md`

Or review the migration script: `lib/supabase/auth-migration.sql`

---

**Setup complete! Your authentication system is ready to use.** 🎉

