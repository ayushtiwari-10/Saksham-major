// src/pages/StudentDashboard/pages/StudentExplore.jsx
import React, { useState, useEffect } from "react";
import "./StudentExplore.css";
import api from "../../../services/api";

const TRENDING = new Array(8).fill(0).map((_, i) => ({
  id: i + 1,
  title: ["Knitting", "Cooking", "Guitar Basics", "Yoga", "Painting"][i % 5],
  level: ["Beginner", "Intermediate", "Advanced"][i % 3],
  students: Math.floor(Math.random() * 900 + 100),
  thumbnail:
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200",
}));

const CATEGORIES = [
  "Art & Design",
  "Music",
  "Cooking",
  "Health & Fitness",
  "Fashion",
  "Languages",
  "Crafts",
  "Business",
];

const TEACHERS = new Array(6).fill(0).map((_, i) => ({
  id: i + 1,
  name: ["Riya Sharma", "Ananya Bose", "Kavita Rao", "Nisha Patel"][i % 4],
  subject: ["Knitting Expert", "Guitar Coach", "Yoga Trainer", "Chef"][i % 4],
  avatar:
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=800",
}));

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

const StudentExplore = () => {
  const [levelFilter, setLevelFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const [trendingRes, recommendedRes] = await Promise.all([
        api.get('/ai/trending'),
        api.get('/ai/recommendations')
      ]);
      setTrendingCourses(trendingRes.data.trending || []);
      setRecommendedCourses(recommendedRes.data.recommendations || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Fallback to hardcoded data if API fails
      setTrendingCourses(TRENDING);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading courses...</div>;
  }

  return (
    <div className="explore-page">
      {/* Hero Banner */}
      <div className="explore-banner">
        <div className="explore-text">
          <h1>Explore New Skills</h1>
          <p>Discover courses, teachers and offline classes near you</p>

<input 
  className="explore-search" 
  placeholder="Search courses, categories..." 
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

        </div>
        <div className="explore-art" />
      </div>

      {/* Filters */}
      <div className="level-filter">
        {["All", "Beginner", "Intermediate", "Advanced"].map((lvl) => (
          <button
            key={lvl}
            className={`level-pill ${levelFilter === lvl ? "active" : ""}`}
            onClick={() => setLevelFilter(lvl)}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Trending Section */}
      <h2 className="section-title">Trending Courses 🔥</h2>

      <div className="explore-grid">
{TRENDING.filter((c) => {
  const matchesLevel = levelFilter === "All" || c.level === levelFilter;
  const matchesSearch = !search || c.title.toLowerCase().includes(search.toLowerCase());
  const matchesCategory = !categoryFilter || c.title.toLowerCase().includes(categoryFilter.toLowerCase());
  return matchesLevel && matchesSearch && matchesCategory;
}).map((c) => (

          <div className="explore-card" key={c.id}>
            <div
              className="explore-thumb"
              style={{ backgroundImage: `url(${c.thumbnail})` }}
            />
            <div className="explore-body">
              <h3>{c.title}</h3>
              <p className="muted">{c.level}</p>

              <div className="explore-meta">
                👥 {c.students} students
              </div>

              <button className="btn primary" style={{ marginTop: 12 }}>
                View Course
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Courses */}
      <h2 className="section-title">Recommended Courses</h2>
      {recommendedCourses.length > 0 ? (
        recommendedCourses.map((course) => (
          <div key={course.id || Math.random()} className="explore-card">
            <div className="explore-body">
              <h3>{course.title || 'Recommended Course'}</h3>
              <p>Personalized for you</p>
              <button className="btn primary">View</button>
            </div>
          </div>
        ))
      ) : (
        <p>No recommendations yet. Explore more!</p>
      )}

      {/* CATEGORIES Section */}
      <h2 className="section-title">Categories</h2>
      <div className="categories-chips">
        {CATEGORIES.map((cat) => (
          <span key={cat} className="category-chip">
            {cat}
          </span>
        ))}
      </div>

      {/* Browse Categories */}
      <div className="categories-section">
        <div className="cat-top-row">
          <input 
            className="cat-search"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="cat-grid">
          {CATEGORY_LIST.filter((cat) =>
            !search || cat.name.toLowerCase().includes(search.toLowerCase())
          ).map((cat) => (
            <div
              key={cat.name}
              className={`cat-card ${categoryFilter === cat.name ? "active" : ""}`}
              style={{ background: cat.color }}
              onClick={() => setCategoryFilter(categoryFilter === cat.name ? "" : cat.name)}
            >
              <div className="cat-icon">{cat.icon}</div>
              <div className="cat-name">{cat.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Teachers */}
      <h2 className="section-title" style={{ marginTop: 34 }}>
        Popular Teachers
      </h2>

      <div className="teacher-row">
        {TEACHERS.map((t) => (
          <div className="teacher-card" key={t.id}>
            <img src={t.avatar} alt="" className="teacher-avatar" />
            <h4>{t.name}</h4>
            <p className="muted">{t.subject}</p>
            <button className="btn ghost" style={{ marginTop: 10 }}>
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentExplore;
