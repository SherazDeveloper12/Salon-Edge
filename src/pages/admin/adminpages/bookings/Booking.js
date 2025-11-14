import AdminNavbar from "../../../../components/adminNavbar/AdminNavbar"; // Verify path
import Styles from './bookings.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAppointment , fetchAppointments } from '../../../../features/slices/appointmentSlice'; // Ensure path is correct
import { useEffect } from 'react';
import Loader from '../../../../components/loader/Loader'; // Import Loader component
export default function AdminBookings() {
  const dispatch = useDispatch();
  const [loadingBookingId, setLoadingBookingId] = useState(null); // Track which booking is being updated
  const { appointments, status, error } = useSelector((state) => state.appointments); // Updated selector
  const [filter, setFilter] = useState('Pending'); // Added filter state for navbar functionality
  
  useEffect(() => {
    // Sirf ek baar appointments fetch karo jab component mount ho
    // Agar appointments already loaded nahi hain to hi fetch karo
    if (appointments.length === 0 && status === 'idle') {
      dispatch(fetchAppointments());
    }
  }, []); // Empty dependency array - sirf ek baar chalega
  
  // Filter appointments based on selected filter
  const filteredAppointments = appointments.filter(appointment => appointment.status === filter);
  const handleConfirmBooking = async (bookingId) => {
    setLoadingBookingId(bookingId);
    try {
      await dispatch(updateAppointment({ id: bookingId, appointmentData: { status: 'Confirmed' } }));
      console.log(`Confirmed booking with ID: ${bookingId}`);
    } catch (err) {
      console.error('Confirm error:', err);
    } finally {
      setLoadingBookingId(null);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    setLoadingBookingId(bookingId);
    try {
      await dispatch(updateAppointment({ id: bookingId, appointmentData: { status: 'Canceled' } }));
      console.log(`Canceled booking with ID: ${bookingId}`);
    } catch (err) {
      console.error('Cancel error:', err);
    } finally {
      setLoadingBookingId(null);
    }
  };

  const handleCompleteBooking = async (bookingId) => {
    setLoadingBookingId(bookingId);
    try {
      await dispatch(updateAppointment({ id: bookingId, appointmentData: { status: 'Completed' } }));
      console.log(`Completed booking with ID: ${bookingId}`);
    } catch (err) {
      console.error('Complete error:', err);
    } finally {
      setLoadingBookingId(null);
    }
  };

  const handlePendingBooking = async (bookingId) => {
    setLoadingBookingId(bookingId);
    try {
      await dispatch(updateAppointment({ id: bookingId, appointmentData: { status: 'Pending' } }));
      console.log(`Marked as Pending booking with ID: ${bookingId}`);
    } catch (err) {
      console.error('Pending error:', err);
    } finally {
      setLoadingBookingId(null);
    }
  };


  return (
    <div className={Styles.Bookings}>
      <div className={Styles.AdminNavbar}><AdminNavbar /></div>
      <div className={Styles.Bookings_container}>
        <h1>Bookings Page</h1>
        <p>This is the bookings page where you can manage all the bookings.</p>
        <div className={Styles.Navbar}>
          <ul>
            <li className={filter === 'Pending' ? `${Styles.active} ${Styles.PendingTab}` : Styles.PendingTab} onClick={() => setFilter('Pending')}>Pending</li>
            <li className={filter === 'Confirmed' ? `${Styles.active} ${Styles.ConfirmedTab}` : Styles.ConfirmedTab} onClick={() => setFilter('Confirmed')}>Confirmed</li>
            <li className={filter === 'Completed' ? `${Styles.active} ${Styles.CompletedTab}` : Styles.CompletedTab} onClick={() => setFilter('Completed')}>Completed</li>
            <li className={filter === 'Canceled' ? `${Styles.active} ${Styles.CanceledTab}` : Styles.CanceledTab} onClick={() => setFilter('Canceled')}>Canceled</li>
          </ul>
        </div>
        
        {/* Loading State */}
        {status === 'loading' && (
          <div className={Styles.LoaderContainer}>
            <Loader />
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className={Styles.ErrorContainer}>
            <p className={Styles.ErrorMessage}>⚠️ Error loading bookings: {error}</p>
            <button 
              className={Styles.RetryButton} 
              onClick={() => dispatch(fetchAppointments())}
            >
              🔄 Retry
            </button>
          </div>
        )}
        
        {/* Bookings List */}
        {status !== 'loading' && !error && (
          <div className={Styles.BookingsList}>
            {filteredAppointments.length === 0 ? (
              <div className={Styles.NoBookings}>
                <p>📅 No {filter.toLowerCase()} bookings available.</p>
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
              <div key={appointment.id} className={`${Styles.BookingItem} ${appointment.status === 'Pending' ? Styles.PendingbookingCard : appointment.status === 'Confirmed' ? Styles.ConfirmedbookingCard : appointment.status === 'Canceled' ? Styles.CanceledbookingCard : Styles.CompletedbookingCard}`}>
                <p><strong>Stylist:</strong> {appointment.stylist?.stylistName || 'Unknown Stylist'}</p>
                <p><strong>Client:</strong> {appointment.user?.name || 'Unknown Client'}</p>
                <p><strong>Client Email:</strong> {appointment.user?.email || 'No email'}</p>
                <p><strong>Appointment Date:</strong> {new Date(appointment.date?.seconds * 1000).toLocaleDateString() || 'No date'}</p>
                <p><strong>Time:</strong> {appointment.time || 'No time'}</p>
                <p><strong>Services:</strong> {appointment.services?.map(service => <span className={Styles.Services} key={service.id}>{service.ServiceName}</span>).reduce((prev, curr) => [prev, ", ", curr]) || 'No services'}</p>
                <p><strong>Status:</strong> {appointment.status}</p>
                <p><strong>Charges:</strong> ${appointment.services?.reduce((sum, service) => sum + parseFloat(service.Price || 0), 0).toFixed(2) || '0.00'}</p>
                <div className={Styles.Actions}>
                  {appointment.status === 'Pending' && (
                    <>
                      <button 
                        onClick={() => handleConfirmBooking(appointment.id)} 
                        className={Styles.ConfirmButton}
                        disabled={loadingBookingId === appointment.id}
                      >
                        {loadingBookingId === appointment.id ? '⏳ Confirming...' : '✅ Confirm'}
                      </button>
                      <button 
                        onClick={() => handleCompleteBooking(appointment.id)} 
                        className={Styles.CompleteButton}
                        disabled={loadingBookingId === appointment.id}
                      >
                        {loadingBookingId === appointment.id ? '⏳ Updating...' : '🟦 Complete'}
                      </button>
                      <button 
                        onClick={() => handleCancelBooking(appointment.id)} 
                        className={Styles.CancelButton}
                        disabled={loadingBookingId === appointment.id}
                      >
                        {loadingBookingId === appointment.id ? '⏳ Canceling...' : '❌ Cancel'}
                      </button>
                    </>
                  )}
                  {appointment.status === 'Confirmed' && (
                    <>
                      <button 
                        onClick={() => handleCompleteBooking(appointment.id)} 
                        className={Styles.CompleteButton}
                        disabled={loadingBookingId === appointment.id}
                      >
                        {loadingBookingId === appointment.id ? '⏳ Updating...' : '🟦 Complete'}
                      </button>
                      <button 
                        onClick={() => handleCancelBooking(appointment.id)} 
                        className={Styles.CancelButton}
                        disabled={loadingBookingId === appointment.id}
                      >
                        {loadingBookingId === appointment.id ? '⏳ Canceling...' : '❌ Cancel'}
                      </button>
                    </>
                  )}
                  {appointment.status === 'Completed' && (
                    <div className={Styles.CompletedMessage}>
                      <span>✅ Appointment completed successfully!</span>
                    </div>
                  )}
                  {appointment.status === 'Canceled' && (
                    <>
                      <button 
                        onClick={() => handlePendingBooking(appointment.id)} 
                        className={Styles.PendingButton}
                        disabled={loadingBookingId === appointment.id}
                      >
                        {loadingBookingId === appointment.id ? '⏳ Updating...' : '🔄 Mark as Pending'}
                      </button>
                    </>
                  )}
                </div>
              </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}