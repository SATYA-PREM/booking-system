import React, { useState, useEffect } from 'react';
import { Search, Ticket, Eye, CheckCircle2, XCircle, ArrowUpRight } from 'lucide-react';
import { getBookings, formatCurrency } from '../../services/storage';
import AdminTopNavbar from '../../components/admin/AdminTopNavbar';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const loadData = () => {
    setBookings(getBookings());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('moviemagic_state_change', loadData);
    return () => window.removeEventListener('moviemagic_state_change', loadData);
  }, []);

  const filtered = bookings.filter((b) => {
    if (statusFilter !== 'ALL' && b.bookingStatus !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        b.id.toLowerCase().includes(q) ||
        b.customer.toLowerCase().includes(q) ||
        b.movieTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div>
      <AdminTopNavbar title="Customer Bookings Directory" subtitle="Audit all incoming reservations, seat allocations, and payment references" />

      <div className="admin-view-body">
        <div className="admin-card">
          <div className="admin-card-header">
            <div style={{ display: 'flex', gap: '1rem', flex: 1, maxWidth: '500px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  className="admin-input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="Search by ID, customer, movie..."
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
                <option value="ALL">All Bookings</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Movie</th>
                  <th>Theatre</th>
                  <th>Show Date & Time</th>
                  <th>Seats</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#4f46e5' }}>{b.id}</td>
                    <td>
                      <div>
                        <strong>{b.customer}</strong>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>{b.email}</span>
                      </div>
                    </td>
                    <td><strong>{b.movieTitle}</strong></td>
                    <td>{b.theatreName}</td>
                    <td>{b.date} • {b.time}</td>
                    <td><span style={{ fontWeight: 700, color: '#6366f1' }}>{b.seats.join(', ')}</span></td>
                    <td style={{ fontWeight: 700 }}>{formatCurrency(b.total)}</td>
                    <td>
                      <span className={`badge ${b.bookingStatus === 'CONFIRMED' ? 'badge-confirmed' : 'badge-cancelled'}`}>
                        {b.bookingStatus}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.6rem' }}
                        onClick={() => setSelectedBooking(b)}
                        title="View Details"
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedBooking && (
        <div className="modal-backdrop" onClick={() => setSelectedBooking(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px', background: '#fff', color: '#0f172a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Reservation Audit</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>{selectedBooking.id}</h3>
              </div>
              <span className={`badge ${selectedBooking.bookingStatus === 'CONFIRMED' ? 'badge-confirmed' : 'badge-cancelled'}`}>
                {selectedBooking.bookingStatus}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Customer:</span>
                <strong>{selectedBooking.customer} ({selectedBooking.phone})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Movie:</span>
                <strong>{selectedBooking.movieTitle}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Cinema:</span>
                <strong>{selectedBooking.theatreName} ({selectedBooking.screenName})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Seats:</span>
                <strong style={{ color: '#4f46e5' }}>{selectedBooking.seats.join(', ')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Transaction ID:</span>
                <strong style={{ fontFamily: 'monospace' }}>{selectedBooking.transactionId}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '0.5rem', fontWeight: 800, fontSize: '1.1rem' }}>
                <span>Gross Revenue:</span>
                <span style={{ color: '#4f46e5' }}>{formatCurrency(selectedBooking.total)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setSelectedBooking(null)}>
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;

