import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Check, Calendar, Clock, Users, ArrowRight, Home, Printer, Download, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getBookingById, getBookings, formatCurrency } from '../utils/localStorage';
import '../styles/success.css';

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookingId = searchParams.get('id');

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    if (bookingId) {
      const found = getBookingById(bookingId);
      if (found) {
        setBooking(found);
        return;
      }
    }

    // Fallback to most recent booking in list
    const all = getBookings();
    if (all.length > 0) {
      setBooking(all[0]);
    }
  }, [bookingId]);

  if (!booking) {
    return (
      <div className="page-wrapper container" style={{ textAlign: 'center', padding: '5rem 0' }}>
        <h2>No Booking Found</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
          We could not locate this booking reference.
        </p>
        <Link to="/services" className="btn btn-primary">
          Explore Services
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-wrapper">
      <div className="container success-layout">
        <div className="success-card">
          {/* Green Checkmark */}
          <div className="success-icon-badge">
            <Check size={44} strokeWidth={3} />
          </div>

          <h1 className="success-title">Booking Confirmed</h1>
          <p className="success-subtitle">Your booking is successful.</p>

          {/* Receipt Card */}
          <div className="receipt-box">
            <div className="receipt-id-row">
              <div>
                <span className="receipt-id-label">Booking ID</span>
                <div className="receipt-id-val">{booking.id}</div>
              </div>
              <span className="badge badge-confirmed">
                {booking.status}
              </span>
            </div>

            <div className="receipt-list">
              <div className="receipt-item">
                <span className="label">Service</span>
                <span className="value">{booking.serviceTitle || booking.service}</span>
              </div>

              <div className="receipt-item">
                <span className="label">Date</span>
                <span className="value">{booking.date}</span>
              </div>

              <div className="receipt-item">
                <span className="label">Time</span>
                <span className="value">{booking.time}</span>
              </div>

              <div className="receipt-item">
                <span className="label">People</span>
                <span className="value">{booking.people}</span>
              </div>

              <div className="receipt-item">
                <span className="label">Customer</span>
                <span className="value">{booking.customer}</span>
              </div>

              <div className="receipt-divider" />

              <div className="receipt-item">
                <span className="label">Payment Method</span>
                <span className="value">{booking.paymentMethod}</span>
              </div>

              <div className="receipt-total-line">
                <span>Amount Paid</span>
                <span className="amount">{formatCurrency(booking.amount)}</span>
              </div>

              <div className="receipt-item" style={{ marginTop: '0.5rem' }}>
                <span className="label">Status</span>
                <span className="value" style={{ color: 'var(--success)', fontWeight: 800 }}>
                  {booking.status}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="success-actions">
            <Link to="/my-bookings" className="btn btn-primary btn-lg">
              <span>View My Bookings</span>
              <ArrowRight size={18} />
            </Link>

            <Link to="/" className="btn btn-secondary btn-lg">
              <Home size={18} />
              <span>Back to Home</span>
            </Link>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <button
              type="button"
              onClick={handlePrint}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.85rem' }}
            >
              <Printer size={15} /> Print / Save Confirmation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;

