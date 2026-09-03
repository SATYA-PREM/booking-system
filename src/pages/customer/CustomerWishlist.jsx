import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Film, ArrowRight, Trash2 } from 'lucide-react';
import { getWishlist, getMovies, toggleWishlist } from '../../services/storage';
import MovieCard from '../../components/customer/MovieCard';
import TrailerModal from '../../components/customer/TrailerModal';

const CustomerWishlist = () => {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [trailerMovie, setTrailerMovie] = useState(null);
  const movies = getMovies();

  const loadData = () => {
    const list = getWishlist();
    setWishlistIds(list);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('moviemagic_state_change', loadData);
    return () => window.removeEventListener('moviemagic_state_change', loadData);
  }, []);

  const wishlistMovies = movies.filter((m) => wishlistIds.includes(m.id));

  return (
    <div className="page-wrapper container">
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="section-badge" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', borderColor: 'rgba(236, 72, 153, 0.3)' }}>
          Saved Movies
        </span>
        <h1 className="section-title">My Watchlist ({wishlistMovies.length})</h1>
        <p className="section-subtitle">
          Keep track of upcoming releases and your favorite titles to book seats the moment booking goes live.
        </p>
      </div>

      {wishlistMovies.length > 0 ? (
        <div className="movies-grid">
          {wishlistMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onWatchTrailer={() => setTrailerMovie(movie)}
            />
          ))}
        </div>
      ) : (
        <div style={{ background: 'var(--bg-cinema-card)', padding: '4.5rem 2rem', borderRadius: 'var(--radius-xl)', textAlign: 'center', border: '1px dashed var(--border-light)' }}>
          <Heart size={48} style={{ color: '#f472b6', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Your Watchlist Is Empty</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
            Click the heart icon on any movie poster to bookmark it for fast showtime booking.
          </p>
          <Link to="/movies" className="btn btn-primary btn-lg">
            <span>Discover Blockbusters</span>
          </Link>
        </div>
      )}

      {trailerMovie && (
        <TrailerModal
          movie={trailerMovie}
          onClose={() => setTrailerMovie(null)}
        />
      )}
    </div>
  );
};

export default CustomerWishlist;

