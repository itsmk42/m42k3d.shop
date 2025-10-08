# 🔧 Fix "Bucket not found" Error

## Complete Guide to Create Supabase Storage Bucket

**Error:** `StorageApiError: Bucket not found`  
**Cause:** `product-images` bucket doesn't exist in Supabase  
**Solution:** Create bucket manually in Supabase Dashboard  
**Time Required:** 3 minutes

---

## 🎯 **Quick Fix Steps**

### **Step 1: Open Supabase Storage**

1. **Go to Supabase Dashboard:**
   - URL: https://supabase.com/dashboard
   - Sign in if needed

2. **Select Your Project:**
   - Click on project: `ijviarfucnpjakjknzzs`
   - Or look for "M42K3D Shop" project

3. **Open Storage:**
   - Look at the left sidebar
   - Click on "Storage" icon (looks like a folder)
   - You'll see the Storage page

---

### **Step 2: Create New Bucket**

1. **Click "New Bucket" Button:**
   - Look for green "+ New Bucket" button at top right
   - Click it

2. **Fill in Bucket Details:**
   ```
   Name: product-images
   Public bucket: ✅ CHECKED (IMPORTANT!)
   File size limit: 5 MB (optional)
   Allowed MIME types: image/* (optional)
   ```

3. **Important Settings:**
   - ✅ **Name must be exactly:** `product-images` (no spaces, lowercase)
   - ✅ **Public bucket must be CHECKED** (this allows public read access)
   - ✅ Leave other settings as default

4. **Click "Create Bucket"**
   - Should see success message
   - Bucket appears in list

---

### **Step 3: Configure Bucket Policies**

After creating the bucket, you need to set up access policies.

#### **Option A: Using Supabase Dashboard (Recommended)**

1. **Click on the `product-images` bucket** you just created

2. **Click "Policies" tab** at the top

3. **Click "New Policy"** button

4. **Create Policy 1: Public Read Access**
   - Click "Create a new policy from scratch"
   - Fill in:
     ```
     Policy name: Public read access
     Allowed operation: SELECT
     Target roles: public
     USING expression: true
     ```
   - Click "Review" then "Save policy"

5. **Create Policy 2: Authenticated Upload**
   - Click "New Policy" again
   - Fill in:
     ```
     Policy name: Authenticated users can upload
     Allowed operation: INSERT
     Target roles: authenticated
     WITH CHECK expression: true
     ```
   - Click "Review" then "Save policy"

6. **Create Policy 3: Authenticated Update**
   - Click "New Policy" again
   - Fill in:
     ```
     Policy name: Authenticated users can update
     Allowed operation: UPDATE
     Target roles: authenticated
     USING expression: true
     ```
   - Click "Review" then "Save policy"

7. **Create Policy 4: Authenticated Delete**
   - Click "New Policy" again
   - Fill in:
     ```
     Policy name: Authenticated users can delete
     Allowed operation: DELETE
     Target roles: authenticated
     USING expression: true
     ```
   - Click "Review" then "Save policy"

#### **Option B: Using SQL Editor (Faster)**

1. **Go to SQL Editor** (left sidebar)

2. **Click "+ New Query"**

3. **Copy and paste this SQL:**

```sql
-- Storage policies for product-images bucket
CREATE POLICY "Public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
```

4. **Click "Run"** button

5. **Wait for success message**

---

### **Step 4: Verify Bucket is Ready**

1. **Go back to Storage** (left sidebar)

2. **Check bucket exists:**
   - ✅ `product-images` appears in bucket list
   - ✅ Shows "Public" badge
   - ✅ Shows 0 objects (empty)

3. **Click on bucket name** to open it

4. **Try uploading a test file:**
   - Click "Upload file" button
   - Select any image from your computer
   - Should upload successfully
   - If successful, you can delete the test file

---

### **Step 5: Test in Admin Panel**

1. **Go to your admin panel:**
   - Local: http://localhost:3001/admin/products
   - Live: https://your-site.vercel.app/admin/products

2. **Log in** with admin credentials

3. **Click "Add Product"**

4. **Click the upload area**

5. **Select an image file**

6. **Verify:**
   - ✅ Upload progress shows
   - ✅ Success toast appears: "1 image(s) uploaded successfully!"
   - ✅ Image appears in preview grid
   - ✅ No "Bucket not found" error

7. **Fill in product details and save**

8. **Verify image saved:**
   - Product appears in list with image
   - Image displays correctly

---

## 🐛 **Troubleshooting**

### **Error: "Bucket not found" still appears**

**Possible Causes:**

1. **Bucket name is wrong**
   - ✅ Must be exactly: `product-images` (lowercase, with hyphen)
   - ❌ Not: `product_images`, `productimages`, `Product-Images`

2. **Bucket is not public**
   - Go to Storage → Click bucket → Check "Public" badge
   - If not public, delete and recreate with "Public bucket" checked

