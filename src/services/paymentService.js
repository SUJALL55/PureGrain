import { base44 } from '@/api/base44Client';

/**
 * Create a payment intent on the server
 * Returns client secret for Stripe checkout
 */
export const createPaymentIntent = async (amount, currency = 'inr') => {
  try {
    // Call your backend API to create payment intent
    const response = await base44.api.createPaymentIntent({
      amount: Math.round(amount * 100), // Convert to paise/cents
      currency: currency,
      metadata: {
        timestamp: new Date().toISOString(),
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

/**
 * Confirm payment after successful transaction
 */
export const confirmPayment = async (paymentIntentId, orderData) => {
  try {
    const response = await base44.api.confirmPayment({
      paymentIntentId,
      orderData,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw error;
  }
};

/**
 * Get payment status
 */
export const getPaymentStatus = async (paymentIntentId) => {
  try {
    const response = await base44.api.getPaymentStatus({
      paymentIntentId,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error getting payment status:', error);
    throw error;
  }
};
