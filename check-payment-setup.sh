#!/bin/bash

# Razorpay Payment System - Diagnostic Script
# Run this to check if everything is set up correctly

echo "🔍 Razorpay Payment System Diagnostic"
echo "======================================"
echo ""

# Check 1: Backend Server
echo "✅ Check 1: Backend Server (port 3001)"
if lsof -i :3001 > /dev/null 2>&1; then
    echo "   ✅ Backend is RUNNING on port 3001"
else
    echo "   ❌ Backend is NOT running"
    echo "   👉 Start it with: node server.js"
fi
echo ""

# Check 2: Frontend Server
echo "✅ Check 2: Frontend Server (port 5173)"
if lsof -i :5173 > /dev/null 2>&1; then
    echo "   ✅ Frontend is RUNNING on port 5173"
else
    echo "   ❌ Frontend is NOT running"
    echo "   👉 Start it with: npm run dev"
fi
echo ""

# Check 3: server.js exists
echo "✅ Check 3: Backend File (server.js)"
if [ -f "server.js" ]; then
    echo "   ✅ server.js exists"
else
    echo "   ❌ server.js NOT found"
fi
echo ""

# Check 4: Razorpay package
echo "✅ Check 4: Required Packages"
if node -e "require('razorpay')" 2>/dev/null; then
    echo "   ✅ razorpay package installed"
else
    echo "   ❌ razorpay package NOT installed"
    echo "   👉 Install with: npm install razorpay"
fi

if node -e "require('express')" 2>/dev/null; then
    echo "   ✅ express package installed"
else
    echo "   ❌ express package NOT installed"
    echo "   👉 Install with: npm install express"
fi

if node -e "require('cors')" 2>/dev/null; then
    echo "   ✅ cors package installed"
else
    echo "   ❌ cors package NOT installed"
    echo "   👉 Install with: npm install cors"
fi
echo ""

# Check 5: Razorpay Keys Configuration
echo "✅ Check 5: Razorpay Keys Configuration"
if grep -q "rzp_test_YOUR_KEY_ID" server.js; then
    echo "   ⚠️  WARNING: Using placeholder keys in server.js"
    echo "   👉 Update server.js with your actual Razorpay keys"
elif grep -q "rzp_test_" server.js; then
    echo "   ✅ Test keys configured in server.js"
elif grep -q "rzp_live_" server.js; then
    echo "   ⚠️  WARNING: Using LIVE keys - be careful!"
fi
echo ""

# Check 6: Frontend Configuration
echo "✅ Check 6: Frontend Configuration"
if grep -q "rzp_live_YOUR_KEY_ID" src/pages/Checkout.jsx; then
    echo "   ⚠️  WARNING: Using placeholder keys in Checkout.jsx"
    echo "   👉 Update Checkout.jsx with your actual Razorpay Key ID"
elif grep -q "rzp_test_" src/pages/Checkout.jsx; then
    echo "   ✅ Test keys configured in Checkout.jsx"
elif grep -q "rzp_live_" src/pages/Checkout.jsx; then
    echo "   ⚠️  WARNING: Using LIVE keys - be careful!"
echo ""

# Check 7: Backend API URL
echo "✅ Check 7: Backend API URL in Frontend"
if grep -q "http://localhost:3001/api/create-order" src/pages/Checkout.jsx; then
    echo "   ✅ Correct backend URL (http://localhost:3001)"
else
    echo "   ❌ Backend URL might be wrong"
    echo "   👉 Should be: http://localhost:3001/api/create-order"
fi
echo ""

# Check 8: Port Mismatch
echo "✅ Check 8: Port Configuration"
BACKEND_PORT=$(grep "PORT = " server.js | grep -o '[0-9]\+' | tail -1)
if [ "$BACKEND_PORT" = "3001" ]; then
    echo "   ✅ Backend port: $BACKEND_PORT"
else
    echo "   ⚠️  Backend port: $BACKEND_PORT (expected 3001)"
fi

if grep -q "http://localhost:3001" src/pages/Checkout.jsx; then
    echo "   ✅ Frontend pointing to port 3001"
else
    echo "   ❌ Port mismatch detected"
fi
echo ""

echo "======================================"
echo "📋 Summary"
echo "======================================"
echo ""
echo "If all checks pass:"
echo "1. Open browser: http://localhost:5173"
echo "2. Add product to cart"
echo "3. Go to /checkout"
echo "4. Click Pay"
echo "5. Use test card: 4111 1111 1111 1111"
echo ""
echo "If any checks fail:"
echo "1. Start backend: node server.js"
echo "2. Start frontend: npm run dev"
echo "3. Update Razorpay keys"
echo "4. Check browser console (F12)"
echo ""
echo "🔧 Need help? See: BACKEND_SETUP_COMPLETE.md"
