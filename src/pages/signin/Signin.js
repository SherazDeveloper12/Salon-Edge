import Styles from './signin.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { getCurrentUser, login } from '../../features/slices/authslice';
import Loader from '../../components/loader/Loader';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { user, userStatus } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    // Handle sign-in logic here
    let signinData = {
      email: email,
      password: password
    };
    console.log('Sign-in data:', signinData);
    await dispatch(login(signinData)).unwrap(); // Wait for login to complete
    // Reset form fields
    setEmail('');
    setPassword('');
  };

  // Optional: Sync user state after login
  useEffect(() => {
    if (user) {
      console.log("User logged in:", user);
    }
  }, [user]);

  if (userStatus === 'loading') return <Loader />;

  return (
    <div className={Styles.signin}>
      <Header />
      <div className={Styles.Signin}>
        <div className={Styles.signinContainer}>
          <h1 className={Styles.signinTitle}>Sign In</h1>
          <input
            type="email"
            placeholder="Email"
            className={Styles.signinInput}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={Styles.signinInput}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit} className={Styles.signinButton}>Sign In</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}