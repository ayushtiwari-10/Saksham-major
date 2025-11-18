import React from "react";
import "./../pages/TeacherDashboard/TeacherDashboard.css"; // shared styles

const Topbar = ({ title = "Dashboard" }) => {
  const now = new Date();
  const dateStr = now.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <header className="saksham-topbar">
      <div className="topbar-left">
        <h2 className="page-title">{title}</h2>
      </div>

      <div className="topbar-right">
        <div className="search">
          <input placeholder="Search your class" />
        </div>

        <div className="datetime">
          <span className="date">{dateStr}</span>
          <span className="time">{timeStr}</span>
        </div>

        <div className="icons">
          <button className="cart-btn" title="Cart">🛒</button>
          <div className="avatar" title="Profile"></div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
