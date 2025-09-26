import Styles from './bookings.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
export default function Bookings() {
  return (
    <div className={Styles.bookings}>
      <Header />
      <div className={Styles.Bookings}>
      <h1>Bookings Page</h1>
      <p>This is the bookings page of our application.</p>
      </div>
      <Footer />
    </div>
  );
}
