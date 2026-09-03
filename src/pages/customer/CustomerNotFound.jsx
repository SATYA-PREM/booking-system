import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Home, Clapperboard } from 'lucide-react';

const CustomerNotFound = () => {
  return (
    <div className="page-wrapper container" style={{ textAlign: 'center', padding: '6rem 1.5rem' }}>
      <div
        style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: 'var(--primary-light)',
          color: '#a78bfa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem'
        }}
      >
        <Clapperboard size={48} />
      </div>

      <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>404</h1>
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem', color: '#c4b5fd' }}>
        Oops! This Scene Doesn't Exist.
      </h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '460px', margin: '0 auto 2rem', fontSize: '1rem' }}>
        The showtime, ticket, or movie destination you are looking for is not playing on this screen.
      </p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary btn-lg">
          <Home size={18} />
          <span>Back to Home</span>
        </Link>
        <Link to="/movies" className="btn btn-secondary btn-lg">
          <span>Browse Now Showing</span>
        </Link>
      </div>
    </div>
  );
};

export default CustomerNotFound;

