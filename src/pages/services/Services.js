import Styles from './services.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Loader from '../../components/loader/Loader';
import { useSelector } from 'react-redux';
export default function Services() {
  const { services, status, error } = useSelector((state) => state.services);
  console.log("Services in Services.js", services);
  return (
    <div className={Styles.services}>
      <Header />
      <div className={Styles.Services}>
      <h1>Our Services</h1>
      <p>These are the services offered by Salon Edge.</p>
      {status === 'loading' && <Loader />}
      <div className={Styles.ServicesList}>
        {services.map((service) => (
          <div key={service.id} className={Styles.ServiceItem}>
            <h2>{service.ServiceName}</h2>
            <p>{service.Description}</p>
            <p>Price: ${service.Price}</p>
            <p>Duration: {service.Duration} minutes</p>
          </div>
        ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
