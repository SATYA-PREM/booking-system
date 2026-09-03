import React, { useState, useEffect } from 'react';
import { MessageSquare, Star, CheckCircle2, Trash2, ShieldCheck, Check } from 'lucide-react';
import { getReviews, updateReviewStatus, deleteReview } from '../../services/storage';
import AdminTopNavbar from '../../components/admin/AdminTopNavbar';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);

  const loadData = () => {
    setReviews(getReviews());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('moviemagic_state_change', loadData);
    return () => window.removeEventListener('moviemagic_state_change', loadData);
  }, []);

  const handleApprove = (id) => {
    updateReviewStatus(id, 'approved');
    loadData();
  };

  const handleDelete = (id) => {
    deleteReview(id);
    loadData();
  };

  return (
    <div>
      <AdminTopNavbar title="Audience Reviews Moderation" subtitle="Review customer feedback, movie ratings, and sentiment" />

      <div className="admin-view-body">
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h3 className="admin-card-title">User Reviews Queue</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                {reviews.length} total customer reviews recorded
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {reviews.map((rev) => (
              <div
                key={rev.id}
                style={{
                  padding: '1.25rem',
                  background: '#f8fafc',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                    <strong style={{ fontSize: '1rem', color: 'var(--admin-text-main)' }}>{rev.author}</strong>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>on {rev.movieTitle}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#d97706', fontWeight: 700, fontSize: '0.85rem' }}>
                      <Star size={13} fill="#d97706" /> {rev.rating}/5
                    </span>
                  </div>
                  <p style={{ color: '#334155', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    "{rev.comment}"
                  </p>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.35rem', display: 'block' }}>
                    Posted {rev.date}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span className={`badge ${rev.status === 'approved' ? 'badge-confirmed' : 'badge-warning'}`}>
                    {rev.status}
                  </span>
                  {rev.status !== 'approved' && (
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => handleApprove(rev.id)}>
                      <Check size={14} /> Approve
                    </button>
                  )}
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(rev.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;

