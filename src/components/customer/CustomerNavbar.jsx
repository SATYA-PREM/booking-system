import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Film, Search, Heart, Bell, User, MapPin, Shield, Menu, X, Ticket, ChevronDown, Check } from 'lucide-react';
import { getWishlist, getBookings, getNotifications, markNotificationsRead } from '../../services/storage';

const CITIES = ['Mumbai', 'Delhi-NCR', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'];

const CustomerNavbar = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [cityDropdown, setCityDropdown] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [wishlistCount, setWishlistCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const syncState = () => {
    const wl = getWishlist();
    setWishlistCount(wl.length);

    const bks = getBookings();
    const active = bks.filter((b) => b.bookingStatus === 'CONFIRMED');
    setBookingCount(active.length);

    const notifs = getNotifications();
    setNotifications(notifs);
  };

  useEffect(() => {
    syncState();
    window.addEventListener('moviemagic_state_change', syncState);
    return () => window.removeEventListener('moviemagic_state_change', syncState);
  }, []);

  const handleOpenNotifs = () => {
    setNotifOpen(!notifOpen);
    if (!notifOpen) {
      markNotificationsRead();
      syncState();
    }
  };

  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="customer-navbar">
      <div className="container customer-nav-container">
        {/* Left: Brand Logo + City Picker */}
        <div className="nav-left-group">
          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link to="/" className="brand-wrap">
            <div className="brand-icon">
              <Film size={20} />
            </div>
            <span>
              Movie<span className="brand-name-accent">Magic</span>
            </span>
          </Link>

          {/* City Picker Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              className="city-select-btn"
              onClick={() => setCityDropdown(!cityDropdown)}
            >
              <MapPin size={13} color="#a78bfa" />
              <span>{selectedCity}</span>
              <ChevronDown size={13} />
            </button>

            {cityDropdown && (
              <div className="city-dropdown-menu">
                {CITIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setSelectedCity(c);
                      setCityDropdown(false);
                    }}
                    className={`city-option-btn ${selectedCity === c ? 'active' : ''}`}
                  >
                    <span>{c}</span>
                    {selectedCity === c && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Main Nav Links (Desktop) */}
        <nav className="nav-menu">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-item-link active' : 'nav-item-link')}>
            Home
          </NavLink>
          <NavLink to="/movies" className={({ isActive }) => (isActive ? 'nav-item-link active' : 'nav-item-link')}>
            Movies
          </NavLink>
          <NavLink to="/theatres" className={({ isActive }) => (isActive ? 'nav-item-link active' : 'nav-item-link')}>
            Theatres
          </NavLink>
          <NavLink to="/offers" className={({ isActive }) => (isActive ? 'nav-item-link active' : 'nav-item-link')}>
            Offers
          </NavLink>
          <NavLink to="/faq" className={({ isActive }) => (isActive ? 'nav-item-link active' : 'nav-item-link')}>
            Help / FAQ
          </NavLink>
        </nav>

        {/* Right: Actions */}
        <div className="nav-right-actions">
          {/* Wishlist */}
          <Link to="/wishlist" className="icon-badge-btn" title="My Wishlist">
            <Heart size={18} />
            {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
          </Link>

          {/* Notifications Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              className="icon-badge-btn"
              onClick={handleOpenNotifs}
              title="Notifications"
            >
              <Bell size={18} />
              {unreadNotifsCount > 0 && <span className="badge-count">{unreadNotifsCount}</span>}
            </button>

            {notifOpen && (
              <div className="notif-dropdown-menu">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800 }}>Notifications</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Latest</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '260px', overflowY: 'auto' }}>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      style={{
                        padding: '0.6rem',
                        background: 'var(--bg-cinema-subtle)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.8rem'
                      }}
                    >
                      <strong style={{ display: 'block', color: '#c4b5fd', marginBottom: '0.2rem' }}>{n.title}</strong>
                      <p style={{ color: 'var(--text-gray-300)', lineHeight: 1.35 }}>{n.message}</p>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.2rem', display: 'block' }}>{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* My Bookings */}
          <Link to="/bookings" className="btn btn-secondary btn-sm nav-bookings-btn">
            <Ticket size={16} />
            <span className="bookings-btn-txt">My Bookings</span>
            {bookingCount > 0 && (
              <span
                style={{
                  background: 'var(--primary)',
                  color: '#fff',
                  fontSize: '0.7rem',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '99px'
                }}
              >
                {bookingCount}
              </span>
            )}
          </Link>

          {/* Switch to Admin Dashboard Pill */}
          <Link to="/admin" className="admin-mode-pill" title="Open Cinema SaaS Admin Portal">
            <Shield size={14} />
            <span className="admin-pill-txt">Admin SaaS</span>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <NavLink to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/movies" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Movies
          </NavLink>
          <NavLink to="/theatres" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Theatres
          </NavLink>
          <NavLink to="/offers" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Offers & Deals
          </NavLink>
          <NavLink to="/faq" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Help & Support
          </NavLink>
          <NavLink to="/bookings" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            My Bookings ({bookingCount})
          </NavLink>
          <NavLink to="/wishlist" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Watchlist ({wishlistCount})
          </NavLink>
          <NavLink to="/admin" className="mobile-nav-link admin-link" onClick={() => setMobileMenuOpen(false)}>
            🛡️ Cinema SaaS Admin Portal
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default CustomerNavbar;
