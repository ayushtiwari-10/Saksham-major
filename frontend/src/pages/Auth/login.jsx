import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import NotificationCard from "../../components/NotificationCard";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    emailOrName: "",
    password: "",
  });

  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(formData);
    if (result.success) {
      setNotification({ type: 'success', message: 'Login successful!' });
      const user = result.user;
      if (!user || !user.interests || user.interests.length === 0) {
        navigate("/interests");
      } else if (user && user.role === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } else {
      setNotification({ type: 'error', message: result.message });
    }
  };

  return (
    <div className="login-container">
      {notification && (
        <NotificationCard
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      {/* ==== LEFT SIDE ==== */}
      <div className="login-left">
        <h1 className="logo">saksham</h1>
        <h2>Login to your account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="emailOrName"
            placeholder="ex: jon smith or jon.smith@email.com"
            value={formData.emailOrName}
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

          <p className="forgot" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </p>

          <button type="submit" className="login-btn">
            LOGIN
          </button>
        </form>

        <p className="or-text">or login with</p>

        <div className="social-icons">
          <img
            src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
            alt="Google"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
            alt="Facebook"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
            alt="Twitter"
          />
        </div>

        <p className="signup-text">
          Create your account?{" "}
          <span className="signup-link" onClick={() => navigate("/signup")}>
            SIGN UP
          </span>
        </p>
      </div>

      {/* ==== RIGHT SIDE ==== */}
      <div className="login-right">
        <img
          src="https://img.freepik.com/premium-vector/secure-login-sign-up-concept-illustration-user-use-secure-login-password-protection-website-social-media-account-vector-flat-style_7737-2270.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Secure login illustration"
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

export default Login;
