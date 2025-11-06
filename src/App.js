import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser, setUser } from './features/slices/authslice';
import Navigation from "./navigation/Navigation";
import { fetchServices } from './features/slices/servicesSlice';
import { fetchStylists } from './features/slices/stylistSlice';
import { fetchAppointments } from './features/slices/appointmentSlice';
import { useState, useEffect } from 'react';
import Loader from './components/loader/Loader';
import { auth, db } from './config/firestore';
import { doc, getDoc } from 'firebase/firestore';

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const dispatch = useDispatch();

  const { User, status: authStatus } = useSelector((state) => state.auth);
  const { status: serviceStatus } = useSelector((state) => state.services);
  const { status: stylistStatus } = useSelector((state) => state.stylists);
  const { status: appointmentStatus } = useSelector((state) => state.appointments);

  // Initial Load: Only ONCE
  useEffect(() => {
    const loadApp = async () => {
      try {
        // 1. Get current user (Firestore + Auth)
        await dispatch(getCurrentUser()).unwrap();

        // 2. Fetch all other data in parallel
        await Promise.all([
          dispatch(fetchServices()),
          dispatch(fetchStylists()),
          dispatch(fetchAppointments()),
        ]);
      } catch (error) {
        console.error("App load failed:", error);
      } finally {
        setInitialLoading(false); // Hide loader
      }
    };

    loadApp();
  }, [dispatch]);

  // Real-time Auth Listener (Separate – No data re-fetch)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          dispatch(setUser(userDoc.exists() ? userDoc.data() : null));
        } catch (err) {
          dispatch(setUser(null));
        }
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Show loader if:
  // - Initial load is in progress
  // - OR any data is still loading
  const isLoading =
    initialLoading ||
    authStatus === 'loading' ||
    serviceStatus === 'loading' ||
    stylistStatus === 'loading' ||
    appointmentStatus === 'loading';

  if (isLoading) {
    return <Loader />;
  }

  return <Navigation />;
}

export default App;