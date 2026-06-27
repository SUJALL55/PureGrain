# Razorpay Payment Gateway Setup Guide

## 🎉 What's Been Added

Your PureGrain website now has a **complete Razorpay payment gateway integration** with:

✅ **Online Payments** - UPI, Credit/Debit Cards, Net Banking, Wallets
✅ **Manual UPI** - Direct UPI ID transfer
✅ **QR Code** - Scan to pay
✅ **Cash on Delivery** - Pay when delivered
✅ **Automatic payment processing** with Razorpay checkout
✅ **Payment confirmation** sent to WhatsApp with Payment ID
✅ **Beautiful checkout UI** with loading states

---

## 📋 Step-by-Step Setup

### Step 1: Create Razorpay Account

1. Go to [https://dashboard.razorpay.com/signup](https://dashboard.razorpay.com/signup)
2. Create a new account with your business details
3. Verify your email and phone number
4. Complete KYC (Aadhaar/PAN required)

### Step 2: Get Your API Keys

1. Login to Razorpay Dashboard
2. Go to **Settings** → **API Keys** (or **Account & Settings** → **API Keys**)
3. Click **Generate Key**
4. You'll get two keys:
   - **Key ID** (starts with `rzp_live_` or `rzp_test_`)
   - **Key Secret** (keep this secret!)

**Important:** 
- Use **Test Mode** keys for development/testing
- Use **Live Mode** keys for production (after KYC approval)

### Step 3: Update Your Code

**File:** `src/component/PaymentModal.jsx`
**Line:** ~27

Replace this:
```javascript
const RAZORPAY_KEY_ID = 'rzp_live_YOUR_KEY_ID'; // Replace with your Razorpay Key ID
```

With your actual Key ID:
```javascript
const RAZORPAY_KEY_ID = 'rzp_live_xxxxxxxxxx'; // Your actual Key ID
```

### Step 4: (Optional) Update Your Logo

**File:** `src/component/PaymentModal.jsx`
**Line:** ~89

Replace with your logo URL:
```javascript
image: 'https://your-logo-url.com/logo.png',
```

---

## 🧪 Testing the Payment Gateway

### Test Mode (Before Going Live)

1. Use **Test Mode** keys from Razorpay dashboard
2. Add products to cart
3. Proceed to checkout
4. Select **"UPI/Cards/Net Banking"** payment option
5. Click "Place Order"
6. Razorpay test modal will open
7. Use these test cards:
   - **Success:** `4111 1111 1111 1111`, any future expiry, any CVV
   - **Failure:** `4111 1111 1111 1112`
8. For UPI, use: `success@razorpay`

### Going Live

1. Complete Razorpay KYC
2. Switch to **Live Mode** in dashboard
3. Generate **Live API Keys**
4. Update `RAZORPAY_KEY_ID` with live key (starts with `rzp_live_`)
5. Test with a real payment (₹1)

---

## 💳 Payment Methods Explained

### 1. **Online Payment (Razorpay)** - Recommended ⭐
Customers can pay using:
- UPI (Google Pay, PhonePe, Paytm, BHIM, etc.)
- Credit/Debit Cards (Visa, Mastercard, RuPay, Amex)
- Net Banking (All major banks)
- Wallets (Paytm, Mobikwik, Ola Money, etc.)
- EMI options

**Flow:**
1. Customer selects "UPI/Cards/Net Banking"
2. Razorpay modal opens
3. Customer chooses payment method
4. Payment processed securely
5. Success → WhatsApp message with Payment ID
6. Cart cleared automatically

### 2. **Manual UPI**
- Shows your UPI ID
- Customer copies and pays manually
- Sends WhatsApp message
- You verify payment manually

### 3. **QR Code**
- Displays your UPI QR code
- Customer scans with any UPI app
- Sends WhatsApp message
- You verify payment manually

### 4. **Cash on Delivery**
- No online payment
- Customer pays when order delivered
- Order sent to WhatsApp

---

## 🔒 Security Best Practices

### Current Setup (Frontend Only)
✅ Good for starting out
✅ Works well with WhatsApp verification
⚠️ Order creation happens on frontend

### Production Setup (Recommended)
For enhanced security, create orders on your backend:

1. **Create a backend endpoint** to generate Razorpay orders
2. **Verify webhook signatures** to confirm payments
3. **Store orders in database** for tracking

Example backend flow:
```javascript
// Backend (Node.js/Express)
app.post('/create-order', async (req, res) => {
  const instance = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET'
  });
  
  const order = await instance.orders.create({
    amount: req.body.amount * 100,
    currency: 'INR',
    receipt: req.body.receipt
  });
  
  res.json(order);
});
```

Then update PaymentModal.jsx to call this endpoint.

---

## 📊 Razorpay Dashboard Features

After going live, you can:
- **View all payments** - Successful, failed, refunded
- **Generate reports** - Daily, weekly, monthly
- **Issue refunds** - Full or partial
- **Track settlements** - When money hits your bank
- **Set up webhooks** - Automatic notifications
- **View analytics** - Payment trends, success rates

---

## 💰 Razorpay Pricing

- **Domestic Payments:** 2% per transaction
- **International Payments:** 3% + ₹3 per transaction
- **No setup fees**
- **No annual maintenance charges**
- **Settlement:** T+2 days (2 days after payment)

Example:
- Order of ₹500 → Razorpay fee = ₹10
- You receive = ₹490

---

## 🎨 Customization

### Change Brand Color
In PaymentModal.jsx, line ~100:
```javascript
theme: {
  color: '#F97316' // Change to your brand color
}
```

### Add More Payment Methods
Razorpay supports:
- EMI
- Buy Now Pay Later
- UPI Intent
- Payment Links

Contact Razorpay support to enable these features.

---

## 🆘 Troubleshooting

### "Payment gateway not loaded"
- Refresh the page
- Check internet connection
- Ensure Razorpay script loads (check browser console)

### Payment failed but money deducted
- Don't worry, Razorpay auto-refunds within 5-7 days
- Check Razorpay dashboard for transaction status
- Contact Razorpay support if needed

### Test payments not working
- Ensure you're using test keys
- Use correct test card numbers
- Check browser console for errors

---

## 📞 Razorpay Support

- **Email:** support@razorpay.com
- **Phone:** +91-80-6873-6727
- **Docs:** https://razorpay.com/docs/
- **Test Cards:** https://razorpay.com/docs/payments/payments/test-card-upi-details/

---

## 🚀 Next Steps

1. ✅ Create Razorpay account
2. ✅ Get API keys
3. ✅ Update PaymentModal.jsx with your Key ID
4. ✅ Test with test mode
5. ✅ Complete KYC
6. ✅ Switch to live mode
7. ✅ Start accepting real payments!

---

## 💡 Pro Tips

1. **Always test thoroughly** before going live
2. **Keep your Key Secret private** - never commit to Git
3. **Set up email notifications** in Razorpay dashboard
4. **Monitor failed payments** - common issue with UPI timeouts
5. **Use webhooks** for automatic order confirmation
6. **Save customer payment IDs** for future reference
7. **Reconcile daily** - match Razorpay settlements with orders

---

**Need help?** Let me know if you want to:
- Add backend order creation
- Set up webhooks
- Add payment verification
- Create an order history page
- Add refund functionality
