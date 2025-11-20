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

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen(!open);

  // CLOSE IF CLICKED OUTSIDE
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // NAVIGATION FUNCTIONS
  const goToProfile = () => {
    navigate("/teacher/dashboard/profile");
    setOpen(false);
  };

  const goToEditProfile = () => {
    navigate("/teacher/dashboard/profile");
    setOpen(false);
  };

  const goToPayoutSettings = () => {
    navigate("/teacher/dashboard/payout-settings");
    setOpen(false);
  };

  const switchRole = () => {
    localStorage.setItem("role", "student");
    navigate("/student/dashboard");
    setOpen(false);
  };

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

          {/* PROFILE */}
          <div className="profile-wrapper" ref={dropdownRef}>
            <img
              src="/default-avatar.png"
              alt="profile"
              className="avatar"
              onClick={toggleDropdown}
            />

            {open && (
              <div className="profile-dropdown">

                <h4>My Account</h4>

                <button onClick={goToProfile}>View Profile</button>
                <button onClick={goToEditProfile}>Edit Profile</button>
                <button onClick={goToPayoutSettings}>Payout Settings</button>
                <button onClick={switchRole}>Switch to Student</button>
                <button className="logout" onClick={logout}>Logout</button>

              </div>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
