import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="page-wrapper container" style={{ textAlign: 'center', padding: '6rem 1.5rem' }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: 'var(--primary-light)',
          color: 'var(--primary)',
          marginBottom: '1.5rem'
        }}
      >
        <Compass size={48} />
      </div>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '460px', margin: '0 auto 2rem' }}>
        The page or booking destination you are trying to visit does not exist or has moved.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary">
          <Home size={16} />
          <span>Go to Homepage</span>
        </Link>
        <Link to="/services" className="btn btn-secondary">
          <span>Explore Services</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

