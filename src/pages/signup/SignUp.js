import Styles from './signup.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useState } from 'react';
import { signup } from '../../features/slices/authslice';
import Loader from '../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';

export default function SignUp() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({}); // State for validation errors
  const { user, status, error } = useSelector((state) => state.auth);

  // Basic form validation
  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = 'Username is required';
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

  const clickHandler = () => {
    // Validate form
    const errors = validateForm();
    setFormErrors(errors);

    // If no validation errors, proceed with signup
    if (Object.keys(errors).length === 0) {
      const user = { name, email, password };
      dispatch(signup(user));
      // Reset form fields only if signup is successful (handled in Redux)
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className={Styles.signup}>
      <Header />
      <div className={Styles.Signup}>
        <div className={Styles.signupContainer}>
          <h1 className={Styles.signupTitle}>Create an Account</h1>

          {/* Display server-side error from Redux */}
          {error && <div className={Styles.errorMessage}>{error}</div>}

          {/* Display loader during signup request */}
          {status === 'loading' && <Loader />}

          <input
            type="text"
            placeholder="Username"
            className={`${Styles.signupInput} ${formErrors.name ? Styles.inputError : ''}`}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setFormErrors((prev) => ({ ...prev, name: '' })); // Clear name error on change
            }}
          />
          {formErrors.name && <div className={Styles.errorMessage}>{formErrors.name}</div>}

          <input
            type="email"
            placeholder="Email"
            className={`${Styles.signupInput} ${formErrors.email ? Styles.inputError : ''}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFormErrors((prev) => ({ ...prev, email: '' })); // Clear email error on change
            }}
          />
          {formErrors.email && <div className={Styles.errorMessage}>{formErrors.email}</div>}

          <input
            type="password"
            placeholder="Password"
            className={`${Styles.signupInput} ${formErrors.password ? Styles.inputError : ''}`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFormErrors((prev) => ({ ...prev, password: '' })); // Clear password error on change
            }}
          />
          {formErrors.password && <div className={Styles.errorMessage}>{formErrors.password}</div>}
            <p className={Styles.Signinasking}>Already have an account? <a href="/signin">Sign In</a></p>
          <button
            className={Styles.signupButton}
            onClick={clickHandler}
            disabled={status === 'loading'} // Disable button during loading
          >
            Sign Up
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}