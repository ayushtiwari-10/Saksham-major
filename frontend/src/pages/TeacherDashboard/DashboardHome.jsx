// frontend/src/pages/TeacherDashboard/DashboardHome.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import NoticeItem from "./NoticeItem";
import AddClassModal from "../../components/AddClassModal";
import { getMyClassesApi } from "../../services/classService";
import "./TeacherDashboard.css";

const STORAGE_KEY = "saksham_teacher_notices_v1";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [notices, setNotices] = useState([]);
  const [newNoticeText, setNewNoticeText] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    // load from backend if token exists; else fallback to sample
    const load = async () => {
      try {
        const resp = await getMyClassesApi();
        if (resp && resp.classes) setClasses(resp.classes);
      } catch (err) {
        // fallback demo classes if fetch fails
        setClasses([
          { id: "c1", title: "Knitting Basics", image: "https://images.unsplash.com/photo-1520975917014-84f77f2e6b5a?q=80&w=1200", progress: 39, students: 24 },
          { id: "c2", title: "Baking Essentials", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200", progress: 64, students: 12 },
          { id: "c3", title: "Handmade Crafts", image: "https://images.unsplash.com/photo-1592928306958-3f7f2d8b4a6f?q=80&w=1200", progress: 12, students: 6 },
        ]);
      }
    };
    load();

    // notices from local storage
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setNotices(JSON.parse(raw));
    else setNotices([
      { id: "n1", text: "Today's class is rescheduled at 5:00 pm.", pinned: true },
      { id: "n2", text: "Reminder: Upload today's recorded session.", pinned: false }
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
  }, [notices]);

  const orderedNotices = [...notices].sort((a,b) => a.pinned === b.pinned ? b.id.localeCompare(a.id) : a.pinned ? -1 : 1);

  // open Add Class modal
  const openAdd = () => setShowAddModal(true);
  const closeAdd = () => setShowAddModal(false);

  // called when new class is created (from modal)
  const onClassCreated = (createdClass) => {
    setClasses(prev => [createdClass, ...prev]);
  };

  return (
    <div className="teacher-root">
      <Sidebar active="Dashboard" onNavigate={(page) => {
        const routes = {
          "Dashboard": "/teacher/dashboard",
          "My Videos": "/teacher/dashboard/videos",
          "Schedule": "/teacher/dashboard/schedule",
          "ChatBox": "/teacher/dashboard/chatbox",
          "Finances": "/teacher/dashboard/finances",
          "Students": "/teacher/dashboard/students",
          "Profile": "/teacher/dashboard/profile",
          "ChangePassword": "/teacher/dashboard/change-password",
          "PayoutSettings": "/teacher/dashboard/payout-settings",
          "KYC": "/teacher/dashboard/kyc",
        };
        navigate(routes[page] || "/teacher/dashboard");
      }} />
      <div className="teacher-main">
        <Topbar title="Dashboard" />

        <div className="teacher-content">
          <section className="classes-section">
            <div className="classes-header">
              <h3>My Classes</h3>
              <div className="classes-actions">
                <button className="add-class-btn" onClick={openAdd}>＋</button>
              </div>
            </div>

            <div className="classes-grid">
              {classes.map((c) => (
                <article key={c._id || c.id} className="class-card">
                  <div className="card-top" style={{ backgroundImage: `url(${c.image || c.imageUrl || "https://via.placeholder.com/600x300"})` }} />
                  <div className="card-body">
                    <h4>{c.title}</h4>
                    <div className="meta-row">
                      <div className="students">{c.students ?? "—"} students</div>
                      <div className="progress-mini">
                        <div className="progress-track">
                          <div className="progress-value" style={{ width: `${c.progress ?? 0}%` }} />
                        </div>
                        <small>{c.progress ?? 0}%</small>
                      </div>
                    </div>
                    <div className="card-actions">
                      <button className="btn ghost">View</button>
                      <button className="btn primary">Analytics</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="notice-section">
            <div className="notice-header">
              <h3>Notice Board</h3>
              <div className="notice-controls">
                <input
                  className="notice-input"
                  placeholder="Write a new notice..."
                  value={newNoticeText}
                  onChange={(e) => setNewNoticeText(e.target.value)}
                />
                <button className="notice-add" onClick={() => {
                  const t = (newNoticeText||"").trim();
                  if (!t) return;
                  const item = { id: Date.now().toString(), text: t, pinned: false };
                  setNotices(p => [item, ...p]);
                  setNewNoticeText("");
                }}>add +</button>
              </div>
            </div>

            <div className="notice-list">
              {orderedNotices.length === 0 && <div className="empty">No notices yet.</div>}
              {orderedNotices.map((n) => (
                <NoticeItem key={n.id} notice={n} />
              ))}
            </div>
          </aside>
        </div>
      </div>

      <AddClassModal open={showAddModal} onClose={closeAdd} onCreated={onClassCreated} />
    </div>
  );
};

export default DashboardHome;
