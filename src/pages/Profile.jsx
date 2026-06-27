import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Package, 
  Phone, 
  Mail, 
  MapPin, 
  FileText,
  LogOut, 
  ChevronRight,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const userPhone = localStorage.getItem('pgm_user_phone');
    const userEmail = localStorage.getItem('pgm_user_email');
    const userName = localStorage.getItem('pgm_user_name');

    if (!userPhone && !userEmail) {
      toast.error('Please login to access your profile');
      navigate('/login');
      return;
    }

    setUserData({
      name: userName || 'User',
      email: userEmail || '',
      phone: userPhone || '',
      address: localStorage.getItem('user_address') || 'No address saved'
    });

    // Load mock orders (in production, fetch from backend)
    const savedOrders = JSON.parse(localStorage.getItem('pgm_orders') || '[]');
    setOrders(savedOrders);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('pgm_user_phone');
    localStorage.removeItem('pgm_user_email');
    localStorage.removeItem('pgm_user_name');
    
    toast.success('Logged out successfully');
    navigate('/');
    window.location.reload();
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'contact', label: 'Contact Us', icon: Phone },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{userData?.name || 'User'}</h1>
              <p className="text-white/90 text-sm mt-1">Manage your account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-4xl mx-auto px-4 -mt-4">
        <div className="bg-white rounded-xl shadow-lg p-2 grid grid-cols-4 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-2 py-3 px-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-semibold">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 space-y-6"
          >
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <User className="w-6 h-6 text-amber-600" />
              Personal Information
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-gray-900 font-semibold mt-1">{userData?.name}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="text-sm font-medium text-gray-500">Email Address</label>
                <p className="text-gray-900 font-semibold mt-1">{userData?.email || 'Not provided'}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="text-sm font-medium text-gray-500">Phone Number</label>
                <p className="text-gray-900 font-semibold mt-1">{userData?.phone}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="text-sm font-medium text-gray-500">Delivery Address</label>
                <p className="text-gray-900 font-semibold mt-1">{userData?.address}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Package className="w-6 h-6 text-amber-600" />
                My Orders
              </h2>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Yet</h3>
                <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
                <Link
                  to="/products"
                  className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Order #{order.id}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{item.name} ({item.weight})</span>
                        <span className="text-gray-900 font-semibold">₹{item.price}</span>
                      </div>
                    ))}
                  </div>

                  {order.address && (
                    <div className="mb-4 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                      Delivery Address: {order.address}
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-semibold text-gray-700">Total</span>
                    <span className="text-xl font-bold text-amber-600">₹{order.total}</span>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}

        {/* Contact Us Tab */}
        {activeTab === 'contact' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Phone className="w-6 h-6 text-amber-600" />
                Contact Us
              </h2>
              <p className="text-gray-600 mt-2">We're here to help! Reach out to us through any of these channels.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
              <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600 mt-1">+91 88009 53377</p>
                  <p className="text-sm text-gray-500 mt-1">Available for Call & WhatsApp</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600 mt-1">puregrainmills@gmail.com</p>
                  <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600 mt-1">PureGrain Mills</p>
                  <p className="text-gray-600">India</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Business Hours</h3>
                  <p className="text-gray-600 mt-1">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Terms & Conditions Tab */}
        {activeTab === 'terms' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-6 h-6 text-amber-600" />
                Terms & Conditions
              </h2>
              <p className="text-gray-600 mt-2">Last updated: April 2026</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">1. Acceptance of Terms</h3>
                <div className="space-y-2 text-gray-600 text-sm leading-relaxed">
                  <p>• By accessing and using Pure Grain Mill services, you accept and agree to be bound by these Terms & Conditions.</p>
                  <p>• We reserve the right to modify these terms at any time. Continued use constitutes acceptance of changes.</p>
                  <p>• You must be at least 18 years old to use our services.</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">2. Products & Pricing</h3>
                <div className="space-y-2 text-gray-600 text-sm leading-relaxed">
                  <p>• All products are subject to availability and may vary by location.</p>
                  <p>• Prices are subject to change without prior notice.</p>
                  <p>• Product images are for illustration purposes only. Actual products may vary slightly.</p>
                  <p>• We strive for accuracy but do not guarantee all product descriptions are error-free.</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">3. Orders & Payment</h3>
                <div className="space-y-2 text-gray-600 text-sm leading-relaxed">
                  <p>• Placing an order constitutes an offer to purchase. We reserve the right to accept or decline any order.</p>
                  <p>• Payment must be made in full at the time of order placement.</p>
                  <p>• We accept various payment methods as displayed during checkout.</p>
                  <p>• Order confirmation does not guarantee acceptance. We reserve the right to cancel orders.</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">4. User Accounts</h3>
                <div className="space-y-2 text-gray-600 text-sm leading-relaxed">
                  <p>• You are responsible for maintaining the confidentiality of your account credentials.</p>
                  <p>• You agree to provide accurate and complete information when creating an account.</p>
                  <p>• You must notify us immediately of any unauthorized use of your account.</p>
                  <p>• We reserve the right to suspend or terminate accounts for violations of these terms.</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">5. Limitation of Liability</h3>
                <div className="space-y-2 text-gray-600 text-sm leading-relaxed">
                  <p>• Pure Grain Mill shall not be liable for any indirect, incidental, or consequential damages.</p>
                  <p>• Our total liability shall not exceed the amount paid for the specific product in question.</p>
                  <p>• We are not responsible for delays beyond our reasonable control.</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">6. Contact Information</h3>
                <div className="space-y-2 text-gray-600 text-sm leading-relaxed">
                  <p>• For questions about these terms, contact us at: puregrainmills@gmail.com</p>
                  <p>• Phone: +91 88009 53377</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

