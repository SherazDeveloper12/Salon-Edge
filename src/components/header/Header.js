import Styles from './header.module.css';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../features/slices/authslice';
import { useSelector, useDispatch } from 'react-redux';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.User); // Note: Consider renaming 'User' to 'user' in your authslice for consistency
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // To detect route changes

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
  }, [location.pathname]); // Trigger when the pathname changes

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false); // Close mobile menu on logout
    navigate('/'); // Redirect to home page after logout
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close mobile menu when any link is clicked
  };

  return (
    <header className={Styles.header}>
      <nav className={Styles.nav}>
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={Styles.MenuIcon}
        >
          <img
            src={require('../../assets/admin dashboard.png')}
            alt="Menu Icon"
          />
        </div>

        {isMenuOpen && (
          <div className={Styles.mobile_menu}>
            <div
              onClick={() => setIsMenuOpen(false)}
              className={Styles.sidebaroverlay}
            ></div>
            <div className={Styles.sidebarmenu}>
              <div className={Styles.sidebar}>
                <ul className={Styles.sidebarnavLinks}>
                  <li>
                    <Link
                      to="/"
                      className={Styles.navLink}
                      onClick={handleLinkClick}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className={Styles.navLink}
                      onClick={handleLinkClick}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services"
                      className={Styles.navLink}
                      onClick={handleLinkClick}
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className={Styles.navLink}
                      onClick={handleLinkClick}
                    >
                      Contact
                    </Link>
                  </li>
                  {user && user.email === 'Admin@gmail.com' && (
                    <li>
                      <Link
                        to="/admin"
                        className={Styles.navLink}
                        onClick={handleLinkClick}
                      >
                        Admin
                      </Link>
                    </li>
                  )}
                </ul>
                {user ? (
                  <>
                    <Link to="/" onClick={handleLinkClick}>
                      <button onClick={handleLogout} className={Styles.login}>
                        Logout
                      </button>
                    </Link>
                    <Link to="/mybookings" onClick={handleLinkClick}>
                      <button className={Styles.profilebtn}>
                        <p>{user.name}'s Bookings</p>
                      </button>
                    </Link>
                  </>
                ) : (
                  <div className={Styles.SidebarAuthButtons}>
                    <Link
                      to="/login"
                      className={Styles.SidebarloginButton}
                      onClick={handleLinkClick}
                    >
                      <button>Login</button>
                    </Link>
                    <Link
                      to="/signup"
                      className={Styles.SidebarsignupButton}
                      onClick={handleLinkClick}
                    >
                      <button>Sign Up</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <Link to="/" className={Styles.logo}>
          <div className={Styles.SalonEdgeLogo}>
            <div className={Styles.logoImage}>
              <img
                src={require('../../assets/Salon Edge Logo and Icon.png')}
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
          
         
            <Link to="/about" className={Styles.navLink}> <li>
              About
            </li> </Link>
          
            <Link to="/services" className={Styles.navLink}><li>
              Services
            </li> </Link>
          
            <Link to="/contact" className={Styles.navLink}><li>
              Contact
            </li> </Link>
          {user && user.email === 'Admin@gmail.com' && (
           
              <Link to="/admin" className={Styles.navLink}> <li>
                Admin</li>
              </Link>
            
          )}
        </ul>

        <div className={Styles.authButtons}>
          {user ? (
            <>
              <Link to="/">
                <button onClick={handleLogout} className={Styles.login}>
                  Logout
                </button>
              </Link>
              <Link to="/mybookings">
                <button className={Styles.profilebtn}>
                  <p>{user.name}'s Bookings</p>
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className={Styles.loginButton}>
                <button>Login</button>
              </Link>
              <Link to="/signup" className={Styles.signupButton}>
                <button>Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}