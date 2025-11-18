import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationCard from "../../components/NotificationCard";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      setNotification({ type: 'warning', message: 'Please accept the terms & policy.' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setNotification({ type: 'error', message: 'Passwords do not match!' });
      return;
    }

    try {
      // ==== BACKEND INTEGRATION READY ====
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setNotification({ type: 'error', message: data.message || "Signup failed" });
        return;
      }

      setNotification({ type: 'success', message: 'Account created successfully!' });
      localStorage.setItem("token", data.token);

      setTimeout(() => {
        navigate("/interests");
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error);
      setNotification({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="signup-container">
      {notification && (
        <NotificationCard
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="signup-left">
        <h1 className="logo">saksham</h1>
        <h2>Create your account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="ex: jon smith"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="ex: jon.smith@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="********"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <div className="terms">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <label>
              I understood the <span className="link">terms & policy.</span>
            </label>
          </div>

          <button type="submit" className="signup-btn">
            SIGN UP
          </button>
        </form>

        <p className="or-text">or sign up with</p>

        <div className="social-icons">
          <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" />
          <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
          <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" />
        </div>

        <p className="signin-text">
          Have an account?{" "}
          <span className="signin-link" onClick={() => navigate("/login")}>
            SIGN IN
          </span>
        </p>
      </div>

      <div className="signup-right">
        <img
          src="https://360matchpro.com/wp-content/uploads/2024/07/The-7-Best-Signup-Platforms_Feature.png"
          alt="AI illustration"
        />
        <div className="info-box">
          <h3>AI-Powered Micro-Jobs Hub</h3>
          <p>
            Discover part-time opportunities matching your skills and
            availability.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
