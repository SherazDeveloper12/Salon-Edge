import './App.css';
import { useSelector , useDispatch } from 'react-redux';
import { getCurrentUser } from './features/slices/authslice';
import Navigation from "./navigation/Navigation";
import {fetchServices} from './features/slices/servicesSlice';
import { fetchStylists } from './features/slices/stylistSlice';
import { useState, useEffect } from 'react';
import Loader from './components/loader/Loader';
function App() {
  const { services, status, error } = useSelector((state) => state.services);
 const { stylists, stylistStatus, stylistError } = useSelector((state) => state.stylists);
const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(() => {
     dispatch(fetchStylists());
    console.log("Dispatched fetchStylists");
    dispatch(fetchServices());
    dispatch(getCurrentUser(setLoading));
  }, []);

     const user = useSelector((state) => state.auth.User);
   console.log("User in App.js", user);

   if (status === 'loading' || stylistStatus === 'loading') return <Loader />;
  return (
    <>
    {(loading) ? <Loader /> : <Navigation />}
    </>

  );
}


export default App;
