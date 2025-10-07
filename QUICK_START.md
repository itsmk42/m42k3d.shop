# Quick Start Checklist

Follow these steps to get your e-commerce site up and running quickly!

## ✅ Setup Checklist

### 1. Initial Setup (5 minutes)
- [ ] Run `npm install` to install dependencies
- [ ] Create a Supabase account at [supabase.com](https://supabase.com)
- [ ] Create a new Supabase project

### 2. Database Setup (5 minutes)
- [ ] Open Supabase SQL Editor
- [ ] Copy and run the SQL from `lib/supabase/schema.sql`
- [ ] Verify tables were created (products, categories, orders)

### 3. Configuration (3 minutes)
- [ ] Get your Supabase URL from Settings > API
- [ ] Get your Supabase anon key from Settings > API
- [ ] Update `.env.local` with your Supabase credentials
- [ ] Save the file

### 4. Create Admin Account (2 minutes)
- [ ] Go to Authentication > Users in Supabase
- [ ] Click "Add User"
- [ ] Enter your email and password
- [ ] Check "Auto Confirm User"
- [ ] Click "Create User"

### 5. Start Development Server (1 minute)
- [ ] Run `npm run dev`
- [ ] Open [http://localhost:3000](http://localhost:3000)
- [ ] Verify the homepage loads

### 6. Test Admin Panel (3 minutes)
- [ ] Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
- [ ] Log in with your admin credentials
- [ ] Click "Manage Products"
- [ ] Verify you can access the product management page

### 7. Add Your First Product (5 minutes)
- [ ] Click "Add Product"
- [ ] Fill in product details:
  - Name: "Sample 3D Print"
  - Description: "A test product"
  - Price: 19.99
  - Stock: 5
  - Category: "Miniatures"
  - Image URL: `https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=Sample+Product`
  - Check "Featured Product"
- [ ] Click "Create Product"
- [ ] Verify product appears in the list

### 8. Test Customer Experience (5 minutes)
- [ ] Go to homepage
- [ ] Verify your product appears in "Featured Products"
- [ ] Click on the product
- [ ] Click "Add to Cart"
- [ ] Click cart icon in header
- [ ] Verify product is in cart
- [ ] Click "Proceed to Checkout"
- [ ] Fill in checkout form (test data)
- [ ] Click "Place Order"

## 🎉 Success!

If you completed all steps, your e-commerce site is working!

## Next Steps

### Customize Your Site
1. Add more products
2. Update site name and branding
3. Customize colors and styling
4. Add your logo

### Add Real Product Images
1. Take photos of your 3D printed items
2. Upload to Imgur, Cloudinary, or Supabase Storage
3. Update product image URLs

### Set Up Payments (Optional)
1. Create Stripe account
2. Get API keys
3. Add to `.env.local`
4. Implement payment processing

### Deploy to Production
1. Push code to GitHub
2. Deploy to Vercel
3. Add environment variables
4. Share your site!

## Need Help?

- See `SETUP_GUIDE.md` for detailed instructions
- See `README.md` for full documentation
- Check Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- Check Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)

## Common Issues

**"Failed to fetch products"**
- Check `.env.local` has correct Supabase credentials
- Restart dev server after changing `.env.local`

**Can't log into admin**
- Verify admin user was created in Supabase
- Check email and password are correct

**Products not showing**
- Make sure "Featured Product" is checked
- Refresh the page

## Time to Complete
- **Minimum setup:** ~15 minutes
- **With first product:** ~25 minutes
- **Full customization:** 1-2 hours

Good luck with your 3D printing business! 🚀

