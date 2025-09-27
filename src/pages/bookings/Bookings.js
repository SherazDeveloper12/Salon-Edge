import Styles from './bookings.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useState, useEffect } from 'react'; // Added useEffect
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Bookings() {
  const [selectedServices, setSelectedServices] = useState([]); // State for selected services
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectService, setSelectService] = useState(true);
  const [selectStylistStep, setSelectStylistStep] = useState(false); // Renamed to avoid conflict
  const [selectDateTime, setSelectDateTime] = useState(false);
  const [confirmBooking, setConfirmBooking] = useState(false);
  const { services, status, error } = useSelector((state) => state.services);
  const { stylists, stylistStatus, stylistError } = useSelector((state) => state.stylists);

  const handleServiceSelect = (service) => {
    console.log("Before update - SelectedServices:", selectedServices);
    setSelectedServices((prevSelected) => {
      const isSelected = prevSelected.some((s) => s.id === service.id);
      let newSelected;
      if (isSelected) {
        newSelected = prevSelected.filter((s) => s.id !== service.id);
      } else {
        newSelected = [...prevSelected, service];
      }
      console.log("After update - New SelectedServices:", newSelected);
      return newSelected;
    });
  };

  const handleStylistSelect = (stylist) => {
    console.log("Before update - SelectedStylist:", selectedStylist);
    setSelectedStylist((prevSelected) => {
      const isSelected = prevSelected?.id === stylist.id;
      const newSelected = isSelected ? null : stylist; // Toggle selection
      console.log("Setting SelectedStylist to:", newSelected); // Log inside setter
      return newSelected;
    });
  };

  // Use useEffect to log updated selectedStylist
  useEffect(() => {
    console.log("Updated SelectedStylist:", selectedStylist); // This will show the latest value
  }, [selectedStylist]);

  const ContinueClick = () => {
    if (selectedServices.length > 0) {
      setSelectService(false);
      setSelectStylistStep(true);
    }
  };

  const StylistContinueClick = () => {
    if (selectedStylist) {
      setSelectStylistStep(false);
      setSelectDateTime(true);
    }
  };

  return (
    <div className={Styles.bookings}>
      <Header />
      <div className={Styles.Bookings}>
        <h1>Bookings Page</h1>
        <p>This is the bookings page of our application.</p>
        <div className={Styles.content}>
          {selectService && (
            <div className={Styles.serviceSelection}>
              <h2>Select a Service</h2>
              <p>Please choose a service to proceed with your booking.</p>
              <div className={Styles.buttons}>
                <Link to="/" className={Styles.cancelLink}><button className={Styles.cancelButton}>Cancel</button></Link>
                <button className={Styles.continueButton} onClick={() => ContinueClick()} disabled={selectedServices.length === 0}>Continue</button>
              </div>
              <div className={Styles.servicesList}>
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`${Styles.serviceItem} ${
                      selectedServices.some((s) => s.id === service.id) ? Styles.active : ''
                    }`}
                    onClick={() => handleServiceSelect(service)}
                  >
                    <h3>{service.ServiceName}</h3>
                    <p>{service.Description}</p>
                    <p>Price: ${service.Price}</p>
                    <p>Duration: {service.Duration} minutes</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectStylistStep && (
            <div className={Styles.stylistSelection}>
              <h2>Select a Stylist</h2>
              <p>Please choose a stylist to proceed with your booking.</p>
              <div className={Styles.buttons}>
                <button onClick={() => { setSelectStylistStep(false); setSelectService(true); }} className={Styles.BackButton}>Back</button>
                <button className={Styles.continueButton} onClick={() => StylistContinueClick()} disabled={!selectedStylist}>Continue</button>
              </div>
              <div className={Styles.stylistsList}>
                {stylists.map((stylist) => (
                  <div
                    key={stylist?.id}
                    className={`${Styles.stylistItem} ${
                      selectedStylist?.id === stylist.id ? Styles.active : ''
                    }`}
                    onClick={() => handleStylistSelect(stylist)}
                  >
                    {stylist.imageUrl && (
                      <img src={stylist.imageUrl} alt={stylist.stylistName} className={Styles.stylistImage} />
                    )}
                    <h3>{stylist.stylistName}</h3>
                    <p>{stylist.description}</p>
                    <p>Rating: {stylist.rating}</p>
                    {/* stats li green dot before if available otherwise orange dot */}
                    <ul>
                      <li className={Styles.status}>
                        {stylist.status === 'Available' ? <p className={Styles.availabledot}>●</p> : <p className={Styles.unavailabledot}>○</p>} {stylist.status}
                      </li>
                    </ul>
                    <p>Available Days:</p>
                    <ul className={Styles.daysAvailableList}>
                      {stylist.daysAvailable.map((day) => (
                        <li className={Styles.dayItem} key={day}>{day}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectDateTime && (
            <div className={Styles.dateTimeSelection}>
              <h2>Select Date & Time</h2>
              <p>Please choose a date and time to proceed with your booking.</p>
              <div className={Styles.buttons}>
                <button onClick={() => { setSelectDateTime(false); setSelectStylistStep(true); }} className={Styles.BackButton}>Back</button>
                <button className={Styles.continueButton} onClick={() => { setSelectDateTime(false); setConfirmBooking(true); }} disabled={false /* Add your condition here */}>Continue</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}