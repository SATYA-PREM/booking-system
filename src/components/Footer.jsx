import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, Heart, ShieldCheck, Clock, Mail, Phone } from 'lucide-react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-col footer-brand">
            <Link to="/" className="brand-logo" style={{ color: '#fff' }}>
              <span className="logo-icon">
                <CalendarCheck size={20} strokeWidth={2.5} />
              </span>
              <span>
                Book<span className="logo-accent">Easy</span>
              </span>
            </Link>
            <p className="footer-desc">
              Your instant, hassle-free gateway to book verified photography, salon, event hall, tour, and wellness services.
            </p>
            <div className="footer-socials">
              <span className="social-btn" title="Secure Instant Confirmation">
                <ShieldCheck size={18} />
              </span>
              <span className="social-btn" title="24/7 Availability">
                <Clock size={18} />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/services" className="footer-link">All Services</Link></li>
              <li><Link to="/my-bookings" className="footer-link">My Bookings</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h4>Top Categories</h4>
            <ul className="footer-links">
              <li><Link to="/services?category=Photography" className="footer-link">Photography</Link></li>
              <li><Link to="/services?category=Salon" className="footer-link">Salon & Spa</Link></li>
              <li><Link to="/services?category=Events" className="footer-link">Event Spaces</Link></li>
              <li><Link to="/services?category=Travel" className="footer-link">Travel & Tours</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="footer-col">
            <h4>Support & Demo</h4>
            <ul className="footer-links">
              <li className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={15} /> support@bookeasy.demo
              </li>
              <li className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={15} /> +91 1800 123 4567
              </li>
              <li className="footer-link" style={{ marginTop: '0.5rem', color: '#cbd5e1' }}>
                ⚡ Powered by Pure React & LocalStorage
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} BookEasy Inc. All demo rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Built with React & <Heart size={14} color="#ef4444" fill="#ef4444" /> for seamless bookings
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

