import React from "react";
import "./StudentDashboard.css";

const StudentSidebar = ({ active = "Dashboard", onNavigate = () => {} }) => {
  const items = [
    { key: "Dashboard", label: "Dashboard" },
    { key: "My Courses", label: "My Courses" },
    { key: "My Library", label: "My Library" },
    { key: "Explore", label: "Explore" },
    { key: "Offline Classes", label: "Offline Classes" },
    { key: "Categories", label: "Categories" },
    { key: "ChatBox", label: "ChatBox" },
  ];

  return (
    <aside className="saksham-sidebar student-sidebar">
      <div className="sidebar-brand">saksham</div>

      <nav className="sidebar-nav">
        {items.map((it) => (
          <button
            key={it.key}
            className={`sidebar-item ${active === it.key ? "active" : ""}`}
            onClick={() => onNavigate(it.key)}
          >
            {it.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default StudentSidebar;
