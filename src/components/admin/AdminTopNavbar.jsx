import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Shield, ArrowUpRight, User } from 'lucide-react';
import { getNotifications } from '../../services/storage';

const AdminTopNavbar = ({ title = 'Cinema SaaS Dashboard', subtitle }) => {
  const notifications = getNotifications();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="admin-top-nav">
      <div className="admin-page-title-wrap">
        <h1>{title}</h1>
        {subtitle && <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', margin: 0 }}>{subtitle}</p>}
      </div>

      <div className="admin-top-actions">
        <Link to="/admin/notifications" className="icon-badge-btn" style={{ background: '#f8fafc', borderColor: '#e2e8f0', color: '#0f172a' }}>
          <Bell size={18} />
          {unreadCount > 0 && <span className="badge-count">{unreadCount}</span>}
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.4rem 0.8rem', background: '#f8fafc', borderRadius: 'var(--radius-full)', border: '1px solid #e2e8f0' }}>
          <div style={{ width: '1.8rem', height: '1.8rem', borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #9333ea)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
            AD
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block' }}>Cinema Admin</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)' }}>admin@moviemagic.com</span>
          </div>
        </div>

        <Link to="/" className="btn btn-outline btn-sm" style={{ color: '#4f46e5', borderColor: '#818cf8' }}>
          <span>View Site</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </header>
  );
};

export default AdminTopNavbar;

