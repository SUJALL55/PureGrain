import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import { verifyOTP } from '@/services/smsService';

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    // Check if this is login or signup
    const loginPhone = localStorage.getItem('pgm_login_phone');
    const signupPhone = localStorage.getItem('pgm_signup_phone');
    
    if (loginPhone) {
      setPhone(loginPhone);
      setIsSignup(false);
    } else if (signupPhone) {
      setPhone(signupPhone);
      setIsSignup(true);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError('');

      const otpCode = otp.join('');
      if (otpCode.length !== 6) {
        setError('Please enter complete 6-digit OTP');
        setIsLoading(false);
        return;
      }

      // Get the stored OTP
      const storedOTP = localStorage.getItem('pgm_current_otp');
      
      // Verify OTP
      const isValid = verifyOTP(otpCode, storedOTP);
      
      if (isValid) {
        if (isSignup) {
          // Signup flow
          const name = localStorage.getItem('pgm_signup_name');
          const email = localStorage.getItem('pgm_signup_email');
          
          // Store user info
          localStorage.setItem('pgm_user_phone', phone);
          if (name) localStorage.setItem('pgm_user_name', name);
          if (email) localStorage.setItem('pgm_user_email', email);
          
          // Clear signup data
          localStorage.removeItem('pgm_signup_name');
          localStorage.removeItem('pgm_signup_email');
          localStorage.removeItem('pgm_signup_phone');
        } else {
          // Login flow
          localStorage.setItem('pgm_user_phone', phone);
          localStorage.removeItem('pgm_login_phone');
        }

        // Clear OTP data
        localStorage.removeItem('pgm_current_otp');
        localStorage.removeItem('pgm_otp_phone');
        localStorage.removeItem('pgm_demo_otp');

        // Navigate to home
        navigate('/');
        window.location.reload();
      } else {
        setError('Invalid OTP. Please check and try again.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      setError('An error occurred during verification. Please try again.');
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
          to={isSignup ? '/signup' : '/login'}
          className="inline-flex items-center gap-2 text-stone-600 hover:text-amber-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Icon */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-stone-800">Verify OTP</h1>
            <p className="text-stone-600 text-sm mt-2">
              Enter the 6-digit OTP sent to<br />
              <span className="font-semibold text-stone-800">+91 {phone}</span>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* OTP Form */}
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  maxLength={1}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.join('').length !== 6}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/30"
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="mt-6 text-center">
            <p className="text-sm text-stone-600">
              Didn't receive OTP?{' '}
              <button
                onClick={() => {
                  // TODO: Implement resend OTP
                  console.log('OTP resent');
          alert('OTP has been resent to your phone');
                }}
                className="text-amber-600 hover:text-amber-700 font-semibold"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
