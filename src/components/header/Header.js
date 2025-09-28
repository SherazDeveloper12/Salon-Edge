import Styles from './header.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../features/slices/authslice';
import { useSelector , useDispatch} from 'react-redux';
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.User);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={Styles.header}>
      <nav className={Styles.nav}>
        <div onClick={() => setIsMenuOpen(!isMenuOpen)} className={Styles.MenuIcon}>
          <img
            src={require("../../assets/three-lines-menu-svgrepo-com.png")}
            alt="Menu Icon"
          />
        </div>
          {isMenuOpen && (
        <div className={Styles.mobile_menu}>
          <div onClick={() => setIsMenuOpen(false)} className={Styles.sidebaroverlay}></div>
          <div className={Styles.sidebarmenu}>
            <div className={Styles.sidebar}>
              <ul className={Styles.sidebarnavLinks}>
         <Link to="/" className={Styles.navLink}>  <li>
           Home
          </li> </Link>
          <Link to="/about" className={Styles.navLink}>  <li>
            About
          </li> </Link>
          <Link to="/services" className={Styles.navLink}>  <li>
            Services
          </li> </Link>
         <Link to="/contact" className={Styles.navLink}>
          <li>
          Contact
          </li></Link>
        </ul>
              {(user)? <>
            <Link to="/" ><button onClick={handleLogout} className={Styles.login}>Logout</button></Link>
            <Link to="/mybookings"><button className={Styles.profilebtn}>  <p> {user.name}'s Bookings </p>    </button></Link>
             </>:  
             <div className={Styles.SidebarAuthButtons}>
          <Link to="/login" className={Styles.SidebarloginButton}><button>Login</button></Link>
          <Link to="/signup" className={Styles.SidebarsignupButton}><button>Sign Up</button></Link>
        </div> }
           
            </div>
            <div className='closebtn'>
              <img src={require("../../assets/exit-hand-drawn-interface-symbol-variant-svgrepo-com.png")} width={30} onClick={() => setIsMenuOpen(false)} alt="Close Menu" />
            </div>
          </div>
        </div>
      )}
        <Link to="/" className={Styles.logo}>
          <div className={Styles.SalonEdgeLogo}>
            <div className={Styles.logoImage}>
               <img
              src={require("../../assets/Salon Edge Logo and Icon.png")}
              alt="Salon Edge Logo"
              
            />
            </div>
           
            <p className={Styles.logoText}>Salon Edge</p>
          </div>
        </Link>
        <ul className={Styles.navLinks}>
         <Link to="/" className={Styles.navLink}>  <li>
           Home
          </li> </Link>
          <Link to="/about" className={Styles.navLink}>  <li>
            About
          </li> </Link>
          <Link to="/services" className={Styles.navLink}>  <li>
            Services
          </li> </Link>
         <Link to="/contact" className={Styles.navLink}>
          <li>
          Contact
          </li></Link> 
         <Link to="/admin" className={Styles.navLink}>
          <li>
          Admin
          </li></Link> 
        </ul>
        <div className={Styles.authButtons}>
          {(user)? <>
            <Link to="/"  ><button onClick={handleLogout} className={Styles.login}>Logout</button></Link>
            <Link to="/mybookings"><button className={Styles.profilebtn}>  <p> {user.name}'s Bookings </p>    </button></Link>
             </>:<>
          <Link to="/login" className={Styles.loginButton}><button>Login</button></Link>
          <Link to="/signup" className={Styles.signupButton}><button>Sign Up</button></Link>
          </>}
        </div>
      </nav>
    </header>
  );
}
      