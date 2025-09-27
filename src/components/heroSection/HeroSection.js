import Styles from './heroSection.module.css';
import { Link } from 'react-router-dom';
export default function HeroSection() {
  return (
    <section className={Styles.hero}>
      <div className={Styles.heroContent}>
        <h1 className={Styles.heroTitle}>EXPERIENCE PRECISION</h1>
        <div className={Styles.heroMainTitle}> 
            <div className={Styles.heroMainTitleMainTextBackground}> <h1 className={Styles.heroMainTitleMainText}>ELEVATE</h1></div>
           
            <h1 className={Styles.heroMainTitleText}>YOUR STYLE</h1>
        </div>
        <p className={Styles.heroSubtitle}>Cutting-edge salon styling tailored to highlight your natural beauty and confidence.</p>
        <div className={Styles.heroButtons}>
          <Link to="/bookings">
            <button className={Styles.heroButtonPrimary}>Book Your Appointment</button>
          </Link>
          <Link to="/services">
            <button className={Styles.heroButtonSecondary}>View Our Services</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
