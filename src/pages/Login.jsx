import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import logoImg from '../assets/images/logo.png';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError('');
      
      // Validate that at least email or phone is provided
      if (!email && !phone) {
        setError('Please enter your email or phone number');
        setIsLoading(false);
        return;
      }

      if (!password) {
        setError('Please enter your password');
        setIsLoading(false);
        return;
      }

      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('pgm_users') || '[]');
      
      // Find user by email or phone
      const user = users.find(u => 
        (email && u.email === email) || (phone && u.phone === phone)
      );

      if (!user) {
        setError('No account found with this email or phone number');
        setIsLoading(false);
        return;
      }

      // Verify password
      if (user.password !== password) {
        setError('Incorrect password. Please try again.');
        setIsLoading(false);
        return;
      }

      // Store user info
      localStorage.setItem('pgm_user_phone', user.phone);
      localStorage.setItem('pgm_user_email', user.email);
      localStorage.setItem('pgm_user_name', user.name);
      
      // Remember me functionality
      if (rememberMe) {
        localStorage.setItem('pgm_remember_me', 'true');
        localStorage.setItem('pgm_saved_email', user.email);
      } else {
        localStorage.removeItem('pgm_remember_me');
        localStorage.removeItem('pgm_saved_email');
      }

      toast.success('Login successful! Welcome back.');
      
      // Small delay for toast to show
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 500);
      
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-stone-600 hover:text-amber-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src={logoImg}
              alt="PureGrain Mills"
              className="h-16 w-auto mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-stone-800">Welcome Back</h1>
            <p className="text-stone-600 text-sm mt-2">Login to continue shopping</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Email or Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  value={email || phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Check if it's a phone number (only digits)
                    if (/^\d+$/.test(value)) {
                      setEmail('');
                      setPhone(value);
                    } else {
                      setPhone('');
                      setEmail(value);
                    }
                  }}
                  placeholder="Enter email or phone number"
                  className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-amber-600 border-stone-300 rounded focus:ring-amber-500"
                />
                <span className="text-sm text-stone-600">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || (!email && !phone) || !password}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/30"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-stone-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-amber-600 hover:text-amber-700 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
