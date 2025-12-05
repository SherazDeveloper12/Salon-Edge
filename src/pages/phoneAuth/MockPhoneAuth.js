import { useState } from 'react';
import Styles from './phoneAuth.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useNavigate } from 'react-router-dom';

export default function MockPhoneAuth() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Generate random 6-digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Send OTP (Mock - just generates and displays)
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

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

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate OTP
      const newOtp = generateOTP();
      setGeneratedOtp(newOtp);
      setOtpSent(true);
      setCountdown(300); // 5 minutes

      // Start countdown
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setGeneratedOtp('');
            setOtpSent(false);
            setMessage('⏰ OTP expired. Please request a new one.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setMessage(`✅ OTP Generated! (Dev Mode - Check below)`);
      setLoading(false);
    } catch (error) {
      console.error('Generate OTP Error:', error);
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
      if (!generatedOtp) {
        setMessage('❌ Please request OTP first');
        setLoading(false);
        return;
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Verify OTP
      if (otp === generatedOtp) {
        setMessage(`✅ Success! Phone verified: ${phoneNumber}`);
        console.log('Phone verified successfully');
        
        setTimeout(() => {
          alert(`Phone ${phoneNumber} verified successfully! Redirecting...`);
          navigate('/');
        }, 2000);
      } else {
        setMessage('❌ Invalid OTP. Please try again.');
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
    setGeneratedOtp('');
    setOtpSent(false);
    setMessage('');
    await handleSendOtp({ preventDefault: () => {} });
  };

  // Format countdown
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Header />
      <div className={Styles.phoneAuthContainer}>
        <div className={Styles.authCard}>
          <h1 className={Styles.title}>📱 Mock OTP Verification</h1>
          <p className={Styles.subtitle}>
            Development/Testing Mode - No actual SMS sent
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
                {loading ? 'Generating...' : 'Generate OTP'}
              </button>
            </form>
          ) : (
            // OTP Verification Form
            <form onSubmit={handleVerifyOtp} className={Styles.form}>
              <div className={Styles.otpDisplay}>
                <h3>🔐 Your OTP Code:</h3>
                <div className={Styles.otpCode}>{generatedOtp}</div>
                <p className={Styles.timer}>
                  ⏱️ Valid for: {formatTime(countdown)}
                </p>
              </div>

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
                🔄 Generate New OTP
              </button>
            </form>
          )}

          {message && (
            <div className={message.includes('✅') ? Styles.successMessage : Styles.errorMessage}>
              {message}
            </div>
          )}

          <div className={Styles.features}>
            <h3>✨ Mock Testing Features:</h3>
            <ul>
              <li>✅ No SMS gateway required</li>
              <li>✅ Instant OTP generation</li>
              <li>✅ 5-minute validity timer</li>
              <li>✅ Perfect for development</li>
              <li>✅ No API costs</li>
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
