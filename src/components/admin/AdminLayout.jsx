import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import '../../styles/admin.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main-viewport">
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default AdminLayout;

