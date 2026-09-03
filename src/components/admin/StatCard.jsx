import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ label, value, trend, isPositive = true, icon: Icon, color = '#6366f1' }) => {
  return (
    <div className="stat-card-box">
      <div className="stat-header-row">
        <span className="stat-label-txt">{label}</span>
        {Icon && (
          <div className="stat-icon-wrapper" style={{ backgroundColor: `${color}15`, color }}>
            <Icon size={20} />
          </div>
        )}
      </div>

      <div className="stat-main-number">{value}</div>

      {trend && (
        <div className="stat-trend-row">
          {isPositive ? (
            <TrendingUp size={14} className="trend-up" />
          ) : (
            <TrendingDown size={14} className="trend-down" />
          )}
          <span className={isPositive ? 'trend-up' : 'trend-down'}>{trend}</span>
          <span style={{ color: 'var(--admin-text-muted)', fontWeight: 500 }}>vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;

