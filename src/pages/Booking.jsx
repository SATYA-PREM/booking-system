import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { getServiceById } from '../data/services';
import { saveDraft, getDraft, formatCurrency } from '../utils/localStorage';
import DatePicker from '../components/DatePicker';
import TimeSlots from '../components/TimeSlots';
import BookingForm from '../components/BookingForm';
import '../styles/booking.css';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = getServiceById(id);

  // Initial state from previous draft or fresh
  const existingDraft = getDraft();

  const [selectedDate, setSelectedDate] = useState(
    existingDraft?.serviceId === id ? existingDraft.date : ''
  );
  const [selectedTime, setSelectedTime] = useState(
    existingDraft?.serviceId === id ? existingDraft.time : ''
  );
  const [formData, setFormData] = useState({
    fullName: existingDraft?.customer || '',
    email: existingDraft?.email || '',
    phone: existingDraft?.phone || '',
    people: existingDraft?.people || 2,
    specialRequests: existingDraft?.specialRequests || ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!service) {
      navigate('/services');
    }
  }, [service, navigate]);

  if (!service) return null;

  const unitPrice = service.price;
  const peopleCount = parseInt(formData.people, 10) || 1;
  const subtotal = unitPrice * peopleCount;
  const bookingFee = 100;
  const totalAmount = subtotal + bookingFee;

  const validate = () => {
    const errs = {};
    if (!selectedDate) {
      errs.date = 'Please choose a booking date.';
    }
    if (!selectedTime) {
      errs.time = 'Please select a preferred time slot.';
    }
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (formData.phone.replace(/\D/g, '').length < 7) {
      errs.phone = 'Please enter a valid contact phone number.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll to the first error
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    const draftData = {
      serviceId: service.id,
      service: service.shortTitle || service.title,
      serviceTitle: service.title,
      category: service.category,
      unitPrice,
      priceUnit: service.priceUnit,
      people: peopleCount,
      subtotal,
      bookingFee,
      totalAmount,
      date: selectedDate,
      time: selectedTime,
      customer: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      specialRequests: formData.specialRequests.trim(),
      serviceImage: service.image
    };

    saveDraft(draftData);
    navigate('/checkout');
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Back Link */}
        <Link to={`/services/${service.id}`} className="details-back-link">
          <ArrowLeft size={16} />
          <span>Back to {service.shortTitle || 'Service'} Details</span>
        </Link>

        <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
          <span className="section-badge">Booking Step 1 of 2</span>
          <h1 className="section-title">Schedule Your Booking</h1>
          <p className="section-subtitle" style={{ margin: '0' }}>
            Choose your preferred date, convenient time slot, and tell us who is attending.
          </p>
        </div>

        <form onSubmit={handleContinue} className="booking-page-layout" noValidate>
          {/* Main Form Body */}
          <div className="booking-form-card">
            {/* Step 1: Choose Date */}
            <div className="section-block">
              <h2 className="block-title">
                <span className="block-step-num">1</span>
                <span>Choose Date</span>
              </h2>
              {errors.date && (
                <p className="form-error" style={{ marginBottom: '0.75rem' }}>
                  <AlertCircle size={14} /> {errors.date}
                </p>
              )}
              <DatePicker
                selectedDate={selectedDate}
                onSelectDate={(formatted) => {
                  setSelectedDate(formatted);
                  setErrors((prev) => ({ ...prev, date: undefined }));
                }}
              />
            </div>

            {/* Step 2: Choose Time */}
            <div className="section-block">
              <h2 className="block-title">
                <span className="block-step-num">2</span>
                <span>Choose Time Slot</span>
              </h2>
              {errors.time && (
                <p className="form-error" style={{ marginBottom: '0.75rem' }}>
                  <AlertCircle size={14} /> {errors.time}
                </p>
              )}
              <TimeSlots
                slots={service.availableTimeSlots}
                selectedTime={selectedTime}
                onSelectTime={(time) => {
                  setSelectedTime(time);
                  setErrors((prev) => ({ ...prev, time: undefined }));
                }}
              />
            </div>

            {/* Step 3: User Details */}
            <div className="section-block">
              <h2 className="block-title">
                <span className="block-step-num">3</span>
                <span>Your Details</span>
              </h2>
              <BookingForm
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button type="submit" className="btn btn-primary btn-block btn-lg">
                <span>Continue to Review</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Sticky Summary Sidebar */}
          <div className="booking-summary-sidebar">
            <div className="summary-card">
              <div className="summary-header">
                <img src={service.image} alt={service.title} className="summary-thumb" />
                <div className="summary-info">
                  <span className="badge badge-category" style={{ fontSize: '0.7rem' }}>
                    {service.category}
                  </span>
                  <h3>{service.title}</h3>
                  <p>Duration: {service.duration}</p>
                </div>
              </div>

              <div className="summary-rows">
                <div className="summary-row">
                  <span>Selected Date:</span>
                  <strong style={{ color: selectedDate ? 'var(--text-main)' : 'var(--text-light)' }}>
                    {selectedDate || 'Not selected'}
                  </strong>
                </div>

                <div className="summary-row">
                  <span>Selected Time:</span>
                  <strong style={{ color: selectedTime ? 'var(--text-main)' : 'var(--text-light)' }}>
                    {selectedTime || 'Not selected'}
                  </strong>
                </div>

                <div className="summary-row">
                  <span>Attendees:</span>
                  <strong>{peopleCount} Person(s)</strong>
                </div>

                <div className="summary-row highlight">
                  <span>Service Base ({formatCurrency(unitPrice)} × {peopleCount}):</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="summary-row">
                  <span>Booking & Platform Fee:</span>
                  <span>{formatCurrency(bookingFee)}</span>
                </div>
              </div>

              <div className="summary-total-row">
                <span className="summary-total-label">Estimated Total:</span>
                <span className="summary-total-val">{formatCurrency(totalAmount)}</span>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={16} color="var(--success)" />
                <span>Zero cancellation penalty before session</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;

