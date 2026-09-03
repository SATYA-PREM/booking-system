import React, { useState, useEffect } from 'react';
import { Tag, Plus, CheckCircle2, Trash2 } from 'lucide-react';
import { getOffers, saveOffer } from '../../services/storage';
import AdminTopNavbar from '../../components/admin/AdminTopNavbar';

const AdminOffers = () => {
  const [offers, setOffers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newOffer, setNewOffer] = useState({
    code: '',
    discountType: 'flat',
    discountValue: 50,
    minAmount: 300,
    maxDiscount: 50,
    description: '',
    validTill: '2026-12-31',
    usageLimit: 1000,
    isActive: true
  });

  const loadData = () => {
    setOffers(getOffers());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('moviemagic_state_change', loadData);
    return () => window.removeEventListener('moviemagic_state_change', loadData);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    saveOffer({
      ...newOffer,
      code: newOffer.code.toUpperCase().trim()
    });
    loadData();
    setModalOpen(false);
  };

  const handleToggleActive = (offer) => {
    saveOffer({ ...offer, isActive: !offer.isActive });
    loadData();
  };

  return (
    <div>
      <AdminTopNavbar title="Promotions & Coupon Engine" subtitle="Manage marketing promo codes, discount constraints, and redemption quotas" />

      <div className="admin-view-body">
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h3 className="admin-card-title">Active Campaign Codes</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                {offers.length} discount coupons configured
              </span>
            </div>

            <button type="button" className="btn btn-primary btn-sm" onClick={() => setModalOpen(true)}>
              <Plus size={16} />
              <span>Create Promo Code</span>
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Promo Code</th>
                  <th>Discount</th>
                  <th>Min Order</th>
                  <th>Redemptions</th>
                  <th>Quota</th>
                  <th>Valid Till</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#4f46e5', fontSize: '0.95rem' }}>
                        {o.code}
                      </span>
                    </td>
                    <td><strong>{o.discountType === 'flat' ? `₹${o.discountValue} OFF` : `${o.discountValue}% OFF`}</strong></td>
                    <td>₹{o.minAmount}</td>
                    <td><strong>{o.usedCount}</strong> used</td>
                    <td>{o.usageLimit}</td>
                    <td>{o.validTill}</td>
                    <td>
                      <span className={`badge ${o.isActive ? 'badge-confirmed' : 'badge-inactive'}`}>
                        {o.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={`btn ${o.isActive ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                        style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                        onClick={() => handleToggleActive(o)}
                      >
                        {o.isActive ? 'Disable' : 'Enable'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px', background: '#fff', color: '#0f172a' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a' }}>
              Create Promo Voucher
            </h3>

            <form onSubmit={handleSave}>
              <div className="admin-form-grid">
                <div className="form-group">
                  <label className="form-label" style={{ color: '#334155' }}>Coupon Code</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. BLOCKBUSTER50"
                    value={newOffer.code}
                    onChange={(e) => setNewOffer({ ...newOffer, code: e.target.value.toUpperCase() })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#334155' }}>Discount Type</label>
                  <select
                    className="admin-select"
                    value={newOffer.discountType}
                    onChange={(e) => setNewOffer({ ...newOffer, discountType: e.target.value })}
                  >
                    <option value="flat">Flat ₹ Amount</option>
                    <option value="percentage">Percentage (%)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#334155' }}>Discount Value</label>
                  <input
                    type="number"
                    className="admin-input"
                    value={newOffer.discountValue}
                    onChange={(e) => setNewOffer({ ...newOffer, discountValue: Number(e.target.value) })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#334155' }}>Min Order Amount (₹)</label>
                  <input
                    type="number"
                    className="admin-input"
                    value={newOffer.minAmount}
                    onChange={(e) => setNewOffer({ ...newOffer, minAmount: Number(e.target.value) })}
                    required
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label" style={{ color: '#334155' }}>Description</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. ₹50 OFF on all IMAX screenings above ₹300"
                    value={newOffer.description}
                    onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOffers;

