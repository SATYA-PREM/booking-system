const BOOKINGS_KEY = "bookeasy_bookings";
const DRAFT_KEY = "bookeasy_current_draft";

// Initial sample bookings so the user has immediate data to explore in "My Bookings"
const INITIAL_BOOKINGS = [
  {
    id: "BK-20260912-1024",
    serviceId: "serv-photography",
    service: "Photography",
    serviceTitle: "Professional Event & Portrait Photography",
    category: "Photography",
    date: "12 September 2026",
    rawDate: "2026-09-12",
    time: "03:00 PM",
    people: 2,
    customer: "Satya Prem",
    email: "satya.prem@example.com",
    phone: "+91 98765 43210",
    specialRequests: "Please bring natural outdoor lighting setup.",
    unitPrice: 2000,
    subtotal: 4000,
    bookingFee: 100,
    amount: 4100,
    paymentMethod: "Card",
    paymentId: "TXN-8942-CARD",
    createdAt: "2026-09-02T14:30:00.000Z",
    status: "CONFIRMED"
  }
];

export const generateBookingId = (dateStr) => {
  const datePart = dateStr
    ? dateStr.replace(/[^0-9]/g, "").slice(0, 8)
    : new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `BK-${datePart || "20260912"}-${randomPart}`;
};

export const getBookings = () => {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    if (!raw) {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading bookings from localStorage", error);
    return INITIAL_BOOKINGS;
  }
};

export const saveBooking = (newBooking) => {
  try {
    const bookings = getBookings();
    const updated = [newBooking, ...bookings];
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return newBooking;
  } catch (error) {
    console.error("Error saving booking to localStorage", error);
    return null;
  }
};

export const cancelBooking = (id) => {
  try {
    const bookings = getBookings();
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: "CANCELLED", cancelledAt: new Date().toISOString() } : b
    );
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return updated.find((b) => b.id === id) || null;
  } catch (error) {
    console.error("Error cancelling booking", error);
    return null;
  }
};

export const deleteBookingPermanent = (id) => {
  try {
    const bookings = getBookings();
    const updated = bookings.filter((b) => b.id !== id);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error("Error deleting booking", error);
    return false;
  }
};

export const getBookingById = (id) => {
  const bookings = getBookings();
  return bookings.find((b) => b.id === id) || null;
};

// Draft session management across multi-page booking checkout
export const saveDraft = (draftData) => {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
  } catch (e) {
    console.error("Error saving draft", e);
  }
};

export const getDraft = () => {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Error getting draft", e);
    return null;
  }
};

export const clearDraft = () => {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (e) {
    console.error("Error clearing draft", e);
  }
};

// Currency formatter helper
export const formatCurrency = (amount) => {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
};

