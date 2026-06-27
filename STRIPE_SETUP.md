# Stripe Payment Gateway Setup Guide

## 🚀 Quick Setup

### 1. Get Your Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Sign up or log in to your account
3. Navigate to **Developers → API keys**
4. Copy your **Publishable key**

### 2. Configure Your App

1. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

2. Add your Stripe publishable key:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   ```

### 3. Backend Setup (Base44)

You need to create API functions in your Base44 backend:

#### Create Payment Intent Function
```javascript
// In your Base44 backend
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'inr', metadata } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

#### Confirm Payment Function
```javascript
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, orderData } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      // Save order to database
      // Send confirmation email
      res.json({ success: true, status: paymentIntent.status });
    } else {
      res.status(400).json({ error: 'Payment not successful' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### 4. Test the Payment Flow

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Add products to cart
3. Go to cart and click "Proceed to Checkout"
4. Use Stripe test cards:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **Authentication Required**: `4000 0025 0000 3155`

5. Use any future expiry date (e.g., 12/34)
6. Use any 3-digit CVC (e.g., 123)
7. Use any name and postal code

### 5. Mobile App (Capacitor)

The payment gateway works seamlessly in your mobile app:

```bash
# Build the web app
npm run build

# Sync with Capacitor
npx cap sync

# Run on Android
npx cap run android

# Run on iOS
npx cap run ios
```

### 6. Going Live

1. Switch to live keys in `.env`:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
   ```

2. Update your backend with live secret key

3. Test with real payment (small amount first)

## 📱 Features

✅ Secure payment processing via Stripe  
✅ Works on both web and mobile (Capacitor)  
✅ Support for all major payment methods  
✅ Automatic payment confirmation  
✅ Payment success page with order details  
✅ Mobile-responsive checkout form  
✅ WhatsApp ordering fallback option  

## 🔒 Security Notes

- Never expose your Stripe Secret Key in frontend code
- Always use environment variables
- Use HTTPS in production
- Enable Stripe radar for fraud prevention
- Comply with PCI DSS requirements

## 💳 Supported Payment Methods

Stripe automatically enables:
- Credit/Debit Cards (Visa, Mastercard, Amex)
- UPI (for India)
- Digital Wallets
- Bank Transfers
- And more based on your region

## 🆘 Troubleshooting

**White page on checkout?**
- Check if Stripe key is properly set in `.env`
- Verify backend API functions are deployed

**Payment failing?**
- Check Stripe dashboard for error logs
- Ensure amount is in smallest currency unit (paise/cents)

**Mobile app issues?**
- Ensure Capacitor is properly configured
- Check if web view supports payment iframes

## 📞 Support

For Stripe support: https://support.stripe.com  
For Base44 support: Check your Base44 dashboard
