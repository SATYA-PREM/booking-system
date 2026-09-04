import React, { useState, useEffect } from 'react';
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
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { BarChart3, TrendingUp, Users, Ticket, Film, Sparkles } from 'lucide-react';
import { getAnalyticsSummary, getTheatres, formatCurrency } from '../../services/storage';
import AdminTopNavbar from '../../components/admin/AdminTopNavbar';
import StatCard from '../../components/admin/StatCard';

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(getAnalyticsSummary());
  const [timeRange, setTimeRange] = useState('30d');

  const loadData = () => {
    setAnalytics(getAnalyticsSummary());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('moviemagic_state_change', loadData);
    return () => window.removeEventListener('moviemagic_state_change', loadData);
  }, []);

  // Theatre Bar Chart
  const theatreBarData = {
    labels: ['PVR Nexus', 'INOX Central', 'Galaxy IMAX', 'Cinepolis', 'MovieMax'],
    datasets: [
      {
        label: 'Gross Box Office (₹)',
        data: [38500, 24200, 42100, 19800, 14500],
        backgroundColor: '#6366f1',
        borderRadius: 6
      }
    ]
  };

  const theatreBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { ticks: { callback: (v) => `₹${v / 1000}k` }, grid: { color: '#f1f5f9' } },
      x: { grid: { display: false } }
    }
  };

  // 30-Day Line Chart
  const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Weekly Collections (₹)',
        data: [18500, 22400, 29800, analytics.totalRevenue - 70700],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.35,
        fill: true,
        pointBackgroundColor: '#10b981'
      }
    ]
  };

  return (
    <div>
      <AdminTopNavbar title="Revenue & Occupancy Analytics" subtitle="Deep-dive business intelligence, screen fill rates, and box office trends" />

      <div className="admin-view-body">
        {/* KPI Row */}
        <div className="admin-stats-grid">
          <StatCard label="Total Box Office" value={formatCurrency(analytics.totalRevenue)} trend="+18.4%" icon={TrendingUp} color="#4f46e5" />
          <StatCard label="Total Admissions" value={analytics.totalTicketsSold.toLocaleString()} trend="+12.6%" icon={Ticket} color="#ec4899" />
          <StatCard label="Avg Ticket Value" value={formatCurrency(analytics.avgTicketValue)} trend="+4.8%" icon={Film} color="#f59e0b" />
          <StatCard label="Peak Showtime Occupancy" value="87.2%" trend="+6.5%" icon={BarChart3} color="#10b981" />
        </div>

        {/* Charts Grid */}
        <div className="admin-charts-grid" style={{ marginBottom: '2rem' }}>
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Revenue by Multiplex</h3>
            </div>
            <div style={{ height: '280px' }}>
              <Bar data={theatreBarData} options={theatreBarOptions} />
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Weekly Revenue Growth</h3>
            </div>
            <div style={{ height: '280px' }}>
              <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
            </div>
          </div>
        </div>

        {/* Occupancy Meters & Peak Showtimes */}
        <div className="admin-dual-grid">
          {/* Seat Occupancy Meters */}
          <div className="admin-card" style={{ marginBottom: 0 }}>
            <h3 className="admin-card-title" style={{ marginBottom: '1.25rem' }}>Today's Screen Occupancy Rates</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { screen: 'PVR Nexus — Screen 1 (IMAX)', pct: 92, count: '166/180 Seats', color: '#10b981' },
                { screen: 'Galaxy IMAX — Grand Hall', pct: 88, count: '132/150 Seats', color: '#6366f1' },
                { screen: 'INOX Central — Screen 1 (Dolby Atmos)', pct: 74, count: '81/110 Seats', color: '#f59e0b' },
                { screen: 'Cinepolis Downtown — Screen 3 (4DX)', pct: 61, count: '49/80 Seats', color: '#ec4899' },
                { screen: 'MovieMax — Screen 2 (Classic)', pct: 48, count: '48/100 Seats', color: '#94a3b8' }
              ].map((item) => (
                <div key={item.screen}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    <span>{item.screen}</span>
                    <span style={{ color: item.color }}><strong>{item.pct}%</strong> ({item.count})</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ width: `${item.pct}%`, height: '100%', background: item.color, borderRadius: '99px', transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peak Showtime Analysis */}
          <div className="admin-card" style={{ marginBottom: 0 }}>
            <h3 className="admin-card-title" style={{ marginBottom: '1rem' }}>Showtime Peak Intelligence</h3>

            <div style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Peak Prime Slot</span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#4f46e5', margin: '0.2rem 0' }}>05:00 PM – 08:30 PM</div>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Generates <strong>64.8%</strong> of total daily admissions and snack concessions.</p>
            </div>

            <div style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Highest Grossing Format</span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ec4899', margin: '0.2rem 0' }}>IMAX Laser & 70mm</div>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Average ticket realization: <strong>₹320</strong> with 89% seat fill factor.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;

