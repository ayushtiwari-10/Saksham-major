import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import StudentTopbar from "./StudentTopbar";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // detect active sidebar item from URL
  const getActive = () => {
    if (pathname.includes("/courses")) return "My Courses";
    if (pathname.includes("/library")) return "My Library";
    if (pathname.includes("/explore")) return "Explore";
    if (pathname.includes("/offline")) return "Offline Classes";
    if (pathname.includes("/categories")) return "Categories";
    if (pathname.includes("/saved")) return "Saved";
    if (pathname.includes("/chatbox")) return "ChatBox";
    return "Dashboard";
  };

  const activeItem = getActive();

  // mapping of keys to routes
  const handleNavigate = (key) => {
    const map = {
      "Dashboard": "/student/dashboard",
      "My Courses": "/student/dashboard/courses",
      "My Library": "/student/dashboard/library",
      "Explore": "/student/dashboard/explore",
      "Offline Classes": "/student/dashboard/offline",
      "Categories": "/student/dashboard/categories",
      "ChatBox": "/student/dashboard/chatbox",
      "Transactions": "/student/dashboard/transactions",
    };

    navigate(map[key] || "/student/dashboard");
  };

  return (
    <div className="student-shell">

      {/* SIDEBAR */}
      <StudentSidebar active={activeItem} onNavigate={handleNavigate} />

      {/* MAIN AREA */}
      <div className="student-main">

        {/* GLOBAL TOPBAR */}
        <StudentTopbar title={activeItem} />

        {/* DYNAMIC PAGE CONTENT */}
        <div className="student-content">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;
