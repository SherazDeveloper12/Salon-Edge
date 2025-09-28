import Styles from './signup.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useState } from 'react';

import {signup} from '../../features/slices/authslice';
import Loader from '../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
export default function SignUp() {
  const dispatch = useDispatch();
   const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
   
 const clickhandler = () => {
  let user = { name, email, password };
    // Handle sign-up logic here
    console.log('User Created', user);
    dispatch(signup(user));
    // Reset form fields
    setName('');
    setEmail('');
    setPassword('');
   
  }
 
  return (
    <div className={Styles.signup}>
      <Header />
  <div className={Styles.Signup}>
        <div className={Styles.signupContainer}>
          <h1 className={Styles.signupTitle}>Create an Account</h1>
          <input
            type="text"
            placeholder="Username"
            className={Styles.signupInput}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className={Styles.signupInput}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={Styles.signupInput}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={Styles.signupButton} onClick={clickhandler}>
            Sign Up
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
