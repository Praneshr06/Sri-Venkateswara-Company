import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user/admin is logged in on component mount and when location changes
    const user = localStorage.getItem('user');
    const adminFlag = localStorage.getItem('isAdmin') === 'true';
    setIsLoggedIn(!!user);
    setIsAdmin(adminFlag);
  }, [location]);

  const getUserData = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const getUserName = () => {
    const userData = getUserData();
    return userData?.name || userData?.email || 'Account';
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
    // Redirect to home page after logout
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img
            src="/images/logo.png"
            alt="Sri Venkateswara Company Logo"
            className="logo-image"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span className="logo-text">Sri Venkateswara Company</span>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className={location.pathname === '/products' ? 'nav-link active' : 'nav-link'}>
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className={location.pathname === '/services' ? 'nav-link active' : 'nav-link'}>
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/gallery" className={location.pathname === '/gallery' ? 'nav-link active' : 'nav-link'}>
              Gallery
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'}>
              Contact
            </Link>
          </li>
          {isAdmin && (
            <li className="nav-item">
              <Link to="/admin" className={location.pathname === '/admin' ? 'nav-link active' : 'nav-link'}>
                Admin
              </Link>
            </li>
          )}
          {isLoggedIn ? (
            <li className="nav-item">
              <div className="user-menu">
                <span className="user-name">{getUserName()}</span>
                <button onClick={handleLogout} className="nav-link logout-btn">
                  Logout
                </button>
              </div>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className={location.pathname === '/login' ? 'nav-link active' : 'nav-link'}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className={location.pathname === '/signup' ? 'nav-link active' : 'nav-link'}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;

