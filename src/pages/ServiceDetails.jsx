import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, CheckCircle2, ShieldCheck, Zap, Calendar, Sparkles } from 'lucide-react';
import { getServiceById } from '../data/services';
import { formatCurrency } from '../utils/localStorage';
import '../styles/details.css';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = getServiceById(id);

  if (!service) {
    return (
      <div className="page-wrapper container" style={{ textAlign: 'center', padding: '5rem 0' }}>
        <h2>Service Not Found</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
          The service you are looking for does not exist or has been relocated.
        </p>
        <Link to="/services" className="btn btn-primary">
          Browse All Services
        </Link>
      </div>
    );
  }

  const {
    title,
    category,
    price,
    priceUnit,
    rating,
    reviewsCount,
    duration,
    coverImage,
    image,
    description,
    highlights = [],
    included = []
  } = service;

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Back Link */}
        <button
          type="button"
          className="details-back-link"
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Services</span>
        </button>

        <div className="details-layout">
          {/* Main Details Column */}
          <div className="details-main">
            <div className="details-hero-img-wrap">
              <img src={coverImage || image} alt={title} className="details-hero-img" />
              <div className="details-hero-overlay">
                <span className="details-category-badge">{category}</span>
              </div>
            </div>

            <div className="details-content">
              <h1 className="details-title">{title}</h1>

              <div className="details-meta-bar">
                <div className="meta-rating">
                  <Star size={18} fill="#d97706" color="#d97706" />
                  <span>{rating}</span>
                  <span style={{ color: 'var(--text-light)', fontWeight: 500 }}>
                    ({reviewsCount} reviews)
                  </span>
                </div>

                <div className="meta-duration">
                  <Clock size={16} />
                  <span>Duration: {duration}</span>
                </div>

                <div className="meta-category">
                  <Sparkles size={16} color="var(--primary)" />
                  <span>Verified Partner</span>
                </div>
              </div>

              <h2 className="details-section-heading">Overview</h2>
              <p className="details-desc">{description}</p>

              {highlights.length > 0 && (
                <>
                  <h2 className="details-section-heading">Key Highlights</h2>
                  <ul className="highlights-list">
                    {highlights.map((h, i) => (
                      <li key={i} className="highlight-item">
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {included.length > 0 && (
                <>
                  <h2 className="details-section-heading">What's Included</h2>
                  <ul className="included-list">
                    {included.map((item, i) => (
                      <li key={i} className="included-item">
                        <CheckCircle2 size={18} className="check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Sticky Booking Sidebar */}
          <div className="details-sidebar">
            <div className="booking-action-card">
              <div className="action-price-row">
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 600, display: 'block' }}>
                    PRICE PER {priceUnit.toUpperCase()}
                  </span>
                  <span className="action-price">{formatCurrency(price)}</span>
                </div>
                <span className="action-price-unit">/{priceUnit}</span>
              </div>

              <ul className="action-features-list">
                <li className="action-feature-item">
                  <Calendar size={16} color="var(--primary)" />
                  <span>Flexible Date & Time Slots</span>
                </li>
                <li className="action-feature-item">
                  <Zap size={16} color="var(--primary)" />
                  <span>Instant Confirmation Receipt</span>
                </li>
                <li className="action-feature-item">
                  <ShieldCheck size={16} color="var(--primary)" />
                  <span>Free Cancellation anytime before slot</span>
                </li>
              </ul>

              <Link
                to={`/booking/${id}`}
                className="btn btn-primary btn-block btn-lg"
                style={{ textDecoration: 'none' }}
              >
                <span>Book Now</span>
              </Link>

              <div className="guarantee-box">
                <ShieldCheck size={18} />
                <span>100% Guaranteed Booking & Verified Vendor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;

