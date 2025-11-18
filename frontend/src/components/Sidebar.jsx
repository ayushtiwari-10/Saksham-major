import React from "react";
import "./../pages/TeacherDashboard/TeacherDashboard.css"; // shared styles

const Sidebar = ({ active = "Dashboard", onNavigate = () => {} }) => {
  const items = ["Dashboard", "My Videos", "Schedule", "ChatBox", "Finances"];

  return (
    <aside className="saksham-sidebar">
      <div className="brand">saksham</div>

      <nav className="sidebar-nav">
        {items.map((it) => (
          <button
            key={it}
            className={`sidebar-item ${active === it ? "active" : ""}`}
            onClick={() => onNavigate(it)}
          >
            {it}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
