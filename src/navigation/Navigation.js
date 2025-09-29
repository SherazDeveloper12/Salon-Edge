// Navigation.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/home/Home';
import About from '../pages/about/About';
import Services from '../pages/services/Services';
import Bookings from '../pages/bookings/Bookings';
import Signup from '../pages/signup/SignUp';
import Signin from '../pages/signin/Signin';
import Contact from '../pages/contact/Contact';
import Admin from '../pages/admin/Admin';
import MyBookings from '../pages/myBookings/MyBookings';
import AdminServices from '../pages/admin/adminpages/services/Services';
import AdminBookings from '../pages/admin/adminpages/bookings/Booking';
import Stylists from '../pages/admin/adminpages/stylists/Stylists';
import PrivateRoute from './PrivateRouting';
import PublicRoute from './PublicRouting';

export default function Navigation() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/about",
      element: <About />
    },
    {
      path: "/contact",
      element: <Contact />
    },
    {
      path: "/bookings",
      element: <PrivateRoute><Bookings /></PrivateRoute> // Normal user access
    },
    {
      path: "/services",
      element: <Services />
    },
    {
      path: "/mybookings",
      element: <PrivateRoute><MyBookings /></PrivateRoute> // Normal user access
    },
    {
      path: "/admin",
      element: <PrivateRoute adminOnly={true}><Admin /></PrivateRoute> // Admin only
    },
    {
      path: "/admin/services",
      element: <PrivateRoute adminOnly={true}><AdminServices /></PrivateRoute> // Admin only
    },
    {
      path: "/admin/bookings",
      element: <PrivateRoute adminOnly={true}><AdminBookings /></PrivateRoute> // Admin only
    },
    {
      path: "/admin/stylists",
      element: <PrivateRoute adminOnly={true}><Stylists /></PrivateRoute> // Admin only
    },
    {
      path: "/signup",
      element: <PublicRoute><Signup /></PublicRoute>
    },
    {
      path: "/login",
      element: <PublicRoute><Signin /></PublicRoute>
    },
  ]);

  return <RouterProvider router={router} />;
}