import { useState } from 'react';
import localSMSService from '../../services/localSMSService';
import Styles from './phoneAuth.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useNavigate } from 'react-router-dom';

export default function LocalSMSAuth() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showDebugOTP, setShowDebugOTP] = useState(null);

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setShowDebugOTP(null);

    try {
      // Validate phone number
      if (!phoneNumber || phoneNumber.length < 10) {
        setMessage('❌ Please enter a valid phone number');
        setLoading(false);
        return;
      }

      if (!phoneNumber.startsWith('+')) {
        setMessage('❌ Phone number must start with country code (+92 for Pakistan)');
        setLoading(false);
        return;
      }

      // Send OTP via Local SMS Gateway
      const result = await localSMSService.sendOTP(phoneNumber);
      
      if (result.success) {
        setOtpSent(true);
        setMessage('✅ OTP sent to your phone! Check your messages.');
        
        // Show OTP in development mode
        if (result._debug) {
          setShowDebugOTP(result._debug.otp);
        }
      } else {
        setMessage(`❌ ${result.message || 'Failed to send OTP'}`);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Send OTP Error:', error);
      setMessage(`❌ Error: ${error.message}`);
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!otp || otp.length !== 6) {
        setMessage('❌ Please enter valid 6-digit OTP');
        setLoading(false);
        return;
      }

      // Verify OTP
      const result = await localSMSService.verifyOTP(phoneNumber, otp);
      
      if (result.success) {
        setMessage(`✅ Success! Phone verified: ${phoneNumber}`);
        console.log('Phone verified successfully');
        
        setTimeout(() => {
          alert(`Phone ${phoneNumber} verified! Redirecting...`);
          navigate('/');
        }, 2000);
      } else {
        setMessage(`❌ ${result.message}`);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Verify OTP Error:', error);
      setMessage(`❌ Error: ${error.message}`);
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setOtp('');
    setOtpSent(false);
    setMessage('');
    setShowDebugOTP(null);
  };

  return (
    <>
      <Header />
      <div className={Styles.phoneAuthContainer}>
        <div className={Styles.authCard}>
          <h1 className={Styles.title}>📱 Local SMS Gateway</h1>
          <p className={Styles.subtitle}>
            Real SMS via your local gateway
          </p>

          {!otpSent ? (
            // Phone Number Form
            <form onSubmit={handleSendOtp} className={Styles.form}>
              <div className={Styles.inputGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+923001234567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={Styles.input}
                  required
                />
                <small>Include country code (e.g., +92 for Pakistan)</small>
              </div>

              <button
                type="submit"
                className={Styles.button}
                disabled={loading}
              >
                {loading ? '📤 Sending...' : '📤 Send OTP'}
              </button>
            </form>
          ) : (
            // OTP Verification Form
            <form onSubmit={handleVerifyOtp} className={Styles.form}>
              {showDebugOTP && (
                <div className={Styles.otpDisplay}>
                  <h3>🔐 Development Mode - Your OTP:</h3>
                  <div className={Styles.otpCode}>{showDebugOTP}</div>
                  <p style={{fontSize: '12px', opacity: 0.8}}>
                    (Also sent via SMS to {phoneNumber})
                  </p>
                </div>
              )}

              <div className={Styles.inputGroup}>
                <label htmlFor="otp">Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className={Styles.otpInput}
                  maxLength="6"
                  required
                />
                <small>Check your phone messages</small>
              </div>

              <button
                type="submit"
                className={Styles.button}
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                className={Styles.resendButton}
                disabled={loading}
              >
                🔄 Resend OTP
              </button>
            </form>
          )}

          {message && (
            <div className={message.includes('✅') ? Styles.successMessage : Styles.errorMessage}>
              {message}
            </div>
          )}

          <div className={Styles.features}>
            <h3>✨ Local SMS Gateway Features:</h3>
            <ul>
              <li>✅ Real SMS to actual phone</li>
              <li>✅ Works on local network</li>
              <li>✅ No external API costs</li>
              <li>✅ 100% Free forever</li>
              <li>✅ Fast delivery</li>
              <li>✅ Pakistan fully supported</li>
            </ul>
          </div>

          <div className={Styles.footer}>
            <button onClick={() => navigate('/')} className={Styles.backButton}>
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
