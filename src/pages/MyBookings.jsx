import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarX, Plus, Sparkles, AlertCircle, CheckCircle2, Search, X } from 'lucide-react';
import { getBookings, cancelBooking } from '../utils/localStorage';
import BookingCard from '../components/BookingCard';
import ReceiptModal from '../components/ReceiptModal';
import '../styles/mybookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'CONFIRMED' | 'CANCELLED'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForReceipt, setSelectedForReceipt] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const loadData = () => {
    const list = getBookings();
    setBookings(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleConfirmCancel = () => {
    if (cancellingId) {
      cancelBooking(cancellingId);
      loadData();
      setCancellingId(null);
      setToastMessage('Booking has been cancelled successfully.');
      setTimeout(() => setToastMessage(''), 3500);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesTab =
      activeTab === 'ALL' || b.status === activeTab;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      b.id.toLowerCase().includes(q) ||
      (b.service && b.service.toLowerCase().includes(q)) ||
      (b.serviceTitle && b.serviceTitle.toLowerCase().includes(q)) ||
      (b.customer && b.customer.toLowerCase().includes(q));

    return matchesTab && matchesSearch;
  });

  const confirmedCount = bookings.filter((b) => b.status === 'CONFIRMED').length;
  const cancelledCount = bookings.filter((b) => b.status === 'CANCELLED').length;

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Toast Alert */}
        {toastMessage && (
          <div
            style={{
              background: '#fef2f2',
              color: '#991b1b',
              border: '1px solid #fecaca',
              padding: '0.85rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Header */}
        <div className="bookings-page-header">
          <div>
            <span className="section-badge">Dashboard</span>
            <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '0.35rem' }}>
              My Bookings
            </h1>
            <p className="section-subtitle" style={{ textAlign: 'left', margin: 0 }}>
              Manage your active and past reservations, download receipts, or cancel slots anytime.
            </p>
          </div>

          <Link to="/services" className="btn btn-primary">
            <Plus size={18} />
            <span>Book New Service</span>
          </Link>
        </div>

        {/* Controls Bar: Tabs & Search */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.75rem',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
        >
          {/* Status Tabs */}
          <div className="bookings-tabs">
            <button
              type="button"
              className={`booking-tab-btn ${activeTab === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveTab('ALL')}
            >
              All ({bookings.length})
            </button>
            <button
              type="button"
              className={`booking-tab-btn ${activeTab === 'CONFIRMED' ? 'active' : ''}`}
              onClick={() => setActiveTab('CONFIRMED')}
            >
              Confirmed ({confirmedCount})
            </button>
            <button
              type="button"
              className={`booking-tab-btn ${activeTab === 'CANCELLED' ? 'active' : ''}`}
              onClick={() => setActiveTab('CANCELLED')}
            >
              Cancelled ({cancelledCount})
            </button>
          </div>

          {/* Quick Search */}
          {bookings.length > 0 && (
            <div style={{ position: 'relative', width: '260px' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-light)'
                }}
              />
              <input
                type="text"
                className="form-input"
                style={{ padding: '0.5rem 0.75rem 0.5rem 2.25rem', fontSize: '0.85rem' }}
                placeholder="Search by ID or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '0.6rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-light)'
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bookings List or Empty State */}
        {filteredBookings.length > 0 ? (
          <div className="bookings-list">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onViewDetails={(b) => setSelectedForReceipt(b)}
                onCancelBooking={(id) => setCancellingId(id)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-bookings-box">
            <CalendarX className="empty-bookings-icon" />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {searchQuery
                ? 'No matching bookings found'
                : activeTab === 'CANCELLED'
                ? 'No cancelled bookings'
                : 'No bookings yet'}
            </h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
              {searchQuery
                ? `No reservations found matching "${searchQuery}". Try clearing search.`
                : 'You have not booked any services yet. Discover exciting experiences and services today!'}
            </p>
            <Link to="/services" className="btn btn-primary btn-lg">
              <Sparkles size={18} />
              <span>Explore Services</span>
            </Link>
          </div>
        )}

        {/* Receipt Details Modal */}
        {selectedForReceipt && (
          <ReceiptModal
            booking={selectedForReceipt}
            onClose={() => setSelectedForReceipt(null)}
          />
        )}

        {/* Cancellation Confirmation Modal */}
        {cancellingId && (
          <div
            className="modal-backdrop"
            onClick={() => setCancellingId(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--danger)' }}>
                <AlertCircle size={28} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Cancel Booking?
                </h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                Are you sure you want to cancel booking reference <strong>{cancellingId}</strong>? You can rebook another slot anytime.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setCancellingId(null)}
                >
                  Keep Booking
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmCancel}
                >
                  Yes, Cancel Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;

