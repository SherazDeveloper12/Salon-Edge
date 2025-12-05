import axios from 'axios';

/**
 * Local SMS Gateway Service
 * Uses your custom SMS API running on local network
 */
class LocalSMSService {
  constructor() {
    // Use proxy in development to avoid CORS issues
    this.apiUrl = process.env.NODE_ENV === 'development' 
      ? '/api/local-sms/' 
      : (process.env.REACT_APP_LOCAL_SMS_API_URL || 'http://192.168.18.91:8082/');
    this.authToken = process.env.REACT_APP_LOCAL_SMS_AUTH_TOKEN || 'fd03d49e-5b23-4e3c-8e2a-000927fdb493';
    this.otpStore = {}; // Store OTPs in memory
  }

  /**
   * Generate random 6-digit OTP
   */
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Send OTP via Local SMS Gateway
   * @param {string} phoneNumber - Phone number with country code (+923001234567)
   * @returns {Promise} - Response with OTP details
   */
  async sendOTP(phoneNumber) {
    try {
      const otp = this.generateOTP();
      const expiryTime = Date.now() + (5 * 60 * 1000); // 5 minutes

      console.log('🚀 Sending SMS via Local Gateway to:', phoneNumber);
      console.log('🔢 Generated OTP:', otp);
      console.log('📡 API URL:', this.apiUrl);
      console.log('🔑 Auth Token:', this.authToken.substring(0, 10) + '...');

      const message = `Your SalonEdge verification code is ${otp}. Valid for 5 minutes. Do not share this code.`;

      const requestData = {
        to: phoneNumber,
        message: message
      };

      console.log('📦 Request Data:', requestData);

      const response = await axios.post(
        this.apiUrl,
        requestData,
        {
          headers: {
            'Authorization': this.authToken,
            'Content-Type': 'application/json'
          },
          timeout: 10000 // 10 second timeout
        }
      );

      console.log('✅ SMS Gateway Response:', response.data);

      // Store OTP for verification
      this.otpStore[phoneNumber] = {
        otp: otp,
        expiry: expiryTime,
        attempts: 0
      };

      return {
        success: true,
        data: response.data,
        message: 'OTP sent successfully!',
        // Show OTP in development mode
        _debug: process.env.NODE_ENV === 'development' ? { otp } : undefined
      };
    } catch (error) {
      console.error('❌ Local SMS Gateway Error:', error);
      console.error('❌ Error Response:', error.response?.data);
      console.error('❌ Error Status:', error.response?.status);
      console.error('❌ Error Message:', error.message);
      console.error('❌ Error Code:', error.code);
      
      return {
        success: false,
        error: error.response?.data || error.message,
        message: `Failed to send SMS: ${error.message}`
      };
    }
  }

  /**
   * Verify OTP
   * @param {string} phoneNumber - Phone number
   * @param {string} otp - OTP code entered by user
   * @returns {Promise} - Verification result
   */
  async verifyOTP(phoneNumber, otp) {
    try {
      const stored = this.otpStore[phoneNumber];

      if (!stored) {
        return {
          success: false,
          message: 'No OTP found. Please request a new one.'
        };
      }

      // Check expiry
      if (Date.now() > stored.expiry) {
        delete this.otpStore[phoneNumber];
        return {
          success: false,
          message: 'OTP expired. Please request a new one.'
        };
      }

      // Check attempts
      if (stored.attempts >= 3) {
        delete this.otpStore[phoneNumber];
        return {
          success: false,
          message: 'Too many failed attempts. Please request a new OTP.'
        };
      }

      // Verify OTP
      if (stored.otp === otp) {
        delete this.otpStore[phoneNumber];
        return {
          success: true,
          message: 'Phone verified successfully!'
        };
      } else {
        stored.attempts++;
        return {
          success: false,
          message: `Invalid OTP. ${3 - stored.attempts} attempts remaining.`
        };
      }
    } catch (error) {
      console.error('Verify OTP Error:', error);
      return {
        success: false,
        message: 'Verification failed'
      };
    }
  }

  /**
   * Send custom SMS (without OTP)
   * @param {string} phoneNumber - Phone number
   * @param {string} message - Custom message
   */
  async sendCustomSMS(phoneNumber, message) {
    try {
      console.log('📤 Sending custom SMS to:', phoneNumber);

      const response = await axios.post(
        this.apiUrl,
        {
          to: phoneNumber,
          message: message
        },
        {
          headers: {
            'Authorization': this.authToken,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('✅ SMS sent:', response.data);

      return {
        success: true,
        data: response.data,
        message: 'SMS sent successfully!'
      };
    } catch (error) {
      console.error('❌ SMS Error:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to send SMS'
      };
    }
  }
}

// Export singleton instance
const localSMSService = new LocalSMSService();
export default localSMSService;
