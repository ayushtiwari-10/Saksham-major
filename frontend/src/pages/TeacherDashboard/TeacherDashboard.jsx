import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

const TeacherDashboard = () => {
  return (
    <DashboardLayout role="teacher">
      <Outlet />
    </DashboardLayout>
  );
};

export default TeacherDashboard;
