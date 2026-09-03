import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, Film, Star, CheckCircle2, Eye } from 'lucide-react';
import { getMovies, deleteMovie, saveMovie, formatCurrency } from '../../services/storage';
import AdminTopNavbar from '../../components/admin/AdminTopNavbar';

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [toast, setToast] = useState('');

  const loadData = () => {
    setMovies(getMovies());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('moviemagic_state_change', loadData);
    return () => window.removeEventListener('moviemagic_state_change', loadData);
  }, []);

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}" from the cinema catalogue?`)) {
      deleteMovie(id);
      loadData();
      setToast(`Movie "${title}" removed.`);
      setTimeout(() => setToast(''), 3000);
    }
  };

  const handleOpenAdd = () => {
    setEditingMovie({
      title: '',
      director: '',
      cast: ['Actor 1', 'Actor 2'],
      genre: ['Action', 'Sci-Fi'],
      language: 'English',
      availableLanguages: ['English', 'Hindi'],
      duration: '2h 15m',
      rating: 4.8,
      certification: 'UA',
      releaseDate: '2026-09-10',
      status: 'now-showing',
      basePrice: 250,
      formats: ['2D', 'IMAX'],
      poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
      backdrop: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=1200&q=80',
      trailerUrl: 'https://www.youtube.com/embed/TcMBFSGVi1c',
      description: 'An exciting new cinematic blockbuster.'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (movie) => {
    setEditingMovie({ ...movie });
    setModalOpen(true);
  };

  const handleSaveForm = (e) => {
    e.preventDefault();
    saveMovie(editingMovie);
    loadData();
    setModalOpen(false);
    setToast(`Movie "${editingMovie.title}" saved successfully.`);
    setTimeout(() => setToast(''), 3000);
  };

  const filtered = movies.filter((m) => {
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return m.title.toLowerCase().includes(q) || m.director.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div>
      <AdminTopNavbar title="Movie Catalog Management" subtitle="Create, edit, and organize movie listings, media, and release statuses" />

      <div className="admin-view-body">
        {toast && (
          <div style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} />
            <span>{toast}</span>
          </div>
        )}

        <div className="admin-card">
          {/* Controls Bar */}
          <div className="admin-card-header">
            <div style={{ display: 'flex', gap: '1rem', flex: 1, maxWidth: '500px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  className="admin-input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="Search movie catalog..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select
                className="admin-select"
                style={{ width: '160px' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="now-showing">Now Showing</option>
                <option value="coming-soon">Coming Soon</option>
              </select>
            </div>

            <button type="button" className="btn btn-primary btn-sm" onClick={handleOpenAdd}>
              <Plus size={16} />
              <span>Add New Movie</span>
            </button>
          </div>

          {/* Table */}
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Movie</th>
                  <th>Genre</th>
                  <th>Language</th>
                  <th>Duration</th>
                  <th>Base Price</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={m.poster} alt={m.title} style={{ width: '40px', height: '54px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div>
                          <strong style={{ fontSize: '0.95rem', display: 'block' }}>{m.title}</strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{m.certification} • Dir: {m.director}</span>
                        </div>
                      </div>
                    </td>
                    <td>{m.genre.join(', ')}</td>
                    <td>{m.language}</td>
                    <td>{m.duration}</td>
                    <td style={{ fontWeight: 700 }}>{formatCurrency(m.basePrice)}</td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 700, color: '#d97706' }}>
                        <Star size={13} fill="#d97706" /> {m.rating}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${m.status === 'now-showing' ? 'badge-confirmed' : 'badge-primary'}`}>
                        {m.status === 'now-showing' ? 'Now Showing' : 'Coming Soon'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <Link to={`/movies/${m.id}`} className="btn btn-secondary btn-sm" style={{ padding: '0.35rem 0.6rem' }} title="Preview">
                          <Eye size={14} />
                        </Link>
                        <button type="button" className="btn btn-secondary btn-sm" style={{ padding: '0.35rem 0.6rem' }} onClick={() => handleOpenEdit(m)} title="Edit">
                          <Edit2 size={14} />
                        </button>
                        <button type="button" className="btn btn-danger btn-sm" style={{ padding: '0.35rem 0.6rem' }} onClick={() => handleDelete(m.id, m.title)} title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Movie Modal */}
      {modalOpen && editingMovie && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', background: '#fff', color: '#0f172a' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a' }}>
              {editingMovie.id ? 'Edit Movie' : 'Add New Movie to Catalogue'}
            </h3>

            <form onSubmit={handleSaveForm}>
              <div className="admin-form-grid">
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label" style={{ color: '#334155' }}>Movie Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingMovie.title}
                    onChange={(e) => setEditingMovie({ ...editingMovie, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#334155' }}>Director</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingMovie.director}
                    onChange={(e) => setEditingMovie({ ...editingMovie, director: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#334155' }}>Duration</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingMovie.duration}
                    onChange={(e) => setEditingMovie({ ...editingMovie, duration: e.target.value })}
                    placeholder="2h 45m"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#334155' }}>Language</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingMovie.language}
                    onChange={(e) => setEditingMovie({ ...editingMovie, language: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#334155' }}>Base Ticket Price (₹)</label>
                  <input
                    type="number"
                    className="admin-input"
                    value={editingMovie.basePrice}
                    onChange={(e) => setEditingMovie({ ...editingMovie, basePrice: Number(e.target.value) })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#334155' }}>Release Status</label>
                  <select
                    className="admin-select"
                    value={editingMovie.status}
                    onChange={(e) => setEditingMovie({ ...editingMovie, status: e.target.value })}
                  >
                    <option value="now-showing">Now Showing</option>
                    <option value="coming-soon">Coming Soon</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#334155' }}>Certification</label>
                  <select
                    className="admin-select"
                    value={editingMovie.certification}
                    onChange={(e) => setEditingMovie({ ...editingMovie, certification: e.target.value })}
                  >
                    <option value="UA">UA (Universal Adult)</option>
                    <option value="U">U (Universal)</option>
                    <option value="A">A (Adults Only)</option>
                  </select>
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label" style={{ color: '#334155' }}>Poster Image URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={editingMovie.poster}
                    onChange={(e) => setEditingMovie({ ...editingMovie, poster: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label" style={{ color: '#334155' }}>Synopsis / Description</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={editingMovie.description}
                    onChange={(e) => setEditingMovie({ ...editingMovie, description: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Movie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMovies;

