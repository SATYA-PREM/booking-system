import React, { useState, useEffect } from 'react';
import { CreditCard, DollarSign, ArrowDownLeft, CheckCircle2, RotateCcw, Search } from 'lucide-react';
import { getBookings, formatCurrency } from '../../services/storage';
import AdminTopNavbar from '../../components/admin/AdminTopNavbar';
import StatCard from '../../components/admin/StatCard';

const AdminPayments = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = () => {
    setBookings(getBookings());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('moviemagic_state_change', loadData);
    return () => window.removeEventListener('moviemagic_state_change', loadData);
  }, []);

  const successfulBookings = bookings.filter((b) => b.paymentStatus === 'paid');
  const refundedBookings = bookings.filter((b) => b.paymentStatus === 'refunded');

  const grossSuccess = successfulBookings.reduce((sum, b) => sum + Number(b.total), 0) + 79420;
  const grossRefunds = refundedBookings.reduce((sum, b) => sum + Number(b.total), 0) + 2700;

  const filtered = bookings.filter((b) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        b.transactionId.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.customer.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div>
      <AdminTopNavbar title="Payments & Settlement Ledger" subtitle="Review gross gateway collections, successful captures, and cancellation refunds" />

      <div className="admin-view-body">
        {/* KPI Stats */}
        <div className="admin-stats-grid">
          <StatCard label="Gross Captured" value={formatCurrency(grossSuccess)} trend="+16.2%" icon={DollarSign} color="#10b981" />
          <StatCard label="Refunds Disbursed" value={formatCurrency(grossRefunds)} trend="-3.5%" isPositive={false} icon={RotateCcw} color="#ef4444" />
          <StatCard label="Net Settled" value={formatCurrency(grossSuccess - grossRefunds)} trend="+18.4%" icon={CreditCard} color="#6366f1" />
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <div style={{ position: 'relative', width: '320px' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                className="admin-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="Search transaction ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Booking Ref</th>
                  <th>Customer</th>
                  <th>Method</th>
                  <th>Gross Amount</th>
                  <th>Payment Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#4f46e5' }}>{b.transactionId}</td>
                    <td style={{ fontFamily: 'monospace', color: '#64748b' }}>{b.id}</td>
                    <td><strong>{b.customer}</strong></td>
                    <td><span className="badge badge-primary">{b.paymentMethod || 'CARD'}</span></td>
                    <td style={{ fontWeight: 800 }}>{formatCurrency(b.total)}</td>
                    <td>
                      <span className={`badge ${b.paymentStatus === 'paid' ? 'badge-confirmed' : 'badge-cancelled'}`}>
                        {b.paymentStatus === 'paid' ? 'Success' : 'Refunded'}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {new Date(b.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;

