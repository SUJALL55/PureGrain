# 🔥 QUICK FIX: Razorpay Payment Error

## Problem: "Oops something went wrong - Payment Failed"

---

## ✅ FIXED! Here's What You Need To Do:

### Step 1: Get Your Razorpay Key (2 minutes)
1. Go to: https://dashboard.razorpay.com/
2. Login
3. Settings → API Keys
4. Copy your **Key ID**

### Step 2: Update Code (30 seconds)
Open: `src/pages/Checkout.jsx`
Line ~45:

```javascript
// REPLACE THIS:
const RAZORPAY_KEY_ID = 'rzp_live_YOUR_KEY_ID';

// WITH YOUR ACTUAL KEY:
const RAZORPAY_KEY_ID = 'rzp_test_your_actual_key_here';
```

### Step 3: Test (1 minute)
1. Run: `npm run dev`
2. Add product to cart
3. Go to checkout
4. Select payment
5. Use test card: `4111 1111 1111 1111`
6. Expiry: `12/25`
7. CVV: `123`
8. Payment should work! ✅

---

## 🎯 Test Credentials

**Card Payment:**
```
Card: 4111 1111 1111 1111
Expiry: 12/25
CVV: 123
Name: Test
```

**UPI Payment:**
```
UPI ID: success@razorpay
```

---

## ❌ Still Not Working?

### Check These:

1. **Is your Key ID correct?**
   - Must start with `rzp_test_` or `rzp_live_`
   - No spaces or extra characters

2. **Are you in the right mode?**
   - Test Mode → Use `rzp_test_` keys
   - Live Mode → Use `rzp_live_` keys

3. **Is Razorpay script loading?**
   - Open browser console (F12)
   - Look for errors
   - Refresh page

4. **Is your account verified?**
   - Check email for verification
   - Complete KYC if pending

---

## ✅ What I Fixed in the Code

1. ✅ Added payment failure handler
2. ✅ Better error messages
3. ✅ Fixed UPI payment format
4. ✅ Added payment method filtering
5. ✅ Proper loading states
6. ✅ Payment cancelled handling
7. ✅ Error logging for debugging

---

## 🚀 Ready to Test?

```bash
npm run dev
```

Then:
1. Add to cart
2. Checkout
3. Pay with test card
4. Should work! 🎉

---

## 📞 Need Help?

**Razorpay Support:**
- Email: support@razorpay.com
- Phone: +91-80-6873-6727

**Full Guide:**
See `RAZORPAY_FIX_GUIDE.md` for detailed troubleshooting

---

## ✨ Summary

**Problem:** Payment failing with "something went wrong"
**Cause:** Missing/invalid Razorpay key + poor error handling
**Solution:** Updated code + added your key
**Status:** ✅ READY TO TEST!

Just add your Razorpay key and test! 🚀
