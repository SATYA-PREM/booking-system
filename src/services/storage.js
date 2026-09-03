import {
  INITIAL_MOVIES,
  INITIAL_THEATRES,
  INITIAL_SCREENS,
  INITIAL_SHOWS,
  INITIAL_OFFERS,
  INITIAL_BOOKINGS,
  INITIAL_CUSTOMERS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS,
  INITIAL_SETTINGS
} from '../data/seedData';

const KEYS = {
  MOVIES: 'moviemagic_movies',
  THEATRES: 'moviemagic_theatres',
  SCREENS: 'moviemagic_screens',
  SHOWS: 'moviemagic_shows',
  SEATS: 'moviemagic_seats',
  BOOKINGS: 'moviemagic_bookings',
  TRANSACTIONS: 'moviemagic_transactions',
  CUSTOMERS: 'moviemagic_customers',
  OFFERS: 'moviemagic_offers',
  REVIEWS: 'moviemagic_reviews',
  NOTIFICATIONS: 'moviemagic_notifications',
  SETTINGS: 'moviemagic_settings',
  WISHLIST: 'moviemagic_wishlist',
  CART: 'moviemagic_cart',
  USER: 'moviemagic_user'
};

// Helper: Safely parse or initialize with fallback
const getStorageItem = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
};

const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch custom event for cross-component reactive updates
    window.dispatchEvent(new Event('moviemagic_state_change'));
  } catch (err) {
    console.error(`Error writing ${key} to storage:`, err);
  }
};

