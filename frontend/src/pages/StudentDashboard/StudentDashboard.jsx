import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import CourseCard from "../../components/CourseCard";
import "./StudentDashboard.css";

/**
 * Student Dashboard (UI)
 * - Topbar (reuses your Topbar)
 * - Left: Progress cards / quick stats
 * - Middle: Enrolled courses + Continue button
 * - Right: Recommendations + upcoming classes
 *
 * Replace dummy data with API calls:
 *  - GET /api/users/:id/enrollments
 *  - GET /api/recommendations
 */

const sampleEnrolled = [
  {
    id: "c1",
    title: "Baking Basics",
    thumbnail: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=8b6f4c35c6c5ab3f565f8f63d6b60d07",
    progress: 42,
    nextSession: "2025-08-28 05:00 PM",
  },
  {
    id: "c2",
    title: "Knitting - Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1520975917014-84f77f2e6b5a?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6b1d03a7b478f4b0b8c6c18f9a4ac7e6",
    progress: 12,
    nextSession: "2025-08-29 10:00 AM",
  },
];

const sampleRecommended = [
  { id: "r1", title: "Quick Cake Tricks", thumbnail: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2d3a7fb3c8f6f1a9e4b7c9b9d7c89b37", score: 0.92 },
  { id: "r2", title: "Home Décor Crafts", thumbnail: "https://images.unsplash.com/photo-1518544884925-1d0a4f1d8c33?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=abcd1234efgh5678", score: 0.78 },
];

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [enrolled, setEnrolled] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // TODO: Replace with actual API calls (with auth)
    setEnrolled(sampleEnrolled);
    setRecommended(sampleRecommended);
  }, []);

  const continueCourse = (c) => {
    // TODO: navigate to course player or class detail
    alert(`Continue: ${c.title}`);
  };

  const openCourse = (c) => {
    alert(`Open course page: ${c.title}`);
    // TODO: route: /courses/:id
  };

  const enrollRecommended = (r) => {
    // TODO: POST /api/enrollments
    alert(`Enrolled in ${r.title} (demo)`);
  };

  const filteredEnrolled = enrolled.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="student-root">
      <Sidebar active={activeSection} onNavigate={setActiveSection} />
      <div className="student-main">
        <Topbar title="Welcome back, Learner" />

        <div className="student-content">
          {/* LEFT — Stats & quick */}
          <aside className="student-left">
            <div className="stat-card">
              <h4>Learning Streak</h4>
              <div className="stat-value">7 days</div>
              <p className="stat-sub">Keep up the momentum!</p>
            </div>

            <div className="stat-card">
              <h4>Courses Enrolled</h4>
              <div className="stat-value">{enrolled.length}</div>
              <p className="stat-sub">Active courses</p>
            </div>

            <div className="stat-card">
              <h4>Coins Balance</h4>
              <div className="stat-value">₹ 420</div>
              <p className="stat-sub">Available in wallet</p>
            </div>

            <div className="upcoming">
              <h4>Upcoming Sessions</h4>
              <ul>
                {enrolled.slice(0, 3).map((e) => (
                  <li key={e.id}>
                    <strong>{e.title}</strong>
                    <span>{e.nextSession}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* CENTER — Enrolled courses */}
          <main className="student-center">
            <div className="center-header">
              <h3>My Learning</h3>
              <div className="center-actions">
                <input
                  placeholder="Search my courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="course-grid">
              {filteredEnrolled.length === 0 ? (
                <div className="empty">No courses found. Explore recommendations on the right.</div>
              ) : (
                filteredEnrolled.map((c) => (
                  <div className="enrolled-card" key={c.id}>
                    <CourseCard course={c} onOpen={() => openCourse(c)} />
                    <div className="enrolled-actions">
                      <button className="btn primary" onClick={() => continueCourse(c)}>Continue</button>
                      <button className="btn ghost" onClick={() => openCourse(c)}>Details</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>

          {/* RIGHT — Recommendations */}
          <aside className="student-right">
            <div className="rec-header">
              <h4>Recommended for you</h4>
              <p className="muted">AI-curated based on your interests</p>
            </div>

            <div className="rec-list">
              {recommended.map((r) => (
                <div className="rec-item" key={r.id}>
                  <img src={r.thumbnail} alt={r.title} />
                  <div className="rec-body">
                    <strong>{r.title}</strong>
                    <div className="rec-meta">
                      <small>Match: {(r.score * 100).toFixed(0)}%</small>
                    </div>
                    <div className="rec-actions">
                      <button className="btn small primary" onClick={() => enrollRecommended(r)}>Enroll</button>
                      <button className="btn small ghost" onClick={() => alert("Preview (TODO)")}>Preview</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="help-card">
              <h5>Need help?</h5>
              <p>Connect with tutors or join free weekly office hours.</p>
              <button className="btn ghost" onClick={() => alert("Open help center")}>Get Support</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
