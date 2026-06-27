# 🔥 Razorpay Payment Troubleshooting - Complete Guide

## 🎯 Your Issue: "Load Failed" Errors

Those 3 red "Load failed" errors mean:
**Frontend is trying to call backend API, but request is not reaching backend**

---

## ✅ QUICK FIX (90% of cases)

### The Backend URL is Already Correct!

Your Checkout.jsx has:
```javascript
// ✅ CORRECT - Full URL with port
fetch('http://localhost:3001/api/create-order')
```

This is **NOT** using relative path, so that's good!

---

## 🔍 Step-by-Step Debugging

### Step 1: Check if Backend is Running

**Run the diagnostic script:**
```bash
./check-payment-setup.sh
```

**Or check manually:**
```bash
# Check if port 3001 is in use
lsof -i :3001
```

**If nothing shows up → Backend is NOT running**

**Start it:**
```bash
node server.js
```

**Should show:**
```
✅ Razorpay server running on port 3001
📍 Test it: http://localhost:3001
```

---

### Step 2: Test Backend API Directly

**In browser, open:**
```
http://localhost:3001
```

**Or use curl:**
```bash
curl -X POST http://localhost:3001/api/create-order \
  -H "Content-Type: application/json" \
  -d '{"amount": 9900, "currency": "INR", "receipt": "test"}'
```

**Expected response:**
```json
{
  "success": true,
  "orderId": "order_xxxxx",
  "amount": 9900,
  "currency": "INR"
}
```

**❌ If you get "Cannot GET" or connection error:**
- Backend is not running
- Start it: `node server.js`

**❌ If you get error about keys:**
- Update server.js with your Razorpay keys
- Restart backend

---

### Step 3: Check Frontend Configuration

**Open browser console (F12)**

**Look for these errors:**

#### Error: "Failed to fetch"
**Cause:** Backend not running
**Fix:** `node server.js`

#### Error: "CORS policy"
**Cause:** CORS not enabled
**Fix:** Check server.js has:
```javascript
app.use(cors());
```

#### Error: "net::ERR_CONNECTION_REFUSED"
**Cause:** Wrong port or backend not running
**Fix:** 
1. Check backend is on port 3001
2. Check Checkout.jsx uses `http://localhost:3001`

---

### Step 4: Browser Network Tab Debugging

**1. Open DevTools (F12)**
**2. Go to Network tab**
**3. Clear all logs**
**4. Click "Pay ₹XXX" button**
**5. Look for:**

#### ✅ What You SHOULD See:
```
POST http://localhost:3001/api/create-order
Status: 200 OK
Response: { success: true, orderId: "order_..." }
```

#### ❌ What You MIGHT See:

**Status: (failed)**
- Backend not running
- Start: `node server.js`

**Status: CORS error**
- CORS not configured
- Check server.js: `app.use(cors())`

**Status: 404 Not Found**
- Wrong URL
- Should be: `http://localhost:3001/api/create-order`

**Status: 500 Internal Server Error**
- Backend error
- Check backend terminal for error message
- Usually invalid Razorpay keys

---

### Step 5: Verify Razorpay Keys

**In server.js (lines 17-18):**
```javascript
const razorpay = new Razorpay({
  key_id: 'rzp_test_YOUR_KEY_ID',     // ← Must be your actual key
  key_secret: 'YOUR_KEY_SECRET'        // ← Must be your actual secret
});
```

**Get keys from:**
1. https://dashboard.razorpay.com/
2. Login
3. Settings → API Keys
4. Copy Key ID and Key Secret

**Common mistakes:**
- ❌ Using placeholder: `rzp_test_YOUR_KEY_ID`
- ❌ Extra spaces: `'rzp_test_abc '`
- ❌ Wrong mode: Using live keys in test mode
- ✅ Correct: `'rzp_test_abc123xyz'` (no spaces)

---

### Step 6: Chrome vs Safari

**Safari Issues:**
Safari is strict with localhost and payments.

**Test in Chrome first:**
1. Open Chrome
2. Go to http://localhost:5173
3. Try payment
4. Check console (F12)

**If Chrome works but Safari doesn't:**
- Safari-specific issue
- Use Chrome for development
- For production (HTTPS), Safari will work fine

---

### Step 7: Port Mismatch Check

**Backend should be on:** 3001
**Frontend should be on:** 5173

**Verify:**
```bash
# Check backend port
lsof -i :3001

# Check frontend port
lsof -i :5173
```

**In Checkout.jsx, verify URL:**
```javascript
// Should be port 3001, NOT 5173
fetch('http://localhost:3001/api/create-order')
```

---

## 🚨 Common Scenarios & Solutions

### Scenario 1: Backend Not Started
**Symptoms:**
- "Load failed" in console
- "Failed to fetch" error
- No response from API

**Solution:**
```bash
node server.js
```

---

### Scenario 2: Wrong Razorpay Keys
**Symptoms:**
- Backend starts but throws error when creating order
- 500 Internal Server Error
- "Invalid key" error in backend terminal

**Solution:**
1. Get correct keys from Razorpay dashboard
2. Update server.js
3. Restart backend: Ctrl+C, then `node server.js`

---

