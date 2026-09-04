import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Calendar, Clock, MapPin, Eye, Ban, AlertCircle, CheckCircle2, Search, X, Film, Sparkles } from 'lucide-react';
import { getBookings, cancelBooking, formatCurrency } from '../../services/storage';

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('UPCOMING'); // 'UPCOMING' | 'PAST' | 'CANCELLED'
  const [cancellingBooking, setCancellingBooking] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = () => {
    const list = getBookings();
    setBookings(list);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('moviemagic_state_change', loadData);
    return () => window.removeEventListener('moviemagic_state_change', loadData);
  }, []);

  const handleConfirmCancel = () => {
    if (cancellingBooking) {
      cancelBooking(cancellingBooking.id);
      loadData();
      setCancellingBooking(null);
      setToastMsg(`Booking #${cancellingBooking.id} cancelled. Demo refund of ${formatCurrency(cancellingBooking.total)} processed.`);
      setTimeout(() => setToastMsg(''), 4000);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'CANCELLED') {
      if (b.bookingStatus !== 'CANCELLED') return false;
    } else if (activeTab === 'UPCOMING') {
      if (b.bookingStatus === 'CANCELLED') return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchId = b.id.toLowerCase().includes(q);
      const matchMovie = b.movieTitle.toLowerCase().includes(q);
      const matchTheatre = b.theatreName.toLowerCase().includes(q);
      if (!matchId && !matchMovie && !matchTheatre) return false;
    }

    return true;
  });

  const confirmedCount = bookings.filter((b) => b.bookingStatus === 'CONFIRMED').length;
  const cancelledCount = bookings.filter((b) => b.bookingStatus === 'CANCELLED').length;

  return (
    <div className="page-wrapper container">
      {/* Toast Alert */}
      {toastMsg && (
        <div
          style={{
            background: 'var(--danger-bg)',
            color: '#f87171',
            padding: '0.85rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <CheckCircle2 size={18} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="section-badge">Booking Center</span>
          <h1 className="section-title">My Bookings</h1>
          <p className="section-subtitle">Manage your active reservations, digital tickets, or cancel showtimes.</p>
        </div>

        <Link to="/movies" className="btn btn-primary">
          <Sparkles size={16} />
          <span>Book a Movie</span>
        </Link>
      </div>

      {/* Controls Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        {/* Status Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-cinema-card)', padding: '0.35rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-dark)' }}>
          <button
            type="button"
            className={`booking-tab-btn ${activeTab === 'UPCOMING' ? 'active' : ''}`}
            onClick={() => setActiveTab('UPCOMING')}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'UPCOMING' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'UPCOMING' ? '#fff' : 'var(--text-muted)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Confirmed ({confirmedCount})
          </button>
          <button
            type="button"
            className={`booking-tab-btn ${activeTab === 'CANCELLED' ? 'active' : ''}`}
            onClick={() => setActiveTab('CANCELLED')}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'CANCELLED' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'CANCELLED' ? '#fff' : 'var(--text-muted)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Cancelled ({cancelledCount})
          </button>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.5rem', fontSize: '0.85rem', padding: '0.5rem 0.75rem 0.5rem 2.4rem' }}
            placeholder="Search by ID or movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredBookings.map((b) => {
            const isCancelled = b.bookingStatus === 'CANCELLED';

            return (
              <div
                key={b.id}
                style={{
                  background: 'var(--bg-cinema-card)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-dark)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  boxShadow: 'var(--shadow-cinema)',
                  opacity: isCancelled ? 0.75 : 1
                }}
              >
                {/* Top Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                    <img src={b.moviePoster} alt={b.movieTitle} style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.2rem' }}>{b.movieTitle}</h3>
                      <p style={{ color: 'var(--text-gray-300)', fontSize: '0.9rem' }}>
                        {b.theatreName} • {b.screenName}
                      </p>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#a78bfa', fontWeight: 700 }}>
                        ID: {b.id}
                      </span>
                    </div>
                  </div>

                  <span className={`badge ${isCancelled ? 'badge-cancelled' : 'badge-confirmed'}`}>
                    {b.bookingStatus}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="booking-card-grid">
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Date</span>
                    <strong>{b.date}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Showtime</span>
                    <strong style={{ color: '#c4b5fd' }}>{b.time} ({b.format})</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Seats</span>
                    <strong style={{ color: '#c4b5fd' }}>{b.seats.join(', ')} ({b.tickets}x)</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Amount</span>
                    <strong style={{ fontSize: '1.1rem', color: '#a78bfa' }}>{formatCurrency(b.total)}</strong>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <Link to={`/ticket/${b.id}`} className="btn btn-secondary btn-sm">
                    <Eye size={15} />
                    <span>View Ticket</span>
                  </Link>

                  {!isCancelled && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => setCancellingBooking(b)}
                    >
                      <Ban size={15} />
                      <span>Cancel Booking</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ background: 'var(--bg-cinema-card)', padding: '4rem 2rem', borderRadius: 'var(--radius-xl)', textAlign: 'center', border: '1px dashed var(--border-light)' }}>
          <Ticket size={48} style={{ color: 'var(--text-dim)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>No Bookings in this View</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
            {activeTab === 'CANCELLED'
              ? 'You have no cancelled movie bookings.'
              : 'You have not made any movie reservations yet. Experience cinema magic today!'}
          </p>
          <Link to="/movies" className="btn btn-primary btn-lg">
            <span>Explore Now Showing</span>
          </Link>
        </div>
      )}

      {/* Cancellation Modal */}
      {cancellingBooking && (
        <div className="modal-backdrop" onClick={() => setCancellingBooking(null)} role="dialog" aria-modal="true">
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#ef4444' }}>
              <AlertCircle size={28} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Cancel Movie Booking?</h3>
            </div>
            <p style={{ color: 'var(--text-gray-300)', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              Are you sure you want to cancel booking reference <strong>{cancellingBooking.id}</strong> for <em>{cancellingBooking.movieTitle}</em>?
            </p>
            <div style={{ background: 'var(--bg-cinema-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
              <div>• Seats ({cancellingBooking.seats.join(', ')}) will be released back immediately.</div>
              <div style={{ marginTop: '0.35rem' }}>• 100% demo refund of <strong>{formatCurrency(cancellingBooking.total)}</strong> will be credited.</div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setCancellingBooking(null)}>
                Keep Booking
              </button>
              <button type="button" className="btn btn-danger" onClick={handleConfirmCancel}>
                Yes, Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerBookings;

