import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const loadClasses = async () => {
    try {
      console.log('Loading classes...');
      const resp = await getMyClassesApi();
      console.log('Classes response:', resp);
      const classList = resp.classes || resp || [];
      setClasses(Array.isArray(classList) ? classList : []);
    } catch (err) {
      console.error('Load classes failed:', err);
      setClasses([]);
    }
  };

  useEffect(() => {
    loadClasses();

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
  const onClassCreated = async (createdClass) => {
    console.log('Class created:', createdClass);
    setClasses(prev => {
      const newClasses = [createdClass, ...prev];
      return newClasses;
    });
    // refetch
    await loadClasses();
  };

  return (
    <div className="teacher-root">
      <div className="teacher-main">
        <Topbar title="Dashboard" />
        <div className="teacher-content">
          <section className="classes-section">
            <div className="classes-header">
              <h3>My Classes ({classes.length})</h3>
              <div className="classes-actions">
                <button className="add-class-btn" onClick={openAdd}>＋</button>
              </div>
            </div>

            {classes.length === 0 ? (
              <div className="empty-classes">
                <p>No classes yet. Create your first class!</p>
              </div>
            ) : (
              <div className="classes-grid">
                {classes.map((c, index) => (
                  <article key={c._id || c.id || index} className="class-card">
                    <div className="card-top" style={{ backgroundImage: `url(${c.image || c.imageUrl || "https://via.placeholder.com/600x300?text=No+Image"})` }} />
                    <div className="card-body">
                      <h4>{c.title}</h4>
                      <div className="meta-row">
                        <div className="students">{c.students || 0} students</div>
                        <div className="progress-mini">
                          <div className="progress-track">
                            <div className="progress-value" style={{ width: `${c.progress || 0}%` }} />
                          </div>
                          <small>{c.progress || 0}%</small>
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
            )}
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
