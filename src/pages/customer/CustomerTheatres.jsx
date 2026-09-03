import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Star, Sparkles, Navigation, ArrowRight } from 'lucide-react';
import { getTheatres } from '../../services/storage';

const CustomerTheatres = () => {
  const theatres = getTheatres();
  const [selectedFacility, setSelectedFacility] = useState('All');

  const facilitiesList = ['All', 'IMAX Laser', 'Dolby Atmos', '4DX', 'Recliner Lounges', 'Valet Parking'];

  const filteredTheatres = theatres.filter((t) => {
    if (selectedFacility === 'All') return true;
    return t.facilities.some((f) => f.toLowerCase().includes(selectedFacility.toLowerCase()));
  });

  return (
    <div className="page-wrapper container">
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="section-badge">Multiplex Directory</span>
        <h1 className="section-title">Theatres Near You</h1>
        <p className="section-subtitle">
          Find top-rated partner cinemas featuring luxury recliners, IMAX 70mm, and Dolby Atmos audio systems.
        </p>
      </div>

      {/* Facility Filter Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
        {facilitiesList.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setSelectedFacility(f)}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid',
              borderColor: selectedFacility === f ? 'var(--primary)' : 'var(--border-dark)',
              background: selectedFacility === f ? 'var(--primary)' : 'var(--bg-cinema-card)',
              color: selectedFacility === f ? '#fff' : 'var(--text-gray-300)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'var(--transition)'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Theatres Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
        {filteredTheatres.map((theatre) => (
          <div
            key={theatre.id}
            style={{
              background: 'var(--bg-cinema-card)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-dark)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-cinema)',
              transition: 'var(--transition)'
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
              <img src={theatre.image} alt={theatre.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(7, 11, 22, 0.8)', backdropFilter: 'blur(6px)', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24', fontSize: '0.8rem', fontWeight: 700 }}>
                <Star size={13} fill="#fbbf24" />
                <span>{theatre.rating}</span>
                <span style={{ color: 'var(--text-dim)', fontWeight: 500 }}>({theatre.reviewsCount})</span>
              </div>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{theatre.name}</h3>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  <Navigation size={13} color="#a78bfa" />
                  <span>{theatre.distance}</span>
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                <MapPin size={15} color="#ec4899" />
                <span>{theatre.location}, {theatre.city}</span>
              </div>

              {/* Facilities Chips */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {theatre.facilities.map((fac) => (
                  <span
                    key={fac}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.2rem 0.6rem',
                      background: 'var(--bg-cinema-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#c4b5fd',
                      border: '1px solid rgba(139, 92, 246, 0.2)'
                    }}
                  >
                    {fac}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-dark)' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <strong>{theatre.screensCount}</strong> Screens Active
                </span>
                <Link to={`/shows?theatreId=${theatre.id}`} className="btn btn-primary btn-sm">
                  <span>View Shows</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerTheatres;

