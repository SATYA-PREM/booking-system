import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { initializeDatabase } from './services/storage';

// Customer Components & Pages
import CustomerNavbar from './components/customer/CustomerNavbar';
import CustomerFooter from './components/customer/CustomerFooter';
import MovieBot from './components/chatbot/MovieBot';

import CustomerHome from './pages/customer/CustomerHome';
import CustomerMovies from './pages/customer/CustomerMovies';
import CustomerMovieDetails from './pages/customer/CustomerMovieDetails';
import CustomerTheatres from './pages/customer/CustomerTheatres';
import CustomerShowSelection from './pages/customer/CustomerShowSelection';
import CustomerSeatSelection from './pages/customer/CustomerSeatSelection';
import CustomerCheckout from './pages/customer/CustomerCheckout';
import CustomerPayment from './pages/customer/CustomerPayment';
import CustomerBookingSuccess from './pages/customer/CustomerBookingSuccess';
import CustomerTicket from './pages/customer/CustomerTicket';
import CustomerBookings from './pages/customer/CustomerBookings';
import CustomerWishlist from './pages/customer/CustomerWishlist';
import CustomerOffers from './pages/customer/CustomerOffers';
import CustomerFAQ from './pages/customer/CustomerFAQ';
import CustomerProfile from './pages/customer/CustomerProfile';
import CustomerNotFound from './pages/customer/CustomerNotFound';

// Admin Components & Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMovies from './pages/admin/AdminMovies';
import AdminTheatres from './pages/admin/AdminTheatres';
import AdminShows from './pages/admin/AdminShows';
import AdminBookings from './pages/admin/AdminBookings';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminPayments from './pages/admin/AdminPayments';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminOffers from './pages/admin/AdminOffers';
import AdminReviews from './pages/admin/AdminReviews';
import AdminNotifications from './pages/admin/AdminNotifications';
import AdminSettings from './pages/admin/AdminSettings';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Customer Layout Shell
const CustomerShell = ({ children }) => {
  return (
    <>
      <CustomerNavbar />
      <main style={{ flex: 1 }}>{children}</main>
      <CustomerFooter />
      <MovieBot />
    </>
  );
};

function App() {
  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Customer Portal Routes */}
        <Route path="/" element={<CustomerShell><CustomerHome /></CustomerShell>} />
        <Route path="/movies" element={<CustomerShell><CustomerMovies /></CustomerShell>} />
        <Route path="/movies/:id" element={<CustomerShell><CustomerMovieDetails /></CustomerShell>} />
        <Route path="/theatres" element={<CustomerShell><CustomerTheatres /></CustomerShell>} />
        <Route path="/shows" element={<CustomerShell><CustomerShowSelection /></CustomerShell>} />
        <Route path="/shows/:movieId" element={<CustomerShell><CustomerShowSelection /></CustomerShell>} />
        <Route path="/seats/:showId" element={<CustomerShell><CustomerSeatSelection /></CustomerShell>} />
        <Route path="/checkout" element={<CustomerShell><CustomerCheckout /></CustomerShell>} />
        <Route path="/payment" element={<CustomerShell><CustomerPayment /></CustomerShell>} />
        <Route path="/booking-success" element={<CustomerShell><CustomerBookingSuccess /></CustomerShell>} />
        <Route path="/ticket/:id" element={<CustomerShell><CustomerTicket /></CustomerShell>} />
        <Route path="/bookings" element={<CustomerShell><CustomerBookings /></CustomerShell>} />
        <Route path="/my-bookings" element={<CustomerShell><CustomerBookings /></CustomerShell>} />
        <Route path="/wishlist" element={<CustomerShell><CustomerWishlist /></CustomerShell>} />
        <Route path="/offers" element={<CustomerShell><CustomerOffers /></CustomerShell>} />
        <Route path="/faq" element={<CustomerShell><CustomerFAQ /></CustomerShell>} />
        <Route path="/profile" element={<CustomerShell><CustomerProfile /></CustomerShell>} />

        {/* Admin Cinema SaaS Portal Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="movies" element={<AdminMovies />} />
          <Route path="theatres" element={<AdminTheatres />} />
          <Route path="shows" element={<AdminShows />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="offers" element={<AdminOffers />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* 404 Catch All */}
        <Route path="*" element={<CustomerShell><CustomerNotFound /></CustomerShell>} />
      </Routes>
    </>
  );
}

export default App;
