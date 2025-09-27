import './App.css';
import { useSelector , useDispatch } from 'react-redux';
import { getCurrentUser } from './features/slices/authslice';
import Navigation from "./navigation/Navigation";
import {fetchServices} from './features/slices/servicesSlice';
import { fetchStylists } from './features/slices/stylistSlice';
import { fetchAppointments } from './features/slices/appointmentSlice';
import { useState, useEffect } from 'react';
import Loader from './components/loader/Loader';
function App() {
  const { services, status, error } = useSelector((state) => state.services);
 const { stylists, stylistStatus, stylistError } = useSelector((state) => state.stylists);
 const { appointments, appointmentStatus, appointmentError } = useSelector((state) => state.appointments);
   const user = useSelector((state) => state.auth.User);
 const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(() => {
     dispatch(fetchStylists());
    dispatch(fetchServices());
    dispatch(getCurrentUser(setLoading));
    dispatch(fetchAppointments());
  }, []);

   console.log("User in App.js", user);
    console.log("Dispatched fetchStylists", stylists);
    console.log("Dispatched fetchServices", services);
    console.log("Dispatched getCurrentUser", user);
    console.log("Dispatched fetchAppointments", appointments);

   if (status === 'loading' || stylistStatus === 'loading' || appointmentStatus === 'loading') return <Loader />;
  return (
    <>
    {(loading) ? <Loader /> : <Navigation />}
    </>

  );
}


export default App;
