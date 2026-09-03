import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, SlidersHorizontal, Sparkles, AlertCircle } from 'lucide-react';
import { SERVICES, CATEGORIES } from '../data/services';
import ServiceCard from '../components/ServiceCard';
import '../styles/services.css';

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('popular');

  // Sync category state with query params
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && CATEGORIES.includes(cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredServices = useMemo(() => {
    let list = SERVICES.filter((service) => {
      const matchCat =
        selectedCategory === 'All' || service.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        service.title.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q) ||
        service.category.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Page Header */}
        <div className="section-header services-page-header">
          <span className="section-badge">Catalogue</span>
          <h1 className="section-title">All Services & Events</h1>
          <p className="section-subtitle">
            Explore and book high-quality verified services with guaranteed time slots and zero hidden costs.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="services-filter-bar">
          <div className="search-sort-row">
            {/* Search Input */}
            <div className="search-box-wrap">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                className="search-input"
                placeholder="Search services by title, category, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Sort Select */}
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort services"
            >
              <option value="popular">Sort: Most Popular</option>
              <option value="rating">Sort: Top Rated ★</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Category Filter Pills */}
          <div className="category-pills-row">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Bar */}
        <div className="results-count-bar">
          <span>
            Showing <strong>{filteredServices.length}</strong> available {filteredServices.length === 1 ? 'service' : 'services'}
          </span>
          {(searchQuery || selectedCategory !== 'All') && (
            <button
              className="btn btn-outline btn-sm"
              onClick={() => {
                setSearchQuery('');
                handleCategoryChange('All');
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Services Grid or Empty State */}
        {filteredServices.length > 0 ? (
          <div className="services-grid">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="empty-services">
            <AlertCircle className="empty-icon" />
            <h3 className="empty-title">No services found</h3>
            <p className="empty-desc">
              We could not find any services matching "<strong>{searchQuery || selectedCategory}</strong>".
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSearchQuery('');
                handleCategoryChange('All');
              }}
            >
              Show All Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;

