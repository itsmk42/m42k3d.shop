# 🔐 Create Admin User - Step by Step

## Quick Reference

**Your Supabase Project:** `ijviarfucnpjakjknzzs`  
**Admin Email:** `m42k@example.com`  
**Admin Password:** `Ss@1234q`

---

## 📝 Step-by-Step Instructions

### Step 1: Open Supabase Dashboard

1. Open your browser
2. Go to: **https://supabase.com/dashboard**
3. Log in to your Supabase account
4. You should see your project listed

---

### Step 2: Select Your Project

1. Click on your project: **`ijviarfucnpjakjknzzs`**
2. Wait for the project dashboard to load
3. You should see the project overview

---

### Step 3: Navigate to Authentication

1. Look at the **left sidebar**
2. Find and click on **"Authentication"** (shield icon 🛡️)
3. The Authentication page will open

---

### Step 4: Go to Users Tab

1. At the top of the Authentication page, you'll see tabs
2. Click on the **"Users"** tab
3. You should see a list of users (probably empty)

---

### Step 5: Add New User

1. Look for the **"Add User"** button (usually top right)
2. Click **"Add User"**
3. A dropdown or modal will appear
4. Select **"Create new user"**

---

### Step 6: Fill in User Details

You'll see a form with several fields. Fill them in exactly as shown:

**Required Fields:**

1. **Email:**
   ```
   m42k@example.com
   ```

2. **Password:**
   ```
   Ss@1234q
   ```

3. **Auto Confirm User:**
   - ✅ **CHECK THIS BOX** (very important!)
   - This ensures the user is immediately active

**Optional Fields:**
- Leave other fields as default
- You don't need to fill in metadata or additional info

---

### Step 7: Create the User

1. Double-check all fields are correct:
   - Email: `m42k@example.com`
   - Password: `Ss@1234q`
   - Auto Confirm User: ✅ CHECKED

2. Click the **"Create User"** button

3. Wait for confirmation

---

### Step 8: Verify User Creation

1. You should see a success message
2. The new user should appear in the users list
3. Look for:
   - Email: `m42k@example.com`
   - Status: Should show as confirmed/active
   - Created date: Today's date

---

## ✅ Testing the Admin Account

### Test 1: Log In

1. Open your browser
2. Go to: **http://localhost:3000/admin**
3. You should see the login page
4. Enter credentials:
   - Email: `m42k@example.com`
   - Password: `Ss@1234q`
5. Click **"Login"**
6. You should see:
   - Success notification (green toast)
   - Redirect to Admin Dashboard

### Test 2: Access Admin Dashboard

After logging in, you should see:
- **"Admin Dashboard"** heading
- **"Manage Products"** card with package icon
- **"Manage Orders"** card (grayed out - coming soon)
- **"Logout"** button in top right

### Test 3: Access Product Management

1. Click **"Manage Products"**
2. You should navigate to `/admin/products`
3. You should see:
   - **"Manage Products"** heading
   - **"Add Product"** button
   - Empty state message (if no products yet)

---

## 🐛 Troubleshooting

### Problem: Can't find "Add User" button

**Solution:**
- Make sure you're on the "Users" tab (not "Providers" or "Policies")
- Look in the top right corner of the page
- Try refreshing the page

---

### Problem: "Auto Confirm User" checkbox not visible

**Solution:**
- Make sure you selected "Create new user" (not "Invite user")
- Scroll down in the form - it might be below the fold
- If still not visible, create the user anyway and manually confirm:
  1. After creating, find the user in the list
  2. Click on the user
  3. Look for "Confirm email" or similar option

---

### Problem: Can't log in after creating user

**Possible causes and solutions:**

1. **User not confirmed:**
   - Go back to Supabase
   - Find the user in the list
   - Check if status is "Confirmed"
   - If not, click on user and confirm manually

2. **Wrong credentials:**
   - Make sure you're using exactly:
     - Email: `m42k@example.com`
     - Password: `Ss@1234q`
   - Check for typos
   - Password is case-sensitive

3. **Environment variables not set:**
   - Check `.env.local` file
   - Make sure `NEXT_PUBLIC_SUPABASE_URL` is set
   - Make sure `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
   - Restart dev server after changing `.env.local`

4. **Dev server not running:**
   - Make sure `npm run dev` is running
   - Check terminal for errors
   - Try restarting the server

---

### Problem: "Invalid login credentials" error

**Solution:**
1. Verify user exists in Supabase
2. Check user is confirmed/active
3. Try resetting the password in Supabase:
   - Click on the user
   - Look for "Reset password" option
   - Set password to `Ss@1234q` again

---

### Problem: Redirects back to login after logging in

**Solution:**
1. Check browser console for errors (F12)
2. Clear browser cache and cookies
3. Try in incognito/private window
4. Verify Supabase URL in `.env.local` is correct

---

## 📋 Quick Checklist

Before testing login, verify:

- [ ] Supabase project is created
- [ ] Database schema is created (SQL ran)
- [ ] Environment variables are set in `.env.local`
- [ ] Dev server is running (`npm run dev`)
- [ ] Admin user is created in Supabase
- [ ] User is confirmed/active
- [ ] You have the correct credentials

---

## 🎯 What to Do After Creating Admin User

### 1. Log In (2 minutes)
- Go to http://localhost:3000/admin
- Log in with credentials
- Verify you see the dashboard

### 2. Add Your First Product (5 minutes)
- Click "Manage Products"
- Click "Add Product"
- Fill in product details
- Use placeholder image: `https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=Test+Product`
- Check "Featured Product"
- Click "Create Product"

### 3. View on Homepage (1 minute)
- Go to http://localhost:3000
- Scroll to "Featured Products"
- Your product should appear!

### 4. Test Full Flow (5 minutes)
- Click on product to see detail page
- Click "Add to Cart"
- View cart
- Test checkout process

---

## 🎉 Success!

Once you can log in and see the Admin Dashboard, you're all set!

**Next steps:**
1. Add your real products
2. Upload real product images
3. Customize the site branding
4. Deploy to production

---

## 📞 Need Help?

If you're still having issues:

1. **Check the logs:**
   - Browser console (F12)
   - Terminal where dev server is running
   - Look for error messages

2. **Verify Supabase:**
   - Project is active
   - Database tables exist
   - User is created and confirmed

3. **Check environment:**
   - `.env.local` has correct values
   - Dev server restarted after changes
   - No typos in credentials

4. **Review documentation:**
   - `SETUP_GUIDE.md` - Detailed setup
   - `ADMIN_TESTING_CHECKLIST.md` - Testing procedures
   - `TASK_COMPLETION_REPORT.md` - Full task details

---

## ✅ Verification

After creating the admin user, you should be able to:

- ✅ Log in to `/admin`
- ✅ See the Admin Dashboard
- ✅ Access Product Management
- ✅ Add new products
- ✅ Edit products
- ✅ Delete products
- ✅ See products on homepage
- ✅ Log out successfully

**If all of the above work, you're done!** 🎉

---

**Remember:** The credentials are:
- Email: `m42k@example.com`
- Password: `Ss@1234q`

**Save these somewhere safe!** 🔐

