# 📧 Email Notification System Setup Guide

## ✅ Status: READY TO CONFIGURE

**What's Implemented:**
- ✅ Email templates for all order statuses
- ✅ Email service with Resend and SendGrid support
- ✅ API route for sending emails
- ✅ Admin panel integration for automatic email sending
- ✅ Tracking number support in emails

---

## 🚀 Quick Start

### **Step 1: Choose Email Service**

You have two options:

#### **Option A: Resend (Recommended)**
- Free tier: 100 emails/day
- Easy setup
- Great for startups
- Website: https://resend.com

#### **Option B: SendGrid**
- Free tier: 100 emails/day
- More features
- Better for scale
- Website: https://sendgrid.com

---

## 📧 Setup with Resend (Recommended)

### **Step 1: Create Resend Account**

1. Go to https://resend.com
2. Click "Sign Up"
3. Enter your email and password
4. Verify your email

### **Step 2: Get API Key**

1. Go to https://resend.com/api-keys
2. Click "Create API Key"
3. Name it: `sparklesphere-shop`
4. Copy the API key

### **Step 3: Add to Environment Variables**

Add to `.env.local`:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```

Add to Vercel (for production):
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add `RESEND_API_KEY` with your API key
5. Select all environments (Production, Preview, Development)
6. Click Save
7. Redeploy

### **Step 4: Verify Email Domain (Optional)**

For production, verify your domain:

1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter your domain (e.g., sparklesphere.shop)
4. Add DNS records as shown
5. Wait for verification

**For now, emails will be sent from `orders@sparklesphere.shop`**

---

## 📧 Setup with SendGrid (Alternative)

### **Step 1: Create SendGrid Account**

1. Go to https://sendgrid.com
2. Click "Sign Up"
3. Enter your details
4. Verify your email

### **Step 2: Get API Key**

1. Go to https://app.sendgrid.com/settings/api_keys
2. Click "Create API Key"
3. Name it: `sparklesphere-shop`
4. Select "Full Access"
5. Copy the API key

### **Step 3: Add to Environment Variables**

Add to `.env.local`:
```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
```

Add to Vercel (for production):
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add `SENDGRID_API_KEY` with your API key
5. Select all environments
6. Click Save
7. Redeploy

---

## 🧪 Test Email Sending

### **Test 1: Manual Email Test**

1. Go to admin panel: http://localhost:3000/admin/orders
2. Find an order
3. Click to expand it
4. Change the status (e.g., to "Processing")
5. Check the customer's email for notification

### **Test 2: Check Console Logs**

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for email sending logs
4. Check for any errors

### **Test 3: Check Server Logs**

1. Look at your terminal where dev server is running
2. Check for email API responses
3. Look for any error messages

---

## 📋 Email Notification Triggers

Emails are sent automatically when:

| Status | Trigger | Email Content |
|--------|---------|---------------|
| pending | Order created | Order confirmation |
| cod-pending | COD order created | Payment instructions |
| upi-pending | UPI order created | Payment instructions |
| processing | Admin marks as processing | Order being prepared |
| shipped | Admin marks as shipped | Tracking number included |
| delivered | Admin marks as delivered | Thank you message |

---

## 📧 Email Templates

### **Order Created Email**
- Order ID and date
- Order total
- Items list
- Payment method
- Status: "Order Confirmed"

### **Processing Email**
- Order ID
- Status: "Order Processing"
- Message: "Your order is being prepared"

### **Shipped Email**
- Order ID
- Status: "Order Shipped"
- **Tracking Number** (if provided)
- Message: "Your order is on its way"

### **Delivered Email**
- Order ID
- Status: "Order Delivered"
- Thank you message

---

## 🔧 Troubleshooting

### **Issue 1: Emails Not Sending**

**Check:**
1. Is API key set in `.env.local`?
2. Is API key correct?
3. Check browser console for errors
4. Check server logs for errors

**Solution:**
```bash
# Restart dev server
npm run dev
```

---

### **Issue 2: "Email service not configured"**

**Cause:** No API key set

**Solution:**
1. Add `RESEND_API_KEY` or `SENDGRID_API_KEY` to `.env.local`
2. Restart dev server
3. Try again

---

### **Issue 3: Emails Going to Spam**

**Cause:** Domain not verified

**Solution:**
1. Verify your domain in Resend/SendGrid
2. Add SPF and DKIM records
3. Wait 24 hours for propagation

---

### **Issue 4: "Failed to send email" Error**

**Cause:** API key invalid or service down

**Solution:**
1. Verify API key is correct
2. Check Resend/SendGrid status page
3. Try again later

---

## 📊 Email Service Comparison

| Feature | Resend | SendGrid |
|---------|--------|----------|
| Free Tier | 100/day | 100/day |
| Setup Time | 5 min | 10 min |
| Documentation | Excellent | Good |
| Support | Good | Excellent |
| Recommended | ✅ Yes | ✅ Yes |

---

## 🎯 Next Steps

1. **Choose email service** (Resend or SendGrid)
2. **Create account** and get API key
3. **Add API key** to `.env.local`
4. **Restart dev server**
5. **Test email sending** by updating order status
6. **Check customer email** for notification
7. **Deploy to Vercel** with API key in environment variables

---

## 📞 FAQ

**Q: Which email service should I use?**
A: Resend is recommended for simplicity. SendGrid is better for scale.

**Q: Can I use both services?**
A: Yes, the system will try Resend first, then SendGrid.

**Q: How many emails can I send?**
A: Both services offer 100 emails/day free tier.

**Q: Will emails work on Vercel?**
A: Yes, after adding API key to environment variables.

**Q: Can I customize email templates?**
A: Yes, edit `lib/email/templates.ts`

**Q: How do I track email opens?**
A: Use Resend/SendGrid dashboard for analytics.

---

## 🔐 Security Notes

- ✅ API keys are stored in environment variables
- ✅ Never commit `.env.local` to Git
- ✅ Use different keys for dev/prod
- ✅ Rotate keys periodically

---

## 📚 Resources

- **Resend Docs:** https://resend.com/docs
- **SendGrid Docs:** https://docs.sendgrid.com
- **Email Templates:** `lib/email/templates.ts`
- **Email Service:** `lib/email/service.ts`
- **API Route:** `app/api/emails/send-order-notification/route.ts`

---

**Status:** ✅ READY TO SETUP
**Time Required:** 10-15 minutes
**Difficulty:** Easy
**Last Updated:** 2025-10-27

