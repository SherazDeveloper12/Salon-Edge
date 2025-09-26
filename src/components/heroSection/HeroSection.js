import Styles from './heroSection.module.css';
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
            <button className={Styles.heroButtonPrimary}>Book Your Appointment</button>
            <button className={Styles.heroButtonSecondary}>View Our Services</button>
        </div>
      </div>
    </section>
  );
}
