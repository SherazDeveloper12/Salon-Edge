import Styles from './bookings.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useState, useEffect } from 'react'; // Added useEffect
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addAppointment } from '../../features/slices/appointmentSlice'; // Import the action
export default function Bookings() {
  const dispatch = useDispatch();
  const [selectedServices, setSelectedServices] = useState([]); // State for selected services
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // New state for selected date
  const [selectedTime, setSelectedTime] = useState(null); // New state for selected time
  const [selectService, setSelectService] = useState(true);
  const [selectStylistStep, setSelectStylistStep] = useState(false); // Renamed to avoid conflict
  const [selectDateTime, setSelectDateTime] = useState(false);
  const [confirmBooking, setConfirmBooking] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date()); // For Next/Prev Month
  const [OrderConfirmed, setOrderConfirmed] = useState(false); // New state for order confirmation
  const { services, status, error } = useSelector((state) => state.services);
  const { stylists, stylistStatus, stylistError } = useSelector((state) => state.stylists);
  const user = useSelector((state) => state.auth.User);
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

  const DateTimeContinueClick = () => {
    if (selectedDate && selectedTime) {
      setSelectDateTime(false);
      setConfirmBooking(true);
    }
  };

  // Next and Previous Month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Generate calendar data for the current month
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Start from Monday
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    while (days.length % 7 !== 0) {
      days.push(null);
    }

    return days;
  };

  // Check date availability based on stylist's daysAvailable and status
  const isDateAvailable = (date) => {
    if (!selectedStylist || !date) return false;
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }); // e.g., "Monday"
    const isDayAvailable = selectedStylist.daysAvailable?.includes(dayName) || false;
    const isStylistAvailable = selectedStylist.status === "Available";
    return isDayAvailable && isStylistAvailable;
  };

  // Added missing functions
  const handleDateSelect = (date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      console.log("Selected Date:", date);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    console.log("Selected Time:", time);
  };

  const calendarDays = getCalendarDays();
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();
  const handleConfirmBooking = () => {
    // Placeholder for actual booking confirmation logic
    let bookingDetails = {
      status: 'Pending',
      services: selectedServices,
      stylist: selectedStylist,
      date: selectedDate,
      time: selectedTime,
      user: user,
      createdAt: new Date().toISOString(),
    };
    console.log("Booking Details:", bookingDetails);
    // Here you would typically send bookingDetails to your backend API
    dispatch(addAppointment(bookingDetails)); // Example action dispatch
    // Reset all selections after confirmation
    setSelectedServices([]);
    setSelectedStylist(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setConfirmBooking(false);
    setSelectService(false);
    setSelectStylistStep(false);
    setSelectDateTime(false); 
  };

  return (
    <div className={Styles.bookings}>
      <Header />
      <div className={Styles.Bookings}>
        
        <div className={Styles.content}>
          {selectService && (
            <div className={Styles.serviceSelection}>
              <h2>Select a Service</h2>
              <p>Please choose a service to proceed with your booking.</p>
             
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
               <div className={Styles.buttons}>
                <Link to="/" className={Styles.cancelLink}><button className={Styles.cancelButton}>Cancel</button></Link>
                <button className={Styles.continueButton} onClick={() => ContinueClick()} disabled={selectedServices.length === 0}>Continue</button>
              </div>
            </div>
          )}
          {selectStylistStep && (
            <div className={Styles.stylistSelection}>
              <h2>Select a Stylist</h2>
              <p>Please choose a stylist to proceed with your booking.</p>
              
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
              <div className={Styles.buttons}>
                <button onClick={() => { setSelectStylistStep(false); setSelectService(true); }} className={Styles.BackButton}>Back</button>
                <button className={Styles.continueButton} onClick={() => StylistContinueClick()} disabled={!selectedStylist}>Continue</button>
              </div>
            </div>
          )}
          {selectDateTime && (
            <div className={Styles.dateTimeSelection}>
              <h2>Select Date & Time</h2>
              <p>Please choose a date and time to proceed with your booking.</p>
             
              <div className={Styles.calendarContainer}>
                <div className={Styles.monthNavigation}>
                  <button onClick={prevMonth} className={Styles.navButton}>←</button>
                  <h3>{monthName} {year}</h3>
                  <button onClick={nextMonth} className={Styles.navButton}>→</button>
                </div>
                <div className={Styles.calendarHeader}>
                  {weekDays.map((day) => (
                    <div key={day} className={Styles.weekDay}>{day}</div>
                  ))}
                </div>
                <div className={Styles.calendarGrid}>
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      className={`${Styles.calendarDay} ${
                        day && selectedDate?.toDateString() === day.toDateString() ? Styles.active : ''
                      } ${day && !isDateAvailable(day) ? Styles.disabled : ''}`}
                      onClick={() => day && handleDateSelect(day)}
                    >
                      {day ? day.getDate() : ''}
                    </div>
                  ))}
                </div>
              </div>
              <div className={Styles.timeSelection}>
                <label>Select Time:</label>
                <select
                  value={selectedTime || ''}
                  onChange={(e) => handleTimeSelect(e.target.value)}
                  className={Styles.timeDropdown}
                  disabled={!selectedDate} // Disable if no date selected
                >
                  <option value="" disabled>Select a time</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                </select>
              </div>
               <div className={Styles.buttons}>
                <button onClick={() => { setSelectDateTime(false); setSelectStylistStep(true); }} className={Styles.BackButton}>Back</button>
                <button className={Styles.continueButton} onClick={() => DateTimeContinueClick()} disabled={!selectedDate || !selectedTime}>Continue</button>
              </div>
            </div>
          )}
          {confirmBooking && (
            <div className={Styles.confirmBooking}>
              <h2>Confirm Booking</h2>
              <p>Review your booking details:</p>
              <div className={Styles.bookingDetails}>
                <h3>Services:</h3>
                <ul>
                  {selectedServices.map((service) => (
                    <li key={service.id}>
                      {service.ServiceName} - ${service.Price} ({service.Duration} min)
                    </li>
                  ))}
                </ul>
                <h3>Stylist:</h3>
                <p>{selectedStylist?.stylistName} (Rating: {selectedStylist?.rating})</p>
                {selectedStylist?.imageUrl && (
                  <img src={selectedStylist.imageUrl} alt={selectedStylist.stylistName} className={Styles.stylistImage} />
                )}
                <h3>Date:</h3>
                <p>{selectedDate?.toLocaleDateString()}</p>
                <h3>Time:</h3>
                <p>{selectedTime}</p>
              </div>
              <div className={Styles.buttons}>
                <button onClick={() => { setConfirmBooking(false); setSelectDateTime(true); }} className={Styles.BackButton}>Back</button>
                <button className={Styles.continueButton} onClick={() => {handleConfirmBooking(); setOrderConfirmed(true);}} >Confirm</button> {/* Placeholder for API call */}
              </div>
            </div>
          )}
          {OrderConfirmed && (
            <div className={Styles.orderConfirmed}>
              <div className={Styles.OrderConfirmedIcon}>
<img src={require('../../assets/confirmed-svgrepo-com.png')} alt="Confirmed" />
              </div>
              <h2>Booking Confirmed!</h2>
              <p>Thank you for your booking. We look forward to seeing you!</p>
              <div className={Styles.buttons}>
                <Link to="/" onClick={() => setOrderConfirmed(false)} className={Styles.homeLink}><button className={Styles.homeButton}>Go to Home</button></Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}