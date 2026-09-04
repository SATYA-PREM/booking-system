import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, QrCode, Wallet, Landmark, ShieldCheck, Lock, ArrowLeft, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { getCart, clearCart, createBooking, formatCurrency } from '../../services/storage';

const CustomerPayment = () => {
  const navigate = useNavigate();
  const cart = getCart();

  const [method, setMethod] = useState('card'); // 'card' | 'upi' | 'wallet' | 'netbanking'
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('123');
  const [cardHolder, setCardHolder] = useState(cart?.customer || 'Satya Prem');
  const [upiId, setUpiId] = useState('satya@okhdfcbank');

  const [paymentState, setPaymentState] = useState('idle'); // 'idle' | 'processing' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [processingStep, setProcessingStep] = useState('Connecting to payment gateway...');

  useEffect(() => {
    if (!cart || !cart.total) {
      navigate('/movies');
    }
  }, [cart, navigate]);

  if (!cart) return null;

  const handlePay = (e) => {
    e.preventDefault();
    setPaymentState('processing');
    setErrorMessage('');

    // Multi-phase progress simulation
    setTimeout(() => {
      setProcessingStep('Verifying transaction details...');
    }, 700);

    setTimeout(() => {
      setProcessingStep('Confirming cinema seat allocation...');
    }, 1400);

    setTimeout(() => {
      // Test decline check from prompt spec
      if (cardNumber.replace(/\s/g, '') === '4000000000000002') {
        setPaymentState('error');
        setErrorMessage('Payment declined by the issuing demo bank. Please try another card.');
        return;
      }

      setProcessingStep('Generating digital QR movie ticket...');

      // Save Booking to shared database
      const newBooking = createBooking({
        userId: 'USR001',
        customer: cart.customer || 'Satya Prem',
        email: cart.email || 'satya@example.com',
        phone: cart.phone || '+91 98765 43210',
        movieId: cart.movieId,
        movieTitle: cart.movieTitle,
        moviePoster: cart.moviePoster,
        theatreId: cart.theatreId,
        theatreName: cart.theatreName,
        screenName: cart.screenName,
        showId: cart.showId,
        date: cart.date,
        time: cart.time,
        format: cart.format,
        seats: cart.seats,
        seatTiers: cart.seatTiers,
        tickets: cart.tickets,
        ticketAmount: cart.ticketAmount,
        convenienceFee: cart.convenienceFee,
        tax: cart.tax,
        discount: cart.discount,
        couponCode: cart.couponCode,
        total: cart.total,
        paymentMethod: method.toUpperCase()
      });

      // Clear draft
      clearCart();
      setPaymentState('success');

      setTimeout(() => {
        navigate(`/booking-success?id=${newBooking.id}`);
      }, 900);
    }, 2200);
  };

  if (paymentState === 'processing') {
    return (
      <div className="page-wrapper container" style={{ maxWidth: '560px' }}>
        <div
          style={{
            background: 'var(--bg-cinema-card)',
            border: '1px solid var(--border-dark)',
            borderRadius: 'var(--radius-xl)',
            padding: '4rem 2rem',
            textAlign: 'center',
            boxShadow: 'var(--shadow-cinema)'
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              color: '#a78bfa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              animation: 'pulseGlow 1.8s infinite'
            }}
          >
            <Lock size={36} />
          </div>

          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>Processing Payment</h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', margin: '1.5rem 0' }}>
            <span style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '50%', animation: 'bounceDot 1.4s infinite -0.32s' }}></span>
            <span style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '50%', animation: 'bounceDot 1.4s infinite -0.16s' }}></span>
            <span style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '50%', animation: 'bounceDot 1.4s infinite 0s' }}></span>
          </div>

          <p style={{ color: '#c4b5fd', fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            {processingStep}
          </p>

          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            Please do not close or refresh this tab.
          </p>
        </div>
      </div>
    );
  }

  if (paymentState === 'success') {
    return (
      <div className="page-wrapper container" style={{ maxWidth: '560px' }}>
        <div
          style={{
            background: 'var(--bg-cinema-card)',
            border: '1px solid var(--border-dark)',
            borderRadius: 'var(--radius-xl)',
            padding: '4rem 2rem',
            textAlign: 'center',
            boxShadow: 'var(--shadow-cinema)'
          }}
        >
          <div
            style={{
              width: '75px',
              height: '75px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#34d399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              border: '2px solid rgba(16, 185, 129, 0.4)'
            }}
          >
            <CheckCircle2 size={42} />
          </div>

          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#34d399', marginBottom: '0.5rem' }}>
            ✓ Payment Successful
          </h2>
          <p style={{ color: 'var(--text-gray-300)', fontSize: '1.1rem' }}>
            Amount Paid: <strong>{formatCurrency(cart.total)}</strong>
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            Redirecting to your confirmed movie ticket voucher...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper container" style={{ maxWidth: '640px' }}>
      {/* Back Link */}
      <button
        type="button"
        className="details-back-link"
        onClick={() => navigate('/checkout')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '1.5rem', fontWeight: 600 }}
      >
        <ArrowLeft size={16} />
        <span>Back to Review</span>
      </button>

      <div
        style={{
          background: 'var(--bg-cinema-card)',
          border: '1px solid var(--border-dark)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.25rem',
          boxShadow: 'var(--shadow-cinema)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <span className="section-badge">MovieMagic Secure Gateway</span>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '0.35rem' }}>Complete Payment</h1>
        </div>

        {/* Amount Box */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(236, 72, 153, 0.15))',
            border: '1px solid rgba(124, 58, 237, 0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            textAlign: 'center',
            marginBottom: '1.75rem'
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
            Amount Payable
          </span>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#a78bfa', margin: '0.1rem 0' }}>
            {formatCurrency(cart.total)}
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-gray-300)' }}>
            {cart.movieTitle} ({cart.tickets} Tickets • {cart.seats.join(', ')})
          </span>
        </div>

        {errorMessage && (
          <div
            style={{
              background: 'var(--danger-bg)',
              color: '#f87171',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem'
            }}
          >
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Method Selector */}
        <div className="payment-methods-grid">
          {[
            { id: 'card', label: 'Card', icon: CreditCard },
            { id: 'upi', label: 'UPI Pay', icon: QrCode },
            { id: 'wallet', label: 'Wallets', icon: Wallet },
            { id: 'netbanking', label: 'Net Banking', icon: Landmark }
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = method === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setMethod(item.id)}
                style={{
                  padding: '0.85rem 0.4rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid',
                  borderColor: isSelected ? 'var(--primary)' : 'var(--border-dark)',
                  background: isSelected ? 'var(--primary-light)' : 'var(--bg-cinema-subtle)',
                  color: isSelected ? '#fff' : 'var(--text-gray-300)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'var(--transition)'
                }}
              >
                <Icon size={20} color={isSelected ? '#c4b5fd' : 'var(--text-muted)'} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{item.label}</span>
              </button>
            );
          })}
        </div>

        <form onSubmit={handlePay}>
          {method === 'card' && (
            <div>
              {/* Visual Card Mock */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  color: '#fff',
                  marginBottom: '1.75rem',
                  boxShadow: 'var(--shadow-cinema)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ width: '38px', height: '26px', background: 'linear-gradient(135deg, #fcd34d, #f59e0b)', borderRadius: '4px' }}></div>
                  <span style={{ fontStyle: 'italic', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.05em' }}>MOVIE PASS</span>
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '1.3rem', letterSpacing: '0.18em', marginBottom: '1.25rem' }}>
                  {cardNumber || '•••• •••• •••• ••••'}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', textTransform: 'uppercase', color: '#cbd5e1' }}>
                  <div>
                    <span>Cardholder</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginTop: '2px' }}>{cardHolder}</div>
                  </div>
                  <div>
                    <span>Expires</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginTop: '2px' }}>{expiry}</div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="cardNum">Card Number</label>
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
                <label className="form-label" htmlFor="holderName">Cardholder Name</label>
                <input
                  id="holderName"
                  type="text"
                  className="form-input"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="Satya Prem"
                  required
                />
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label" htmlFor="cardExp">Expiry (MM/YY)</label>
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
                  <label className="form-label" htmlFor="cardCvv">CVV Code</label>
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

          {method === 'upi' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="upiVal">Virtual Payment Address (UPI ID)</label>
                <input
                  id="upiVal"
                  type="text"
                  className="form-input"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="user@okaxis"
                  required
                />
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                You will receive a demo instant approval notification on your UPI app.
              </p>
            </div>
          )}

          {method === 'wallet' && (
            <div style={{ padding: '1.25rem', background: 'var(--bg-cinema-subtle)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--border-dark)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem' }}>MovieMagic Wallet Balance: ₹1,500</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {formatCurrency(cart.total)} will be deducted instantly from your registered cinema credits.
              </p>
            </div>
          )}

          {method === 'netbanking' && (
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Select Bank</label>
              <select className="form-select">
                <option>HDFC Bank (Instant Verification)</option>
                <option>State Bank of India</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: '0.5rem' }}>
            <Lock size={18} />
            <span>Authorize & Pay {formatCurrency(cart.total)}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerPayment;

