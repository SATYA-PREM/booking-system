import React from 'react';
import { X, Film } from 'lucide-react';

const TrailerModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '780px', padding: '1.5rem', background: '#070b16' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Film size={20} color="#a78bfa" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{movie.title} — Official Trailer</h3>
          </div>
          <button
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.4rem', borderRadius: '50%' }}
            aria-label="Close trailer"
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#000' }}>
          <iframe
            src={`${movie.trailerUrl}?autoplay=1&mute=0`}
            title={`${movie.title} Trailer`}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <span>Duration: {movie.duration} • Certification: {movie.certification}</span>
          <button type="button" className="btn btn-primary btn-sm" onClick={onClose}>
            Done Watching
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;

