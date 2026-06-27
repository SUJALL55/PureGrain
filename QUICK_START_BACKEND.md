# ⚡ QUICK START - Razorpay with Backend

## 🚀 Start in 3 Steps (5 Minutes)

---

### Step 1: Add Your Keys (1 min)

**Backend (server.js - Lines 17-18):**
```javascript
key_id: 'rzp_test_YOUR_KEY_ID',
key_secret: 'YOUR_KEY_SECRET'
```

**Frontend (src/pages/Checkout.jsx - Line 45):**
```javascript
const RAZORPAY_KEY_ID = 'rzp_test_YOUR_KEY_ID';
```

Get keys from: https://dashboard.razorpay.com → Settings → API Keys

---

### Step 2: Start Servers (1 min)

**Terminal 1 - Backend:**
```bash
node server.js
```
✅ Should show: "Razorpay server running on port 3001"

**Terminal 2 - Frontend:**
```bash
npm run dev
```
✅ Should show: "Local: http://localhost:5173"

---

### Step 3: Test Payment (2 min)

1. Add product to cart
2. Go to checkout (`/checkout`)
3. Fill address
4. Click "Pay"
5. Use test card:
   ```
   Card: 4111 1111 1111 1111
   Expiry: 12/25
   CVV: 123
   ```
6. **Payment succeeds!** 🎉

---

## 🎯 Test Credentials

**Card:**
```
Number: 4111 1111 1111 1111
Expiry: 12/25
CVV: 123
```

**UPI:**
```
ID: success@razorpay
```

---

## ❌ Not Working?

### Check:
1. ✅ Backend running? (`node server.js`)
2. ✅ Keys correct? (No spaces, starts with `rzp_test_`)
3. ✅ Both servers running? (Backend + Frontend)
4. ✅ Browser console errors? (F12 → Console)

### Common Fix:
```bash
# Stop both servers
# Restart backend
node server.js

# Restart frontend (new terminal)
npm run dev
```

---

## 📋 What's Fixed

✅ Order created on backend (order_id)
✅ Amount in paise (correct format)
✅ Payment signature verified
✅ Test keys used properly
✅ CORS configured
✅ Error handling added
✅ Console logging enabled

---

## 📁 Files Created

- ✅ `server.js` - Backend server
- ✅ `BACKEND_SETUP_COMPLETE.md` - Full guide
- ✅ Updated `Checkout.jsx` - Uses backend

---

## 🔄 Daily Workflow

**Every time you develop:**

1. Start backend: `node server.js`
2. Start frontend: `npm run dev`
3. Code & test
4. Both servers must be running!

---

## ✅ Ready!

**Status:** Payment system ready to test
**Just need:** Your Razorpay test keys
**Time:** 5 minutes to setup

**Go!** 🚀
