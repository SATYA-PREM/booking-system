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
        <div className="nav-left-group" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Link to="/" className="brand-wrap">
            <div className="brand-icon">
              <Film size={22} />
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
              <MapPin size={14} color="#a78bfa" />
              <span>{selectedCity}</span>
              <ChevronDown size={14} />
            </button>

            {cityDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '2.8rem',
                  left: 0,
                  background: 'var(--bg-cinema-card)',
                  border: '1px solid var(--border-dark)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem',
                  boxShadow: 'var(--shadow-cinema)',
                  zIndex: 100,
                  minWidth: '160px'
                }}
              >
                {CITIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setSelectedCity(c);
                      setCityDropdown(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      background: selectedCity === c ? 'var(--primary-light)' : 'transparent',
                      border: 'none',
                      color: selectedCity === c ? '#c4b5fd' : '#fff',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{c}</span>
                    {selectedCity === c && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Main Nav Links */}
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
              <div
                style={{
                  position: 'absolute',
                  top: '3rem',
                  right: 0,
                  width: '320px',
                  background: 'var(--bg-cinema-card)',
                  border: '1px solid var(--border-dark)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-cinema)',
                  padding: '1rem',
                  zIndex: 200
                }}
              >
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
          <Link to="/bookings" className="btn btn-secondary btn-sm" style={{ padding: '0.5rem 0.85rem' }}>
            <Ticket size={16} />
            <span>My Bookings</span>
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
            <span>Admin SaaS</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default CustomerNavbar;
