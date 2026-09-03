import React, { useState, useEffect } from 'react';
import { Settings, Save, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';
import { getSettings, saveSettings } from '../../services/storage';
import AdminTopNavbar from '../../components/admin/AdminTopNavbar';
import ResetModal from '../../components/admin/ResetModal';

const AdminSettings = () => {
  const [settings, setSettings] = useState(getSettings());
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [toast, setToast] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    saveSettings(settings);
    setToast('Cinema system settings updated successfully.');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div>
      <AdminTopNavbar title="Cinema Platform Settings" subtitle="Configure ticketing parameters, platform fees, cancellation window, and taxes" />

      <div className="admin-view-body" style={{ maxWidth: '820px' }}>
        {toast && (
          <div style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} />
            <span>{toast}</span>
          </div>
        )}

        <form onSubmit={handleSave}>
          {/* Cinema Profile */}
          <div className="admin-card">
            <h3 className="admin-card-title" style={{ marginBottom: '1.25rem' }}>Cinema Network Profile</h3>

            <div className="admin-form-grid">
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label" style={{ color: '#334155' }}>Cinema Platform Name</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.cinemaName}
                  onChange={(e) => setSettings({ ...settings, cinemaName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: '#334155' }}>Support Email</label>
                <input
                  type="email"
                  className="admin-input"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: '#334155' }}>Support Hotline</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.supportPhone}
                  onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Fee & Tax Structure */}
          <div className="admin-card">
            <h3 className="admin-card-title" style={{ marginBottom: '1.25rem' }}>Ticketing & Financial Rules</h3>

            <div className="admin-form-grid">
              <div className="form-group">
                <label className="form-label" style={{ color: '#334155' }}>Convenience Fee per Order (₹)</label>
                <input
                  type="number"
                  className="admin-input"
                  value={settings.convenienceFee}
                  onChange={(e) => setSettings({ ...settings, convenienceFee: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: '#334155' }}>Integrated GST Rate (%)</label>
                <input
                  type="number"
                  className="admin-input"
                  value={settings.gstRate}
                  onChange={(e) => setSettings({ ...settings, gstRate: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: '#334155' }}>Cancellation Window (Hours before show)</label>
                <input
                  type="number"
                  className="admin-input"
                  value={settings.cancellationCutoffHours}
                  onChange={(e) => setSettings({ ...settings, cancellationCutoffHours: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: '#334155' }}>Max Seats Allowed Per Order</label>
                <input
                  type="number"
                  className="admin-input"
                  value={settings.maxSeatsPerBooking}
                  onChange={(e) => setSettings({ ...settings, maxSeatsPerBooking: Number(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary">
                <Save size={16} />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </form>

        {/* Demo Data Reset Card */}
        <div className="admin-card" style={{ borderColor: '#fecaca', background: '#fffafa' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem', color: '#dc2626' }}>
            <ShieldAlert size={22} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#991b1b' }}>Demo Data Management</h3>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            Reset all customer seat selections, simulated transactions, bookings, and revenue metrics back to default seed data for clean demonstration presentations.
          </p>

          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setResetModalOpen(true)}
          >
            <RefreshCw size={16} />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      <ResetModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onResetComplete={() => {
          setSettings(getSettings());
          setToast('Demo data restored to initial pristine state.');
          setTimeout(() => setToast(''), 3000);
        }}
      />
    </div>
  );
};

export default AdminSettings;

