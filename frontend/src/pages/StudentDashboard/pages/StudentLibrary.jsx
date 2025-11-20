// src/pages/StudentDashboard/pages/StudentLibrary.jsx
import React from "react";
import "./StudentLibrary.css";

const LIBRARY_ITEMS = new Array(10).fill(0).map((_, i) => ({
  id: i + 1,
  title: "Knitting Basics - PDF Guide",
  type: ["PDF", "Video", "Image"][i % 3],
  size: ["2.1 MB", "45 MB", "860 KB"][i % 3],
  thumb: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1200",
}));

const StudentLibrary = () => {
  return (
    <div className="library-page">
          
          {/* TITLE */}
          <h2 className="section-title">Your Saved Materials</h2>

          <div className="library-grid">
            {LIBRARY_ITEMS.map((item) => (
              <div key={item.id} className="library-card">
                
                <div
                  className="library-thumb"
                  style={{ backgroundImage: `url(${item.thumb})` }}
                />

                <div className="library-body">
                  <h3 className="library-title">{item.title}</h3>

                  <div className="library-meta">
                    <span className="tag">{item.type}</span>
                    <span className="size">{item.size}</span>
                  </div>

                  <div className="library-actions">
                    <button className="btn ghost">View</button>
                    <button className="btn primary">Download</button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
  );
};

export default StudentLibrary;
