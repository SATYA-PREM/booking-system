import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, Phone, Mail } from 'lucide-react';

const FAQS = [
  {
    q: 'How do I book a movie on MovieMagic?',
    a: 'Browse the Movies page, select your desired film, pick a convenient theatre and showtime, select your favorite seats on our interactive cinema seat map, and complete the instant demo checkout.'
  },
  {
    q: 'Can I choose specific seats and tier categories?',
    a: 'Yes! MovieMagic offers an interactive curved screen seat map. You can choose across Silver (₹180), Gold (₹220), Premium (₹280), and Recliner (₹400) tiers with real-time seat availability.'
  },
  {
    q: 'Can I cancel my booking and get a refund?',
    a: 'Yes, our cinema policy allows 100% free cancellation anytime up to 2 hours before the scheduled showtime. When you cancel from the "My Bookings" page, seats are instantly re-released and your demo refund is recorded.'
  },
  {
    q: 'How does demo payment work?',
    a: 'MovieMagic is a frontend-only platform that simulates real-time banking verification, security authorization, and digital QR ticket generation with zero real monetary transactions.'
  },
  {
    q: 'Where do I find my digital movie ticket?',
    a: 'Immediately after checkout, you are redirected to your digital ticket stub. You can also visit "My Bookings" at any time to view, print, or download your barcode voucher.'
  },
  {
    q: 'How do coupon codes work?',
    a: 'Enter active promo codes like MOVIE50 or FIRSTBOOK on the checkout screen to enjoy instant price deductions on your total bill.'
  },
  {
    q: 'Is there a limit on how many seats I can book?',
    a: 'To ensure fair seat allocation for all moviegoers, a maximum of 8 seats can be reserved in a single transaction.'
  }
];

const CustomerFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="page-wrapper container" style={{ maxWidth: '800px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="section-badge">Support Center</span>
        <h1 className="section-title">Frequently Asked Questions</h1>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Find answers to common questions about ticket bookings, seat selection, cancellations, and promo vouchers.
        </p>
      </div>

      {/* Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3.5rem' }}>
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={i}
              style={{
                background: 'var(--bg-cinema-card)',
                border: '1px solid var(--border-dark)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                transition: 'var(--transition)'
              }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>{faq.q}</span>
                <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'var(--bg-cinema-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c4b5fd', flexShrink: 0, marginLeft: '1rem' }}>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {isOpen && (
                <div style={{ padding: '0 1.5rem 1.5rem', color: 'var(--text-gray-300)', fontSize: '0.95rem', lineHeight: 1.6, borderTop: '1px solid var(--border-dark)', paddingTop: '1rem' }}>
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Box */}
      <div style={{ background: 'var(--bg-cinema-card)', border: '1px solid var(--border-dark)', borderRadius: 'var(--radius-xl)', padding: '2rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Still Have Questions?</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Our AI assistant MovieBot is available 24/7 on the bottom right corner of your screen!
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', color: '#c4b5fd', fontSize: '0.9rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Phone size={16} /> +91 1800 555 9999
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Mail size={16} /> support@moviemagic.demo
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomerFAQ;

