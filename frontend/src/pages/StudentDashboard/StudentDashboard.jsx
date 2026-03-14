import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student">
      <Outlet />
    </DashboardLayout>
  );
};

export default StudentDashboard;
