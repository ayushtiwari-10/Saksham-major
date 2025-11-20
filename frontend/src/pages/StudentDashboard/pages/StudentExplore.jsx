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

const StudentExplore = () => {
  const [levelFilter, setLevelFilter] = useState("All");
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

  return (
    <div className="explore-page">
      {/* Hero Banner */}
      <div className="explore-banner">
        <div className="explore-text">
          <h1>Explore New Skills</h1>
          <p>Discover courses, teachers and offline classes near you</p>

          <input className="explore-search" placeholder="Search courses, categories..." />
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
        {TRENDING.filter(
          (c) => levelFilter === "All" || c.level === levelFilter
        ).map((c) => (
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

      {/* Categories */}
      <h2 className="section-title" style={{ marginTop: 34 }}>
        Top Categories
      </h2>

      <div className="category-row">
        {CATEGORIES.map((cat, idx) => (
          <div key={idx} className="category-chip">
            {cat}
          </div>
        ))}
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
