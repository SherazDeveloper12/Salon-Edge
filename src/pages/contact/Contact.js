import Styles from './contact.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
export default function Contact() {
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
        <h2 className={Styles.address}>📍 Address</h2>
        <p>123 Main Street, City, Country</p>
        <h2 className={Styles.phone}>📞 Phone</h2>
        <p>+1 234 567 890</p>
        <h2 className={Styles.email}>✉️ Email</h2>
      <p>contact@ourcompany.com</p>
      </div>
      
      </div>
      <Footer />
    </div>
  );
}