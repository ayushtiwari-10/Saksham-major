import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/saksham logo option 1.png" alt="Saksham Logo" className="logo-img" />
      </div>


      <div className="navbar-links">
        <a href="#home">Home</a>
        <a href="#courses">Top Courses</a>
        <a href="#community">Contact</a>
        <a href="#faq">FAQ</a>
      </div>
<Link to="/signup"
       className="get-started">Get Started</Link>
    </nav>
  );
};

export default Navbar;
