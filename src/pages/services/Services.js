import Styles from './services.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
export default function Services() {
  return (
    <div className={Styles.services}>
      <Header />
      <div className={Styles.Services}>
      <h1>Our Services</h1>
      <p>This is the services page of our application.</p>
      </div>
      <Footer />
    </div>
  );
}
