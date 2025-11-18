import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">सक्षम</div>

      <div className="navbar-links">
        <a href="#">home</a>
        <a href="#">home</a>
        <a href="#">home</a>
        <a href="#">home</a>
      </div>

      <button className="get-started">Get Started</button>
    </nav>
  );
};

export default Navbar;
