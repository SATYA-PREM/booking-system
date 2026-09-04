import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Heart, Shield, Sparkles, HelpCircle, Phone, Mail } from 'lucide-react';

const CustomerFooter = () => {
  return (
    <footer style={{ background: '#050811', borderTop: '1px solid #1f2937', padding: '4rem 0 2rem', marginTop: 'auto' }}>
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div>
            <Link to="/" className="brand-wrap" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
              <div className="brand-icon">
                <Film size={20} />
              </div>
              <span>
                Movie<span className="brand-name-accent">Magic</span>
              </span>
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '320px', marginBottom: '1.25rem' }}>
              Book Movies. Pick Your Seats. Enjoy the Show. Your premier destination for seamless cinematic ticket bookings.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <Link to="/admin" className="admin-mode-pill" style={{ fontSize: '0.75rem' }}>
                <Shield size={13} /> Cinema SaaS Portal
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 800, marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><Link to="/movies" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Now Showing</Link></li>
              <li><Link to="/movies?status=coming-soon" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Coming Soon</Link></li>
              <li><Link to="/theatres" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Multiplexes & Theatres</Link></li>
              <li><Link to="/offers" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Deals & Coupons</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 800, marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Account
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><Link to="/bookings" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>My Bookings</Link></li>
              <li><Link to="/wishlist" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Watchlist</Link></li>
              <li><Link to="/profile" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>User Profile</Link></li>
              <li><Link to="/faq" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>FAQ & Support</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 800, marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              24/7 Concierge
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={15} color="#a78bfa" /> +91 1800 555 9999
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={15} color="#a78bfa" /> support@moviemagic.demo
              </li>
              <li style={{ marginTop: '0.5rem', color: '#cbd5e1' }}>
                🎬 Instant QR-verified Digital Cinema Tickets
              </li>
            </ul>
          </div>
        </div>

        <div style={{ paddingTop: '2rem', borderTop: '1px solid #1f2937', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-dim)', flexWrap: 'wrap', gap: '1rem' }}>
          <p>© {new Date().getFullYear()} MovieMagic SaaS Platform. All demo rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Built with React & <Heart size={14} color="#ec4899" fill="#ec4899" /> for cinema lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CustomerFooter;

