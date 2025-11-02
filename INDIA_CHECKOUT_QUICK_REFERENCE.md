# 🇮🇳 India Checkout - Quick Reference

## 🎯 What Changed

### **Checkout Form (app/checkout/page.tsx)**
```
OLD:
- Email (optional)
- Phone (optional)
- Address
- City
- Postal Code
- Country

NEW:
- Full Name (required)
- Email (required) ✨
- Phone (10 digits, required) ✨
- House/Flat No. & Building Name (required)
- PIN Code (6 digits, required) ✨ AUTO-FILLS CITY/STATE
- City (auto-filled, read-only)
- State (auto-filled, read-only) ✨
- Country (pre-filled "India", disabled)
```

### **Post-Order Flow**
```
GUEST USER:
1. Places order
2. Account creation modal appears
3. Can create account or skip
4. Redirects to order confirmation

LOGGED-IN USER:
1. Places order
2. Redirects directly to order confirmation
```

---

## 🧪 Test PIN Codes

| PIN Code | City | State |
|----------|------|-------|
| 110001 | New Delhi | Delhi |
| 400001 | Mumbai | Maharashtra |
| 560001 | Bangalore | Karnataka |
| 500001 | Hyderabad | Telangana |
| 600001 | Chennai | Tamil Nadu |
| 700001 | Kolkata | West Bengal |
| 411001 | Pune | Maharashtra |
| 380001 | Ahmedabad | Gujarat |
| 302001 | Jaipur | Rajasthan |
| 226001 | Lucknow | Uttar Pradesh |

---

## 📱 Test Phone Numbers

| Number | Valid? | Reason |
|--------|--------|--------|
| 9876543210 | ✅ | 10 digits, starts with 9 |
| 8765432109 | ✅ | 10 digits, starts with 8 |
| 7654321098 | ✅ | 10 digits, starts with 7 |
| 6543210987 | ✅ | 10 digits, starts with 6 |
| 1234567890 | ❌ | Starts with 1 (invalid) |
| 987654321 | ❌ | Only 9 digits |
| 98765432101 | ❌ | 11 digits |

---

## 🔧 Key Files

| File | Purpose |
|------|---------|
| `lib/utils/pincode.ts` | PIN code validation & lookup |
| `app/checkout/page.tsx` | Checkout form with validation |
| `app/checkout/review/page.tsx` | Order review & account modal |
| `components/checkout/AccountCreationModal.tsx` | Account creation dialog |
| `lib/store/checkout.ts` | Checkout state management |

---

## 🚀 Features

### **PIN Code Auto-Fill**
- Enter 6-digit PIN code
- City and state auto-fill
- Shows error if PIN not found
- User can edit manually if needed

### **Phone Validation**
- Must be 10 digits
- Must start with 6, 7, 8, or 9
- Real-time validation feedback
- Prevents invalid submissions

### **Account Creation Modal**
- Shows only for guest users
- Pre-filled with checkout details
- Can be skipped
- Appears after successful order

### **Indian Address Format**
- House/Flat No. & Building Name
- Area/Street (optional)
- City (auto-filled)
- State (auto-filled)
- PIN Code (6 digits)
- Country (India, pre-filled)

---

## 📊 Validation Rules

```typescript
// PIN Code
- Must be 6 digits
- Must be numeric only
- Must exist in database (or user can enter manually)

// Phone Number
- Must be 10 digits
- Must start with 6, 7, 8, or 9
- Must be numeric only

// Email
- Must be valid email format
- Must be provided

// All other fields
- Must be non-empty
```

---

## 🎨 UI Changes

### **Checkout Form**
- Removed yellow demo notice banner
- Added PIN code field with auto-fill
- Added state field
- Updated placeholders for Indian format
- Added validation error messages
- Made email and phone mandatory

### **Review Page**
- Shows PIN code in review
- Shows state in review
- Account creation modal for guests
- Updated validation messages

---

## 🔄 User Flow

```
1. User adds items to cart
2. User clicks "Checkout"
3. User fills shipping information:
   - Name, Email, Phone (10 digits)
   - Address, PIN Code (6 digits)
   - City & State auto-fill from PIN
4. User clicks "Continue to Review"
5. User reviews order details
6. User selects payment method (UPI/COD)
7. User clicks "Place Order"
8. Order is created
9. IF GUEST:
   - Account creation modal appears
   - User can create account or skip
   - Redirects to order confirmation
10. IF LOGGED-IN:
    - Redirects directly to order confirmation
```

---

## 🐛 Troubleshooting

### **PIN Code Not Found**
- Check if PIN code is in database
- User can enter city/state manually
- For production, integrate with India Post API

### **Phone Validation Fails**
- Ensure exactly 10 digits
- Ensure starts with 6, 7, 8, or 9
- Remove any special characters

### **Account Modal Not Showing**
- Check if user is logged in
- Modal only shows for guest users
- Check browser console for errors

### **Form Not Submitting**
- Check all required fields are filled
- Check phone is 10 digits
- Check PIN code is 6 digits
- Check email is valid format

---

## 📞 Support

**For PIN Code Issues:**
- Check `lib/utils/pincode.ts` for database
- Add more PIN codes as needed
- Integrate with India Post API for full coverage

**For Phone Validation Issues:**
- Check `isValidIndianPhone()` function
- Ensure phone starts with 6-9
- Ensure exactly 10 digits

**For Account Modal Issues:**
- Check `AccountCreationModal.tsx` component
- Check guest user detection logic
- Check modal state management

---

**Last Updated:** 2025-11-02
**Status:** ✅ READY FOR TESTING

