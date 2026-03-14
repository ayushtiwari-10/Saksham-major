import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import "./DashboardLayout.css";

const DashboardLayout = ({ role, active, onNavigate, children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar
        role={role}
        active={active}
        onNavigate={onNavigate}
      />
      <main className="dashboard-content">{children}</main>
    </div>
  );
};

export default DashboardLayout;
