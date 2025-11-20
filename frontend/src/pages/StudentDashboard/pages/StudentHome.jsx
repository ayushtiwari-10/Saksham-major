import React, { useState } from "react";
import VriddhiWidget from "../../../components/VriddhiWidget";
import "./StudentHome.css";

const SAMPLE_COURSES = new Array(8).fill(0).map((_, i) => ({
  id: `c${i + 1}`,
  title: "Knitting",
  hours: 7 + i,
  progress: [39, 64, 12, 80, 25][i % 5],
  image: "https://images.unsplash.com/photo-1520975917014-84f77f2e6b5a?q=80&w=1200",
}));

const StudentHome = () => {
  const [activeTab, setActiveTab] = useState("New");
  const [courseFilter, setCourseFilter] = useState("Active");

  return (
    <div className="student-content">
          {/* ---------------------------------------------------------------- */}
          {/* Banner */}
          {/* ---------------------------------------------------------------- */}
          <div className="student-banner">
            <div className="banner-left">
              <div className="welcome-circle" />
              <div>
                <h1>Welcome!</h1>
                <p className="muted">Your learning dashboard</p>
              </div>
            </div>

            <div className="banner-controls">
              <div className="stats-card">
                <div className="stat">
                  <div className="num">4</div>
                  <div className="label">active courses</div>
                </div>
                <div className="stat">
                  <div className="num">10</div>
                  <div className="label">completed</div>
                </div>
                <div className="stat">
                  <div className="num">6</div>
                  <div className="label">saved</div>
                </div>
              </div>
              <VriddhiWidget />
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Tabs */}
          {/* ---------------------------------------------------------------- */}
          <div className="tabs-row">
            <div className="chips">
              {["New", "Trending", "Popular"].map((t) => (
                <button
                  key={t}
                  className={`chip ${activeTab === t ? "active" : ""}`}
                  onClick={() => setActiveTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="course-filter">
              {["Active", "Completed", "Saved"].map((f) => (
                <button
                  key={f}
                  className={`pill ${courseFilter === f ? "active" : ""}`}
                  onClick={() => setCourseFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Course Grid */}
          {/* ---------------------------------------------------------------- */}
          <section className="course-grid">
            {SAMPLE_COURSES.map((c) => (
              <article key={c.id} className="class-card">
                <div className="card-top" style={{ backgroundImage: `url(${c.image})` }} />
                <div className="card-body">
                  <h4>{c.title}</h4>

                  <div className="meta-row">
                    <div className="students">{c.hours} hrs</div>
                    <div className="progress-mini">
                      <div className="progress-track">
                        <div className="progress-value" style={{ width: `${c.progress}%` }} />
                      </div>
                      <small>{c.progress}%</small>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button className="btn ghost">View</button>
                    <button className="btn primary">Continue</button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* ---------------------------------------------------------------- */}
          {/* Recommended */}
          {/* ---------------------------------------------------------------- */}
          <h3 className="section-title">Recommended for you</h3>

          <div className="recommended-scroll">
            {SAMPLE_COURSES.slice(0, 6).map((c) => (
              <div className="rec-card" key={c.id}>
                <img src={c.image} alt="" className="rec-img" />
                <div className="rec-title">{c.title}</div>
                <button className="btn primary">View</button>
              </div>
            ))}
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Offline Classes */}
          {/* ---------------------------------------------------------------- */}
          <h3 className="section-title">Offline nearby classes</h3>

          <div className="offline-list">
            {new Array(4).fill(0).map((_, idx) => (
              <div className="offline-item" key={idx}>
                <div className="offline-thumb" />
                <div className="offline-body">
                  <div className="offline-title">Khan Guitar Classes</div>
                  <div className="muted">Near Shastri Bridge • 2.5 km away</div>
                </div>
                <button className="btn primary">View</button>
              </div>
            ))}
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Search / Social / Cart */}
          {/* ---------------------------------------------------------------- */}
          <div className="bottom-tools">
            <input className="category-search" placeholder="Search category..." />

            <div className="social-group">
              <button className="social small">G</button>
              <button className="social small">f</button>
              <button className="social small">t</button>
              <button className="btn ghost">🛒 Cart</button>
            </div>
          </div>
        </div>
  );
};

export default StudentHome;
