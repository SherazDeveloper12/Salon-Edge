import Styles from './signin.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useState } from 'react';
import {login} from '../../features/slices/authslice'
import { useDispatch } from 'react-redux';
export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const handleSubmit = () => {
    // Handle sign-in logic here
    let signinData = {
      email: email,
      password: password
    };
    console.log('Sign-in data:', signinData);
    dispatch(login(signinData))
    // Reset form fields
    setEmail('');
    setPassword('');
  };

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
