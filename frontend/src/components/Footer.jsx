import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img 
                src="/images/logo.png" 
                alt="Sri Venkateswara Company Logo" 
                className="footer-logo-image"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <h3>Sri Venkateswara Company</h3>
            </div>
            <p className="footer-description">
              Around 60 years of manufacturing excellence in rivets using cold forging technique. 
              IATF 16949:2016 certified for quality assurance.
            </p>
            <div className="footer-certification">
              <span className="cert-badge">🏆 IATF 16949:2016 Certified</span>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Products</h4>
            <ul className="footer-links">
              <li><Link to="/products">Solid Rivets</Link></li>
              <li><Link to="/products">Semi-Tubular Rivets</Link></li>
              <li><Link to="/products">Tubular Rivets</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><Link to="/services">Annealing</Link></li>
              <li><Link to="/services">Ultra-Sonic Cleaning</Link></li>
              <li><Link to="/services">Plating</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <p className="footer-section-subtitle">Get in Touch with Us</p>
            <div className="footer-contact">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <p>S.F No: 626/1-2, Idikarai Road,<br />
                Periyanaickenpalayam,<br />
                Coimbatore, Tamil Nadu, 641022<br />
                India</p>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <p>+91 (904) 707-7874</p>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <p>marketing@srivenkateswaracompany.in</p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-stats">
            <div className="stat">
              <span className="stat-number">60</span>
              <span className="stat-label">Years</span>
            </div>
            <div className="stat">
              <span className="stat-number">100</span>
              <span className="stat-label">Employees</span>
            </div>
            <div className="stat">
              <span className="stat-number">50</span>
              <span className="stat-label">Customers</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Quality</span>
            </div>
          </div>
          <div className="footer-copyright">
            <p>&copy; {currentYear} Sri Venkateswara Company. All Rights Reserved.</p>
            <p className="footer-tagline">Manufacturing Excellence Since 1964</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
