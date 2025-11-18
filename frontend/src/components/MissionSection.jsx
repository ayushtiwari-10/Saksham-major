import React from "react";
import "./MissionSection.css";

const MissionSection = () => {
  return (
    <section className="mission-section">
      <div className="mission-content">
        <div className="mission-text">
          <h2>Our Mission Behind This Platform</h2>
          <p>
            Saksham is a vision-driven initiative dedicated to empowering Indian
            homemakers by bridging the gap between talent and opportunity. Our
            mission is to create a digital space where anyone can learn, teach,
            and grow from the comfort of their home — transforming hobbies into
            income streams and skills into sustainable businesses.
          </p>
          <p>
            Whether it's baking, knitting, painting, or entrepreneurship,
            Saksham ensures that every homemaker becomes truly <b>“Saksham”</b>
            — capable and confident to share her expertise with the world.
          </p>
        </div>

        <div className="mission-image">
          <img
            src="https://img.freepik.com/free-photo/cheerful-indian-woman-teaching-online_23-2149016037.jpg"
            alt="Mission Illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
