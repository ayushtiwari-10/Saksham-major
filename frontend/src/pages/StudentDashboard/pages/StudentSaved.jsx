import React, { useState } from "react";
import "./StudentSaved.css";

const SAVED_ITEMS = [
  {
    id: "s1",
    title: "Guitar Beginner Course",
    hours: 12,
    type: "Course",
    progress: 0,
    image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?q=80&w=1200",
  },
  {
    id: "s2",
    title: "Digital Painting Basics",
    hours: 8,
    type: "Course",
    progress: 45,
    image: "https://images.unsplash.com/photo-1553524913-efba3f0b4f17?q=80&w=1200",
  },
  {
    id: "s3",
    title: "How to Bake Cookies Like a Pro",
    hours: 2,
    type: "Video",
    progress: 100,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200",
  },
  {
    id: "s4",
    title: "Basics of Photography",
    hours: 3,
    type: "Article",
    progress: 0,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200",
  },
];

const StudentSaved = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = SAVED_ITEMS.filter((c) => {
    const matchType = filter === "All" || c.type === filter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const removeFromSaved = (id) => {
    alert("Remove button clicked — attach backend later!");
  };

  return (
    <div className="saved-page">

          {/* Top search + filter row */}
          <div className="saved-top-row">
            <input
              className="saved-search"
              placeholder="Search saved items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="saved-filters">
              {["All", "Course", "Video", "Article"].map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Saved items grid */}
          <div className="saved-grid">
            {filtered.map((item) => (
              <div key={item.id} className="saved-card">
                <div
                  className="saved-img"
                  style={{ backgroundImage: `url(${item.image})` }}
                />

                <div className="saved-body">
                  <div className="saved-title">{item.title}</div>

                  <div className="saved-meta">
                    <span>{item.hours} hrs</span>
                    <span className="type-pill">{item.type}</span>
                  </div>

                  {/* Progress */}
                  {item.type === "Course" && (
                    <div className="progress-mini">
                      <div className="progress-track">
                        <div
                          className="progress-value"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <small>{item.progress}%</small>
                    </div>
                  )}

                  <div className="saved-actions">
                    <button className="btn ghost">View</button>
                    <button
                      className="btn danger"
                      onClick={() => removeFromSaved(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
  );
};

export default StudentSaved;
