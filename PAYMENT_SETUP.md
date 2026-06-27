# Payment Gateway Setup Guide

## Overview
A complete payment system has been added to your PureGrain website with three payment options:
1. **UPI Payment** - Customers can pay directly to your UPI ID
2. **QR Code Payment** - Customers can scan your QR code with any UPI app
3. **Cash on Delivery (COD)** - Pay when order is delivered

## Configuration Required

### 1. Update UPI ID
**File:** `src/component/PaymentModal.jsx`
**Line:** ~19

```javascript
const upiId = 'puregrainmills@upi'; // Replace with your actual UPI ID
```

**Replace with your actual UPI ID**, for example:
- Google Pay: `yourname@okhdfcbank`
- PhonePe: `yourname@ybl`
- Paytm: `yourname@paytm`
- BHIM: `yourname@upi`

### 2. Add Your QR Code Image
**File:** `src/component/PaymentModal.jsx`
**Line:** ~20

```javascript
const qrCodeUrl = 'https://media.base44.com/images/public/69e3b4d8e2edc4505d8ed646/qr-code.png'; // Replace with your actual QR code image
```

**Options:**
1. Upload your QR code image to your Base44 media library and replace the URL
2. OR update the component to display the QR code directly (instructions below)

**To display actual QR code image:**
In `PaymentModal.jsx`, around line 246-250, replace:
```javascript
<div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
  <QrCode className="w-24 h-24 text-muted-foreground" />
</div>
```

With:
```javascript
<img src={qrCodeUrl} alt="Payment QR Code" className="w-48 h-48" />
```

### 3. Update WhatsApp Number (if needed)
**File:** `src/component/PaymentModal.jsx`
**Line:** ~83

The WhatsApp number is already set to `918800953377`. Change if needed.

## How It Works

### Customer Flow:
1. Customer adds products to cart
2. Clicks "Proceed to Checkout"
3. Fills in delivery details (name, phone, address)
4. Selects payment method:
   - **UPI**: Shows your UPI ID with copy button
   - **QR Code**: Displays your QR code to scan
   - **COD**: Cash on delivery option
5. Clicks "Place Order"
6. Order details sent to your WhatsApp with all information
7. Cart is automatically cleared

### WhatsApp Message Format:
When a customer places an order, you'll receive a formatted WhatsApp message with:
- Customer name and contact details
- Delivery address
- Order items with quantities and prices
- Total amount
- Selected payment method

## Features

✅ **Three payment options** - UPI, QR Code, Cash on Delivery
✅ **Copy UPI ID** - One-click copy to clipboard
✅ **Form validation** - Ensures required fields are filled
✅ **Order confirmation** - Success animation and message
✅ **WhatsApp integration** - Automatic order details sent to you
✅ **Auto cart clear** - Cart cleared after successful order
✅ **Mobile responsive** - Works perfectly on all devices
✅ **Toast notifications** - User-friendly feedback messages

## Testing

To test the payment system:
1. Add products to cart
2. Open cart drawer
3. Click "Proceed to Checkout"
4. Fill in the form
5. Select a payment method
6. Click "Place Order"
7. Check that WhatsApp opens with order details

## Customization Options

### Change Payment Methods Order
In `PaymentModal.jsx`, rearrange the buttons in the grid (lines 196-230)

### Add More Payment Methods
You can add additional payment options like:
- Credit/Debit Card (requires payment gateway integration like Razorpay, Stripe)
- Net Banking
- Wallet payments

### Modify WhatsApp Message Format
Edit the `orderMessage` variable in `PaymentModal.jsx` (lines 64-82)

## Next Steps (Optional)

For a fully automated payment system, you can integrate:
1. **Razorpay** - Popular Indian payment gateway
2. **Stripe** - International payment processing
3. **PhonePe Business** - Direct UPI integration
4. **Paytm Payment Gateway**

These would require:
- Backend server for payment verification
- API keys from the payment provider
- Webhook setup for payment confirmation

Let me know if you want to integrate any of these advanced payment gateways!
