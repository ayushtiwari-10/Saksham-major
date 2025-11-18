import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <h1 className="hero-text">
        Teach, <br /> Learn <br /> And <br /> Lead
      </h1>
      <Link to="/signup" className="hero-button">
        Get Started
      </Link>

      <img
        src="https://test.rbuchd.com/wp-content/uploads/2022/06/Online-Learning.png"
        alt="Online Learning"
        className="hero-image-right"
      />

      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTy7yVO3-10CmJaG2EgS-0X7dFDucjIKKYwQ&s"
        alt="Books and graduation"
        className="hero-image-left"
      />

      <img
        src="https://t3.ftcdn.net/jpg/09/11/90/74/360_F_911907457_VWuZim5bOb8WrrdLb3mvY6zUrLtai90i.jpg"
        alt="Stars decoration"
        className="hero-stars"
      />
    </div>
  );
};

export default HeroSection;
