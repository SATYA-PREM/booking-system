import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Copy, Check, Sparkles, ShieldCheck, Ticket } from 'lucide-react';
import { getOffers } from '../../services/storage';

const CustomerOffers = () => {
  const offers = getOffers();
  const [copiedCode, setCopiedCode] = useState('');

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2500);
  };

  return (
    <div className="page-wrapper container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="section-badge">Exclusive Savings</span>
        <h1 className="section-title">Special Cinema Offers & Deals</h1>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Apply promo codes at checkout to unlock instant discounts, weekend perks, and popcorn combo vouchers.
        </p>
      </div>

      {/* Offers Grid */}
      <div className="offers-grid">
        {offers.map((offer) => {
          const isCopied = copiedCode === offer.code;

          return (
            <div
              key={offer.id}
              style={{
                background: 'var(--bg-cinema-card)',
                border: '1px solid var(--border-dark)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-cinema)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: '#c4b5fd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Tag size={22} />
                </div>
                <span className="badge badge-primary">Active Offer</span>
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>
                {offer.discountType === 'flat' ? `₹${offer.discountValue} OFF` : `${offer.discountValue}% OFF`}
              </h3>

              <p style={{ color: 'var(--text-gray-300)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                {offer.description}
              </p>

              <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-cinema-subtle)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '1.15rem', fontWeight: 800, color: '#a78bfa', letterSpacing: '0.08em' }}>
                  {offer.code}
                </span>

                <button
                  type="button"
                  onClick={() => handleCopy(offer.code)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: isCopied ? '#10b981' : 'var(--primary)',
                    color: '#fff',
                    border: 'none',
                    padding: '0.4rem 0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                >
                  {isCopied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                <span>Min Booking: ₹{offer.minAmount}</span>
                <span>Valid till: {offer.validTill}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
        <Link to="/movies" className="btn btn-primary btn-lg">
          <Ticket size={18} />
          <span>Book Tickets with Promo Codes</span>
        </Link>
      </div>
    </div>
  );
};

export default CustomerOffers;

