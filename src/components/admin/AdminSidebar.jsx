import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Film,
  Building2,
  Calendar,
  Ticket,
  Users,
  CreditCard,
  BarChart3,
  Tag,
  MessageSquare,
  Bell,
  Settings,
  RefreshCw,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import ResetModal from './ResetModal';

const AdminSidebar = () => {
  const [resetModalOpen, setResetModalOpen] = useState(false);

  return (
    <>
      <aside className="admin-sidebar">
        {/* Header */}
        <div className="admin-sidebar-header">
          <div className="brand-icon" style={{ width: '2rem', height: '2rem' }}>
            <Film size={16} />
          </div>
          <div>
            <div className="admin-brand-title">MovieMagic</div>
            <div className="admin-brand-sub">Cinema SaaS Portal</div>
          </div>
        </div>

        {/* Navigation Groups */}
        <div style={{ padding: '0.75rem 0' }}>
          {/* Overview */}
          <div className="admin-nav-group">
            <div className="admin-nav-heading">Overview</div>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>
          </div>

          {/* Content */}
          <div className="admin-nav-group">
            <div className="admin-nav-heading">Content & Multiplexes</div>
            <NavLink
              to="/admin/movies"
              className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
            >
              <Film size={18} />
              <span>Movies Catalog</span>
            </NavLink>
            <NavLink
              to="/admin/theatres"
              className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
            >
              <Building2 size={18} />
              <span>Theatres & Screens</span>
            </NavLink>
            <NavLink
              to="/admin/shows"
              className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
            >
              <Calendar size={18} />
              <span>Showtimes</span>
            </NavLink>
          </div>

          {/* Operations */}
          <div className="admin-nav-group">
            <div className="admin-nav-heading">Operations & Sales</div>
            <NavLink
              to="/admin/bookings"
              className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
            >
              <Ticket size={18} />
              <span>Bookings</span>
            </NavLink>
            <NavLink
              to="/admin/customers"
              className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
            >
              <Users size={18} />
              <span>Customers</span>
            </NavLink>
            <NavLink
              to="/admin/payments"
              className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
            >
              <CreditCard size={18} />
              <span>Payments & Ledger</span>
            </NavLink>
          </div>

          {/* Insights */}
          <div className="admin-nav-group">
            <div className="admin-nav-heading">Intelligence</div>
            <NavLink
              to="/admin/analytics"
              className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
            >
              <BarChart3 size={18} />
              <span>Revenue & Occupancy</span>
            </NavLink>
            <NavLink
              to="/admin/offers"
              className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
            >
              <Tag size={18} />
              <span>Promo Codes</span>
            </NavLink>
            <NavLink
              to="/admin/reviews"
              className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
            >
              <MessageSquare size={18} />
              <span>Reviews Moderation</span>
            </NavLink>
            <NavLink
              to="/admin/notifications"
              className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
            >
              <Bell size={18} />
              <span>System Alerts</span>
            </NavLink>
          </div>

          {/* System */}
          <div className="admin-nav-group">
            <div className="admin-nav-heading">System & Data</div>
            <NavLink
              to="/admin/settings"
              className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
            >
              <Settings size={18} />
              <span>Settings</span>
            </NavLink>
            <button
              type="button"
              onClick={() => setResetModalOpen(true)}
              className="admin-nav-item"
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', color: '#f87171' }}
            >
              <RefreshCw size={18} />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="admin-sidebar-footer">
          <Link
            to="/"
            className="btn btn-secondary btn-block btn-sm"
            style={{ color: '#fff', background: '#1e293b', border: '1px solid #334155' }}
          >
            <span>Customer App</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </aside>

      <ResetModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onResetComplete={() => window.location.reload()}
      />
    </>
  );
};

export default AdminSidebar;

