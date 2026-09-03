import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Zap, Calendar, Award, CheckCircle } from 'lucide-react';
import { SERVICES } from '../data/services';
import ServiceCard from '../components/ServiceCard';
import '../styles/home.css';

const Home = () => {
  // Popular services (Top 3 from prompt: Photography, Salon, Conference)
  const popularServices = SERVICES.slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Fast, Seamless & Transparent Booking Platform</span>
          </div>

          <h1 className="hero-title">
            Book Anything, <span className="gradient-text">Easily.</span>
          </h1>

          <p className="hero-subtitle">
            Find and book top-rated photography, salon treatments, event spaces, travel tours, and home services in just a few clicks.
          </p>

          <div className="hero-actions">
            <Link to="/services" className="btn btn-primary btn-lg">
              <span>Explore Services</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/my-bookings" className="btn btn-secondary btn-lg">
              <span>My Bookings</span>
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">500+</span>
              <span className="stat-label">Bookings Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">4.9 ★</span>
              <span className="stat-label">Average User Rating</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">100%</span>
              <span className="stat-label">Instant Confirmation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="popular-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Top Picks</span>
            <h2 className="section-title">Popular Services</h2>
            <p className="section-subtitle">
              Hand-picked verified experiences and professional services loved by thousands of happy clients.
            </p>
          </div>

          <div className="services-grid">
            {popularServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/services" className="btn btn-secondary btn-lg">
              <span>View All 8+ Available Services</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Simple 4-Step Process</span>
            <h2 className="section-title">How BookEasy Works</h2>
            <p className="section-subtitle">
              Booking your favorite service has never been this effortless.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">Select Service</h3>
              <p className="step-desc">
                Browse our curated catalogue of premium events, photography, salon, and wellness services.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">Pick Date & Time</h3>
              <p className="step-desc">
                Choose convenient available calendar dates and comfortable time slots suited to your schedule.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Enter Details</h3>
              <p className="step-desc">
                Fill in your contact information and customize the number of attendees with clear live pricing.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <h3 className="step-title">Instant Booking</h3>
              <p className="step-desc">
                Review your breakdown, complete quick demo verification, and receive an instant booking voucher!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Schedule Your Next Experience?</h2>
            <p>
              Join thousands of customers who enjoy frictionless, transparent scheduling without unexpected hidden charges.
            </p>
            <Link to="/services" className="btn btn-primary btn-lg" style={{ background: '#fff', color: 'var(--primary)' }}>
              <span>Browse All Services</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

