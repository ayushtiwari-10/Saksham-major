import React, { useState } from "react";
import "./StudentCategories.css";
import { useNavigate } from "react-router-dom";

const CATEGORY_LIST = [
  { name: "Music", icon: "🎵", color: "#e1e7ff" },
  { name: "Dance", icon: "💃", color: "#ffe1f0" },
  { name: "Art & Craft", icon: "🎨", color: "#fff1d6" },
  { name: "Cooking", icon: "🍳", color: "#ffe8d1" },
  { name: "Coding", icon: "💻", color: "#dff7ff" },
  { name: "Fitness", icon: "🏋️", color: "#e9ffe6" },
  { name: "Yoga", icon: "🧘‍♂️", color: "#e8f5ff" },
  { name: "Photography", icon: "📸", color: "#fff0e4" },
  { name: "Business", icon: "📈", color: "#f3e8ff" },
  { name: "Languages", icon: "🌍", color: "#e1f3ff" },
  { name: "Beauty & Makeup", icon: "💄", color: "#ffe1ea" },
  { name: "Digital Marketing", icon: "📱", color: "#e6ffe4" },
  { name: "Career Skills", icon: "🧠", color: "#edf0ff" },
  { name: "Home Décor", icon: "🏡", color: "#fff7e7" },
  { name: "Sewing & Tailoring", icon: "🧵", color: "#ffe9f6" },
  { name: "Acting", icon: "🎭", color: "#f5e9ff" },
  { name: "Finance", icon: "💰", color: "#f2ffe5" },
  { name: "Writing", icon: "✍️", color: "#fff3e1" },
  { name: "Gardening", icon: "🌱", color: "#e4ffe8" },
  { name: "Public Speaking", icon: "🎤", color: "#eaf1ff" },
];

const StudentCategories = () => {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const navigate = useNavigate();

  const filtered = CATEGORY_LIST.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const openCategory = (catName) => {
    navigate(`/student/dashboard/categories/${catName.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <div className="categories-page">

          {/* Search + Filters */}
          <div className="cat-top-row">
            <input
              className="cat-search"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="cat-filters">
              {["All", "Beginner", "Intermediate", "Advanced"].map((lev) => (
                <button
                  key={lev}
                  className={`filter-btn ${difficulty === lev ? "active" : ""}`}
                  onClick={() => setDifficulty(lev)}
                >
                  {lev}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="cat-grid">
            {filtered.map((cat) => (
              <div
                key={cat.name}
                className="cat-card"
                style={{ background: cat.color }}
                onClick={() => openCategory(cat.name)}
              >
                <div className="cat-icon">{cat.icon}</div>
                <div className="cat-name">{cat.name}</div>
              </div>
            ))}
          </div>

        </div>
  );
};

export default StudentCategories;
