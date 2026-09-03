import React from 'react';
import { Calendar, Clock, Users, ShieldAlert, Eye, Ban, CheckCircle2, XCircle } from 'lucide-react';
import { formatCurrency } from '../utils/localStorage';

const BookingCard = ({ booking, onViewDetails, onCancelBooking }) => {
  const isCancelled = booking.status === 'CANCELLED';

  return (
    <div className={`booking-card ${isCancelled ? 'cancelled' : ''}`}>
      <div className="booking-card-top">
        <div>
          <h3 className="booking-card-title">{booking.serviceTitle || booking.service}</h3>
          <span className="booking-id-tag">Booking ID: {booking.id}</span>
        </div>
        <div>
          <span className={`badge ${isCancelled ? 'badge-cancelled' : 'badge-confirmed'}`}>
            {isCancelled ? <XCircle size={12} /> : <CheckCircle2 size={12} />}
            {booking.status}
          </span>
        </div>
      </div>

      <div className="booking-card-details-grid">
        <div className="detail-slot">
          <span className="slot-label">Date</span>
          <span className="slot-value">{booking.date}</span>
        </div>
        <div className="detail-slot">
          <span className="slot-label">Time</span>
          <span className="slot-value">{booking.time}</span>
        </div>
        <div className="detail-slot">
          <span className="slot-label">Attendees</span>
          <span className="slot-value">{booking.people} People</span>
        </div>
        <div className="detail-slot">
          <span className="slot-label">Booked By</span>
          <span className="slot-value">{booking.customer}</span>
        </div>
      </div>

      <div className="booking-card-bottom">
        <div className="booking-price-paid">
          <span className="price-paid-label">Total Amount</span>
          <span className="price-paid-amount">{formatCurrency(booking.amount)}</span>
        </div>

        <div className="booking-card-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onViewDetails(booking)}
          >
            <Eye size={15} />
            <span>View Details</span>
          </button>

          {!isCancelled && (
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => onCancelBooking(booking.id)}
            >
              <Ban size={15} />
              <span>Cancel Booking</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;

