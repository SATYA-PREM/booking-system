import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, QrCode, Banknote, ShieldAlert, ArrowLeft, CheckCircle2, Lock } from 'lucide-react';
import { getDraft, clearDraft, saveBooking, generateBookingId, formatCurrency } from '../utils/localStorage';
import '../styles/payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const draft = getDraft();

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'cash'
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('123');
  const [cardHolder, setCardHolder] = useState(draft?.customer || 'Satya Prem');
  const [upiId, setUpiId] = useState('satya@okhdfcbank');

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!draft || !draft.totalAmount) {
      navigate('/services');
    }
  }, [draft, navigate]);

  if (!draft) return null;

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate 2.5s processing network delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      const bookingId = generateBookingId(draft.date);
      const newBooking = {
        id: bookingId,
        serviceId: draft.serviceId,
        service: draft.service,
        serviceTitle: draft.serviceTitle,
        category: draft.category,
        date: draft.date,
        time: draft.time,
        people: draft.people,
        customer: draft.customer,
        email: draft.email,
        phone: draft.phone,
        specialRequests: draft.specialRequests,
        unitPrice: draft.unitPrice,
        subtotal: draft.subtotal,
        bookingFee: draft.bookingFee,
        amount: draft.totalAmount,
        paymentMethod: paymentMethod.toUpperCase(),
        paymentId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toISOString(),
        status: 'CONFIRMED'
      };

      // Save to localStorage
      saveBooking(newBooking);
      // Clear current draft
      clearDraft();

      // Brief flash of Success then navigate to /booking-success with saved booking ID
      setTimeout(() => {
        navigate(`/booking-success?id=${bookingId}`);
      }, 700);
    }, 2400);
  };

  if (isProcessing) {
    return (
      <div className="page-wrapper">
        <div className="container payment-layout">
          <div className="payment-card payment-processing-wrap">
            <div className="processing-pulse-ring">
              <Lock size={36} />
            </div>

            <h2 className="processing-title">Processing Payment...</h2>
            
            <div className="dots-loader">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>

            <p className="processing-sub">
              Please wait while we verify your demo transaction with the secure gateway.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="page-wrapper">
        <div className="container payment-layout">
          <div className="payment-card payment-processing-wrap">
            <div className="success-icon-badge" style={{ margin: '0 auto 1.5rem' }}>
              <CheckCircle2 size={40} />
            </div>
            <h2 className="success-title" style={{ color: 'var(--success)' }}>
              ✓ Payment Successful
            </h2>
            <p className="processing-sub">Generating your confirmed booking receipt...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container payment-layout">
        {/* Back Link */}
        <button
          type="button"
          className="details-back-link"
          onClick={() => navigate('/checkout')}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Review</span>
        </button>

        <div className="payment-card">
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span className="section-badge">Demo Payment Gateway</span>
            <h1 className="checkout-title" style={{ fontSize: '1.75rem' }}>
              Complete Payment
            </h1>
          </div>

          {/* Amount Box */}
          <div className="payment-amount-box">
            <div className="amount-label">Payable Amount</div>
            <div className="amount-value">{formatCurrency(draft.totalAmount)}</div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              For {draft.serviceTitle || draft.service} ({draft.people} Person(s))
            </span>
          </div>

          <div className="demo-notice">
            <ShieldAlert size={18} style={{ flexShrink: 0 }} />
            <span>
              <strong>Simulation Mode:</strong> This is a demo payment screen. No real money or actual card credentials are required.
            </span>
          </div>

          {/* Method Selection Tabs */}
          <div className="methods-selector">
            <button
              type="button"
              className={`method-option ${paymentMethod === 'card' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('card')}
            >
              <CreditCard size={22} />
              <span className="method-name">Credit / Debit Card</span>
            </button>

            <button
              type="button"
              className={`method-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('upi')}
            >
              <QrCode size={22} />
              <span className="method-name">UPI / QR Pay</span>
            </button>

            <button
              type="button"
              className={`method-option ${paymentMethod === 'cash' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('cash')}
            >
              <Banknote size={22} />
              <span className="method-name">Cash on Service</span>
            </button>
          </div>

          {/* Payment Method Inputs */}
          <form onSubmit={handlePay}>
            {paymentMethod === 'card' && (
              <div>
                {/* Visual Card Preview */}
                <div className="card-visual-preview">
                  <div className="card-chip-row">
                    <div className="card-chip"></div>
                    <span className="card-type-brand">VISA / MASTER</span>
                  </div>
                  <div className="card-number-display">{cardNumber || '•••• •••• •••• ••••'}</div>
                  <div className="card-meta-row">
                    <div>
                      <span>Cardholder</span>
                      <div className="card-holder-name">{cardHolder || 'CARD HOLDER'}</div>
                    </div>
                    <div>
                      <span>Expires</span>
                      <div className="card-exp-date">{expiry || 'MM/YY'}</div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cardNum">
                    Card Number
                  </label>
                  <input
                    id="cardNum"
                    type="text"
                    className="form-input"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cardName">
                    Cardholder Name
                  </label>
                  <input
                    id="cardName"
                    type="text"
                    className="form-input"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Name on card"
                    required
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cardExp">
                      Expiry (MM/YY)
                    </label>
                    <input
                      id="cardExp"
                      type="text"
                      className="form-input"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="12/28"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="cardCvv">
                      CVV
                    </label>
                    <input
                      id="cardCvv"
                      type="password"
                      maxLength={4}
                      className="form-input"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div>
                <div className="form-group">
                  <label className="form-label" htmlFor="upi">
                    Enter UPI ID (VPA)
                  </label>
                  <input
                    id="upi"
                    type="text"
                    className="form-input"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@okhdfcbank"
                    required
                  />
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  A simulation payment request of <strong>{formatCurrency(draft.totalAmount)}</strong> will be authorized instantly.
                </p>
              </div>
            )}

            {paymentMethod === 'cash' && (
              <div style={{ background: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--border-light)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Pay on Service Delivery
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  You can pay <strong>{formatCurrency(draft.totalAmount)}</strong> directly to our partner via cash, UPI, or card on the day of your booking ({draft.date} at {draft.time}).
                </p>
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: '1rem' }}>
              <Lock size={18} />
              <span>Pay {formatCurrency(draft.totalAmount)}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;

