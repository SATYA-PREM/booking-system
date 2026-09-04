import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Heart, Play, Ticket, Bell } from 'lucide-react';
import { getWishlist, toggleWishlist, formatCurrency } from '../../services/storage';

const MovieCard = ({ movie, onWatchTrailer }) => {
  const {
    id,
    title,
    genre = [],
    duration,
    rating,
    certification,
    poster,
    basePrice,
    status
  } = movie;

  const [inWishlist, setInWishlist] = React.useState(false);

  React.useEffect(() => {
    const list = getWishlist();
    setInWishlist(list.includes(id));
  }, [id]);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = toggleWishlist(id);
    setInWishlist(updated.includes(id));
  };

  const isComingSoon = status === 'coming-soon';

  return (
    <div className="movie-card">
      <div className="poster-wrap">
        <img src={poster} alt={title} className="poster-img" loading="lazy" />

        <div className="poster-overlay-top">
          <span className="badge badge-rating" style={{ fontSize: '0.7rem' }}>
            {certification}
          </span>
          <button
            type="button"
            className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
            onClick={handleWishlistClick}
            title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label="Wishlist toggle"
          >
            <Heart size={14} fill={inWishlist ? '#fff' : 'none'} />
          </button>
        </div>
      </div>

      <div className="movie-card-body">
        <div className="movie-meta-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24', fontWeight: 700 }}>
            <Star size={14} fill="#fbbf24" />
            <span>{rating}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={13} />
            <span>{duration}</span>
          </div>
        </div>

        <Link to={`/movies/${id}`}>
          <h3 className="movie-card-title" title={title}>
            {title}
          </h3>
        </Link>

        <div className="movie-genres-row">
          {genre.slice(0, 2).map((g) => (
            <span key={g} className="genre-tag">
              {g}
            </span>
          ))}
        </div>

        <div className="movie-card-footer">
          <div className="movie-card-footer-price">
            <span className="price-label">Starts at</span>
            <span className="movie-price-tag">{formatCurrency(basePrice)}</span>
          </div>

          {isComingSoon ? (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleWishlistClick}
            >
              <Bell size={13} />
              <span>Notify</span>
            </button>
          ) : (
            <Link to={`/shows/${id}`} className="btn btn-primary btn-sm">
              <Ticket size={14} />
              <span>Book</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

