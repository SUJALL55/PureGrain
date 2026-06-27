import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './lib/cartContext'
import { Toaster } from 'sonner'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import About from './pages/About'
import Checkout from './pages/Checkout'
import PaymentSuccess from './pages/PaymentSuccess'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import './App.css'

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Toaster 
          position="top-center"
          richColors
          closeButton
          toastOptions={{
            duration: 4000,
          }}
        />
        <Routes>
          {/* Auth Routes - No Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Main Routes - With Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
