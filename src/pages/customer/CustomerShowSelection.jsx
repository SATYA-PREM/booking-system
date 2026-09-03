import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Star, ShieldCheck, Ticket, Sparkles } from 'lucide-react';
import { getMovieById, getMovies, getTheatres, getShows, getScreens } from '../../services/storage';

const CustomerShowSelection = () => {
  const { movieId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const allMovies = getMovies();
  const allTheatres = getTheatres();
  const allShows = getShows();
  const allScreens = getScreens();

  // Active movie (either from URL param or first now-showing movie)
  const activeMovie = movieId ? getMovieById(movieId) : allMovies[0];

  // Dynamic next 6 dates
  const dates = useMemo(() => {
    const list = [];
    const base = new Date();
    for (let i = 0; i < 6; i++) {
      const d = new Date();
      d.setDate(base.getDate() + i);
      const iso = d.toISOString().slice(0, 10);
      const label = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
      list.push({ iso, label, day: d.getDate(), month: d.toLocaleDateString('en-US', { month: 'short' }) });
    }
    return list;
  }, []);

  const [selectedDate, setSelectedDate] = useState(dates[0].iso);

  if (!activeMovie) {
    return (
      <div className="page-wrapper container" style={{ textAlign: 'center', padding: '5rem 0' }}>
        <h2>Movie Not Found</h2>
        <Link to="/movies" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Select a Movie
        </Link>
      </div>
    );
  }

  // Shows for this movie on the selected date
  const showsForMovie = allShows.filter((s) => s.movieId === activeMovie.id);

  // Group shows by Theatre
  const theatreGrouped = useMemo(() => {
    return allTheatres.map((theatre) => {
      const showsInTheatre = showsForMovie.filter((s) => s.theatreId === theatre.id);
      return {
        ...theatre,
        shows: showsInTheatre
      };
    }).filter((t) => t.shows.length > 0 || true); // keep active theatres visible with fallback shows
  }, [allTheatres, showsForMovie]);

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
        <span>Back to Movie Details</span>
      </button>

      {/* Selected Movie Header Card */}
      <div
        style={{
          background: 'var(--bg-cinema-card)',
          border: '1px solid var(--border-dark)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: 'var(--shadow-cinema)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <img
            src={activeMovie.poster}
            alt={activeMovie.title}
            style={{ width: '60px', height: '85px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
          />
          <div>
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-rating" style={{ fontSize: '0.65rem' }}>{activeMovie.certification}</span>
              <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{activeMovie.language}</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{activeMovie.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {activeMovie.genre.join(', ')} • {activeMovie.duration}
            </p>
          </div>
        </div>

        <Link to="/movies" className="btn btn-secondary btn-sm">
          Change Movie
        </Link>
      </div>

      {/* Date Selector Tabs */}
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem' }}>Select Date</h3>
        <div className="date-selector-bar">
          {dates.map((d) => (
            <button
              key={d.iso}
              type="button"
              className={`date-tab-pill ${selectedDate === d.iso ? 'active' : ''}`}
              onClick={() => setSelectedDate(d.iso)}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{d.label}</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0.1rem 0' }}>{d.day}</span>
              <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{d.month}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Shows grouped by Multiplex */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Available Cinemas & Showtimes</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {theatreGrouped.map((theatre) => {
          // Fallback demo showtimes if specific shows are sparse
          const theatreShows = theatre.shows.length > 0 ? theatre.shows : [
            { id: `SHOW-${theatre.id}-1`, time: '11:00 AM', format: '2D', status: 'available', ticketPrice: activeMovie.basePrice },
            { id: `SHOW-${theatre.id}-2`, time: '02:30 PM', format: 'IMAX', status: 'filling-fast', ticketPrice: activeMovie.basePrice + 50 },
            { id: `SHOW-${theatre.id}-3`, time: '06:15 PM', format: 'IMAX', status: 'filling-fast', ticketPrice: activeMovie.basePrice + 50 },
            { id: `SHOW-${theatre.id}-4`, time: '09:45 PM', format: 'Dolby Atmos', status: 'available', ticketPrice: activeMovie.basePrice + 30 }
          ];

          return (
            <div key={theatre.id} className="theatre-show-card">
              <div className="theatre-header-row">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{theatre.name}</h4>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#fbbf24', fontSize: '0.8rem', fontWeight: 700 }}>
                      <Star size={13} fill="#fbbf24" /> {theatre.rating}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <MapPin size={13} style={{ display: 'inline', marginRight: '3px' }} />
                    {theatre.location} • <span style={{ color: '#a78bfa' }}>{theatre.distance}</span>
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {theatre.facilities.slice(0, 3).map((f) => (
                    <span key={f} className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Showtimes Row */}
              <div className="shows-grid-row">
                {theatreShows.map((show) => {
                  const statusClass =
                    show.status === 'sold-out'
                      ? 'status-sold-out'
                      : show.status === 'filling-fast'
                      ? 'status-filling-fast'
                      : 'status-available';

                  const statusTxt =
                    show.status === 'sold-out'
                      ? '● Sold Out'
                      : show.status === 'filling-fast'
                      ? '● Filling Fast'
                      : '● Available';

                  return (
                    <Link
                      key={show.id}
                      to={`/seats/${show.id}?movieId=${activeMovie.id}&theatreId=${theatre.id}&date=${selectedDate}&time=${encodeURIComponent(show.time)}&format=${show.format}&price=${show.ticketPrice}`}
                      className={`showtime-chip ${show.status === 'sold-out' ? 'disabled' : ''}`}
                    >
                      <span className="time-txt">{show.time}</span>
                      <span style={{ fontSize: '0.7rem', color: '#c4b5fd', fontWeight: 600 }}>{show.format}</span>
                      <span className={`status-dot-txt ${statusClass}`}>{statusTxt}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerShowSelection;

