import React, { useState, useEffect } from "react";
import api from "../../../services/api.js";
import "./StudentCourses.css";

const StudentCourses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await api.get("/teacher/classes");
        setClasses(response.data.classes || response.data || []);
      } catch (err) {
        console.error("Fetch classes error:", err);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  if (loading) return <div className="loading">Loading courses...</div>;
  if (error) return <div className="error">{error}</div>;

  const filteredClasses = classes.filter(c => filter === "all" || c.status?.toLowerCase() === filter);

  return (
    <div className="course-page">
      <div className="course-filter-row">
        {["all", "online", "offline"].map((f) => (
          <button
            key={f}
            className={`course-filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="course-grid">
        {filteredClasses.map((cls) => (
          <article key={cls._id} className="course-card">
            <div 
              className="course-img" 
              style={{ backgroundImage: `url(${cls.image || 'https://via.placeholder.com/300x200?text=No+Image'})` }} 
            />
            <div className="course-body">
              <h3>{cls.title}</h3>
              <p>{cls.instructor?.name || 'Unknown Teacher'}</p>
              <div className="info-row">
                <span>₹{cls.price}</span>
                <span>{cls.category}</span>
              </div>
              <div className="action-row">
                <button className="btn ghost">Details</button>
                <button className="btn primary">Enroll</button>
              </div>
            </div>
          </article>
        ))}
        {filteredClasses.length === 0 && (
          <div className="empty-state">
            No courses available. Check back soon!
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCourses;