3. **Browser cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or clear browser cache

4. **Not logged in**
   - Make sure you're logged in to admin panel
   - Check session in browser DevTools → Application → Local Storage

---

### **Error: "Permission denied" when uploading**

**Cause:** Storage policies not configured

**Solution:**
1. Go to Storage → `product-images` → Policies tab
2. Verify 4 policies exist (SELECT, INSERT, UPDATE, DELETE)
3. If missing, run the SQL from Step 3 Option B above

---

### **Error: "Invalid bucket configuration"**

**Cause:** Bucket settings incorrect

**Solution:**
1. Delete the bucket
2. Recreate with correct settings:
   - Name: `product-images`
   - Public: ✅ Checked
   - File size limit: 5 MB
   - Allowed MIME types: `image/*`

---

### **Images upload but don't display**

**Cause:** Bucket is not public

**Solution:**
1. Go to Storage → Click `product-images`
2. Click "Settings" (gear icon)
3. Check "Public bucket" is enabled
4. If not, you need to recreate the bucket as public

---

## 📋 **Verification Checklist**

After completing the steps above, verify:

- [ ] Bucket `product-images` exists in Supabase Storage
- [ ] Bucket shows "Public" badge
- [ ] Bucket has 4 policies configured (SELECT, INSERT, UPDATE, DELETE)
- [ ] Can upload test file in Supabase dashboard
- [ ] Can upload image in admin panel
- [ ] No "Bucket not found" error
- [ ] Image appears in preview grid
- [ ] Image saves with product
- [ ] Image displays in product list
- [ ] Image displays on product page

---

## 🎯 **Why This Happened**

### **Root Cause:**

The SQL schema in `lib/supabase/schema.sql` includes commands to create the storage bucket:

```sql
-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true);
```

**However, this SQL command might fail silently if:**
1. You don't have permission to insert into `storage.buckets` table
2. The SQL was run partially and this section was skipped
3. There was an error that wasn't displayed

**Solution:** Create the bucket manually through the Supabase Dashboard (which uses proper APIs)

---

## 📊 **Bucket Configuration Summary**

### **Bucket Settings:**
```
Name: product-images
Type: Public
Access: Public read, Authenticated write
File size limit: 5 MB (recommended)
Allowed types: image/* (recommended)
```

### **Policies:**
```
1. SELECT (public) - Anyone can view images
2. INSERT (authenticated) - Logged-in users can upload
3. UPDATE (authenticated) - Logged-in users can update
4. DELETE (authenticated) - Logged-in users can delete
```

### **URL Format:**
```
https://ijviarfucnpjakjknzzs.supabase.co/storage/v1/object/public/product-images/{filename}
```

---

## 🔐 **Security Notes**

### **Why Public Bucket?**
- Product images need to be visible to all website visitors
- Public bucket allows direct image URLs without authentication
- Still secure because only authenticated users can upload/delete

### **Why Authenticated Write?**
- Only logged-in admin users can upload images
- Prevents random people from uploading to your storage
- Protects against abuse and unwanted content

### **File Size Limit:**
- 5MB limit prevents huge uploads
- Keeps storage costs reasonable
- Forces image optimization

---

## ✅ **Success Indicators**

You'll know it's working when:

1. **In Supabase Dashboard:**
   - ✅ `product-images` bucket exists
   - ✅ Shows "Public" badge
   - ✅ Has 4 policies configured
   - ✅ Can upload test files

2. **In Admin Panel:**
   - ✅ Upload area is clickable
   - ✅ Can select image files
   - ✅ Upload progress shows
   - ✅ Success message appears
   - ✅ Image appears in preview
   - ✅ No console errors

3. **After Saving Product:**
   - ✅ Product saves successfully
   - ✅ Image URL stored in database
   - ✅ Image displays in product list
   - ✅ Image displays on product page
   - ✅ Image loads from Supabase CDN

---

## 🚀 **Quick Reference**

### **Create Bucket (Dashboard):**
1. Storage → New Bucket
2. Name: `product-images`
3. Public: ✅ Checked
4. Create

### **Add Policies (SQL):**
```sql
CREATE POLICY "Public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
```

### **Test Upload:**
1. Admin panel → Add Product
2. Click upload area
3. Select image
4. Verify success

---

## 📞 **Need Help?**

### **Check These:**
1. Bucket name is exactly `product-images`
2. Bucket is marked as "Public"
3. 4 policies are configured
4. You're logged in as admin
5. Browser console shows no other errors

### **Common Mistakes:**
- ❌ Bucket name has typo
- ❌ Bucket is not public
- ❌ Policies not configured
- ❌ Not logged in
- ❌ Wrong Supabase project

---

**Go to Supabase Storage now and create the bucket!** 🚀

**Dashboard:** https://supabase.com/dashboard

**Time to fix:** 3 minutes ⏱️

