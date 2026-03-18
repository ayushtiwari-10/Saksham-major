import React, { useState, useContext } from "react";
import "./interests.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import API from "../../services/api";

const Interests = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, title: "Cooking", icon: "🍳" },
    { id: 2, title: "Sewing & Stitching", icon: "🧵" },
    { id: 3, title: "Makeup & Beauty", icon: "💄" },
    { id: 4, title: "Yoga & Fitness", icon: "🧘‍♀️" },
    { id: 5, title: "Arts & Crafts", icon: "🎨" },
    { id: 6, title: "Home Gardening", icon: "🪴" },
    { id: 7, title: "Baking", icon: "🧁" },
    { id: 8, title: "Dance", icon: "💃" },
    { id: 9, title: "Teaching Kids", icon: "📚" },
    { id: 10, title: "Handmade Products", icon: "👜" },
    { id: 11, title: "Coding Basics", icon: "💻" },
    { id: 12, title: "Social Media Skills", icon: "📱" },
  ];

  const [selected, setSelected] = useState([]);

  const { user, setUser } = useContext(AuthContext);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleContinue = async () => {
    if (selected.length === 0) return;

    const selectedTitles = selected.map(id => categories.find(cat => cat.id === id).title);

    try {
      const res = await API.patch('/user/interests', { interests: selectedTitles });
      setUser({ ...(user || {}), interests: selectedTitles });
      navigate("/student/dashboard");
    } catch (error) {
      console.error('Failed to update interests', error);
      // Fallback to navigate anyway
      navigate("/student/dashboard");
    }
  };

  return (
    <div className="interests-container">
      <h1 className="title">Choose Your Interests</h1>
      <p className="subtitle">
        Select topics you love — our AI will recommend personalized courses.
      </p>

      <div className="grid">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`card ${selected.includes(cat.id) ? "selected" : ""}`}
            onClick={() => toggleSelect(cat.id)}
          >
            <span className="icon">{cat.icon}</span>
            <h3>{cat.title}</h3>
          </div>
        ))}
      </div>

      <button
        className="continue-btn"
        disabled={selected.length === 0}
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
};

export default Interests;
