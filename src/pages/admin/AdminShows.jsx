import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Clock, Film, Building2, Trash2, CheckCircle2 } from 'lucide-react';
import { getShows, getMovies, getTheatres, getScreens, createShow, deleteShow, formatCurrency } from '../../services/storage';
import AdminTopNavbar from '../../components/admin/AdminTopNavbar';

const AdminShows = () => {
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [screens, setScreens] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState('');

  const [newShow, setNewShow] = useState({
    movieId: 'MOV001',
    theatreId: 'TH001',
    screenId: 'SCREEN01',
    date: '2026-09-04',
    time: '05:30 PM',
    format: 'IMAX',
    ticketPrice: 280
  });

  const loadData = () => {
    setShows(getShows());
    setMovies(getMovies());
    setTheatres(getTheatres());
    setScreens(getScreens());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('moviemagic_state_change', loadData);
    return () => window.removeEventListener('moviemagic_state_change', loadData);
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    createShow(newShow);
    loadData();
    setModalOpen(false);
    setToast('Showtime scheduled and added to online booking engine.');
    setTimeout(() => setToast(''), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to cancel this scheduled showtime?')) {
      deleteShow(id);
      loadData();
      setToast('Showtime removed.');
      setTimeout(() => setToast(''), 3000);
    }
  };

  return (
    <div>
      <AdminTopNavbar title="Showtime Scheduling Engine" subtitle="Schedule upcoming screenings across auditoriums, formats, and pricing tiers" />

      <div className="admin-view-body">
        {toast && (
          <div style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} />
            <span>{toast}</span>
          </div>
        )}

        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h3 className="admin-card-title">Active Show Schedules</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                {shows.length} shows currently live for customer reservation
              </span>
            </div>

            <button type="button" className="btn btn-primary btn-sm" onClick={() => setModalOpen(true)}>
              <Plus size={16} />
              <span>Schedule New Show</span>
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Show ID</th>
                  <th>Movie</th>
                  <th>Theatre & Screen</th>
                  <th>Date & Time</th>
                  <th>Format</th>
                  <th>Base Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {shows.map((show) => {
                  const movie = movies.find((m) => m.id === show.movieId) || { title: 'Unknown Movie' };
                  const theatre = theatres.find((t) => t.id === show.theatreId) || { name: 'Multiplex' };
                  const screen = screens.find((s) => s.id === show.screenId) || { name: 'Screen' };

                  return (
                    <tr key={show.id}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#4f46e5' }}>{show.id}</td>
                      <td><strong>{movie.title}</strong></td>
                      <td>
                        <div style={{ lineHeight: 1.2 }}>
                          <span style={{ fontWeight: 600 }}>{theatre.name}</span>
                          <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>{screen.name}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Calendar size={13} color="#6366f1" />
                          <span>{show.date}</span>
                          <strong style={{ color: '#4f46e5' }}>{show.time}</strong>
                        </div>
                      </td>
                      <td><span className="badge badge-primary">{show.format}</span></td>
                      <td style={{ fontWeight: 700 }}>{formatCurrency(show.ticketPrice)}</td>
                      <td>
                        <span className={`badge ${show.status === 'available' ? 'badge-confirmed' : 'badge-warning'}`}>
                          {show.status}
                        </span>
                      </td>
                      <td>
                        <button type="button" className="btn btn-danger btn-sm" style={{ padding: '0.35rem 0.6rem' }} onClick={() => handleDelete(show.id)}>
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Show Modal */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px', background: '#fff', color: '#0f172a' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a' }}>
              Schedule New Showtime
            </h3>

            <form onSubmit={handleCreate}>
              <div className="admin-form-grid">
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label" style={{ color: '#334155' }}>Select Movie</label>
                  <select
                    className="admin-select"
                    value={newShow.movieId}
                    onChange={(e) => setNewShow({ ...newShow, movieId: e.target.value })}
                  >
                    {movies.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.title} ({m.certification} • {m.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#334155' }}>Select Theatre</label>
                  <select
                    className="admin-select"
                    value={newShow.theatreId}
                    onChange={(e) => setNewShow({ ...newShow, theatreId: e.target.value })}
                  >
                    {theatres.map((t) => (
                      <option key={t.id} value={t.id}>{t.name} ({t.city})</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#334155' }}>Select Screen</label>
                  <select
                    className="admin-select"
                    value={newShow.screenId}
                    onChange={(e) => setNewShow({ ...newShow, screenId: e.target.value })}
                  >
                    {screens.filter((s) => s.theatreId === newShow.theatreId).map((sc) => (
                      <option key={sc.id} value={sc.id}>{sc.name} ({sc.format})</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#334155' }}>Show Date</label>
                  <input
                    type="date"
                    className="admin-input"
                    value={newShow.date}
                    onChange={(e) => setNewShow({ ...newShow, date: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#334155' }}>Showtime</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={newShow.time}
                    onChange={(e) => setNewShow({ ...newShow, time: e.target.value })}
                    placeholder="05:30 PM"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#334155' }}>Format</label>
                  <select
                    className="admin-select"
                    value={newShow.format}
                    onChange={(e) => setNewShow({ ...newShow, format: e.target.value })}
                  >
                    <option value="IMAX">IMAX</option>
                    <option value="2D">2D</option>
                    <option value="3D">3D</option>
                    <option value="4DX">4DX</option>
                    <option value="Dolby Atmos">Dolby Atmos</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#334155' }}>Ticket Base Price (₹)</label>
                  <input
                    type="number"
                    className="admin-input"
                    value={newShow.ticketPrice}
                    onChange={(e) => setNewShow({ ...newShow, ticketPrice: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Schedule Show
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminShows;

