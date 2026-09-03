import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { DollarSign, Ticket, Film, Users, TrendingUp, ArrowUpRight, Plus, CheckCircle2, RefreshCw } from 'lucide-react';
import { getAnalyticsSummary, getBookings, getMovies, formatCurrency } from '../../services/storage';
import AdminTopNavbar from '../../components/admin/AdminTopNavbar';
import StatCard from '../../components/admin/StatCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(getAnalyticsSummary());
  const [recentBookings, setRecentBookings] = useState(getBookings().slice(0, 6));

  const loadData = () => {
    setAnalytics(getAnalyticsSummary());
    setRecentBookings(getBookings().slice(0, 6));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('moviemagic_state_change', loadData);
    return () => window.removeEventListener('moviemagic_state_change', loadData);
  }, []);

  // Revenue Line Chart Configuration
  const revenueChartData = {
    labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Today'],
    datasets: [
      {
        label: 'Gross Box Office (₹)',
        data: [54000, 62000, 68500, 71200, 78900, 81400, analytics.totalRevenue],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.35,
        fill: true,
        pointBackgroundColor: '#4f46e5',
        pointRadius: 4
      }
    ]
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        grid: { color: '#f1f5f9' },
        ticks: { callback: (val) => `₹${val / 1000}k` }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  // Genre Doughnut Chart Configuration
  const genreChartData = {
    labels: analytics.genreLabels.slice(0, 5),
    datasets: [
      {
        data: analytics.genreValues.slice(0, 5),
        backgroundColor: ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };

  const genreChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } }
    }
  };

  return (
    <div>
      <AdminTopNavbar title="Dashboard Overview" subtitle="Live box office revenue, occupancy metrics, and operations overview" />

      <div className="admin-view-body">
        {/* KPI Stat Cards */}
        <div className="admin-stats-grid">
          <StatCard
            label="Total Revenue"
            value={formatCurrency(analytics.totalRevenue)}
            trend="+18.4%"
            isPositive={true}
            icon={DollarSign}
            color="#4f46e5"
          />

          <StatCard
            label="Confirmed Bookings"
            value={analytics.totalBookingsCount.toLocaleString()}
            trend="+12.6%"
            isPositive={true}
            icon={Ticket}
            color="#ec4899"
          />

          <StatCard
            label="Active Movies"
            value={analytics.activeMoviesCount}
            trend="+8.2%"
            isPositive={true}
            icon={Film}
            color="#f59e0b"
          />

          <StatCard
            label="Total Customers"
            value={analytics.totalCustomersCount.toLocaleString()}
            trend="+4.8%"
            isPositive={true}
            icon={Users}
            color="#10b981"
          />
        </div>

        {/* Charts Row */}
        <div className="admin-charts-grid">
          {/* Revenue Analytics Chart */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div>
                <h3 className="admin-card-title">Box Office Revenue Trend</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                  30-Day performance across all multiplex screens
                </span>
              </div>
              <Link to="/admin/analytics" className="btn btn-outline btn-sm" style={{ color: '#4f46e5', borderColor: '#e0e7ff' }}>
                Full Analytics
              </Link>
            </div>
            <div style={{ height: '270px' }}>
              <Line data={revenueChartData} options={revenueChartOptions} />
            </div>
          </div>

          {/* Genre Distribution Doughnut */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Bookings by Genre</h3>
            </div>
            <div style={{ height: '270px' }}>
              <Doughnut data={genreChartData} options={genreChartOptions} />
            </div>
          </div>
        </div>

        {/* Two-Column: Top Movies & Recent Bookings */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
          {/* Recent Bookings */}
          <div className="admin-card" style={{ marginBottom: 0 }}>
            <div className="admin-card-header">
              <h3 className="admin-card-title">Recent Customer Bookings</h3>
              <Link to="/admin/bookings" className="btn btn-outline btn-sm" style={{ color: '#4f46e5', borderColor: '#e0e7ff' }}>
                View All Bookings
              </Link>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Movie</th>
                    <th>Seats</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b) => (
                    <tr key={b.id}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#4f46e5' }}>{b.id}</td>
                      <td><strong>{b.customer}</strong></td>
                      <td>{b.movieTitle}</td>
                      <td><span style={{ fontWeight: 600, color: '#6366f1' }}>{b.seats.join(', ')}</span></td>
                      <td style={{ fontWeight: 700 }}>{formatCurrency(b.total)}</td>
                      <td>
                        <span className={`badge ${b.bookingStatus === 'CONFIRMED' ? 'badge-confirmed' : 'badge-cancelled'}`}>
                          {b.bookingStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Performing Movies */}
          <div className="admin-card" style={{ marginBottom: 0 }}>
            <div className="admin-card-header">
              <h3 className="admin-card-title">Top Performing Movies</h3>
              <Link to="/admin/movies" className="btn btn-outline btn-sm" style={{ color: '#4f46e5', borderColor: '#e0e7ff' }}>
                Manage Movies
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {analytics.moviePerformance.slice(0, 5).map((m, idx) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    background: '#f8fafc',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #f1f5f9'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ width: '1.6rem', height: '1.6rem', borderRadius: '50%', background: idx === 0 ? '#f59e0b' : '#e2e8f0', color: idx === 0 ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
                      {idx + 1}
                    </span>
                    <img src={m.poster} alt={m.title} style={{ width: '36px', height: '48px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div>
                      <strong style={{ fontSize: '0.9rem', display: 'block', color: 'var(--admin-text-main)' }}>{m.title}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{m.bookingsCount + 280} Tickets Sold</span>
                    </div>
                  </div>
                  <strong style={{ color: '#4f46e5', fontSize: '0.95rem' }}>
                    {formatCurrency(m.revenue + 24500)}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

