import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import VideoCard from "../../../components/VideoCard";
import "./TeacherVideos.css";

/**
 * TeacherVideos Page
 * - Tabs: My Videos | Create
 * - My Videos: grid (edit/delete/analytics/publish)
 * - Create: upload form with preview
 *
 * Replace TODOs with your backend endpoints (e.g., /api/teacher/videos)
 */

const sampleVideos = [
  {
    id: "v1",
    title: "Knitting - Basics",
    thumbnail: "https://images.unsplash.com/photo-1520975917014-84f77f2e6b5a?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6b1d03a7b478f4b0b8c6c18f9a4ac7e6",
    status: "published",
    progress: 39,
    enrolled: 24,
    duration: "25m",
  },
  {
    id: "v2",
    title: "Baking Muffins",
    thumbnail: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=8b6f4c35c6c5ab3f565f8f63d6b60d07",
    status: "draft",
    progress: 12,
    enrolled: 8,
    duration: "18m",
  },
  // add more sample cards if needed
];

const TeacherVideos = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("myvideos"); // myvideos | create
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    thumbnailFile: null,
    videoFile: null,
    thumbnailPreview: null,
  });

  const handleNavigate = (section) => {
    const routes = {
      "Dashboard": "/teacher/dashboard",
      "My Videos": "/teacher/dashboard/videos",
      "Schedule": "/teacher/dashboard/schedule",
      "ChatBox": "/teacher/dashboard/chatbox",
      "Finances": "/teacher/dashboard/finances" // assuming a route for finances
    };
    navigate(routes[section] || "/teacher/dashboard");
  };

  useEffect(() => {
    // TODO: replace with API call: GET /api/teacher/videos
    setVideos(sampleVideos);
  }, []);

  const handleEdit = (id) => {
    alert("Edit " + id + " (open modal / navigate to editor).");
    // TODO: open editor page or modal
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this video?")) return;
    setVideos((p) => p.filter((v) => v.id !== id));
    // TODO: DELETE request to backend
  };

  const handleAnalytics = (id) => {
    alert("Open analytics for " + id);
    // TODO: navigate to analytics dashboard
  };

  const handleTogglePublish = (id) => {
    setVideos((p) => p.map((v) => (v.id === id ? { ...v, status: v.status === "published" ? "draft" : "published" } : v)));
    // TODO: PATCH backend: /api/teacher/videos/:id/publish
  };

  // Create form handlers
  const onFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    if (field === "thumbnail") {
      setForm((f) => ({ ...f, thumbnailFile: file, thumbnailPreview: URL.createObjectURL(file) }));
    } else {
      setForm((f) => ({ ...f, videoFile: file }));
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!form.title || !form.videoFile) return alert("Please provide a title and a video file.");
    // Build FormData and POST to backend
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("duration", form.duration);
    if (form.thumbnailFile) fd.append("thumbnail", form.thumbnailFile);
    fd.append("video", form.videoFile);

    // TODO: POST /api/teacher/videos (Authorization header)
    // Example:
    // fetch('/api/teacher/videos',{ method: 'POST', headers: { Authorization: 'Bearer ' + token }, body: fd })
    //   .then(res=>res.json()).then(newVideo => setVideos(p=>[newVideo,...p]))

    // For demo: add to local list
    const newV = {
      id: Date.now().toString(),
      title: form.title,
      thumbnail: form.thumbnailPreview || "https://via.placeholder.com/600x350",
      status: "draft",
      progress: 0,
      enrolled: 0,
      duration: form.duration || "0m",
    };
    setVideos((p) => [newV, ...p]);
    setForm({ title: "", description: "", duration: "", thumbnailFile: null, videoFile: null, thumbnailPreview: null });
    setActive("myvideos");
  };

  return (
    <div className="teacher-root">
      <Sidebar active="My Videos" onNavigate={handleNavigate} />
      <div className="teacher-main">
        <Topbar title="My Videos" />

        <div className="tv-page">
          <div className="tv-controls">
            <div className="tv-tabs">
              <button className={`tab ${active === "myvideos" ? "active" : ""}`} onClick={() => setActive("myvideos")}>My Videos</button>
              <button className={`tab ${active === "create" ? "active" : ""}`} onClick={() => setActive("create")}>Create</button>
            </div>

            <div className="tv-search">
              <input placeholder="Search your class" />
            </div>
          </div>

          {active === "myvideos" && (
            <section className="tv-grid-wrap">
              {videos.length === 0 && <div className="empty">No videos yet. Click Create to upload your first video.</div>}
              <div className="tv-grid">
                {videos.map((v) => (
                  <VideoCard
                    key={v.id}
                    video={v}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAnalytics={handleAnalytics}
                    onTogglePublish={handleTogglePublish}
                  />
                ))}
              </div>
            </section>
          )}

          {active === "create" && (
            <section className="tv-create">
              <form className="create-form" onSubmit={handleUpload}>
                <div className="form-row">
                  <label>Title</label>
                  <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
                </div>

                <div className="form-row">
                  <label>Description</label>
                  <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
                </div>

                <div className="form-row">
                  <label>Duration (e.g., 25m)</label>
                  <input value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))} />
                </div>

                <div className="form-row cols">
                  <div>
                    <label>Thumbnail (optional)</label>
                    <input type="file" accept="image/*" onChange={(e) => onFileChange(e, "thumbnail")} />
                    {form.thumbnailPreview && <img className="thumb-preview" src={form.thumbnailPreview} alt="preview" />}
                  </div>

                  <div>
                    <label>Video File</label>
                    <input type="file" accept="video/*" onChange={(e) => onFileChange(e, "video")} required />
                    <small className="muted">Supported: mp4, mov. Max 500MB (adjust on backend)</small>
                  </div>
                </div>

                <div className="form-actions">
                  <button className="btn primary" type="submit">Upload & Save</button>
                  <button className="btn ghost" type="button" onClick={() => { setForm({ title: "", description: "", duration: "", thumbnailFile: null, videoFile: null, thumbnailPreview: null }); }}>Reset</button>
                </div>
              </form>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherVideos;
