import React, { useState, useEffect } from 'react';
import { Building2, Plus, Star, MapPin, Monitor, CheckCircle2, Shield } from 'lucide-react';
import { getTheatres, getScreens, saveTheatre } from '../../services/storage';
import AdminTopNavbar from '../../components/admin/AdminTopNavbar';

const AdminTheatres = () => {
  const [theatres, setTheatres] = useState([]);
  const [screens, setScreens] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTheatre, setNewTheatre] = useState({
    name: '',
    city: 'Mumbai',
    location: '',
    distance: '3.5 km',
    rating: 4.8,
    reviewsCount: 120,
    screensCount: 4,
    facilities: ['IMAX Laser', 'Dolby Atmos', 'Recliner Lounges', 'Valet Parking'],
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80'
  });

  const loadData = () => {
    setTheatres(getTheatres());
    setScreens(getScreens());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('moviemagic_state_change', loadData);
    return () => window.removeEventListener('moviemagic_state_change', loadData);
  }, []);

  const handleSaveTheatre = (e) => {
    e.preventDefault();
    saveTheatre(newTheatre);
    loadData();
    setModalOpen(false);
  };

  return (
    <div>
      <AdminTopNavbar title="Multiplex & Screens Directory" subtitle="Manage cinema locations, auditorium capacities, formats, and amenities" />

      <div className="admin-view-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--admin-text-main)' }}>Partner Cinemas</h2>
            <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>
              Currently managing <strong>{theatres.length}</strong> multiplex facilities and <strong>{screens.length}</strong> active projection auditoriums.
            </p>
          </div>

          <button type="button" className="btn btn-primary btn-sm" onClick={() => setModalOpen(true)}>
            <Plus size={16} />
            <span>Add New Theatre</span>
          </button>
        </div>

        {/* Theatres Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem' }}>
          {theatres.map((theatre) => {
            const theatreScreens = screens.filter((s) => s.theatreId === theatre.id);

            return (
              <div key={theatre.id} className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: '140px' }}>
                  <img src={theatre.image} alt={theatre.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: '0.75rem', left: '1rem', right: '1rem', color: '#fff' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{theatre.name}</h3>
                    <span style={{ fontSize: '0.8rem', opacity: 0.85 }}>{theatre.location}, {theatre.city}</span>
                  </div>
                </div>

                <div style={{ padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    Auditoriums & Formats
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    {theatreScreens.map((sc) => (
                      <div
                        key={sc.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.5rem 0.75rem',
                          background: '#f8fafc',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid #f1f5f9',
                          fontSize: '0.85rem'
                        }}
                      >
                        <span style={{ fontWeight: 600 }}>{sc.name}</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{sc.format}</span>
                          <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{sc.capacity} seats</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {theatre.facilities.map((f) => (
                      <span key={f} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: '#eef2ff', color: '#4f46e5', borderRadius: '4px', fontWeight: 600 }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Theatre Modal */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px', background: '#fff', color: '#0f172a' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a' }}>
              Add Multiplex Property
            </h3>

            <form onSubmit={handleSaveTheatre}>
              <div className="form-group">
                <label className="form-label" style={{ color: '#334155' }}>Cinema Name</label>
                <input
                  type="text"
                  className="admin-input"
                  value={newTheatre.name}
                  onChange={(e) => setNewTheatre({ ...newTheatre, name: e.target.value })}
                  placeholder="e.g. Cinepolis Grand Central"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: '#334155' }}>Location / Address</label>
                <input
                  type="text"
                  className="admin-input"
                  value={newTheatre.location}
                  onChange={(e) => setNewTheatre({ ...newTheatre, location: e.target.value })}
                  placeholder="Downtown Hub, Level 4"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: '#334155' }}>City</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={newTheatre.city}
                    onChange={(e) => setNewTheatre({ ...newTheatre, city: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#334155' }}>Screen Count</label>
                  <input
                    type="number"
                    className="admin-input"
                    value={newTheatre.screensCount}
                    onChange={(e) => setNewTheatre({ ...newTheatre, screensCount: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Multiplex
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTheatres;

