import Styles from './header.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  

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
          <li>
            <Link to="/" className={Styles.navLink}>Home</Link>
          </li>
          <li>
            <Link to="/about" className={Styles.navLink}>About</Link>
          </li>
          <li>
            <Link to="/services" className={Styles.navLink}>Services</Link>
          </li>
          <li>
            <Link to="/contact" className={Styles.navLink}>Contact</Link>
          </li>
        </ul>
              {(false)? <>
            <Link to="/" ><button onClick={() => setIsMenuOpen(false) } className={Styles.login}>Logout</button></Link>
            <Link to="/profile"><button className={Styles.profilebtn}>  <p> user profile </p>    </button></Link>
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
          <li>
            <Link to="/" className={Styles.navLink}>Home</Link>
          </li>
          <li>
            <Link to="/about" className={Styles.navLink}>About</Link>
          </li>
          <li>
            <Link to="/services" className={Styles.navLink}>Services</Link>
          </li>
          <li>
            <Link to="/contact" className={Styles.navLink}>Contact</Link>
          </li>
        </ul>
        <div className={Styles.authButtons}>
          <Link to="/login" className={Styles.loginButton}><button>Login</button></Link>
          <Link to="/signup" className={Styles.signupButton}><button>Sign Up</button></Link>
        </div>
      </nav>
    </header>
  );
}
      