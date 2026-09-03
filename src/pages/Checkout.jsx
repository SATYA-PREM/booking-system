import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Edit3, ArrowRight, ShieldCheck, CheckCircle2, User, Mail, Phone, Calendar, Clock, Users } from 'lucide-react';
import { getDraft, formatCurrency } from '../utils/localStorage';
import '../styles/checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const draft = getDraft();

  useEffect(() => {
    if (!draft || !draft.serviceId) {
      navigate('/services');
    }
  }, [draft, navigate]);

  if (!draft) return null;

  const {
    serviceId,
    service,
    serviceTitle,
    category,
    unitPrice,
    people,
    subtotal,
    bookingFee,
    totalAmount,
    date,
    time,
    customer,
    email,
    phone,
    specialRequests
  } = draft;

  const handleEdit = () => {
    navigate(`/booking/${serviceId}`);
  };

  const handleProceed = () => {
    navigate('/payment');
  };

  return (
    <div className="page-wrapper">
      <div className="container checkout-layout">
        <div className="checkout-card">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="section-badge">Booking Step 2 of 2</span>
            <h1 className="checkout-title">Review Your Booking</h1>
            <p className="checkout-subtitle">
              Please double check your reservation details and cost breakdown before proceeding to payment.
            </p>
          </div>

          {/* Service & Schedule Details */}
          <h2 className="review-section-title">
            <Calendar size={18} color="var(--primary)" />
            <span>Service & Schedule</span>
          </h2>
          <div className="review-grid">
            <div className="review-item">
              <span className="review-label">Service</span>
              <span className="review-value">{serviceTitle || service}</span>
            </div>
            <div className="review-item">
              <span className="review-label">Category</span>
              <span className="review-value">{category}</span>
            </div>
            <div className="review-item">
              <span className="review-label">Date</span>
              <span className="review-value">{date}</span>
            </div>
            <div className="review-item">
              <span className="review-label">Time</span>
              <span className="review-value">{time}</span>
            </div>
          </div>

          {/* Customer Details */}
          <h2 className="review-section-title">
            <User size={18} color="var(--primary)" />
            <span>Customer Information</span>
          </h2>
          <div className="review-grid">
            <div className="review-item">
              <span className="review-label">Customer Name</span>
              <span className="review-value">{customer}</span>
            </div>
            <div className="review-item">
              <span className="review-label">Attendees / People</span>
              <span className="review-value">{people} Person(s)</span>
            </div>
            <div className="review-item">
              <span className="review-label">Email Address</span>
              <span className="review-value">{email}</span>
            </div>
            <div className="review-item">
              <span className="review-label">Phone Number</span>
              <span className="review-value">{phone}</span>
            </div>
            {specialRequests && (
              <div className="review-item" style={{ gridColumn: '1 / -1' }}>
                <span className="review-label">Special Requests</span>
                <span className="review-value" style={{ fontWeight: 500, fontSize: '0.95rem' }}>
                  {specialRequests}
                </span>
              </div>
            )}
          </div>

          {/* Pricing Breakdown */}
          <h2 className="review-section-title">
            <ShieldCheck size={18} color="var(--primary)" />
            <span>Price Breakdown</span>
          </h2>
          <div className="price-breakdown-card">
            <div className="price-line">
              <span>Service Base Price</span>
              <span>{formatCurrency(unitPrice)}</span>
            </div>
            <div className="price-line">
              <span>People × {people}</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="price-line">
              <span>Booking & Platform Fee</span>
              <span>{formatCurrency(bookingFee)}</span>
            </div>
            <div className="price-line divider total">
              <span>Total Payable</span>
              <span className="total-amount">{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="checkout-actions-row">
            <button type="button" className="btn btn-secondary btn-lg" onClick={handleEdit}>
              <Edit3 size={16} />
              <span>Edit Booking</span>
            </button>

            <button type="button" className="btn btn-primary btn-lg" onClick={handleProceed}>
              <span>Proceed to Payment</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

