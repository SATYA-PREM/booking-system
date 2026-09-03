import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle2, Ticket, Tag, Film, AlertTriangle } from 'lucide-react';
import { getNotifications, addNotification } from '../../services/storage';
import AdminTopNavbar from '../../components/admin/AdminTopNavbar';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotice, setNewNotice] = useState('');
  const [noticeType, setNoticeType] = useState('promo');

  const loadData = () => {
    setNotifications(getNotifications());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('moviemagic_state_change', loadData);
    return () => window.removeEventListener('moviemagic_state_change', loadData);
  }, []);

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!newNotice.trim()) return;

    addNotification({
      title: noticeType === 'promo' ? 'Special Discount Alert!' : 'Cinema Broadcast',
      message: newNotice.trim(),
      type: noticeType
    });

    setNewNotice('');
    loadData();
  };

  return (
    <div>
      <AdminTopNavbar title="System Alerts & Broadcasts" subtitle="View automated booking events, occupancy alerts, and dispatch customer notifications" />

      <div className="admin-view-body">
        {/* Broadcast Sender Card */}
        <div className="admin-card">
          <h3 className="admin-card-title" style={{ marginBottom: '1rem' }}>Dispatch Customer Broadcast Alert</h3>
          <form onSubmit={handleBroadcast} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <select
              className="admin-select"
              style={{ width: '180px' }}
              value={noticeType}
              onChange={(e) => setNoticeType(e.target.value)}
            >
              <option value="promo">Promotional Deal</option>
              <option value="booking">System Notice</option>
              <option value="movie">Movie Premiere</option>
            </select>
            <input
              type="text"
              className="admin-input"
              style={{ flex: 1, minWidth: '260px' }}
              placeholder="Type customer notification message..."
              value={newNotice}
              onChange={(e) => setNewNotice(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              <Bell size={16} />
              <span>Broadcast Alert</span>
            </button>
          </form>
        </div>

        {/* Notifications Feed */}
        <div className="admin-card">
          <h3 className="admin-card-title" style={{ marginBottom: '1.25rem' }}>Live Alert Stream</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {notifications.map((n) => (
              <div
                key={n.id}
                style={{
                  padding: '1rem 1.25rem',
                  background: '#f8fafc',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{ width: '2.4rem', height: '2.4rem', borderRadius: '50%', background: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bell size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--admin-text-main)' }}>{n.title}</strong>
                  <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0.15rem 0' }}>{n.message}</p>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;

