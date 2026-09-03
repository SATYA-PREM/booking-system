import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, Ticket, AlertCircle, Sparkles } from 'lucide-react';
import { getShowSeats, getMovieById, getTheatreById, saveCart, formatCurrency, SEAT_TIERS } from '../../services/storage';
import '../../styles/seatmap.css';

const CustomerSeatSelection = () => {
  const { showId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const movieId = searchParams.get('movieId') || 'MOV001';
  const theatreId = searchParams.get('theatreId') || 'TH001';
  const date = searchParams.get('date') || new Date().toISOString().slice(0, 10);
  const time = searchParams.get('time') || '05:30 PM';
  const format = searchParams.get('format') || 'IMAX';

  const movie = getMovieById(movieId);
  const theatre = getTheatreById(theatreId);

  const [seatsMap, setSeatsMap] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const matrix = getShowSeats(showId);
    setSeatsMap(matrix);
  }, [showId]);

  if (!movie || !theatre) {
    return (
      <div className="page-wrapper container" style={{ textAlign: 'center', padding: '5rem 0' }}>
        <h2>Invalid Show Selection</h2>
        <Link to="/movies" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Movies
        </Link>
      </div>
    );
  }

  const getTierForSeat = (seatCode) => {
    const row = seatCode[0];
    for (const [key, tier] of Object.entries(SEAT_TIERS)) {
      if (tier.rows.includes(row)) return tier;
    }
    return SEAT_TIERS.Silver;
  };

  const handleSeatClick = (seatCode) => {
    const state = seatsMap[seatCode];
    if (state === 'occupied') return;

    if (selectedSeats.includes(seatCode)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatCode));
      setErrorMsg('');
    } else {
      if (selectedSeats.length >= 8) {
        setErrorMsg('Maximum 8 seats allowed per booking.');
        return;
      }
      setSelectedSeats([...selectedSeats, seatCode]);
      setErrorMsg('');
    }
  };

  // Price calculations
  const priceCalculation = useMemo(() => {
    let subtotal = 0;
    const breakdown = [];

    selectedSeats.forEach((s) => {
      const tier = getTierForSeat(s);
      subtotal += tier.price;
      breakdown.push({ seat: s, tier: tier.name, price: tier.price });
    });

    const convenienceFee = selectedSeats.length > 0 ? 40 : 0;
    const gst = selectedSeats.length > 0 ? 24 : 0;
    const total = subtotal + convenienceFee + gst;

    return { subtotal, convenienceFee, gst, total, breakdown };
  }, [selectedSeats]);

  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) {
      setErrorMsg('Please pick at least one seat to proceed.');
      return;
    }

    const cartData = {
      showId,
      movieId: movie.id,
      movieTitle: movie.title,
      moviePoster: movie.poster,
      theatreId: theatre.id,
      theatreName: theatre.name,
      screenName: format === 'IMAX' ? 'Screen 1 (IMAX)' : 'Screen 2 (Dolby Atmos)',
      date,
      time,
      format,
      seats: selectedSeats,
      seatTiers: selectedSeats.map((s) => getTierForSeat(s).name),
      tickets: selectedSeats.length,
      ticketAmount: priceCalculation.subtotal,
      convenienceFee: priceCalculation.convenienceFee,
      tax: priceCalculation.gst,
      discount: 0,
      couponCode: '',
      total: priceCalculation.total
    };

    saveCart(cartData);
    navigate('/checkout');
  };

  // Seat Rows configuration
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const cols = 10;

  return (
    <div className="page-wrapper container">
      {/* Back Link */}
      <button
        type="button"
        className="details-back-link"
        onClick={() => navigate(-1)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '1.25rem', fontWeight: 600 }}
      >
        <ArrowLeft size={16} />
        <span>Back to Shows</span>
      </button>

      {/* Show Context Banner */}
      <div
        style={{
          background: 'var(--bg-cinema-card)',
          border: '1px solid var(--border-dark)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{movie.title}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {theatre.name} • {date} • <strong style={{ color: '#c4b5fd' }}>{time}</strong> ({format})
          </p>
        </div>
        <span className="badge badge-primary">{format} Experience</span>
      </div>

      {errorMsg && (
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
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="seat-selection-layout">
        {/* Seat Map Area */}
        <div className="seat-map-card">
          {/* Cinema Screen Curve */}
          <div className="screen-area">
            <div className="screen-curve" />
            <span className="screen-label">ALL EYES THIS WAY • SCREEN</span>
          </div>

          {/* Seat Legend */}
          <div className="seat-legend">
            <div className="legend-item">
              <div className="legend-box avail" />
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="legend-box selected" />
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <div className="legend-box occupied" />
              <span>Occupied</span>
            </div>
          </div>

          {/* Tier Groups */}
          {/* Recliner (Row G) */}
          <div className="tier-section">
            <div className="tier-header">
              <span style={{ color: '#f472b6' }}>Recliner Luxe (₹400)</span>
              <span>Ultra Luxury Recliner</span>
            </div>
            <div className="seat-row">
              <span className="row-letter">G</span>
              {Array.from({ length: cols }, (_, i) => i + 1).map((c) => {
                const code = `G${c}`;
                const isSelected = selectedSeats.includes(code);
                const isOcc = seatsMap[code] === 'occupied';
                return (
                  <button
                    key={code}
                    type="button"
                    className={`seat-item ${isOcc ? 'occupied' : isSelected ? 'selected' : 'available'}`}
                    onClick={() => handleSeatClick(code)}
                    disabled={isOcc}
                    title={`${code} - Recliner (₹400)`}
                  >
                    {c}
                  </button>
                );
              })}
              <span className="row-letter">G</span>
            </div>
          </div>

          {/* Premium (Rows E, F) */}
          <div className="tier-section">
            <div className="tier-header">
              <span style={{ color: '#a78bfa' }}>Premium Class (₹280)</span>
              <span>Prime Center View</span>
            </div>
            {['E', 'F'].map((r) => (
              <div key={r} className="seat-row">
                <span className="row-letter">{r}</span>
                {Array.from({ length: cols }, (_, i) => i + 1).map((c) => {
                  const code = `${r}${c}`;
                  const isSelected = selectedSeats.includes(code);
                  const isOcc = seatsMap[code] === 'occupied';
                  return (
                    <button
                      key={code}
                      type="button"
                      className={`seat-item ${isOcc ? 'occupied' : isSelected ? 'selected' : 'available'}`}
                      onClick={() => handleSeatClick(code)}
                      disabled={isOcc}
                      title={`${code} - Premium (₹280)`}
                    >
                      {c}
                    </button>
                  );
                })}
                <span className="row-letter">{r}</span>
              </div>
            ))}
          </div>

          {/* Gold (Rows C, D) */}
          <div className="tier-section">
            <div className="tier-header">
              <span style={{ color: '#fbbf24' }}>Gold Tier (₹220)</span>
              <span>Elevated Angle</span>
            </div>
            {['C', 'D'].map((r) => (
              <div key={r} className="seat-row">
                <span className="row-letter">{r}</span>
                {Array.from({ length: cols }, (_, i) => i + 1).map((c) => {
                  const code = `${r}${c}`;
                  const isSelected = selectedSeats.includes(code);
                  const isOcc = seatsMap[code] === 'occupied';
                  return (
                    <button
                      key={code}
                      type="button"
                      className={`seat-item ${isOcc ? 'occupied' : isSelected ? 'selected' : 'available'}`}
                      onClick={() => handleSeatClick(code)}
                      disabled={isOcc}
                      title={`${code} - Gold (₹220)`}
                    >
                      {c}
                    </button>
                  );
                })}
                <span className="row-letter">{r}</span>
              </div>
            ))}
          </div>

          {/* Silver (Rows A, B) */}
          <div className="tier-section">
            <div className="tier-header">
              <span style={{ color: '#94a3b8' }}>Silver Tier (₹180)</span>
              <span>Front Area</span>
            </div>
            {['A', 'B'].map((r) => (
              <div key={r} className="seat-row">
                <span className="row-letter">{r}</span>
                {Array.from({ length: cols }, (_, i) => i + 1).map((c) => {
                  const code = `${r}${c}`;
                  const isSelected = selectedSeats.includes(code);
                  const isOcc = seatsMap[code] === 'occupied';
                  return (
                    <button
                      key={code}
                      type="button"
                      className={`seat-item ${isOcc ? 'occupied' : isSelected ? 'selected' : 'available'}`}
                      onClick={() => handleSeatClick(code)}
                      disabled={isOcc}
                      title={`${code} - Silver (₹180)`}
                    >
                      {c}
                    </button>
                  );
                })}
                <span className="row-letter">{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Booking Summary Sidebar */}
        <div className="seat-summary-card">
          <div className="summary-movie-info">
            <img src={movie.poster} alt={movie.title} className="summary-thumb" />
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.25rem' }}>{movie.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.35 }}>
                {theatre.name} <br />
                {date} • {time}
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Selected Seats ({selectedSeats.length})
            </span>
            {selectedSeats.length > 0 ? (
              <div className="selected-seats-badge-list">
                {selectedSeats.map((s) => (
                  <span key={s} className="seat-pill-tag">
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: '0.35rem' }}>
                No seats selected yet. Click any seat on the map.
              </p>
            )}
          </div>

          {/* Pricing Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem 0', borderTop: '1px solid var(--border-dark)', borderBottom: '1px solid var(--border-dark)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Tickets ({selectedSeats.length})</span>
              <span>{formatCurrency(priceCalculation.subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Convenience Fee</span>
              <span>{formatCurrency(priceCalculation.convenienceFee)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Integrated Taxes (GST)</span>
              <span>{formatCurrency(priceCalculation.gst)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>Total Payable:</span>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#a78bfa' }}>
              {formatCurrency(priceCalculation.total)}
            </span>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block btn-lg"
            onClick={handleProceedToCheckout}
            disabled={selectedSeats.length === 0}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            <ShieldCheck size={14} color="#34d399" />
            <span>Seats are locked exclusively for your order</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSeatSelection;

