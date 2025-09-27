
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/home/Home';
import About from '../pages/about/About';
import Services from '../pages/services/Services';
import Bookings from '../pages/bookings/Bookings';
import Signup from '../pages/signup/SignUp';
import Signin from '../pages/signin/Signin';
import Contact from '../pages/contact/Contact';
import Admin from '../pages/admin/Admin';
import AdminServices from '../pages/admin/adminpages/services/Services';
import AdminBookings from '../pages/admin/adminpages/bookings/Booking';
import Stylists from '../pages/admin/adminpages/stylists/Stylists';
import PrivateRoute from './PrivateRouting';
import PublicRoute from './PublicRouting';
export default function Navigation() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Home />
    },
    {
      path:"/about",
      element:<About/>
    },
    {
      path:"/contact",
      element:<Contact/>
    },
    {
      path:"/bookings",
      element:<Bookings/>
    },
    {
      path:"/services",
      element:<Services/>
    },
    {
      path:"/admin",
      element:<Admin/>
    },
    {
      path:"/admin/services",
      element:<AdminServices/>
    },
    {
      path:"/admin/bookings",
      element:<AdminBookings/>
    },
    {
      path:"/admin/stylists",
      element:<Stylists/>
    },
    {
      path:"/signup",
      element:  <Signup/> 
    },
    {
      path:"/login",
      element: <Signin/> 
    },
  ])
  return (

    <RouterProvider router={router} />
  );
}