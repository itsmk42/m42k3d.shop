# M42K3D Shop - 3D Printed Items E-Commerce Store

A modern, full-featured e-commerce website built with Next.js 14, TypeScript, Tailwind CSS, Supabase, and Stripe for selling 3D printed items.

## Features

### Customer Features
- 🏠 **Modern Homepage** with hero section, featured products, and call-to-action
- 🛍️ **Product Catalog** with responsive grid layout
- 🔍 **Product Detail Pages** with image gallery and detailed information
- 🛒 **Shopping Cart** with persistent storage (localStorage + Zustand)
- 💳 **Checkout Process** with customer information form
- 📱 **Fully Responsive** design for mobile, tablet, and desktop
- ⚡ **Fast Performance** with Next.js 14 App Router and optimized images

### Admin Features
- 🔐 **Secure Authentication** with Supabase Auth
- 📦 **Product Management** - Add, edit, and delete products
- 🖼️ **Multiple Product Images** support
- ⭐ **Featured Products** highlighting
- 📊 **Stock Management** and inventory tracking
- 🏷️ **Category Management**

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database & Auth:** Supabase
- **State Management:** Zustand
- **Payment Processing:** Stripe (ready to integrate)
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account (free tier available)
- A Stripe account (for payment processing)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up Supabase**

   a. Create a new project at [supabase.com](https://supabase.com)

   b. Go to SQL Editor and run the schema from `lib/supabase/schema.sql`

   c. Get your project URL and anon key from Settings > API

3. **Configure Environment Variables**

   Update `.env.local` with your credentials:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Stripe Configuration (optional for now)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_NAME=M42K3D Shop
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Supabase Setup Details

### Database Schema

The database includes the following tables:
- **products** - Store product information
- **categories** - Product categories
- **orders** - Customer orders
- **Storage bucket** - For product images

Run the SQL schema from `lib/supabase/schema.sql` in your Supabase SQL Editor.

### Authentication Setup

1. Go to Authentication > Providers in your Supabase dashboard
2. Enable Email provider
3. Create an admin user:
   - Go to Authentication > Users
   - Click "Add User"
   - Enter email and password for your admin account

### Storage Setup

The schema automatically creates a `product-images` storage bucket.

## Admin Panel

### Accessing the Admin Panel

1. Navigate to `/admin`
2. Login with your Supabase admin credentials
3. Manage products from the dashboard

### Adding Products

1. Click "Manage Products" from the admin dashboard
2. Click "Add Product"
3. Fill in product details (name, description, price, stock, category, images)

## Project Structure

```
m42k3d.shop/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel pages
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── products/          # Product pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── layout/           # Layout components (Header, Footer)
│   ├── products/         # Product components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility libraries
│   ├── store/           # Zustand stores
│   └── supabase/        # Supabase client and schema
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── public/              # Static assets
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

## Future Enhancements

- [ ] Complete Stripe payment integration
- [ ] Order management system for admin
- [ ] Email notifications for orders
- [ ] Product search and filtering
- [ ] Customer reviews and ratings
- [ ] Wishlist functionality

## Credits

Built with Next.js, Supabase, Tailwind CSS, Stripe, Zustand, and Lucide Icons.
