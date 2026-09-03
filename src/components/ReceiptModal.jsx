import React from 'react';
import { X, CheckCircle, Printer, Calendar, Clock, Users, User, Mail, Phone, CreditCard, Tag } from 'lucide-react';
import { formatCurrency } from '../utils/localStorage';

const ReceiptModal = ({ booking, onClose }) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const isCancelled = booking.status === 'CANCELLED';

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <span className="badge badge-category" style={{ marginBottom: '0.25rem' }}>
              Official Booking Receipt
            </span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Booking Summary</h3>
          </div>
          <button
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.4rem', borderRadius: '50%' }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="receipt-box" style={{ margin: '0 0 1.5rem', background: '#f8fafc' }}>
          <div className="receipt-id-row">
            <div>
              <span className="receipt-id-label">Booking Reference</span>
              <div className="receipt-id-val">{booking.id}</div>
            </div>
            <span className={`badge ${isCancelled ? 'badge-cancelled' : 'badge-confirmed'}`}>
              {booking.status}
            </span>
          </div>

          <div className="receipt-list">
            <div className="receipt-item">
              <span className="label">Service Name</span>
              <span className="value">{booking.serviceTitle || booking.service}</span>
            </div>
            <div className="receipt-item">
              <span className="label">Scheduled Date</span>
              <span className="value">{booking.date}</span>
            </div>
            <div className="receipt-item">
              <span className="label">Time Slot</span>
              <span className="value">{booking.time}</span>
            </div>
            <div className="receipt-item">
              <span className="label">Attendees / People</span>
              <span className="value">{booking.people} Person(s)</span>
            </div>
            <div className="receipt-divider" />
            <div className="receipt-item">
              <span className="label">Primary Customer</span>
              <span className="value">{booking.customer}</span>
            </div>
            <div className="receipt-item">
              <span className="label">Contact Email</span>
              <span className="value">{booking.email}</span>
            </div>
            {booking.phone && (
              <div className="receipt-item">
                <span className="label">Contact Phone</span>
                <span className="value">{booking.phone}</span>
              </div>
            )}
            {booking.specialRequests && (
              <div className="receipt-item">
                <span className="label">Special Requests</span>
                <span className="value" style={{ maxWidth: '240px', textAlign: 'right' }}>
                  {booking.specialRequests}
                </span>
              </div>
            )}
            <div className="receipt-divider" />
            <div className="receipt-item">
              <span className="label">Payment Method</span>
              <span className="value">{booking.paymentMethod || 'Demo Card'}</span>
            </div>
            <div className="receipt-total-line">
              <span>Total Paid</span>
              <span className="amount">{formatCurrency(booking.amount)}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-secondary" onClick={handlePrint}>
            <Printer size={16} /> Print Receipt
          </button>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;

