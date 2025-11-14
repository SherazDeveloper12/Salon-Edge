import Styles from './contact.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Contact() {
  const location = useLocation();
  
  useEffect(() => {
    // Focus on specific section based on navigation state
    if (location.state?.focusMessage) {
      const messageSection = document.getElementById('message-section');
      if (messageSection) {
        messageSection.scrollIntoView({ behavior: 'smooth' });
        messageSection.style.border = '2px solid #007bff';
        setTimeout(() => {
          messageSection.style.border = 'none';
        }, 3000);
      }
    } else if (location.state?.focusCall) {
      const callSection = document.getElementById('call-section');
      if (callSection) {
        callSection.scrollIntoView({ behavior: 'smooth' });
        callSection.style.border = '2px solid #28a745';
        setTimeout(() => {
          callSection.style.border = 'none';
        }, 3000);
      }
    }
  }, [location.state]);
  return (
    <div>
      <Header />
      <div className={Styles.Contact}>
      <h1>Contact Us</h1>
      <p>This is the contact page of our application.</p>
      <p>If you have any questions, feel free to reach out!</p>
      {/* showcase our address, phone number and email for contacting us */}
      <div className={Styles.contactInfo}>
        {/* add emojies for address, phone and email and add classes for them too so we can change their colors and background colors */}
        <div className={Styles.addressSection}>
          <h2 className={Styles.address}>📍 Address</h2>
          <p>123 Main Street, City, Country</p>
        </div>
        
        <div id="call-section" className={Styles.phoneSection}>
          <h2 className={Styles.phone}>📞 Phone</h2>
          <p>+1 234 567 890</p>
          <p className={Styles.phoneNote}>Click to call us directly for immediate assistance</p>
        </div>
        
        <div id="message-section" className={Styles.emailSection}>
          <h2 className={Styles.email}>✉️ Email</h2>
          <p>contact@ourcompany.com</p>
          <p className={Styles.emailNote}>Send us a message for detailed inquiries</p>
        </div>
      </div>
      
      </div>
      <Footer />
    </div>
  );
}