import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Saksham</h3>
          <p>
            Saksham is a platform empowering Indian homemakers to learn, teach,
            and earn from their skills. Our mission is to make every individual
            “Saksham” — capable, confident, and connected.
          </p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#courses">Courses</a></li>
            <li><a href="#mission">Our Mission</a></li>
            <li><a href="#community">Community</a></li>
            <li><a href="#faq">FAQs</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:support@saksham.com">support@saksham.com</a></p>
          <p>Phone: +91 98765 43210</p>
          <div className="social-icons">
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" /></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" /></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="LinkedIn" /></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733635.png" alt="Twitter" /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Saksham. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
