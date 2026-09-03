import React, { useState } from 'react';
import { X, Star, AlertCircle, CheckCircle2 } from 'lucide-react';
import { addReview } from '../../services/storage';

const ReviewModal = ({ movie, onClose, onReviewAdded }) => {
  const [author, setAuthor] = useState('Satya Prem');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  if (!movie) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Please write a short review or feedback.');
      return;
    }

    addReview({
      movieId: movie.id,
      movieTitle: movie.title,
      author: author.trim() || 'Anonymous Cinephile',
      rating,
      comment: comment.trim()
    });

    if (onReviewAdded) onReviewAdded();
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '0.25rem' }}>Review & Rating</span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Rate "{movie.title}"</h3>
          </div>
          <button
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.4rem', borderRadius: '50%' }}
            aria-label="Close review modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Star Selector */}
          <div className="form-group" style={{ textAlign: 'center', margin: '1.5rem 0' }}>
            <label className="form-label" style={{ marginBottom: '0.5rem' }}>Your Star Rating</label>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: star <= rating ? '#fbbf24' : '#4b5563',
                    transition: 'transform 0.2s',
                    padding: '0.2rem'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <Star size={32} fill={star <= rating ? '#fbbf24' : 'none'} />
                </button>
              ))}
            </div>
            <span style={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: 700, marginTop: '0.35rem', display: 'block' }}>
              {rating === 5 ? 'Masterpiece ★★★★★' : `${rating} Stars`}
            </span>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="revAuthor">Your Name</label>
            <input
              id="revAuthor"
              type="text"
              className="form-input"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="revComment">Review & Experience</label>
            <textarea
              id="revComment"
              rows={4}
              className="form-textarea"
              placeholder="What did you think of the cinematography, sound effects, or plot?..."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                setError('');
              }}
            ></textarea>
            {error && (
              <p className="form-error">
                <AlertCircle size={14} /> {error}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle2 size={16} /> Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;

