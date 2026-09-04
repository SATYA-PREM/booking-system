# 🎬 MovieMagic — Movie Ticket Booking & Cinema Management SaaS

<div align="center">

![MovieMagic Banner](https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80)

**A complete, production-ready, full frontend-only Movie Ticket Booking & Cinema Management SaaS Platform.**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-6.26.2-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.4.4-FF6384?logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![Lucide](https://img.shields.io/badge/Lucide_Icons-0.441.0-F56565)](https://lucide.dev/)
[![Deploy with Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel&logoColor=white)](https://vercel.com/)

[Explore Demo Flow](#-step-by-step-demo-flow) • [Customer Portal](#-customer-portal-features) • [Admin SaaS](#-cinema-admin-saas-features) • [Deployment](#-deployment-to-vercel)

</div>

---

## 🌟 Overview

**MovieMagic** is an end-to-end cinema ticketing ecosystem built purely on the modern frontend stack (React, Vite, React Router, Chart.js, and LocalStorage). 

It connects customer ticketing actions with a real-time cinema operations back-office:
```text
CUSTOMER BOOKING ──► DEMO PAYMENT ──► DIGITAL QR TICKET ──► SEAT MATRIX LOCK ──► LIVE REVENUE ANALYTICS ──► ADMIN SaaS DASHBOARD
```

---

## 🚀 Key Features

### 🎟️ 1. Customer Booking Experience
- **Cinematic Dark Theme UI**: Full-bleed hero banner, live show counters, backdrop gradients, and smooth card transitions.
- **Advanced Movie Discovery**: Multi-faceted filter system with real-time search across titles, actors, directors, genres (*Action, Sci-Fi, Drama, etc.*), formats (*2D, 3D, IMAX, 4DX*), and languages (*English, Hindi, Tamil, Telugu*).
- **Movie Details & Trailer Modal**: High-definition video player, cast chips, certification badges (`UA`, `A`), user reviews feed, and review submission modal.
- **Multiplex & Showtime Selection**: Dynamic 6-day date picker with live multiplex schedules color-coded by availability (*Available, Filling Fast, Sold Out*).
- **Curved Interactive Cinema Seat Map**:
  - Realistic curved screen projection with ambient lighting.
  - Multi-tier seat allocation: **Silver (₹180)**, **Gold (₹220)**, **Premium (₹280)**, and **Recliner (₹400)**.
  - 8-seat safety limit per order with real-time bill calculation.
- **Promo Discount Engine**: Working coupons (`MOVIE50`, `FIRSTBOOK`, `WEEKEND20`, `COMBO100`) with instant deduction.
- **Simulated Payment Gateway**:
  - Payment modes: Card, UPI / QR, Cinema Wallet, and Net Banking.
  - Interactive Credit Card visual preview with live input reflection.
  - Multi-phase transaction verification animation.
  - Built-in test decline simulation (`4000000000000002`).
- **Digital Movie Ticket Voucher**: Celebratory confetti, perforated notch ticket stub, barcode visual, QR code, and print/download action.
- **Reservation Management & Free Cancellation**: Instant cancellation with automatic seat re-release and simulated refund ledger updates.
- **MovieBot AI Concierge**: Persistent floating chatbot with natural keyword recognition and quick reservation prompts.

---

### 🛡️ 2. Cinema Admin & SaaS Management Portal
- **Executive KPI Dashboard**: Live stats for Gross Box Office Revenue, Total Admissions, Active Movies, and Registered Patrons.
- **Chart.js Visual Analytics**:
  - 30-Day Box Office Revenue Line Chart.
  - Bookings by Genre Doughnut Chart.
  - Revenue by Multiplex Bar Chart.
  - Live Screen Occupancy meters (92% Screen 1, 74% Screen 2, etc.).
  - Peak Showtime Intelligence (5:00 PM – 8:30 PM slot performance).
- **Movie Catalog CRUD**: Add, edit, or remove movies with custom poster URLs, duration, and certificates.
- **Multiplex & Screen Manager**: Configure cinema locations, auditorium capacities, projection formats, and amenities.
- **Showtime Scheduling Engine**: Schedule screenings across dates, times, auditoriums, and ticket pricing tiers.
- **Bookings & Payment Transactions Ledger**: Full audit trail of customer reservations, payment captures, and cancellation refunds.
- **Audience Review Moderation**: Approve or delete customer reviews and ratings.
- **Marketing & Coupon Engine**: Create and toggle discount campaign codes and quotas.
- **System Settings & One-Click Demo Reset**: Adjust convenience fees, GST tax rates, cancellation windows, or reset all demo data to pristine state.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 18 (Hooks, Context, State Reactivity)
- **Routing**: React Router DOM v6 (SPAs with deep-linked customer and admin routes)
- **Styling**: Pure Modular CSS3 (Custom Variables, Flexbox/Grid layouts, Glassmorphism, Print Media Styles)
- **Data Visualizations**: Chart.js 4 + React-Chartjs-2
- **Icons**: Lucide React
- **Animations & FX**: Canvas Confetti, CSS Keyframe Animations
- **State Persistence**: Browser `localStorage` engine with cross-component event sync
- **Tooling & Build**: Vite 5

---

## 📂 Project Directory Structure

```text
booking-system/
├── public/
│   └── film.svg                # Favicon
├── src/
│   ├── components/
│   │   ├── admin/              # Admin SaaS layout, sidebar, stat cards, reset modal
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── AdminTopNavbar.jsx
│   │   │   ├── ResetModal.jsx
│   │   │   └── StatCard.jsx
│   │   ├── chatbot/            # Rule-based AI cinema concierge
│   │   │   └── MovieBot.jsx
│   │   └── customer/           # Customer navbar, footer, movie cards, trailer/review modals
│   │       ├── CustomerFooter.jsx
│   │       ├── CustomerNavbar.jsx
│   │       ├── MovieCard.jsx
│   │       ├── ReviewModal.jsx
│   │       └── TrailerModal.jsx
│   ├── data/
│   │   └── seedData.js         # Pre-seeded blockbuster movies, multiplexes, coupons, bookings
│   ├── pages/
│   │   ├── admin/              # 12 Admin management views & analytics
│   │   │   ├── AdminAnalytics.jsx
│   │   │   ├── AdminBookings.jsx
│   │   │   ├── AdminCustomers.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminMovies.jsx
│   │   │   ├── AdminNotifications.jsx
│   │   │   ├── AdminOffers.jsx
│   │   │   ├── AdminPayments.jsx
│   │   │   ├── AdminReviews.jsx
│   │   │   ├── AdminSettings.jsx
│   │   │   ├── AdminShows.jsx
│   │   │   └── AdminTheatres.jsx
│   │   └── customer/           # Customer pages (Discovery, Seats, Checkout, Ticket, etc.)
│   │       ├── CustomerBookings.jsx
│   │       ├── CustomerBookingSuccess.jsx
│   │       ├── CustomerCheckout.jsx
│   │       ├── CustomerFAQ.jsx
│   │       ├── CustomerHome.jsx
│   │       ├── CustomerMovieDetails.jsx
│   │       ├── CustomerMovies.jsx
│   │       ├── CustomerNotFound.jsx
│   │       ├── CustomerOffers.jsx
│   │       ├── CustomerPayment.jsx
│   │       ├── CustomerProfile.jsx
│   │       ├── CustomerSeatSelection.jsx
│   │       ├── CustomerShowSelection.jsx
│   │       ├── CustomerTheatres.jsx
│   │       └── CustomerWishlist.jsx
│   ├── services/
│   │   └── storage.js          # Central database CRUD engine & state sync
│   ├── styles/
│   │   ├── admin.css           # Admin SaaS dark sidebar & light data surface
│   │   ├── chatbot.css         # Floating bot styling
│   │   ├── customer.css        # Customer dark cinema theme
│   │   ├── global.css          # Theme variables, buttons, badges, modals
│   │   ├── seatmap.css         # Curved screen projection & seat tiers
│   │   └── ticket.css          # Digital ticket stub & barcode
│   ├── App.jsx                 # Master application routes
│   └── main.jsx                # App bootstrap & CSS imports
├── index.html
├── package.json
├── vercel.json                 # SPA routing rewrites for Vercel
├── vite.config.js
└── README.md
```

---

## ⚡ Quick Start (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/SATYA-PREM/booking-system.git
cd booking-system
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🚢 Deployment to Vercel

This repository includes [`vercel.json`](./vercel.json) pre-configured with SPA rewrites:

```json
{
  "framework": "vite",
  "buildCommand": "npx vite build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Deploy via GitHub:
1. Push your code to GitHub.
2. Import the repository in [Vercel Dashboard](https://vercel.com).
3. Vercel will automatically detect Vite and run `npm run build`.

---

## 🧪 Step-by-Step Demo Flow

Follow these steps for a complete demonstration:

| Step | Action | Expected Result |
| :--- | :--- | :--- |
| **1. Browse** | Go to Home (`/`) or Movies (`/movies`) and click on *Avengers: Endgame*. | Opens Movie Details with HD poster, cast, and trailer option. |
| **2. Select Show** | Click **Book Tickets**, choose *Tomorrow*, and select *05:30 PM (IMAX)* at *PVR Nexus*. | Navigates to the interactive Curved Screen seat map. |
| **3. Pick Seats** | Select seats `A5` and `A6` (Silver Tier - ₹180 each). | Live summary updates total to ₹360 + taxes. |
| **4. Checkout** | Click **Proceed to Checkout**. Enter coupon code `MOVIE50` and click Apply. | ₹50 discount is applied instantly to the bill. |
| **5. Pay** | Click **Proceed to Payment** and submit the demo card form. | Animated 4-step payment processing executes and confirms. |
| **6. Ticket** | View generated digital ticket voucher with QR and barcode. | Ticket ID generated; option to print/download ticket. |
| **7. Admin Sync** | Click **Admin SaaS** pill (or go to `/admin`). | Total Revenue, Bookings count, and occupancy charts increase live. |
| **8. Cancel Seat** | Go to `/bookings` and cancel the reservation. | Status turns to *CANCELLED*, refund recorded, and seats are released back. |
| **9. Chatbot** | Open **MovieBot** in the bottom right corner and click *"Show Movies"*. | Bot responds with interactive links to popular titles. |

---

## 💳 Demo Test Data

### Active Coupons
- `MOVIE50` — ₹50 OFF on orders above ₹300
- `FIRSTBOOK` — 20% OFF on all bookings
- `WEEKEND20` — 15% OFF on weekend showtimes
- `COMBO100` — ₹100 OFF on orders above ₹600

### Demo Payment Simulation
- **Any 16-digit card**: Successfully processes and generates a confirmed ticket.
- **Card `4000000000000002`**: Simulates a bank decline scenario.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

<div align="center">
  <sub>Built with ❤️ by <strong>Satya Prem</strong></sub>
</div>

