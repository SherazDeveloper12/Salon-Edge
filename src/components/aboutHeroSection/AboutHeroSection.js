import Styles from './aboutHeroSection.module.css';
export default function AboutHeroSection() {
  return (
    <div className={Styles.aboutHeroSection}>  
    <h1>ABOUT SALON EDGE</h1>
    <div className={Styles.line}></div>
    <div className={Styles.Container}>
        <div className={Styles.Text}>
        <p>
          Salon Edge is a premier salon located in the heart of the city. We offer a wide range of services including haircuts, coloring, and styling. <br></br> Our team of experienced professionals is dedicated to providing you with the highest level of service and care.
        For over 15 years, Bella Salon has been the premier destination for beauty and style in our community. <br></br>Our passion lies in helping each client discover their unique beauty through personalized service and expert craftsmanship.
Our team of skilled professionals stays current with the latest trends and techniques, ensuring you receive the highest quality service in a luxurious, welcoming environment.
<br></br>We believe that beauty is personal, and every visit should be a transformative experience that leaves you feeling confident, refreshed, and absolutely radiant.
        </p>
        </div>
        <div className={Styles.img}>
    <img  src={require('../../assets/staff.jpg')} alt="Salon" />    
    </div>
    </div>
    </div>
  );
}