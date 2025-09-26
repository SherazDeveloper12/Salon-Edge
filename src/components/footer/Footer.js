import Styles from './footer.module.css';
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.footerContent}>
        <div className={Styles.Container}>
          <h3 className={Styles.title}>Salon Edge</h3>
          <p className={Styles.description}>Transform your look with our professional beauty services. Experience luxury styling in a modern, comfortable environment.
            Cutting-edge salon styling tailored to highlight your natural beauty and confidence.


          </p>
        </div>
        <div className={Styles.Container}>
          <h3 className={Styles.title}>Quick Links</h3>
          <ul className={Styles.list}>
           <li>
            <Link to="/" className={Styles.navLink}>Home</Link>
          </li>
          <li>
            <Link to="/about" className={Styles.navLink}>About</Link>
          </li>
          <li>
            <Link to="/services" className={Styles.navLink}>Services</Link>
          </li>
          <li>
            <Link to="/contact" className={Styles.navLink}>Contact</Link>
          </li>
          </ul>
        </div>
        <div className={Styles.Container}>
          <h3 className={Styles.title}>Contact Us</h3>
          <p className={Styles.text}>123 Beauty St, Glamour City, CA 90210</p>
          <p className={Styles.text}>Phone: (123) 456-7890</p>
          <p className={Styles.text}>Email: info@salonedge.com</p>
        </div>
      </div>
      <p className={Styles.text}>© 2023 Salon Edge. All rights reserved.</p>
    </footer>
  );
}
