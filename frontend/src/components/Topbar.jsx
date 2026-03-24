import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VriddhiBadge from "./VriddhiBadge";
import "./../pages/TeacherDashboard/TeacherDashboard.css";

const Topbar = ({ title = "Dashboard" }) => {
  const navigate = useNavigate();

  const now = new Date();
  const dateStr = now.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
          {/* Vriddhi Badge */}
          <VriddhiBadge />

          <button className="cart-btn">🛒</button>

        </div>
      </div>
    </header>
  );
};

export default Topbar;
