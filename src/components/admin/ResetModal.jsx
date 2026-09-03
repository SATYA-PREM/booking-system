import React from 'react';
import { RefreshCw, AlertTriangle, X } from 'lucide-react';
import { resetDemoData } from '../../services/storage';

const ResetModal = ({ isOpen, onClose, onResetComplete }) => {
  if (!isOpen) return null;

  const handleReset = () => {
    resetDemoData();
    if (onResetComplete) onResetComplete();
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px', background: '#fff', color: '#0f172a' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#ef4444' }}>
            <AlertTriangle size={24} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>Reset Demo Application?</h3>
          </div>
          <button
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.4rem', borderRadius: '50%', background: '#f1f5f9' }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
          This will restore all demo data to initial defaults:
        </p>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: '#334155', fontSize: '0.85rem', marginBottom: '1.5rem', paddingLeft: '0.5rem' }}>
          <li>• Restore initial 10 movies and 5 multiplexes</li>
          <li>• Clear all new seat bookings and reset occupancy</li>
          <li>• Reset revenue statistics to base values</li>
          <li>• Restore initial customer reviews and notifications</li>
        </ul>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} style={{ background: '#f1f5f9' }}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={handleReset}>
            <RefreshCw size={15} /> Yes, Reset Everything
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetModal;

