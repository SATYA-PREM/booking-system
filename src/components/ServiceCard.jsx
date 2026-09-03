import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/localStorage';

const ServiceCard = ({ service }) => {
  const {
    id,
    title,
    category,
    price,
    priceUnit,
    rating,
    reviewsCount,
    duration,
    image,
    description,
    badge
  } = service;

  return (
    <div className="service-card">
      <div className="service-image-wrap">
        <img src={image} alt={title} className="service-image" loading="lazy" />
        <span className="service-tag">{category}</span>
        {badge && <span className="service-badge-pill">{badge}</span>}
      </div>

      <div className="service-card-body">
        <div className="service-meta">
          <div className="service-rating">
            <Star size={15} fill="#d97706" color="#d97706" />
            <span>{rating}</span>
            <span style={{ color: 'var(--text-light)', fontWeight: 500, fontSize: '0.8rem' }}>
              ({reviewsCount})
            </span>
          </div>
          <div className="service-duration">
            <Clock size={14} />
            <span>{duration}</span>
          </div>
        </div>

        <h3 className="service-title" title={title}>
          {title}
        </h3>

        <p className="service-desc">{description}</p>

        <div className="service-card-footer">
          <div className="service-price-block">
            <span className="price-label">Starts at</span>
            <div>
              <span className="price-amount">{formatCurrency(price)}</span>
              <span className="price-unit"> / {priceUnit}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to={`/services/${id}`} className="btn btn-secondary btn-sm" title="View details">
              View
            </Link>
            <Link to={`/booking/${id}`} className="btn btn-primary btn-sm" title="Book this service">
              <span>Book</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

