import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Sparkles, ArrowRight, Play, Ticket, ShieldCheck, Zap, Star, Clapperboard, Calendar } from 'lucide-react';
import { getMovies } from '../../services/storage';
import MovieCard from '../../components/customer/MovieCard';
import TrailerModal from '../../components/customer/TrailerModal';

const CustomerHome = () => {
  const navigate = useNavigate();
  const movies = getMovies();
  const [searchQuery, setSearchQuery] = useState('');
  const [trailerMovie, setTrailerMovie] = useState(null);

  const nowShowing = movies.filter((m) => m.status === 'now-showing');
  const comingSoon = movies.filter((m) => m.status === 'coming-soon');

  const featuredMovie = nowShowing[0] || movies[0];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div>
      {/* Cinematic Hero */}
      <section
        className="customer-hero"
        style={{ backgroundImage: `url(${featuredMovie.backdrop})` }}
      >
        <div className="hero-backdrop-gradient" />

        <div className="container hero-content">
          <div className="section-badge">
            <Sparkles size={14} />
            <span>MovieMagic • Premier Multiplex Network</span>
          </div>

          <h1 className="hero-title">
            The Best Movie <br />
            <span className="gradient-text">Experience Awaits</span>
          </h1>

          <p className="hero-desc">
            Book your movie tickets, pick your favorite seats with our interactive seat map, and enjoy the show without waiting in queues.
          </p>

          {/* Quick Search on Hero */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              display: 'flex',
              gap: '0.5rem',
              maxWidth: '520px',
              background: 'rgba(17, 24, 39, 0.9)',
              padding: '0.4rem',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--border-light)',
              marginBottom: '2rem',
              boxShadow: 'var(--shadow-cinema)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '1rem', color: 'var(--text-muted)' }}>
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search movies, actors, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)', padding: '0.6rem 1.25rem' }}>
              <span>Search</span>
            </button>
          </form>

          {/* Hero CTAs & Trailer Trigger */}
          <div className="hero-actions-bar">
            <Link to="/movies" className="btn btn-primary btn-lg">
              <Ticket size={18} />
              <span>Book Tickets</span>
            </Link>

            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={() => setTrailerMovie(featuredMovie)}
            >
              <Play size={18} fill="#fff" />
              <span>Watch Trailer</span>
            </button>
          </div>

          {/* Floating Stats */}
          <div className="floating-stats-row">
            <div className="floating-stat-item">
              <span className="floating-stat-val">127+</span>
              <span className="floating-stat-lbl">Shows Today</span>
            </div>
            <div style={{ width: '1px', height: '35px', background: 'var(--border-dark)' }}></div>
            <div className="floating-stat-item">
              <span className="floating-stat-val">24</span>
              <span className="floating-stat-lbl">Theatres</span>
            </div>
            <div style={{ width: '1px', height: '35px', background: 'var(--border-dark)' }}></div>
            <div className="floating-stat-item">
              <span className="floating-stat-val">4.9 ★</span>
              <span className="floating-stat-lbl">Avg Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Now Showing Section */}
      <section className="page-wrapper container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <span className="section-badge">In Theatres</span>
            <h2 className="section-title">Now Showing</h2>
            <p className="section-subtitle">Catch the latest blockbusters on the big screen with Dolby Atmos and IMAX.</p>
          </div>
          <Link to="/movies" className="btn btn-outline btn-sm">
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="movies-grid">
          {nowShowing.slice(0, 8).map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onWatchTrailer={() => setTrailerMovie(movie)}
            />
          ))}
        </div>
      </section>

      {/* Coming Soon Section */}
      {comingSoon.length > 0 && (
        <section style={{ background: '#0a0f1d', padding: '4rem 0', borderTop: '1px solid var(--border-dark)', borderBottom: '1px solid var(--border-dark)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
              <div>
                <span className="section-badge" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', borderColor: 'rgba(236, 72, 153, 0.3)' }}>
                  Advance Booking
                </span>
                <h2 className="section-title">Coming Soon</h2>
                <p className="section-subtitle">Upcoming releases and anticipated cinematic events.</p>
              </div>
              <Link to="/movies?status=coming-soon" className="btn btn-outline btn-sm">
                <span>Explore All</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="movies-grid">
              {comingSoon.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onWatchTrailer={() => setTrailerMovie(movie)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose MovieMagic */}
      <section className="page-wrapper container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-badge">Cinema Excellence</span>
          <h2 className="section-title">The Ultimate Moviegoing Experience</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Enjoy premium multiplex audio-visual tech, seamless mobile booking, and guaranteed transparent pricing.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
          <div style={{ background: 'var(--bg-cinema-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-dark)', textAlign: 'center' }}>
            <div style={{ width: '3.5rem', height: '3.5rem', background: 'var(--primary-light)', color: '#a78bfa', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <Clapperboard size={28} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.6rem' }}>IMAX & Dolby Atmos</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Immerse yourself with crystal-clear laser projection, 3D surround audio, and ultra-high-definition screens.
            </p>
          </div>

          <div style={{ background: 'var(--bg-cinema-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-dark)', textAlign: 'center' }}>
            <div style={{ width: '3.5rem', height: '3.5rem', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <Zap size={28} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.6rem' }}>Instant Seat Selection</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Pick your exact seats across Silver, Gold, Premium, and Recliner tiers with real-time occupancy updates.
            </p>
          </div>

          <div style={{ background: 'var(--bg-cinema-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-dark)', textAlign: 'center' }}>
            <div style={{ width: '3.5rem', height: '3.5rem', background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <ShieldCheck size={28} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.6rem' }}>Easy Cancellation</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Plans changed? Cancel your ticket easily anytime up to 2 hours before the show with 100% instant refund.
            </p>
          </div>
        </div>
      </section>

      {/* Trailer Video Modal */}
      {trailerMovie && (
        <TrailerModal
          movie={trailerMovie}
          onClose={() => setTrailerMovie(null)}
        />
      )}
    </div>
  );
};

export default CustomerHome;

