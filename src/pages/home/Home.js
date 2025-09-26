import Styles from './home.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import HeroSection from '../../components/heroSection/HeroSection';
import AboutHeroSection from '../../components/aboutHeroSection/AboutHeroSection';
export default function Home() {
  return (
    <div className={Styles.home}>
      <Header />
      <HeroSection />
      <AboutHeroSection />
      <Footer />
    </div>
  );
}
