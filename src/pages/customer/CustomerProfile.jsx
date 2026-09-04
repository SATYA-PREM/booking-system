import React, { useState } from 'react';
import { User, Mail, Phone, Ticket, Heart, Shield, CheckCircle2 } from 'lucide-react';
import { getBookings, getWishlist } from '../../services/storage';

const CustomerProfile = () => {
  const bookings = getBookings();
  const wishlist = getWishlist();

  const [name, setName] = useState('Satya Prem');
  const [email, setEmail] = useState('satya@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [city, setCity] = useState('Mumbai');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="page-wrapper container" style={{ maxWidth: '720px' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="section-badge">Account</span>
        <h1 className="section-title">My Profile</h1>
        <p className="section-subtitle">Manage your personal information, contact preferences, and membership details.</p>
      </div>

      {saved && (
        <div style={{ background: 'var(--success-bg)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} />
          <span>Profile preferences saved successfully!</span>
        </div>
      )}

      {/* User Card Header */}
      <div style={{ background: 'var(--bg-cinema-card)', border: '1px solid var(--border-dark)', borderRadius: 'var(--radius-xl)', padding: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', boxShadow: 'var(--shadow-cinema)' }}>
        <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), #ec4899)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 800 }}>
          SP
        </div>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>{name}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>MovieMagic CinePass Member</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.8rem', color: '#c4b5fd' }}>
            <span><strong>{bookings.length}</strong> Total Bookings</span>
            <span>•</span>
            <span><strong>{wishlist.length}</strong> Saved in Watchlist</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div style={{ background: 'var(--bg-cinema-card)', border: '1px solid var(--border-dark)', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-cinema)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.5rem' }}>Personal Information</h3>

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label" htmlFor="pName">Full Name</label>
            <input id="pName" type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="form-row-2col">
            <div className="form-group">
              <label className="form-label" htmlFor="pEmail">Email Address</label>
              <input id="pEmail" type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="pPhone">Phone Number</label>
              <input id="pPhone" type="tel" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="pCity">Preferred Cinema City</label>
            <input id="pCity" type="text" className="form-input" value={city} onChange={(e) => setCity(e.target.value)} required />
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary">
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerProfile;

