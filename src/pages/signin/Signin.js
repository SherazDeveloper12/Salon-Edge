import Styles from './signin.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { login } from '../../features/slices/authslice';
import Loader from '../../components/loader/Loader';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({}); // State for validation errors
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, userStatus, error } = useSelector((state) => state.auth);

  // Basic form validation
  const validateForm = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  const handleSubmit = async () => {
    // Validate form
    const errors = validateForm();
    setFormErrors(errors);

    // Proceed with login if no validation errors
    if (Object.keys(errors).length === 0) {
      const signinData = { email, password };
      try {
        await dispatch(login(signinData)).unwrap();
        // Reset form fields on successful login
        setEmail('');
        setPassword('');
      } catch (err) {
        console.error('Login failed:', err);
      }
    }
  };

  // Redirect to dashboard on successful login
  useEffect(() => {
    if (user) {
      navigate('/dashboard'); // Adjust the route as needed
    }
  }, [user, navigate]);

  // Optional: Clear server-side errors after a timeout
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        // Dispatch an action to clear error in Redux (if your authslice supports it)
        // e.g., dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    <div className={Styles.signin}>
      <Header />
      <div className={Styles.Signin}>
        <div className={Styles.signinContainer}>
          <h1 className={Styles.signinTitle}>Sign In</h1>

          {/* Display server-side error from Redux */}
          {error && (
            <div className={Styles.errorMessage} role="alert">
              {error}
            </div>
          )}

          {/* Display loader during login request */}
          {userStatus === 'loading' && <Loader />}

          <input
            type="email"
            placeholder="Email"
            className={`${Styles.signinInput} ${formErrors.email ? Styles.inputError : ''}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFormErrors((prev) => ({ ...prev, email: '' })); // Clear email error on change
            }}
            aria-label="Email"
          />
          {formErrors.email && (
            <div className={Styles.errorMessage} role="alert">
              {formErrors.email}
            </div>
          )}

          <input
            type="password"
            placeholder="Password"
            className={`${Styles.signinInput} ${formErrors.password ? Styles.inputError : ''}`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFormErrors((prev) => ({ ...prev, password: '' })); // Clear password error on change
            }}
            aria-label="Password"
          />
          {formErrors.password && (
            <div className={Styles.errorMessage} role="alert">
              {formErrors.password}
            </div>
          )}
          <p className={Styles.signupPrompt}>Don't have an account? <Link to="/signup">Sign up</Link></p>
          <button
            onClick={handleSubmit}
            className={Styles.signinButton}
            disabled={userStatus === 'loading'} // Disable button during loading
          >
            Sign In
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}