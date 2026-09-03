import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Check, Ticket, Home, Printer, ArrowRight, Sparkles, MapPin, Calendar, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getBookingById, getBookings, formatCurrency } from '../../services/storage';

const CustomerBookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('id');
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    if (bookingId) {
      const b = getBookingById(bookingId);
      if (b) {
        setBooking(b);
        return;
      }
    }
    const all = getBookings();
    if (all.length > 0) setBooking(all[0]);
  }, [bookingId]);

  if (!booking) {
    return (
      <div className="page-wrapper container" style={{ textAlign: 'center', padding: '5rem 0' }}>
        <h2>No Booking Found</h2>
        <Link to="/movies" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Explore Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="page-wrapper container" style={{ maxWidth: '680px' }}>
      <div
        style={{
          background: 'var(--bg-cinema-card)',
          border: '1px solid var(--border-dark)',
          borderRadius: 'var(--radius-xl)',
          padding: '3rem 2.25rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-cinema)'
        }}
      >
        {/* Checkmark Icon */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#34d399',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            border: '2px solid rgba(16, 185, 129, 0.4)',
            boxShadow: '0 0 25px rgba(16, 185, 129, 0.3)'
          }}
        >
          <Check size={44} strokeWidth={3} />
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>Booking Confirmed!</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem' }}>
          Your movie tickets have been booked successfully.
        </p>

        {/* Confirmation Details Card */}
        <div
          style={{
            background: 'var(--bg-cinema-subtle)',
            border: '1px dashed var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            textAlign: 'left',
            marginBottom: '2.5rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-dark)', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Booking ID</span>
              <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 800, color: '#a78bfa' }}>
                {booking.id}
              </div>
            </div>
            <span className="badge badge-confirmed">{booking.bookingStatus}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Movie</span>
              <strong style={{ color: '#fff' }}>{booking.movieTitle}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Theatre</span>
              <strong style={{ color: '#fff' }}>{booking.theatreName}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Date & Showtime</span>
              <strong style={{ color: '#fff' }}>{booking.date} • {booking.time}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Seats ({booking.tickets} Tickets)</span>
              <strong style={{ color: '#c4b5fd' }}>{booking.seats.join(', ')}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Customer</span>
              <strong style={{ color: '#fff' }}>{booking.customer}</strong>
            </div>

            <div style={{ borderTop: '1px solid var(--border-dark)', margin: '0.25rem 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.15rem', fontWeight: 800 }}>
              <span>Amount Paid</span>
              <span style={{ color: '#a78bfa', fontSize: '1.4rem' }}>{formatCurrency(booking.total)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to={`/ticket/${booking.id}`} className="btn btn-primary btn-lg">
            <Ticket size={18} />
            <span>View Digital Ticket</span>
          </Link>

          <Link to="/bookings" className="btn btn-secondary btn-lg">
            <span>My Bookings</span>
            <ArrowRight size={16} />
          </Link>

          <Link to="/" className="btn btn-outline btn-lg">
            <Home size={18} />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerBookingSuccess;

