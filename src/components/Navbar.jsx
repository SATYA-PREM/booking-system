import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { CalendarCheck, Menu, X, Sparkles, BookOpen } from 'lucide-react';
import { getBookings } from '../utils/localStorage';
import '../styles/navbar.css';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);
  const location = useLocation();

  const updateCount = () => {
    const bookings = getBookings();
    const active = bookings.filter((b) => b.status === 'CONFIRMED');
    setBookingCount(active.length);
  };

  useEffect(() => {
    updateCount();
    // Close mobile menu on route change
    setMobileOpen(false);
  }, [location]);

  // Listen to custom booking updates if triggered within session
  useEffect(() => {
    const handleStorage = () => updateCount();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" aria-label="BookEasy Home">
          <span className="logo-icon">
            <CalendarCheck size={20} strokeWidth={2.5} />
          </span>
          <span>
            Book<span className="logo-accent">Easy</span>
          </span>
        </Link>

        {/* Desktop & Mobile Nav Links */}
        <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-bookings"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              My Bookings
              {bookingCount > 0 && (
                <span className="nav-badge" title={`${bookingCount} confirmed booking(s)`}>
                  {bookingCount}
                </span>
              )}
            </NavLink>
          </li>
        </ul>

        {/* CTA Button & Mobile Hamburger */}
        <div className="nav-actions">
          <Link to="/services" className="btn btn-primary btn-sm">
            <Sparkles size={16} />
            <span>Explore Services</span>
          </Link>
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;

