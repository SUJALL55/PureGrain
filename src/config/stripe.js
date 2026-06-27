// Stripe Configuration
// Get your publishable key from Stripe Dashboard: https://dashboard.stripe.com/apikeys

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key_here';

export const stripeConfig = {
  publishableKey: STRIPE_PUBLISHABLE_KEY,
  options: {
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#8B5E3C',
        colorBackground: '#FFFFFF',
        colorText: '#1A1A1A',
        colorDanger: '#DC2626',
        fontFamily: 'Inter, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '12px',
      },
    },
  },
};

export default STRIPE_PUBLISHABLE_KEY;
