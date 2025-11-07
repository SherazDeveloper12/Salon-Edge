import AdminNavbar from "../../../../components/adminNavbar/AdminNavbar"; // Verify path
import Styles from './bookings.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAppointment , fetchAppointments } from '../../../../features/slices/appointmentSlice'; // Ensure path is correct
import { useEffect } from 'react';
export default function AdminBookings() {
      const [checkappointments, setCheckAppointments] = useState(false);
        useEffect(() => {
          dispatch(fetchAppointments());
        }, [checkappointments]); 
  const dispatch = useDispatch();
  const { appointments, status, error } = useSelector((state) => state.appointments); // Updated selector
  const [filter, setFilter] = useState('Pending'); // Added filter state for navbar functionality
        console.log('Appointments:', appointments); // Debugging log
        console.log('Status:', status); // Debugging log
        console.log('Error:', error); // Debugging log
  const handleConfirmBooking = (bookingId) => {
    dispatch(updateAppointment({ id: bookingId, appointmentData: { status: 'Confirmed' } }))
      .then(() => console.log(`Confirmed booking with ID: ${bookingId}`))
      .catch((err) => console.error('Confirm error:', err));
      setCheckAppointments(!checkappointments);
  };

  const handleCancelBooking = (bookingId) => {
    dispatch(updateAppointment({ id: bookingId, appointmentData: { status: 'Canceled' } }))
      .then(() => console.log(`Canceled booking with ID: ${bookingId}`))
      .catch((err) => console.error('Cancel error:', err));
      setCheckAppointments(!checkappointments);
  };

  const handleCompleteBooking = (bookingId) => {
    dispatch(updateAppointment({ id: bookingId, appointmentData: { status: 'Completed' } }))
      .then(() => console.log(`Completed booking with ID: ${bookingId}`))
      .catch((err) => console.error('Complete error:', err));
      setCheckAppointments(!checkappointments);
  };

  const handlePendingBooking = (bookingId) => {
    dispatch(updateAppointment({ id: bookingId, appointmentData: { status: 'Pending' } }))
      .then(() => console.log(`Marked as Pending booking with ID: ${bookingId}`))
      .catch((err) => console.error('Pending error:', err));
        setCheckAppointments(!checkappointments);
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
        {status === 'loading' && <p>Loading bookings...</p>}
        {error && <p>Error: {error}</p>}
        <div className={Styles.BookingsList}>
          {appointments.length === 0 ? (
            <p>No bookings available.</p>
          ) : (
            appointments.filter(appointment => appointment.status === filter).map((appointment) => (
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
                      <button onClick={() => handleConfirmBooking(appointment.id)} className={Styles.ConfirmButton}>Confirm</button>
                      <button onClick={() => handleCompleteBooking(appointment.id)} className={Styles.CompleteButton}>Completed</button>
                      <button onClick={() => handleCancelBooking(appointment.id)} className={Styles.CancelButton}>Cancel</button>
                    </>
                  )}
                  {appointment.status === 'Confirmed' && (
                    <>
                      <button onClick={() => handleCompleteBooking(appointment.id)} className={Styles.CompleteButton}>Completed</button>
                      <button onClick={() => handleCancelBooking(appointment.id)} className={Styles.CancelButton}>Cancel</button>
                    </>
                  )}
                  {appointment.status === 'Completed' && (
                    <></>
                  )}
                  {appointment.status === 'Canceled' && (
                    <>
                      <button onClick={() => handlePendingBooking(appointment.id)} className={Styles.PendingButton}>Mark as Pending</button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}