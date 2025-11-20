// src/pages/StudentDashboard/pages/StudentCourses.jsx
import React, { useState } from "react";

import "./StudentCourses.css";

const SAMPLE = new Array(8).fill(0).map((_, i) => ({
  id: i + 1,
  title: "Knitting Course",
  hours: 4 + i,
  progress: [20, 40, 60, 80][i % 4],
  image: "https://images.unsplash.com/photo-1520975917014-84f77f2e6b5a?q=80&w=1200",
}));

const StudentCourses = () => {
  const [filter, setFilter] = useState("Active");

  return (
    <div className="course-page">
      {/* COURSE FILTER BUTTONS */}
      <div className="course-filter-row">
        {["Active", "Completed", "Saved"].map((f) => (
          <button
            key={f}
            className={`course-filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* COURSE GRID */}
      <div className="course-grid">
        {SAMPLE.map((c) => (
          <article key={c.id} className="course-card">
            <div className="course-img" style={{ backgroundImage: `url(${c.image})` }} />

            <div className="course-body">
              <h3>{c.title}</h3>

              <div className="info-row">
                <span>{c.hours} hrs</span>

                <div className="mini-progress">
                  <div className="track">
                    <div className="value" style={{ width: `${c.progress}%` }} />
                  </div>
                  <small>{c.progress}%</small>
                </div>
              </div>

              <div className="action-row">
                <button className="btn ghost">View</button>
                <button className="btn primary">Continue</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;
