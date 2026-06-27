// SMS/OTP Service for sending verification codes
// Using Fast2SMS API (free tier available) or you can configure Twilio

const FAST2SMS_API_KEY = import.meta.env.VITE_FAST2SMS_API_KEY || '';
const TWILIO_ACCOUNT_SID = import.meta.env.VITE_TWILIO_ACCOUNT_SID || '';
const TWILIO_AUTH_TOKEN = import.meta.env.VITE_TWILIO_AUTH_TOKEN || '';
const TWILIO_PHONE_NUMBER = import.meta.env.VITE_TWILIO_PHONE_NUMBER || '';

// Generate random 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via Fast2SMS (India)
export const sendOTPViaFast2SMS = async (phone, otp) => {
  if (!FAST2SMS_API_KEY) {
    console.warn('Fast2SMS API key not configured');
    return false;
  }

  try {
    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        'authorization': FAST2SMS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route: 'otp',
        variables_values: otp,
        numbers: phone
      })
    });

    const data = await response.json();
    console.log('Fast2SMS response:', data);
    return data.return === true;
  } catch (error) {
    console.error('Fast2SMS error:', error);
    return false;
  }
};

// Send OTP via Twilio (International)
export const sendOTPViaTwilio = async (phone, otp) => {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
    console.warn('Twilio credentials not configured');
    return false;
  }

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
    
    const body = new URLSearchParams();
    body.append('To', `+91${phone}`);
    body.append('From', TWILIO_PHONE_NUMBER);
    body.append('Body', `Your PureGrain Mills OTP is: ${otp}. Valid for 10 minutes.`);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    });

    const data = await response.json();
    console.log('Twilio response:', data);
    return !data.error_code;
  } catch (error) {
    console.error('Twilio error:', error);
    return false;
  }
};

// Main send OTP function - tries multiple services
export const sendOTP = async (phone, otp) => {
  console.log(`Sending OTP ${otp} to ${phone}`);
  
  // Try Fast2SMS first (for India)
  if (phone.startsWith('91') || phone.length === 10) {
    const fast2smsSuccess = await sendOTPViaFast2SMS(phone, otp);
    if (fast2smsSuccess) return true;
  }
  
  // Fallback to Twilio
  const twilioSuccess = await sendOTPViaTwilio(phone, otp);
  if (twilioSuccess) return true;
  
  // If no service is configured, store OTP in localStorage for demo
  console.warn('No SMS service configured. Storing OTP locally for demo.');
  localStorage.setItem('pgm_demo_otp', otp);
  alert(`Demo Mode: Your OTP is ${otp}\n\nTo enable real SMS:\n1. Sign up at fast2sms.com or twilio.com\n2. Add API keys to .env file`);
  return true;
};

// Verify OTP
export const verifyOTP = (enteredOTP, storedOTP) => {
  return enteredOTP === storedOTP;
};
