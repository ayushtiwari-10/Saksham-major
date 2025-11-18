import React from "react";
import "./ConnectSection.css";

const ConnectSection = () => {
  return (
    <section className="connect-section">
      <div className="connect-content">
        <div className="connect-text">
          <h2>Connect With Us</h2>
          <p>
            Be a part of the <b>Saksham</b> community — where passion meets purpose.
            Whether you’re looking to teach, learn, or collaborate, our platform
            helps you connect with like-minded individuals who believe in growth,
            empowerment, and sharing knowledge.
          </p>
          <button className="join-btn">Join Now</button>
        </div>

        <div className="connect-image">
          <img
            src="https://img.freepik.com/free-photo/young-people-using-smartphones-together_53876-101882.jpg"
            alt="Community Connection"
          />
        </div>
      </div>

      <div className="connect-cards">
        <div className="connect-card">
          <img
            src="https://img.freepik.com/free-icon/teacher_318-827365.jpg"
            alt="Teach Icon"
          />
          <h3>Teach</h3>
          <p>Share your skills, inspire others, and earn while teaching.</p>
        </div>
        <div className="connect-card">
          <img
            src="https://img.freepik.com/free-icon/graduate_318-710108.jpg"
            alt="Learn Icon"
          />
          <h3>Learn</h3>
          <p>Explore personalized classes tailored to your interests.</p>
        </div>
        <div className="connect-card">
          <img
            src="https://img.freepik.com/free-icon/handshake_318-974399.jpg"
            alt="Collaborate Icon"
          />
          <h3>Collaborate</h3>
          <p>Join the Saksham network and build lasting connections.</p>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
