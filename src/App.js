import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from './features/slices/authslice';
import Navigation from "./navigation/Navigation";
import { fetchServices } from './features/slices/servicesSlice';
import { fetchStylists } from './features/slices/stylistSlice';
import { fetchAppointments } from './features/slices/appointmentSlice';
import { useState, useEffect } from 'react';
import Loader from './components/loader/Loader';
import { auth } from './config/firestore'; // Adjust path to your firestore config
import { setUser } from './features/slices/authslice'; // Import setUser action

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { user, status,error } = useSelector((state) => state.auth);
  const { services, status: serviceStatus } = useSelector((state) => state.services);
  const { stylists, stylistStatus } = useSelector((state) => state.stylists);
  const { appointments, appointmentStatus } = useSelector((state) => state.appointments);

  useEffect(() => {
    // Fetch all data when component mounts
    dispatch(getCurrentUser(setLoading));
    dispatch(fetchStylists());
    dispatch(fetchServices());
    dispatch(fetchAppointments());
    ;

    // Real-time auth state listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(getCurrentUser(setLoading));
      } else {
        dispatch(setUser(null)); // Use setUser to clear user
        setLoading(false);
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [dispatch]);



  if (status === 'loading' ) {
    return <Loader />;
  }

  return (
    <>
      <Navigation />
    </>
  );
}

export default App;