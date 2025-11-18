import React from "react";
import { Outlet } from "react-router-dom";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  return (
    <div className="teacher-root">
      <Outlet />  {/* This is where nested child pages will load */}
    </div>
  );
};

export default TeacherDashboard;
