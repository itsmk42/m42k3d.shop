# 🗄️ Apply SEO Settings Table Migration - Step-by-Step Guide

## ❌ Current Issue
```
Error: "Could not find the table 'public.seo_settings' in the schema cache"
```

This means the `seo_settings` table hasn't been created in your Supabase database yet.

---

## ✅ Solution: Apply the Migration

### **Step 1: Go to Supabase Dashboard**
1. Open https://app.supabase.com in your browser
2. Log in with your account
3. Select your **m42k3d.shop** project

---

### **Step 2: Open SQL Editor**
1. In the left sidebar, click **SQL Editor**
2. Click the **New Query** button (top right)
3. You should see a blank SQL editor

---

### **Step 3: Copy the SQL Migration**

Copy the entire SQL code below:

```sql
-- Migration: Add SEO Settings table
-- This migration adds support for managing SEO metadata for pages

-- Create SEO Settings table
CREATE TABLE IF NOT EXISTS seo_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_type TEXT NOT NULL CHECK (page_type IN ('homepage', 'product', 'category')),
  page_id TEXT,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  og_image TEXT,
  twitter_card TEXT DEFAULT 'summary_large_image',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(page_type, page_id)
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_seo_settings_page ON seo_settings(page_type, page_id);

-- Enable Row Level Security
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "SEO settings are viewable by everyone"
  ON seo_settings FOR SELECT
  USING (true);

CREATE POLICY "SEO settings are insertable by authenticated users"
  ON seo_settings FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "SEO settings are updatable by authenticated users"
  ON seo_settings FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "SEO settings are deletable by authenticated users"
  ON seo_settings FOR DELETE
  USING (auth.role() = 'authenticated');
```

---

### **Step 4: Paste into SQL Editor**
1. Click in the SQL editor text area
2. Paste the SQL code (Ctrl+V or Cmd+V)
3. You should see the SQL code in the editor

---

### **Step 5: Run the Migration**
1. Click the **Run** button (blue button, top right)
2. Wait for it to complete (should take 2-5 seconds)
3. You should see: **"Success. No rows returned"**

---

### **Step 6: Verify the Table Was Created**

Run this verification query to confirm:

```sql
SELECT table_name FROM information_schema.tables 
WHERE table_name = 'seo_settings';
```

**Expected Result:**
```
table_name
-----------
seo_settings
```

If you see `seo_settings` in the results, the migration was successful! ✅

---

## 🎯 What This Migration Does

### **Creates `seo_settings` Table**
- Stores SEO metadata for pages (homepage, product, category)
- Columns: id, page_type, page_id, meta_title, meta_description, meta_keywords, og_image, twitter_card
- Unique constraint on (page_type, page_id) to prevent duplicates

### **Creates Index**
- `idx_seo_settings_page` - Improves query performance

### **Enables Row Level Security (RLS)**
- Public read access (everyone can view)
- Authenticated users can insert, update, delete

---

## ✅ After Migration

Once the migration is complete:

1. **Refresh your browser** - Clear any cached errors
2. **Go to Admin Panel** - Navigate to `/admin/seo`
3. **Create SEO Settings** - Add SEO metadata for your pages
4. **Apply Defaults** - Use India-optimized defaults
5. **Save Settings** - Click "Create SEO Settings"

---

## 🆘 Troubleshooting

### **Issue: "Error: relation 'seo_settings' already exists"**
**Solution:** The table already exists. This is fine! Just refresh your browser.

### **Issue: "Error: permission denied"**
**Solution:** Make sure you're logged in as the project owner or have admin privileges.

### **Issue: "Error: syntax error"**
**Solution:** Make sure you copied the entire SQL code correctly. Try again.

### **Issue: Still getting "Could not find the table" error**
**Solution:** 
1. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)
2. Clear browser cache
3. Try accessing `/admin/seo` again

---

## 📊 Table Structure

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| page_type | TEXT | 'homepage', 'product', or 'category' |
| page_id | TEXT | Specific page ID (null for homepage) |
| meta_title | TEXT | SEO meta title (60 chars max) |
| meta_description | TEXT | SEO meta description (160 chars max) |
| meta_keywords | TEXT | SEO keywords (comma-separated) |
| og_image | TEXT | Open Graph image URL |
| twitter_card | TEXT | Twitter card type (default: 'summary_large_image') |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

---

## 🔐 Row Level Security (RLS) Policies

| Policy | Action | Who Can | Condition |
|--------|--------|---------|-----------|
| SEO settings are viewable by everyone | SELECT | Everyone | Always true |
| SEO settings are insertable by authenticated users | INSERT | Authenticated users | Always true |
| SEO settings are updatable by authenticated users | UPDATE | Authenticated users | Always true |
| SEO settings are deletable by authenticated users | DELETE | Authenticated users | Always true |

---

## 📝 Next Steps

1. ✅ Apply this migration in Supabase
2. ✅ Verify the table was created
3. ✅ Refresh your browser
4. ✅ Go to `/admin/seo`
5. ✅ Create SEO settings for your pages
6. ✅ Apply India-optimized defaults
7. ✅ Save and publish

---

## 💡 Pro Tips

### **Bulk Insert Default SEO Settings**
After creating the table, you can run this to add default settings:

```sql
INSERT INTO seo_settings (page_type, page_id, meta_title, meta_description, meta_keywords, og_image, twitter_card)
VALUES 
  ('homepage', 'homepage', 'SparkleSphere - 3D Printed Products India | ₹ Affordable', 'Discover premium 3D printed products, custom designs & personalized gifts in India. Fast delivery, affordable prices. Shop now!', '3D printing India, custom 3D printed products, personalized gifts India', 'https://m42k3d-shop-jqzt.vercel.app/og-image.jpg', 'summary_large_image');
```

### **View All SEO Settings**
```sql
SELECT * FROM seo_settings ORDER BY created_at DESC;
```

### **Update a Specific Setting**
```sql
UPDATE seo_settings 
SET meta_title = 'Your New Title'
WHERE page_type = 'homepage';
```

---

## ✨ Status

**Migration File:** `lib/supabase/migrations/add_seo_settings_table.sql`
**Status:** Ready to apply
**Next Step:** Follow the steps above to apply in Supabase

---

**Need help?** Refer to the Supabase documentation: https://supabase.com/docs/guides/database/sql-editor

