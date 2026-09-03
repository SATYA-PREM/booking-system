import React, { useState, useEffect } from 'react';
import { Users, Search, User, Mail, Phone, Ticket, DollarSign } from 'lucide-react';
import { getCustomers, formatCurrency } from '../../services/storage';
import AdminTopNavbar from '../../components/admin/AdminTopNavbar';
import StatCard from '../../components/admin/StatCard';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = () => {
    setCustomers(getCustomers());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('moviemagic_state_change', loadData);
    return () => window.removeEventListener('moviemagic_state_change', loadData);
  }, []);

  const filtered = customers.filter((c) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div>
      <AdminTopNavbar title="Customer & Audience Directory" subtitle="Manage registered cinema patrons, lifetime booking value, and user statuses" />

      <div className="admin-view-body">
        {/* KPI Stats */}
        <div className="admin-stats-grid">
          <StatCard label="Total Registered Users" value="4,821" trend="+8.2%" icon={Users} color="#6366f1" />
          <StatCard label="Active CinePass Patrons" value="4,210" trend="+5.4%" icon={Ticket} color="#10b981" />
          <StatCard label="New This Month" value="482" trend="+14.1%" icon={DollarSign} color="#f59e0b" />
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <div style={{ position: 'relative', width: '320px' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                className="admin-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Total Bookings</th>
                  <th>Lifetime Spend</th>
                  <th>Last Booking</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem' }}>
                          {c.name[0]}
                        </div>
                        <strong style={{ fontSize: '0.95rem' }}>{c.name}</strong>
                      </div>
                    </td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td><strong>{c.bookingsCount}</strong> bookings</td>
                    <td style={{ fontWeight: 800, color: '#4f46e5' }}>{formatCurrency(c.totalSpent)}</td>
                    <td><span style={{ fontSize: '0.85rem', color: '#334155' }}>{c.lastBooking}</span></td>
                    <td><span className="badge badge-confirmed">{c.status}</span></td>
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

export default AdminCustomers;

