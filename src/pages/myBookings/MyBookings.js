import Styles from './mybookings.module.css';
import { useSelector } from 'react-redux';
import { use, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { updateAppointment , fetchAppointments } from '../../features/slices/appointmentSlice'; // Ensure path is correct
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../../features/slices/authslice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
export default function MyBookings() { 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { appointments, status, error } = useSelector((state) => state.appointments); // Fixed selector
  const user = useSelector((state) => state.auth.User);
  const bookings = appointments.filter(appointment => appointment.user?.uid === user.uid);
  const [MyBookings, setMyBookings] = useState(true);
  const [Profile, setProfile] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: user.name || '',
    email: user.email || '',
    uid: user.uid || ''
  });
  const [filter, setFilter] = useState('Pending');
   const [checkappointments, setCheckAppointments] = useState(false);
  const filteredBookings = bookings.filter(booking => {
    if (filter === 'All') return true;
    return booking.status === filter;
  });
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [checkappointments]); 
  const handleCancelBooking = (bookingId) => {
    
    const appointmentData = { status: 'Canceled' }; // Proper appointmentData object
     dispatch(updateAppointment({ id: bookingId, appointmentData }))
      .then(() => console.log('Update dispatched successfully'))
      .catch((err) => console.error('Dispatch error:', err));
    console.log(`Cancel booking with ID: ${bookingId}`);
    setCheckAppointments(!checkappointments);
  };

  const handleBookAgain =  (bookingId) => {
    const appointmentData = { status: 'Pending' }; // Proper appointmentData object
     dispatch(updateAppointment({ id: bookingId, appointmentData }))
      .then(() => console.log('Update dispatched successfully'))
      .catch((err) => console.error('Dispatch error:', err));
    console.log(`Book again for booking ID: ${bookingId}`);
    setCheckAppointments(!checkappointments);
  };
  const handleBookAnother = (bookingId) => {
    navigate('/bookings');
  }
  const handleSaveChanges = () => {
    // Implement save changes logic here
    dispatch(updateUserProfile(userDetails));
   
  }
  const handleCancelEdit = () => {
    // Implement cancel edit logic here
    navigate('/');
  }
  const loading = useSelector((state) => state.auth.loading);
  return (
    <div className={Styles.myBookings}>
      <div className={Styles.Navbar}>
        <ul>
          <Link to="/" className={Styles.link}><li>Home</li></Link>
          <li className={MyBookings ? Styles.active : ''} onClick={() => { setMyBookings(true); setProfile(false); }}>My Bookings</li>
          <li className={Profile ? Styles.active : ''} onClick={() => { setMyBookings(false); setProfile(true); }}>Profile</li>
        </ul>
      </div>
      {MyBookings && (
        <div className={Styles.BookingContent}>
          <h2>Bookings details</h2>
          <div className={Styles.BookingContentHero}>
            <div className={Styles.BookingContentHeroHeading}>
              <img src={require('../../assets/caution-sing-svgrepo-com.png')} alt="Note" width={40} />
              <h2>Note</h2>
            </div>
            <div className={Styles.BookingContentHeroText}>
              <img src={require('../../assets/arrowhead-right-solid-svgrepo-com.png')} alt="Info" width={20} />
              <p>Clients must call at least 24 hours in advance to cancel or reschedule appointments</p>
            </div>
            <div className={Styles.BookingContentHeroText}>
              <img src={require('../../assets/arrowhead-right-solid-svgrepo-com.png')} alt="Info" width={20} />
              <p>Please be on time for your appointment</p>
            </div>
            <div className={Styles.BookingContentHeroText}>
              <img src={require('../../assets/arrowhead-right-solid-svgrepo-com.png')} alt="Info" width={20} />
              <p>Working hours are Monday to Sunday, 10:00 AM to 7:00 PM.</p>
            </div>
          </div>
           {(status === 'loading')? <div className={Styles.LoaderContainer}><Loader /></div> : <><div className={Styles.CardHeaderNav}>
            <ul>
              <li className={` ${Styles.PendingTab} ${filter === 'Pending' ? `${Styles.active}` : ''}`} onClick={() => setFilter('Pending')}>Pending</li>
             <li className={` ${Styles.ConfirmedTab} ${filter === 'Confirmed' ? `${Styles.active}` : ''}`} onClick={() => setFilter('Confirmed')}>Confirmed</li>
              <li className={` ${Styles.CompletedTab} ${filter === 'Completed' ? `${Styles.active}` : ''}`} onClick={() => setFilter('Completed')}>Completed</li>
              
              <li className={` ${Styles.CanceledTab} ${filter === 'Canceled' ? `${Styles.active}` : ''}`} onClick={() => setFilter('Canceled')}>Canceled</li>
            </ul>
          </div>
          <div className={Styles.BookingContentCards}>
           
            {filteredBookings.map((booking) => (
              <div key={booking.id} className={`${Styles.bookingCard} ${booking.status === 'Pending' ? Styles.PendingbookingCard : booking.status === 'Confirmed' ? Styles.ConfirmedbookingCard : booking.status === 'Canceled' ? Styles.CanceledbookingCard : Styles.CompletedbookingCard}`}>
                <div className={Styles.cardHeader}>
                  <div className={`${Styles.StatusBar} ${booking.status === 'Pending' ? Styles.PendingStatusBar : booking.status === 'Confirmed' ? Styles.ConfirmedStatusBar : booking.status === 'Canceled' ? Styles.CanceledStatusBar : Styles.CompletedStatusBar}`}>
                    <span className={Styles.statusIcon}>
                      {booking.status === 'Pending' && '⏳'}
                      {booking.status === 'Confirmed' && '✅'}
                      {booking.status === 'Canceled' && '❌'}
                      {booking.status === 'Completed' && '🟦'}
                    </span>
                    <span>{booking.status}</span>
                  </div>
                  <span>#{booking.id}</span>
                </div>
                <div>Date: {new Date(booking.date.seconds * 1000).toLocaleDateString()}</div>
                <div>Time: {booking.time}</div>
                <div>Service: {booking.services.map(service => service.ServiceName).join(', ')}</div>
                <div>Stylist: {booking.stylist.stylistName}</div>
                <div>Amount: ${booking.services.reduce((sum, service) => sum + parseFloat(service.Price || 0), 0).toFixed(2)}</div>
                <div className={`${Styles.Status} ${booking.status === 'Pending' ? Styles.PendingStatus : booking.status === 'Confirmed' ? Styles.ConfirmedStatus : booking.status === 'Canceled' ? Styles.CanceledStatus : Styles.CompletedStatus}`}>
                  <span>
                    {booking.status === 'Pending' && '⏳'}
                    {booking.status === 'Confirmed' && '✅'}
                    {booking.status === 'Canceled' && '❌'}
                    {booking.status === 'Completed' && '🟦'}
                  </span>
                  <span>
                    {booking.status === 'Pending' && 'Please wait for confirmation'}
                    {booking.status === 'Confirmed' && 'Confirmed - See you soon!'}
                    {booking.status === 'Canceled' && 'Canceled - Contact support for details'}
                    {booking.status === 'Completed' && 'Completed - Thank you!'}
                  </span>
                </div>
                <div className={Styles.actionButtons}>
                  <button className={Styles.messageBtn}>Message</button>
                  <button className={Styles.callBtn}>Call</button>
                  {booking.status === 'Pending' && <button onClick={() => handleCancelBooking(booking.id)} className={Styles.CancelBtn}>Cancel</button>}
                  {booking.status === 'Confirmed' && <button onClick={() => handleCancelBooking(booking.id)} className={Styles.CancelBtn}>Cancel</button>}
                  {booking.status === 'Completed' && <button onClick={() => handleBookAnother(booking.id)} className={Styles.BookAgainBtn}>Book Again</button>}
                  {booking.status === 'Canceled' && <button onClick={() => handleBookAgain(booking.id)} className={Styles.BookAgainBtn}>Book Again</button>}

                </div>
              </div>
            ))}
          </div></> }
          
        </div>
      )}
      {Profile && (
        <div className={Styles.ProfileContent}>
          {loading ? <div className={Styles.LoaderContainer}><Loader /></div> : <> <h2>Edit Profile</h2>
            <div className={Styles.profileField}>
              <label htmlFor="name">Name:</label>
              <input onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} type="text" id="name" name="name" defaultValue={user.name} />
            </div>
            <div className={Styles.profileField}>
              <label htmlFor="email">Email:</label>
              <input onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} type="email" id="email" name="email" defaultValue={user.email} />
            </div>
            <button className={Styles.saveBtn} onClick={handleSaveChanges}>Save Changes</button>
            <button className={Styles.cancelBtn} onClick={handleCancelEdit}>Cancel</button></>}
         
        </div>
      )}
    </div>
  );
}