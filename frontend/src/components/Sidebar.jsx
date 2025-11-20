import React from "react";
import "./../pages/TeacherDashboard/TeacherDashboard.css";

const Sidebar = ({ active = "Dashboard", onNavigate = () => {} }) => {
  return (
    <aside className="saksham-sidebar">
      <div className="brand">saksham</div>

      <nav className="sidebar-nav">

        <button
          className={`sidebar-item ${active === "Dashboard" ? "active" : ""}`}
          onClick={() => onNavigate("Dashboard")}
        >
          Dashboard
        </button>

        <button
          className={`sidebar-item ${active === "My Videos" ? "active" : ""}`}
          onClick={() => onNavigate("My Videos")}
        >
          My Videos
        </button>

        <button
          className={`sidebar-item ${active === "Schedule" ? "active" : ""}`}
          onClick={() => onNavigate("Schedule")}
        >
          Schedule
        </button>

        <button
          className={`sidebar-item ${active === "ChatBox" ? "active" : ""}`}
          onClick={() => onNavigate("ChatBox")}
        >
          ChatBox
        </button>

        <button
          className={`sidebar-item ${active === "Finances" ? "active" : ""}`}
          onClick={() => onNavigate("Finances")}
        >
          Finances
        </button>

        <button
          className={`sidebar-item ${active === "Students" ? "active" : ""}`}
          onClick={() => onNavigate("Students")}
        >
          Students
        </button>

      </nav>
    </aside>
  );
};

export default Sidebar;
