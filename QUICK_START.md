# Quick Start - Payment Gateway

## 🔑 What You Need to Do RIGHT NOW:

### 1. Get Razorpay Keys (5 minutes)
1. Go to: https://dashboard.razorpay.com/signup
2. Create account
3. Go to Settings → API Keys
4. Copy your **Key ID**

### 2. Update Code (1 minute)
Open: `src/component/PaymentModal.jsx`
Find line 27 and replace:
```javascript
const RAZORPAY_KEY_ID = 'rzp_live_YOUR_KEY_ID';
```
With your actual key:
```javascript
const RAZORPAY_KEY_ID = 'rzp_test_xxxxxxxxxx'; // Your test key
```

### 3. Test It! (2 minutes)
1. Run your app: `npm run dev`
2. Add product to cart
3. Click cart icon
4. Click "Proceed to Checkout"
5. Fill in details
6. Select "UPI/Cards/Net Banking"
7. Click "Place Order"
8. Razorpay modal opens! 🎉

---

## 🎯 Payment Options Available:

1. **UPI/Cards/Net Banking** - Razorpay (Recommended ⭐)
2. **Cash on Delivery** - Pay when delivered
3. **Manual UPI** - Direct transfer to your UPI ID
4. **QR Code** - Scan to pay

---

## 📝 Test Card Details:
- Card: `4111 1111 1111 1111`
- Expiry: Any future date
- CVV: Any 3 digits
- UPI: `success@razorpay`

---

## ✅ Before Going Live:
- [ ] Complete Razorpay KYC
- [ ] Switch to Live Mode
- [ ] Generate Live Keys
- [ ] Update Key ID in code
- [ ] Test with ₹1 real payment

---

## 🆘 Need Help?
See full guide: `RAZORPAY_SETUP.md`

Razorpay Support:
- Email: support@razorpay.com
- Phone: +91-80-6873-6727