### Scenario 3: CORS Error
**Symptoms:**
- "Access-Control-Allow-Origin" error
- Request blocked by browser
- Backend receives request but frontend can't read response

**Solution:**
Check server.js has:
```javascript
const cors = require('cors');
app.use(cors());
```

Then restart backend.

---

### Scenario 4: Both Servers Running But Still Failing
**Symptoms:**
- Backend running on 3001
- Frontend running on 5173
- Still getting "Load failed"

**Debug:**
1. Open Network tab (F12)
2. Check request URL
3. Should be: `http://localhost:3001/api/create-order`
4. If different → Update Checkout.jsx

**Check console logs:**
```javascript
// In Checkout.jsx, add this before fetch:
console.log('Calling backend at:', 'http://localhost:3001/api/create-order');
```

---

### Scenario 5: Amount Format Wrong
**Symptoms:**
- Order created but wrong amount
- Payment shows ₹2.39 instead of ₹239

**Solution:**
Amount must be in paise:
```javascript
// ✅ CORRECT
amount: getFinalTotal() * 100  // ₹239 → 23900 paise

// ❌ WRONG
amount: getFinalTotal()        // ₹239 → 239 (wrong!)
```

---

## 🔧 Diagnostic Commands

### Check if Backend is Running:
```bash
lsof -i :3001
```

### Check if Frontend is Running:
```bash
lsof -i :5173
```

### Test Backend API:
```bash
curl -X POST http://localhost:3001/api/create-order \
  -H "Content-Type: application/json" \
  -d '{"amount": 9900, "currency": "INR", "receipt": "test"}'
```

### Run Full Diagnostic:
```bash
./check-payment-setup.sh
```

### Check Ports:
```bash
# See what's running on port 3001
lsof -i :3001

# See what's running on port 5173
lsof -i :5173
```

---

## 📋 Complete Checklist

Before testing payment:

- [ ] Backend running (`node server.js`)
- [ ] Frontend running (`npm run dev`)
- [ ] Razorpay keys updated in server.js
- [ ] Razorpay key updated in Checkout.jsx
- [ ] Backend URL correct in Checkout.jsx (`http://localhost:3001`)
- [ ] CORS enabled in server.js
- [ ] Browser console open (F12)
- [ ] Network tab ready to monitor
- [ ] Test card ready: 4111 1111 1111 1111

---

## 🎯 Quick Test Flow

1. **Start backend:**
   ```bash
   node server.js
   ```
   ✅ Should show: "Razorpay server running on port 3001"

2. **Start frontend (new terminal):**
   ```bash
   npm run dev
   ```
   ✅ Should show: "Local: http://localhost:5173"

3. **Open browser:**
   ```
   http://localhost:5173
   ```

4. **Open console (F12)**
   - Keep it open during testing

5. **Add product to cart**

6. **Go to /checkout**

7. **Fill address**

8. **Click "Pay"**
   - Watch Network tab
   - Should see POST to `http://localhost:3001/api/create-order`
   - Should get 200 OK response

9. **Razorpay modal opens**
   - Use test card: 4111 1111 1111 1111
   - Expiry: 12/25
   - CVV: 123

10. **Payment succeeds!** 🎉

---

## 🆘 Still Not Working?

### Collect This Info:

1. **Browser Console Errors:**
   - Screenshot all red errors
   - Include full error message

2. **Network Tab:**
   - Screenshot the failed request
   - Show Status code
   - Show Response

3. **Backend Terminal:**
   - Any error messages?
   - Is it still running?

4. **Run Diagnostic:**
   ```bash
   ./check-payment-setup.sh
   ```
   - Share the output

### Common Last Resorts:

1. **Clear browser cache:**
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

2. **Restart both servers:**
   ```bash
   # Stop both (Ctrl+C)
   # Then restart
   node server.js
   npm run dev
   ```

3. **Try different browser:**
   - Chrome (recommended)
   - Firefox
   - Edge

4. **Check firewall:**
   - Make sure port 3001 is not blocked

---

## ✅ Success Indicators

You'll know it's working when:

1. ✅ Backend shows: "Razorpay server running on port 3001"
2. ✅ Frontend shows: "Local: http://localhost:5173"
3. ✅ Console shows NO red errors
4. ✅ Network tab shows 200 OK for create-order
5. ✅ Razorpay modal opens
6. ✅ Test card payment succeeds
7. ✅ Order confirmed page shows
8. ✅ WhatsApp message sent

---

## 📞 Need Help?

**Razorpay Support:**
- Email: support@razorpay.com
- Phone: +91-80-6873-6727

**Check these files:**
- `server.js` - Backend configuration
- `src/pages/Checkout.jsx` - Frontend configuration
- `BACKEND_SETUP_COMPLETE.md` - Full setup guide

**Run diagnostic:**
```bash
./check-payment-setup.sh
```

---

## 🎯 Summary

**Most Common Issue (90%):**
- Backend not running
- **Fix:** `node server.js`

**Second Most Common (9%):**
- Wrong/missing Razorpay keys
- **Fix:** Update keys in server.js

**Rare Issues (1%):**
- CORS not enabled
- Wrong port
- Browser issues
- **Fix:** Follow debugging steps above

**Your backend URL is already correct!** Just make sure the backend server is running. 🚀
