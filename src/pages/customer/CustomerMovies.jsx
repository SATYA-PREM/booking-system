import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, X, AlertCircle, Sparkles } from 'lucide-react';
import { getMovies } from '../../services/storage';
import MovieCard from '../../components/customer/MovieCard';
import TrailerModal from '../../components/customer/TrailerModal';

const GENRES = ['All', 'Action', 'Sci-Fi', 'Adventure', 'Drama', 'Crime', 'Biography', 'Romance'];
const LANGUAGES = ['All', 'English', 'Hindi', 'Tamil', 'Telugu'];
const FORMATS = ['All', '2D', '3D', 'IMAX', '4DX'];

const CustomerMovies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const movies = getMovies();

  const queryParam = searchParams.get('q') || '';
  const statusParam = searchParams.get('status') || 'all';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [statusFilter, setStatusFilter] = useState(statusParam); // 'all' | 'now-showing' | 'coming-soon'
  const [sortBy, setSortBy] = useState('popular');
  const [trailerMovie, setTrailerMovie] = useState(null);

  useEffect(() => {
    if (queryParam) setSearchQuery(queryParam);
    if (statusParam) setStatusFilter(statusParam);
  }, [queryParam, statusParam]);

  const filteredMovies = useMemo(() => {
    let list = movies.filter((m) => {
      // Status Filter
      if (statusFilter !== 'all' && m.status !== statusFilter) return false;

      // Genre Filter
      if (selectedGenre !== 'All' && !m.genre.includes(selectedGenre)) return false;

      // Language Filter
      if (selectedLanguage !== 'All' && !m.availableLanguages.includes(selectedLanguage)) return false;

      // Format Filter
      if (selectedFormat !== 'All' && !m.formats.includes(selectedFormat)) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = m.title.toLowerCase().includes(q);
        const matchDirector = m.director.toLowerCase().includes(q);
        const matchCast = m.cast.some((c) => c.toLowerCase().includes(q));
        const matchGenre = m.genre.some((g) => g.toLowerCase().includes(q));
        if (!matchTitle && !matchDirector && !matchCast && !matchGenre) return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-low') {
      list.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === 'title') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [movies, statusFilter, selectedGenre, selectedLanguage, selectedFormat, searchQuery, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSelectedLanguage('All');
    setSelectedFormat('All');
    setStatusFilter('all');
    setSearchParams({});
  };

  return (
    <div className="page-wrapper container">
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="section-badge">Catalogue</span>
        <h1 className="section-title">Explore Movies</h1>
        <p className="section-subtitle">
          Browse blockbuster movies, upcoming advance bookings, filter by language, audio format, and genre.
        </p>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          background: 'var(--bg-cinema-card)',
          border: '1px solid var(--border-dark)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}
      >
        {/* Search & Sort Row */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.75rem' }}
              placeholder="Search by movie title, actor, or director..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <select
              className="form-select"
              style={{ minWidth: '150px' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Releases</option>
              <option value="now-showing">Now Showing</option>
              <option value="coming-soon">Coming Soon</option>
            </select>

            <select
              className="form-select"
              style={{ minWidth: '170px' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Sort: Most Popular</option>
              <option value="rating">Sort: Top Rated ★</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="title">A to Z</option>
            </select>
          </div>
        </div>

        {/* Category Pills Row */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {GENRES.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setSelectedGenre(g)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid',
                borderColor: selectedGenre === g ? 'var(--primary)' : 'var(--border-dark)',
                background: selectedGenre === g ? 'var(--primary)' : 'var(--bg-cinema-subtle)',
                color: selectedGenre === g ? '#fff' : 'var(--text-gray-300)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition)'
              }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Results Meta */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        <span>Showing <strong>{filteredMovies.length}</strong> movie title(s)</span>
        {(searchQuery || selectedGenre !== 'All' || statusFilter !== 'all') && (
          <button type="button" className="btn btn-outline btn-sm" onClick={resetFilters}>
            Reset Filters
          </button>
        )}
      </div>

      {/* Grid or Empty */}
      {filteredMovies.length > 0 ? (
        <div className="movies-grid">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onWatchTrailer={() => setTrailerMovie(movie)}
            />
          ))}
        </div>
      ) : (
        <div style={{ background: 'var(--bg-cinema-card)', padding: '4rem 2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px dashed var(--border-light)' }}>
          <AlertCircle size={48} style={{ color: 'var(--text-dim)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>No Movies Found</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
            We could not find any titles matching your search criteria.
          </p>
          <button type="button" className="btn btn-primary" onClick={resetFilters}>
            Show All Movies
          </button>
        </div>
      )}

      {/* Trailer Modal */}
      {trailerMovie && (
        <TrailerModal
          movie={trailerMovie}
          onClose={() => setTrailerMovie(null)}
        />
      )}
    </div>
  );
};

export default CustomerMovies;

