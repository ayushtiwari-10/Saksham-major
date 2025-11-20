// frontend/src/pages/TeacherDashboard/components/AddClassModal.jsx
import React, { useState } from "react";
import "./AddClassModal.css";

const initial = {
  title: "",
  category: "",
  priceINR: "",
  description: "",
  imageUrl: "",
  capacity: "",
  mode: "online", // online / offline / hybrid
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) return setError(v);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("/api/teacher/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: form.title,
          category: form.category,
          priceINR: Number(form.priceINR),
          description: form.description,
          imageUrl: form.imageUrl,
          capacity: Number(form.capacity || 0),
          mode: form.mode,
          startTime: form.startTime || null,
          durationMinutes: Number(form.durationMinutes || 0),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create class");
      // created
      setForm(initial);
      onCreated && onCreated(data.class || data);
      onClose && onClose();
    } catch (err) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="acm-overlay" onClick={onClose}>
      <div className="acm-modal" onClick={(e) => e.stopPropagation()}>
        <header className="acm-header">
          <h3>Create new class</h3>
          <button className="acm-close" onClick={onClose}>✕</button>
        </header>

        <form className="acm-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input name="title" value={form.title} onChange={handleChange} placeholder="e.g., Baking Basics" />
          </label>

          <label>
            Category
            <input name="category" value={form.category} onChange={handleChange} placeholder="Cooking, Craft, Music..." />
          </label>

          <label className="acm-row">
            <div>
              Price (₹)
              <input name="priceINR" value={form.priceINR} onChange={handleChange} type="number" placeholder="e.g., 499" />
            </div>
            <div>
              Capacity
              <input name="capacity" value={form.capacity} onChange={handleChange} type="number" placeholder="e.g., 20" />
            </div>
          </label>

          <label>
            Mode
            <select name="mode" value={form.mode} onChange={handleChange}>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </label>

          <label className="acm-row">
            <div>
              Start Date/Time
              <input name="startTime" value={form.startTime} onChange={handleChange} type="datetime-local" />
            </div>
            <div>
              Duration (mins)
              <input name="durationMinutes" value={form.durationMinutes} onChange={handleChange} type="number" placeholder="e.g., 90" />
            </div>
          </label>

          <label>
            Image URL (thumbnail)
            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Paste image URL (or leave blank)" />
            <small className="acm-hint">Use an image URL for now; we’ll add uploads later.</small>
          </label>

          <label>
            Description
            <textarea name="description" value={form.description} onChange={handleChange} rows="4" placeholder="Write short description..."></textarea>
          </label>

          {error && <div className="acm-error">{error}</div>}

          <div className="acm-actions">
            <button type="button" className="acm-btn ghost" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" className="acm-btn primary" disabled={loading}>{loading ? "Creating..." : "Create Class"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
