import Styles from './about.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import AboutHeroSection from '../../components/aboutHeroSection/AboutHeroSection';
export default function About() {
  return (
    <div >
      <Header />
      <div className={Styles.About}>
        <AboutHeroSection />
     
      </div>
      <Footer />
    </div>
  );
}