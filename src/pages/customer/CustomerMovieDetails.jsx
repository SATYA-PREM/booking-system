import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Film, Play, Ticket, Calendar, ShieldCheck, Heart, User, MessageSquare } from 'lucide-react';
import { getMovieById, getReviews, getWishlist, toggleWishlist, formatCurrency } from '../../services/storage';
import TrailerModal from '../../components/customer/TrailerModal';
import ReviewModal from '../../components/customer/ReviewModal';

const CustomerMovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = getMovieById(id);

  const [trailerOpen, setTrailerOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [wishlistActive, setWishlistActive] = useState(false);
  const [reviewsList, setReviewsList] = useState([]);

  React.useEffect(() => {
    if (movie) {
      const wl = getWishlist();
      setWishlistActive(wl.includes(movie.id));
      const revs = getReviews(movie.id);
      setReviewsList(revs);
    }
  }, [movie]);

  if (!movie) {
    return (
      <div className="page-wrapper container" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <h2>Movie Not Found</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
          The requested movie could not be located in our active repertoire.
        </p>
        <Link to="/movies" className="btn btn-primary">
          Browse All Movies
        </Link>
      </div>
    );
  }

  const handleWishlist = () => {
    const updated = toggleWishlist(movie.id);
    setWishlistActive(updated.includes(movie.id));
  };

  const isComingSoon = movie.status === 'coming-soon';

  return (
    <div>
      {/* Movie Details Hero Banner */}
      <section
        className="movie-details-hero"
        style={{ backgroundImage: `url(${movie.backdrop})` }}
      >
        <div className="details-hero-overlay" />

        <div className="container details-hero-content">
          {/* Poster Card */}
          <div className="details-poster-box">
            <img src={movie.poster} alt={movie.title} />
          </div>

          {/* Details Overview */}
          <div style={{ color: '#fff' }}>
            {/* Back Button */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'none',
                border: 'none',
                color: '#cbd5e1',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: '1rem'
              }}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <span className="badge badge-rating">{movie.certification}</span>
              <span className="badge badge-primary">{movie.formats.join(' • ')}</span>
              {isComingSoon && (
                <span className="badge" style={{ background: 'rgba(236, 72, 153, 0.2)', color: '#f472b6', border: '1px solid #ec4899' }}>
                  Coming Soon ({movie.releaseDate})
                </span>
              )}
            </div>

            <h1 style={{ fontSize: '2.6rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '0.75rem' }}>
              {movie.title}
            </h1>

            {/* Meta Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'var(--text-gray-300)', fontSize: '0.925rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#fbbf24', fontWeight: 700 }}>
                <Star size={18} fill="#fbbf24" />
                <span>{movie.rating} / 5</span>
                <span style={{ color: 'var(--text-dim)', fontWeight: 500 }}>({movie.reviewsCount} reviews)</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={16} />
                <span>{movie.duration}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={16} />
                <span>Released: {movie.releaseDate}</span>
              </div>
            </div>

            {/* Genres */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
              {movie.genre.map((g) => (
                <span key={g} style={{ padding: '0.35rem 0.85rem', background: 'rgba(30, 41, 59, 0.8)', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-dark)', fontSize: '0.85rem' }}>
                  {g}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {!isComingSoon ? (
                <Link to={`/shows/${movie.id}`} className="btn btn-primary btn-lg">
                  <Ticket size={18} />
                  <span>Book Tickets</span>
                </Link>
              ) : (
                <button type="button" className="btn btn-primary btn-lg" onClick={handleWishlist}>
                  <Heart size={18} fill={wishlistActive ? '#fff' : 'none'} />
                  <span>{wishlistActive ? 'Notification Enabled' : 'Notify Me on Release'}</span>
                </button>
              )}

              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={() => setTrailerOpen(true)}
              >
                <Play size={18} fill="#fff" />
                <span>Watch Trailer</span>
              </button>

              <button
                type="button"
                className={`btn btn-secondary ${wishlistActive ? 'btn-danger' : ''}`}
                onClick={handleWishlist}
                title="Wishlist"
              >
                <Heart size={18} fill={wishlistActive ? '#fff' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Details Body & Reviews */}
      <div className="page-wrapper container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
        {/* Left Column */}
        <div>
          {/* Synopsis */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.85rem' }}>About the Movie</h2>
            <p style={{ color: 'var(--text-gray-300)', lineHeight: 1.7, fontSize: '1rem' }}>
              {movie.description}
            </p>
          </div>

          {/* Cast & Crew */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Cast & Crew</h2>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem' }}>Director</span>
              <strong style={{ fontSize: '1.05rem', color: '#fff' }}>{movie.director}</strong>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Key Cast</span>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {movie.cast.map((actor) => (
                  <div
                    key={actor}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.85rem',
                      background: 'var(--bg-cinema-card)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-dark)'
                    }}
                  >
                    <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c4b5fd' }}>
                      <User size={14} />
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{actor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Audience Reviews</h2>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setReviewModalOpen(true)}
              >
                <MessageSquare size={14} />
                <span>Write a Review</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {reviewsList.map((rev) => (
                <div
                  key={rev.id}
                  style={{
                    padding: '1.25rem',
                    background: 'var(--bg-cinema-card)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-dark)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem' }}>
                        {rev.author[0]}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.95rem' }}>{rev.author}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>{rev.date}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#fbbf24', fontWeight: 700 }}>
                      <Star size={14} fill="#fbbf24" />
                      <span>{rev.rating}/5</span>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-gray-300)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Booking Callout */}
        <div>
          <div
            style={{
              background: 'var(--bg-cinema-card)',
              border: '1px solid var(--border-dark)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              position: 'sticky',
              top: '5.5rem',
              boxShadow: 'var(--shadow-cinema)'
            }}
          >
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
              TICKETS FROM
            </span>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#a78bfa', margin: '0.25rem 0 1.25rem' }}>
              {formatCurrency(movie.basePrice)}
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem', fontSize: '0.875rem', color: 'var(--text-gray-300)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} color="#34d399" />
                <span>Instant Ticket Confirmation with QR</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} color="#34d399" />
                <span>Free cancellation up to 2 hours before show</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} color="#34d399" />
                <span>Special concessions & popcorn combos</span>
              </li>
            </ul>

            {!isComingSoon ? (
              <Link to={`/shows/${movie.id}`} className="btn btn-primary btn-block btn-lg">
                <Ticket size={18} />
                <span>Select Showtime & Seats</span>
              </Link>
            ) : (
              <button type="button" className="btn btn-secondary btn-block btn-lg" onClick={handleWishlist}>
                <Heart size={18} />
                <span>{wishlistActive ? 'Notification Added' : 'Notify on Advance Release'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {trailerOpen && (
        <TrailerModal
          movie={movie}
          onClose={() => setTrailerOpen(false)}
        />
      )}

      {/* Review Modal */}
      {reviewModalOpen && (
        <ReviewModal
          movie={movie}
          onClose={() => setReviewModalOpen(false)}
          onReviewAdded={() => setReviewsList(getReviews(movie.id))}
        />
      )}
    </div>
  );
};

export default CustomerMovieDetails;

