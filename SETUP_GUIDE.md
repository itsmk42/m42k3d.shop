# Complete Setup Guide for M42K3D Shop

This guide will walk you through setting up your e-commerce website from scratch.

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, Supabase, Zustand, and more.

## Step 2: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up or log in
4. Click "New Project"
5. Fill in:
   - **Project name:** m42k3d-shop (or your preferred name)
   - **Database password:** Create a strong password (save this!)
   - **Region:** Choose closest to your location
6. Click "Create new project"
7. Wait for the project to be created (takes 1-2 minutes)

## Step 3: Set Up the Database

1. In your Supabase dashboard, click on "SQL Editor" in the left sidebar
2. Click "New Query"
3. Open the file `lib/supabase/schema.sql` from this project
4. Copy all the SQL code
5. Paste it into the Supabase SQL Editor
6. Click "Run" (or press Ctrl+Enter)
7. You should see "Success. No rows returned" - this is correct!

This creates:
- `products` table for storing your 3D printed items
- `categories` table for product categories
- `orders` table for customer orders
- `product-images` storage bucket for images
- Row Level Security (RLS) policies for data protection

## Step 4: Get Your Supabase API Keys

1. In Supabase dashboard, click "Settings" (gear icon) in the left sidebar
2. Click "API" under Project Settings
3. You'll see two important keys:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon public** key (long string starting with "eyJ...")
4. Keep this page open - you'll need these in the next step

## Step 5: Configure Environment Variables

1. Open the `.env.local` file in your project
2. Replace the placeholder values:

```env
# Replace with your actual Supabase URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Replace with your actual anon key
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# For service role key (optional for now):
# Go to Settings > API > service_role key (keep this secret!)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

3. Save the file

**Important:** Never commit `.env.local` to Git! It's already in `.gitignore`.

## Step 6: Create an Admin User

1. In Supabase dashboard, click "Authentication" in the left sidebar
2. Click "Users" tab
3. Click "Add User" button
4. Choose "Create new user"
5. Fill in:
   - **Email:** your-admin-email@example.com
   - **Password:** Create a strong password
   - **Auto Confirm User:** Check this box
6. Click "Create User"

This is the account you'll use to log into the admin panel.

## Step 7: Run the Development Server

```bash
npm run dev
```

The site will start at [http://localhost:3000](http://localhost:3000)

## Step 8: Test the Website

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. You should see the homepage with:
   - Header with navigation
   - Hero section
   - Features section
   - Featured products section (empty for now)
   - Footer

## Step 9: Access the Admin Panel

1. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Log in with the admin credentials you created in Step 6
3. You should see the Admin Dashboard with:
   - "Manage Products" option
   - "Manage Orders" (coming soon)

## Step 10: Add Your First Product

1. Click "Manage Products"
2. Click "Add Product" button
3. Fill in the product details:

   **Example Product:**
   - **Product Name:** Dragon Miniature
   - **Description:** Highly detailed 3D printed dragon miniature, perfect for tabletop gaming or display. Printed in high-quality PLA with fine details.
   - **Price:** 29.99
   - **Stock:** 10
   - **Category:** Miniatures
   - **Image URL:** Use a placeholder or your own image URL
     - Example: `https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=Dragon+Miniature`
   - **Featured Product:** Check this box to show on homepage

4. Click "Create Product"
5. Your product should now appear in the products list!

## Step 11: View Your Product

1. Go back to the homepage: [http://localhost:3000](http://localhost:3000)
2. You should see your product in the "Featured Products" section
3. Click on the product to see the detail page
4. Try adding it to cart
5. Click the cart icon in the header to view your cart
6. Test the checkout process

## Using Product Images

You have several options for product images:

### Option 1: Use Placeholder Images (Quick Start)
```
https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=Your+Product
```

### Option 2: Use Free Image Hosting

**Imgur:**
1. Go to [imgur.com](https://imgur.com)
2. Click "New post"
3. Upload your image
4. Right-click the image and copy the image URL
5. Use this URL in your product form

**Cloudinary:**
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Upload images
3. Copy the public URL
4. Use in your product form

### Option 3: Use Supabase Storage

1. In Supabase dashboard, click "Storage"
2. Click on "product-images" bucket
3. Click "Upload file"
4. Upload your product image
5. Click on the uploaded file
6. Copy the public URL
7. Use this URL in your product form

## Troubleshooting

### "Failed to fetch products" error
- Check that your Supabase URL and keys are correct in `.env.local`
- Make sure you ran the SQL schema
- Restart the dev server after changing `.env.local`

### Can't log into admin panel
- Verify you created an admin user in Supabase
- Check that email authentication is enabled in Supabase
- Make sure you're using the correct email and password

### Products not showing on homepage
- Make sure you checked "Featured Product" when creating the product
- Refresh the page
- Check the browser console for errors

### Images not loading
- Verify the image URL is correct and publicly accessible
- Try using a placeholder image first
- Check that the URL starts with `http://` or `https://`

## Next Steps

### Customize Your Site

1. **Update Branding:**
   - Edit `components/layout/Header.tsx` to change the site name
   - Modify colors in Tailwind classes throughout the components

2. **Add More Products:**
   - Create products for different categories
   - Add multiple images per product
   - Set appropriate stock levels

3. **Configure Stripe (Optional):**
   - Sign up at [stripe.com](https://stripe.com)
   - Get your API keys
   - Add them to `.env.local`
   - Implement payment processing in `app/checkout/page.tsx`

### Deploy Your Site

**Deploy to Vercel (Recommended):**

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Add environment variables (same as `.env.local`)
6. Click "Deploy"
7. Your site will be live in minutes!

**Important:** Don't forget to add all environment variables in Vercel's settings!

## Support Resources

- **Next.js Documentation:** [nextjs.org/docs](https://nextjs.org/docs)
- **Supabase Documentation:** [supabase.com/docs](https://supabase.com/docs)
- **Tailwind CSS:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Stripe Documentation:** [stripe.com/docs](https://stripe.com/docs)

## Common Tasks

### Adding a New Category
1. Go to Supabase dashboard
2. Click "Table Editor"
3. Select "categories" table
4. Click "Insert row"
5. Fill in name, slug, and description
6. Click "Save"

### Viewing Orders (when implemented)
Orders are stored in the `orders` table in Supabase. You can view them in:
- Supabase Table Editor (for now)
- Admin panel (coming soon)

### Backing Up Your Data
1. Go to Supabase dashboard
2. Click "Database"
3. Click "Backups"
4. Enable automatic backups (recommended)

## Security Notes

- Never share your service role key
- Keep `.env.local` out of version control
- Use strong passwords for admin accounts
- Enable 2FA on your Supabase account
- Regularly update dependencies

## Congratulations!

You now have a fully functional e-commerce website for your 3D printed items! 🎉

Start adding your products and customize the site to match your brand.

