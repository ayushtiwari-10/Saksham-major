import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import VriddhiBadge from "../../components/VriddhiBadge";
import { AuthContext } from "../../contexts/AuthContext";
import "./../TeacherDashboard/TeacherDashboard.css";

const StudentTopbar = ({ title = "Dashboard" }) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
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

  const toggleDropdown = () => setOpen((prev) => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Navigation Handlers
  const goToProfile = () => {
    navigate("/student/dashboard/profile");
    setOpen(false);
  };

  const goToEditProfile = () => {
    navigate("/student/dashboard/profile");
    setOpen(false);
  };

  const switchToTeacher = () => {
    localStorage.setItem("role", "teacher");
    navigate("/teacher/dashboard");
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="saksham-topbar">
      {/* LEFT SIDE */}
      <div className="topbar-left">
        <h2 className="page-title">{title}</h2>
      </div>

      {/* RIGHT SIDE */}
      <div className="topbar-right">

        {/* Search Bar */}
        <div className="search">
          <input placeholder="Search your class" />
        </div>

        {/* Date + Time */}
        <div className="datetime">
          <span className="date">{dateStr}</span>
          <span className="time">{timeStr}</span>
        </div>

        {/* Icons Section */}
        <div className="icons">
          {/* Vriddhi Badge */}
          <VriddhiBadge />

          {/* Cart */}
          <button className="cart-btn" title="Cart">
            🛒
          </button>

          {/* Profile Avatar + Dropdown */}
          <div className="profile-wrapper" ref={dropdownRef}>
            <img
              src={user?.profileImage || "/default-avatar.png"}
              className="avatar"
              alt="profile"
              onClick={toggleDropdown}
            />

            {open && (
              <div className="profile-dropdown">
                <h4>My Account</h4>

                <button onClick={goToProfile}>View Profile</button>
                <button onClick={goToEditProfile}>Edit Profile</button>
                <button onClick={switchToTeacher}>Switch to Teacher</button>

                <button className="logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default StudentTopbar;