// Initial Seed Check
export const initializeDatabase = () => {
  getStorageItem(KEYS.MOVIES, INITIAL_MOVIES);
  getStorageItem(KEYS.THEATRES, INITIAL_THEATRES);
  getStorageItem(KEYS.SCREENS, INITIAL_SCREENS);
  getStorageItem(KEYS.SHOWS, INITIAL_SHOWS);
  getStorageItem(KEYS.OFFERS, INITIAL_OFFERS);
  getStorageItem(KEYS.BOOKINGS, INITIAL_BOOKINGS);
  getStorageItem(KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
  getStorageItem(KEYS.REVIEWS, INITIAL_REVIEWS);
  getStorageItem(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  getStorageItem(KEYS.SETTINGS, INITIAL_SETTINGS);
  getStorageItem(KEYS.WISHLIST, ['MOV001', 'MOV003']);
};

// --- MOVIES ---
export const getMovies = () => getStorageItem(KEYS.MOVIES, INITIAL_MOVIES);

export const getMovieById = (id) => {
  const movies = getMovies();
  return movies.find((m) => m.id === id || m.slug === id) || null;
};

export const saveMovie = (movie) => {
  const movies = getMovies();
  if (movie.id) {
    const index = movies.findIndex((m) => m.id === movie.id);
    if (index !== -1) {
      movies[index] = { ...movies[index], ...movie };
    } else {
      movies.unshift(movie);
    }
  } else {
    const newId = `MOV0${movies.length + 1}`.padStart(6, '0');
    const newMovie = {
      ...movie,
      id: newId,
      slug: (movie.title || 'movie').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: movie.rating || 4.5,
      reviewsCount: 0
    };
    movies.unshift(newMovie);
  }
  setStorageItem(KEYS.MOVIES, movies);
  return movie;
};

export const deleteMovie = (id) => {
  const movies = getMovies();
  const updated = movies.filter((m) => m.id !== id);
  setStorageItem(KEYS.MOVIES, updated);
  return true;
};

// --- THEATRES & SCREENS ---
export const getTheatres = () => getStorageItem(KEYS.THEATRES, INITIAL_THEATRES);

export const getTheatreById = (id) => {
  const theatres = getTheatres();
  return theatres.find((t) => t.id === id) || null;
};

export const saveTheatre = (theatre) => {
  const theatres = getTheatres();
  if (theatre.id) {
    const index = theatres.findIndex((t) => t.id === theatre.id);
    if (index !== -1) {
      theatres[index] = { ...theatres[index], ...theatre };
    } else {
      theatres.push(theatre);
    }
  } else {
    theatre.id = `TH00${theatres.length + 1}`;
    theatres.push(theatre);
  }
  setStorageItem(KEYS.THEATRES, theatres);
  return theatre;
};

export const getScreens = () => getStorageItem(KEYS.SCREENS, INITIAL_SCREENS);

export const getScreensByTheatre = (theatreId) => {
  const screens = getScreens();
  return screens.filter((s) => s.theatreId === theatreId);
};

// --- SHOWS ---
export const getShows = () => getStorageItem(KEYS.SHOWS, INITIAL_SHOWS);

export const getShowsByMovie = (movieId, dateStr) => {
  const shows = getShows();
  return shows.filter((s) => s.movieId === movieId && (!dateStr || s.date === dateStr));
};

export const getShowsByTheatre = (theatreId, dateStr) => {
  const shows = getShows();
  return shows.filter((s) => s.theatreId === theatreId && (!dateStr || s.date === dateStr));
};

export const createShow = (showData) => {
  const shows = getShows();
  const newShow = {
    ...showData,
    id: `SHOW0${shows.length + 1}`.padStart(7, '0'),
    status: 'available'
  };
  shows.push(newShow);
  setStorageItem(KEYS.SHOWS, shows);
  return newShow;
};

export const deleteShow = (id) => {
  const shows = getShows();
  const updated = shows.filter((s) => s.id !== id);
  setStorageItem(KEYS.SHOWS, updated);
  return true;
};

// --- SEAT MATRIX & OCCUPANCY ---
export const SEAT_TIERS = {
  Silver: { name: 'Silver', rows: ['A', 'B'], price: 180, color: '#94a3b8' },
  Gold: { name: 'Gold', rows: ['C', 'D'], price: 220, color: '#f59e0b' },
  Premium: { name: 'Premium', rows: ['E', 'F'], price: 280, color: '#8b5cf6' },
  Recliner: { name: 'Recliner', rows: ['G'], price: 400, color: '#ec4899' }
};

export const getShowSeats = (showId) => {
  const allSeatsMap = getStorageItem(KEYS.SEATS, {});
  if (allSeatsMap[showId]) {
    return allSeatsMap[showId];
  }

  // Generate standard default seat configuration
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const cols = 10;
  const generated = {};

  rows.forEach((row) => {
    for (let c = 1; c <= cols; c++) {
      const seatCode = `${row}${c}`;
      // Pre-seed some occupied seats for realism (e.g. B4, B5, C6, E3)
      const isPreOccupied = ['B4', 'B5', 'C6', 'C7', 'E3', 'E4', 'F8', 'F9'].includes(seatCode);
      generated[seatCode] = isPreOccupied ? 'occupied' : 'available';
    }
  });

  allSeatsMap[showId] = generated;
  setStorageItem(KEYS.SEATS, allSeatsMap);
  return generated;
};

export const occupySeats = (showId, seatCodes) => {
  const allSeatsMap = getStorageItem(KEYS.SEATS, {});
  const showSeats = getShowSeats(showId);
  seatCodes.forEach((code) => {
    showSeats[code] = 'occupied';
  });
  allSeatsMap[showId] = showSeats;
  setStorageItem(KEYS.SEATS, allSeatsMap);
};

export const releaseSeats = (showId, seatCodes) => {
  const allSeatsMap = getStorageItem(KEYS.SEATS, {});
  const showSeats = getShowSeats(showId);
  seatCodes.forEach((code) => {
    showSeats[code] = 'available';
  });
  allSeatsMap[showId] = showSeats;
  setStorageItem(KEYS.SEATS, allSeatsMap);
};

// --- BOOKINGS & TRANSACTIONS ---
export const getBookings = () => getStorageItem(KEYS.BOOKINGS, INITIAL_BOOKINGS);

export const getBookingById = (id) => {
  const bookings = getBookings();
  return bookings.find((b) => b.id === id) || null;
};

export const generateBookingId = () => {
  const now = new Date();
  const y = now.getFullYear().toString().slice(2);
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `MM${y}${m}${d}${rand}`;
};

export const createBooking = (bookingData) => {
  const bookings = getBookings();
  const bookingId = generateBookingId();
  const txnId = `TXN-${Date.now().toString().slice(-8)}`;

  const newBooking = {
    ...bookingData,
    id: bookingId,
    transactionId: txnId,
    paymentStatus: 'paid',
    bookingStatus: 'CONFIRMED',
    createdAt: new Date().toISOString()
  };

  // 1. Occupy the selected seats
  occupySeats(bookingData.showId, bookingData.seats);

  // 2. Save booking
  bookings.unshift(newBooking);
  setStorageItem(KEYS.BOOKINGS, bookings);

  // 3. Update customer stats
  const customers = getCustomers();
  const custIndex = customers.findIndex((c) => c.email === bookingData.email || c.name === bookingData.customer);
  if (custIndex !== -1) {
    customers[custIndex].bookingsCount += 1;
    customers[custIndex].totalSpent += Number(bookingData.total);
    customers[custIndex].lastBooking = bookingData.movieTitle;
    setStorageItem(KEYS.CUSTOMERS, customers);
  }

  // 4. Update coupon count if applied
  if (bookingData.couponCode) {
    const offers = getOffers();
    const offer = offers.find((o) => o.code === bookingData.couponCode);
    if (offer) {
      offer.usedCount += 1;
      setStorageItem(KEYS.OFFERS, offers);
    }
  }

  // 5. Add notification
  addNotification({
    title: 'Booking Confirmed!',
    message: `Your reservation for ${bookingData.movieTitle} (${bookingData.seats.join(', ')}) is confirmed.`,
    type: 'booking'
  });

  return newBooking;
};

export const cancelBooking = (bookingId) => {
  const bookings = getBookings();
  const booking = bookings.find((b) => b.id === bookingId);
  if (!booking) return null;

  booking.bookingStatus = 'CANCELLED';
  booking.paymentStatus = 'refunded';
  booking.cancelledAt = new Date().toISOString();

  // 1. Release seats
  if (booking.showId && booking.seats) {
    releaseSeats(booking.showId, booking.seats);
  }

  setStorageItem(KEYS.BOOKINGS, bookings);

  // 2. Add notification
  addNotification({
    title: 'Booking Cancelled',
    message: `Booking #${bookingId} has been cancelled. Demo refund of ₹${booking.total} processed.`,
    type: 'booking'
  });

  return booking;
};

// --- CUSTOMERS ---
export const getCustomers = () => getStorageItem(KEYS.CUSTOMERS, INITIAL_CUSTOMERS);

// --- OFFERS ---
export const getOffers = () => getStorageItem(KEYS.OFFERS, INITIAL_OFFERS);

export const validateCoupon = (code, subtotal) => {
  const offers = getOffers();
  const found = offers.find((o) => o.code.toUpperCase() === code.toUpperCase().trim() && o.isActive);

  if (!found) {
    return { valid: false, message: 'Invalid or expired coupon code.' };
  }

  if (subtotal < found.minAmount) {
    return {
      valid: false,
      message: `Minimum ticket amount of ₹${found.minAmount} required for this coupon.`
    };
  }

  let discount = 0;
  if (found.discountType === 'flat') {
    discount = found.discountValue;
  } else {
    discount = Math.round((subtotal * found.discountValue) / 100);
    if (found.maxDiscount) {
      discount = Math.min(discount, found.maxDiscount);
    }
  }

  return {
    valid: true,
    discount,
    code: found.code,
    description: found.description
  };
};

export const saveOffer = (offer) => {
  const offers = getOffers();
  if (offer.id) {
    const idx = offers.findIndex((o) => o.id === offer.id);
    if (idx !== -1) offers[idx] = { ...offers[idx], ...offer };
    else offers.push(offer);
  } else {
    offer.id = `OFF00${offers.length + 1}`;
    offer.usedCount = 0;
    offers.push(offer);
  }
  setStorageItem(KEYS.OFFERS, offers);
  return offer;
};

// --- REVIEWS ---
export const getReviews = (movieId) => {
  const reviews = getStorageItem(KEYS.REVIEWS, INITIAL_REVIEWS);
  return movieId ? reviews.filter((r) => r.movieId === movieId && r.status === 'approved') : reviews;
};

export const addReview = (reviewData) => {
  const reviews = getStorageItem(KEYS.REVIEWS, INITIAL_REVIEWS);
  const newRev = {
    ...reviewData,
    id: `REV00${reviews.length + 1}`,
    date: 'Just now',
    status: 'approved'
  };
  reviews.unshift(newRev);
  setStorageItem(KEYS.REVIEWS, reviews);
  return newRev;
};

export const updateReviewStatus = (id, status) => {
  const reviews = getStorageItem(KEYS.REVIEWS, INITIAL_REVIEWS);
  const rev = reviews.find((r) => r.id === id);
  if (rev) rev.status = status;
  setStorageItem(KEYS.REVIEWS, reviews);
};

export const deleteReview = (id) => {
  const reviews = getStorageItem(KEYS.REVIEWS, INITIAL_REVIEWS);
  const updated = reviews.filter((r) => r.id !== id);
  setStorageItem(KEYS.REVIEWS, updated);
};

// --- NOTIFICATIONS ---
export const getNotifications = () => getStorageItem(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);

export const addNotification = ({ title, message, type = 'system' }) => {
  const notifs = getNotifications();
  const newNotif = {
    id: `NOTIF0${notifs.length + 1}`,
    title,
    message,
    time: 'Just now',
    type,
    isRead: false
  };
  notifs.unshift(newNotif);
  setStorageItem(KEYS.NOTIFICATIONS, notifs);
};

export const markNotificationsRead = () => {
  const notifs = getNotifications().map((n) => ({ ...n, isRead: true }));
  setStorageItem(KEYS.NOTIFICATIONS, notifs);
};

// --- WISHLIST ---
export const getWishlist = () => getStorageItem(KEYS.WISHLIST, ['MOV001', 'MOV003']);

export const toggleWishlist = (movieId) => {
  const list = getWishlist();
  let updated;
  if (list.includes(movieId)) {
    updated = list.filter((id) => id !== movieId);
  } else {
    updated = [movieId, ...list];
  }
  setStorageItem(KEYS.WISHLIST, updated);
  return updated;
};

// --- CART / DRAFT BOOKING SESSION ---
export const saveCart = (cartData) => {
  setStorageItem(KEYS.CART, cartData);
};

export const getCart = () => {
  return getStorageItem(KEYS.CART, null);
};

export const clearCart = () => {
  localStorage.removeItem(KEYS.CART);
  window.dispatchEvent(new Event('moviemagic_state_change'));
};

// --- SETTINGS ---
export const getSettings = () => getStorageItem(KEYS.SETTINGS, INITIAL_SETTINGS);

export const saveSettings = (newSettings) => {
  setStorageItem(KEYS.SETTINGS, newSettings);
};

// --- ANALYTICS ENGINE FOR ADMIN ---
export const getAnalyticsSummary = () => {
  const bookings = getBookings();
  const movies = getMovies();
  const customers = getCustomers();

  const confirmedBookings = bookings.filter((b) => b.bookingStatus === 'CONFIRMED');
  const cancelledBookings = bookings.filter((b) => b.bookingStatus === 'CANCELLED');

  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + Number(b.total || 0), 0);
  const totalTickets = confirmedBookings.reduce((sum, b) => sum + Number(b.tickets || 1), 0);
  const avgTicketValue = confirmedBookings.length > 0 ? Math.round(totalRevenue / confirmedBookings.length) : 250;

  // Movie Performance Table
  const moviePerformance = movies.map((m) => {
    const movieBookings = confirmedBookings.filter((b) => b.movieId === m.id);
    const rev = movieBookings.reduce((sum, b) => sum + Number(b.total || 0), 0);
    return {
      id: m.id,
      title: m.title,
      poster: m.poster,
      bookingsCount: movieBookings.length,
      revenue: rev
    };
  }).sort((a, b) => b.revenue - a.revenue);

  // Genre Breakdown
  const genreMap = {};
  movies.forEach((m) => {
    m.genre.forEach((g) => {
      genreMap[g] = (genreMap[g] || 0) + 1;
    });
  });

  return {
    totalRevenue: totalRevenue + 84520, // baseline plus live
    totalBookingsCount: confirmedBookings.length + 1284,
    activeMoviesCount: movies.filter((m) => m.status === 'now-showing').length,
    totalCustomersCount: customers.length + 4816,
    avgTicketValue,
    confirmedBookingsCount: confirmedBookings.length,
    cancelledBookingsCount: cancelledBookings.length,
    totalTicketsSold: totalTickets + 3120,
    moviePerformance,
    genreLabels: Object.keys(genreMap),
    genreValues: Object.values(genreMap)
  };
};

// --- RESET DEMO DATA ---
export const resetDemoData = () => {
  localStorage.setItem(KEYS.MOVIES, JSON.stringify(INITIAL_MOVIES));
  localStorage.setItem(KEYS.THEATRES, JSON.stringify(INITIAL_THEATRES));
  localStorage.setItem(KEYS.SCREENS, JSON.stringify(INITIAL_SCREENS));
  localStorage.setItem(KEYS.SHOWS, JSON.stringify(INITIAL_SHOWS));
  localStorage.removeItem(KEYS.SEATS);
  localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
  localStorage.setItem(KEYS.CUSTOMERS, JSON.stringify(INITIAL_CUSTOMERS));
  localStorage.setItem(KEYS.OFFERS, JSON.stringify(INITIAL_OFFERS));
  localStorage.setItem(KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
  localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
  localStorage.setItem(KEYS.WISHLIST, JSON.stringify(['MOV001', 'MOV003']));
  localStorage.removeItem(KEYS.CART);
  window.dispatchEvent(new Event('moviemagic_state_change'));
};

// Currency Formatter
export const formatCurrency = (amt) => {
  return `₹${Number(amt || 0).toLocaleString('en-IN')}`;
};

