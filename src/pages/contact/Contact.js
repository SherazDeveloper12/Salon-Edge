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
      </div>
      <Footer />
    </div>
  );
}