import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Download, Film, QrCode, Ticket, CheckCircle2 } from 'lucide-react';
import { getBookingById, formatCurrency } from '../../services/storage';
import '../../styles/ticket.css';

const CustomerTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const booking = getBookingById(id);

  if (!booking) {
    return (
      <div className="page-wrapper container" style={{ textAlign: 'center', padding: '5rem 0' }}>
        <h2>Ticket Not Found</h2>
        <Link to="/bookings" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to My Bookings
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-wrapper container ticket-page-layout">
      {/* Back Link */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button
          type="button"
          onClick={() => navigate('/bookings')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 600 }}
        >
          <ArrowLeft size={16} />
          <span>Back to My Bookings</span>
        </button>

        <button type="button" className="btn btn-primary btn-sm" onClick={handlePrint}>
          <Printer size={16} />
          <span>Print / Download Ticket</span>
        </button>
      </div>

      {/* Digital Ticket Card */}
      <div className="digital-ticket-container">
        {/* Top Header */}
        <div className="ticket-top-banner">
          <div className="ticket-brand">MOVIEMAGIC CINEMAS</div>
          <span className="ticket-status-badge">{booking.bookingStatus}</span>
        </div>

        {/* Ticket Main Body */}
        <div className="ticket-body">
          <img src={booking.moviePoster} alt={booking.movieTitle} className="ticket-poster-img" />
          
          <div className="ticket-details-col">
            <h2>{booking.movieTitle}</h2>
            <div className="ticket-theatre-txt">
              {booking.theatreName} • {booking.screenName}
            </div>

            <div className="ticket-meta-grid">
              <div className="ticket-slot">
                <span className="ticket-slot-lbl">Date</span>
                <span className="ticket-slot-val">{booking.date}</span>
              </div>

              <div className="ticket-slot">
                <span className="ticket-slot-lbl">Time</span>
                <span className="ticket-slot-val">{booking.time}</span>
              </div>

              <div className="ticket-slot">
                <span className="ticket-slot-lbl">Seats</span>
                <span className="ticket-slot-val" style={{ color: '#4f46e5' }}>{booking.seats.join(', ')}</span>
              </div>

              <div className="ticket-slot">
                <span className="ticket-slot-lbl">Format</span>
                <span className="ticket-slot-val">{booking.format}</span>
              </div>

              <div className="ticket-slot">
                <span className="ticket-slot-lbl">Booked For</span>
                <span className="ticket-slot-val">{booking.customer}</span>
              </div>

              <div className="ticket-slot">
                <span className="ticket-slot-lbl">Total Paid</span>
                <span className="ticket-slot-val">{formatCurrency(booking.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Perforated Divider */}
        <div className="ticket-perforation">
          <div className="perforated-line" />
        </div>

        {/* Bottom Ticket Stub with Barcode & QR */}
        <div className="ticket-stub-footer">
          <div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
              Booking Reference
            </span>
            <div className="ticket-id-display">{booking.id}</div>
          </div>

          {/* Barcode Visual */}
          <div style={{ textAlign: 'center' }}>
            <div className="barcode-visual">
              <div className="barcode-bar thick"></div>
              <div className="barcode-bar thin"></div>
              <div className="barcode-bar"></div>
              <div className="barcode-bar thick"></div>
              <div className="barcode-bar"></div>
              <div className="barcode-bar thin"></div>
              <div className="barcode-bar thick"></div>
              <div className="barcode-bar"></div>
              <div className="barcode-bar thin"></div>
              <div className="barcode-bar thick"></div>
            </div>
            <span style={{ fontSize: '0.65rem', color: '#64748b', fontFamily: 'monospace' }}>SCAN AT GATE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTicket;

