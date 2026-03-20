import React, { useState } from "react";
import "./AddClassModal.css";

const initial = {
  title: "",
  category: "",
  priceINR: "",
  description: "",
  imageUrl: "",
  capacity: "",
  mode: "online",
  startTime: "",
  durationMinutes: "",
};

export default function AddClassModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!form.title.trim()) return "Title is required";
    if (!form.category.trim()) return "Category is required";
    if (!form.priceINR || Number(form.priceINR) < 0) return "Enter valid price";
    return null;
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm((p) => ({ ...p, thumbnailFile: file, imageUrl: url }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return setError(v);

    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("category", form.category);
      fd.append("priceINR", form.priceINR);
      fd.append("description", form.description);
      fd.append("capacity", form.capacity || "0");
      fd.append("mode", form.mode);
      fd.append("startTime", form.startTime);
      fd.append("durationMinutes", form.durationMinutes || "0");
      if (form.thumbnailFile) fd.append("image", form.thumbnailFile);
      else if (form.imageUrl) fd.append("imageUrl", form.imageUrl);

      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/teacher/classes", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create class");
      setForm(initial);
      onCreated?.(data.class || data);
      onClose?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Create New Course</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Baking Basics" required />
          </div>
          <div className="form-group">
            <label>Category *</label>
            <input name="category" value={form.category} onChange={handleChange} placeholder="Baking" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Price (₹)</label>
              <input name="priceINR" type="number" value={form.priceINR} onChange={handleChange} placeholder="499" />
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input name="capacity" type="number" value={form.capacity} onChange={handleChange} placeholder="20" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Mode</label>
              <select name="mode" value={form.mode} onChange={handleChange}>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div className="form-group">
              <label>Duration (min)</label>
              <input name="durationMinutes" type="number" value={form.durationMinutes} onChange={handleChange} placeholder="90" />
            </div>
          </div>
          <div className="form-group">
            <label>Thumbnail Upload</label>
            <div className="upload-area">
              <input type="file" accept="image/*" onChange={handleThumbnailUpload} />
              <label htmlFor="thumbnail" className="upload-btn">📁 Upload Image</label>
              {form.imageUrl && (
                <div className="preview">
                  <img src={form.imageUrl} alt="Preview" />
                </div>
              )}
              <small>Or paste URL below</small>
              <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://image.url" />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="4" />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

