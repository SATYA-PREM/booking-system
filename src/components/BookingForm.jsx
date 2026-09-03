import React from 'react';
import { User, Mail, Phone, Users, MessageSquare, Plus, Minus, AlertCircle } from 'lucide-react';

const BookingForm = ({ formData, setFormData, errors = {} }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const adjustPeople = (delta) => {
    setFormData((prev) => {
      const current = parseInt(prev.people, 10) || 1;
      const next = Math.max(1, Math.min(20, current + delta));
      return { ...prev, people: next };
    });
  };

  return (
    <div className="booking-form-fields">
      {/* Full Name */}
      <div className="form-group">
        <label className="form-label" htmlFor="fullName">
          Full Name <span className="required">*</span>
        </label>
        <div style={{ position: 'relative' }}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className="form-input"
            placeholder="e.g. Satya Prem"
            value={formData.fullName}
            onChange={handleChange}
            autoComplete="name"
          />
        </div>
        {errors.fullName && (
          <p className="form-error">
            <AlertCircle size={14} /> {errors.fullName}
          </p>
        )}
      </div>

      {/* 2-col Email & Phone */}
      <div className="form-row-2">
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email Address <span className="required">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
          {errors.email && (
            <p className="form-error">
              <AlertCircle size={14} /> {errors.email}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="phone">
            Phone Number <span className="required">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="form-input"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
          />
          {errors.phone && (
            <p className="form-error">
              <AlertCircle size={14} /> {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Number of People */}
      <div className="form-group">
        <label className="form-label">
          Number of People / Attendees <span className="required">*</span>
        </label>
        <div className="people-counter-wrap">
          <button
            type="button"
            className="counter-btn"
            onClick={() => adjustPeople(-1)}
            disabled={formData.people <= 1}
            aria-label="Decrease people"
          >
            <Minus size={18} />
          </button>
          <span className="counter-display">{formData.people}</span>
          <button
            type="button"
            className="counter-btn"
            onClick={() => adjustPeople(1)}
            disabled={formData.people >= 20}
            aria-label="Increase people"
          >
            <Plus size={18} />
          </button>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {formData.people === 1 ? '1 Person' : `${formData.people} People`}
          </span>
        </div>
      </div>

      {/* Special Request */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="specialRequests">
          Special Requests or Instructions (Optional)
        </label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          rows={3}
          className="form-textarea"
          placeholder="Any dietary preferences, specific equipment, or arrival instructions..."
          value={formData.specialRequests}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default BookingForm;

