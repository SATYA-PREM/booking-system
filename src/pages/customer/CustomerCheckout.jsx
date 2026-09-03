import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, Tag, CheckCircle2, AlertCircle, Film, Calendar, Clock, MapPin, User, Mail, Phone } from 'lucide-react';
import { getCart, saveCart, validateCoupon, formatCurrency } from '../../services/storage';

const CustomerCheckout = () => {
  const navigate = useNavigate();
  const cart = getCart();

  const [customerName, setCustomerName] = useState('Satya Prem');
  const [email, setEmail] = useState('satya@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');

  const [couponInput, setCouponInput] = useState('');
  const [couponResult, setCouponResult] = useState(null);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!cart || !cart.seats || cart.seats.length === 0) {
      navigate('/movies');
    }
  }, [cart, navigate]);

  if (!cart) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = validateCoupon(couponInput.trim(), cart.ticketAmount);
    setCouponResult(res);

    if (res.valid) {
      const newTotal = Math.max(0, cart.ticketAmount + cart.convenienceFee + cart.tax - res.discount);
      saveCart({
        ...cart,
        discount: res.discount,
        couponCode: res.code,
        total: newTotal
      });
    }
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !email.trim() || !phone.trim()) {
      setFormError('Please fill in all contact information fields.');
      return;
    }

    const discountAmount = couponResult?.valid ? couponResult.discount : 0;
    const finalTotal = Math.max(0, cart.ticketAmount + cart.convenienceFee + cart.tax - discountAmount);

    saveCart({
      ...cart,
      customer: customerName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      discount: discountAmount,
      couponCode: couponResult?.valid ? couponResult.code : '',
      total: finalTotal
    });

    navigate('/payment');
  };

  const currentDiscount = couponResult?.valid ? couponResult.discount : (cart.discount || 0);
  const calculatedTotal = Math.max(0, cart.ticketAmount + cart.convenienceFee + cart.tax - currentDiscount);

  return (
    <div className="page-wrapper container">
      {/* Back Link */}
      <button
        type="button"
        className="details-back-link"
        onClick={() => navigate(-1)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '1.5rem', fontWeight: 600 }}
      >
        <ArrowLeft size={16} />
        <span>Back to Seat Selection</span>
      </button>

      <div style={{ marginBottom: '2rem' }}>
        <span className="section-badge">Checkout</span>
        <h1 className="section-title">Review Your Booking</h1>
        <p className="section-subtitle">Please verify your cinema showtime, seats, and contact details before payment.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
        {/* Left Column: Details & Customer Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Booking Summary Box */}
          <div style={{ background: 'var(--bg-cinema-card)', border: '1px solid var(--border-dark)', borderRadius: 'var(--radius-xl)', padding: '1.75rem', boxShadow: 'var(--shadow-cinema)' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Film size={18} color="#a78bfa" />
              <span>Show Reservation Details</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <img src={cart.moviePoster} alt={cart.movieTitle} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
              <div>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.35rem' }}>{cart.movieTitle}</h4>
                <p style={{ color: 'var(--text-gray-300)', fontSize: '0.9rem', marginBottom: '0.6rem' }}>
                  {cart.theatreName} • {cart.screenName}
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={14} color="#a78bfa" /> {cart.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={14} color="#a78bfa" /> {cart.time}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ padding: '1rem', background: 'var(--bg-cinema-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Reserved Seats</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#c4b5fd' }}>
                  {cart.seats.join(', ')} ({cart.tickets} Tickets)
                </div>
              </div>
              <span className="badge badge-primary">{cart.format}</span>
            </div>
          </div>

          {/* Contact Details Form */}
          <div style={{ background: 'var(--bg-cinema-card)', border: '1px solid var(--border-dark)', borderRadius: 'var(--radius-xl)', padding: '1.75rem', boxShadow: 'var(--shadow-cinema)' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={18} color="#a78bfa" />
              <span>Ticket Delivery & Contact Info</span>
            </h3>

            {formError && (
              <p className="form-error" style={{ marginBottom: '1rem' }}>
                <AlertCircle size={14} /> {formError}
              </p>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="custName">Full Name</label>
              <input
                id="custName"
                type="text"
                className="form-input"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="custEmail">Email Address (E-Ticket)</label>
                <input
                  id="custEmail"
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="custPhone">Phone Number (SMS Alert)</label>
                <input
                  id="custPhone"
                  type="tel"
                  className="form-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Price Summary & Coupons */}
        <div style={{ position: 'sticky', top: '5.5rem' }}>
          <div style={{ background: 'var(--bg-cinema-card)', border: '1px solid var(--border-dark)', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-cinema)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>Payment Summary</h3>

            {/* Coupon Code Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Tag size={14} color="#ec4899" />
                <span>Apply Promo Code</span>
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. MOVIE50 or FIRSTBOOK"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  style={{ textTransform: 'uppercase' }}
                />
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleApplyCoupon}
                  style={{ padding: '0.6rem 1rem' }}
                >
                  Apply
                </button>
              </div>

              {couponResult && (
                <div
                  style={{
                    marginTop: '0.6rem',
                    fontSize: '0.825rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: couponResult.valid ? '#34d399' : '#f87171'
                  }}
                >
                  {couponResult.valid ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                  <span>
                    {couponResult.valid
                      ? `Coupon applied! You saved ${formatCurrency(couponResult.discount)}`
                      : couponResult.message}
                  </span>
                </div>
              )}
            </div>

            {/* Price Line Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: '1.25rem 0', borderTop: '1px solid var(--border-dark)', borderBottom: '1px solid var(--border-dark)', fontSize: '0.925rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Base Tickets ({cart.tickets}x)</span>
                <span>{formatCurrency(cart.ticketAmount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Convenience Fee</span>
                <span>{formatCurrency(cart.convenienceFee)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>GST Tax (18%)</span>
                <span>{formatCurrency(cart.tax)}</span>
              </div>
              {currentDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399', fontWeight: 700 }}>
                  <span>Promo Discount ({cart.couponCode || couponResult?.code})</span>
                  <span>- {formatCurrency(currentDiscount)}</span>
                </div>
              )}
            </div>

            {/* Total Payable */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.75rem' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 800 }}>Total Payable</span>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#a78bfa' }}>
                {formatCurrency(calculatedTotal)}
              </span>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block btn-lg"
              onClick={handleProceedToPayment}
            >
              <span>Proceed to Payment</span>
              <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              <ShieldCheck size={14} color="#34d399" />
              <span>Safe & Secure 256-Bit SSL Demo Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCheckout;

