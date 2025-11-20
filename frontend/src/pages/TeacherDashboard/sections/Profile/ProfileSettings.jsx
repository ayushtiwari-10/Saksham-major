import React, { useEffect, useRef, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import Sidebar from "../../../../components/Sidebar";
import Topbar from "../../../../components/Topbar";
import "../../../../pages/TeacherDashboard/TeacherDashboard.css";
import "./Profile.css";

/**
 * 100% FRONTEND CLOUDINARY UPLOAD (Unsigned)
 * No backend required
 * No .env required — safe for public usage
 */

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "do4bcgwvl";
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "saksham_unsigned";

const DEFAULT_AVATAR = "/default-avatar.png";

const initialState = {
  fullName: "Alexa Rawles",
  nickName: "Alexa",
  email: "alexarawles@gmail.com",
  gender: "Female",
  country: "India",
  language: "English",
  timezone: "GMT+5:30",
  avatarUrl: DEFAULT_AVATAR,
  emails: [{ id: "e1", email: "alexarawles@gmail.com", primary: true }],
};

const ProfileSettings = () => {
  const location = useLocation();
  const isStudent = location.pathname.startsWith("/student");
  const { user, setUser } = useContext(AuthContext);

  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem("saksham_profile_v1");
    return saved ? JSON.parse(saved) : {
      ...initialState,
      fullName: user?.name || initialState.fullName,
      avatarUrl: user?.profileImage || initialState.avatarUrl,
      email: user?.email || initialState.email
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef(null);
  const autosaveTimer = useRef(null);
  const focusRef = useRef({});

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const scheduleAutosave = () => {
    clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => saveProfile(), 900);
  };

  const handleChange = (e) => {
    setIsEditing(true);
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    scheduleAutosave();
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/user/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: form.fullName,
          profileImage: form.avatarUrl
        })
      });
      if (response.ok) {
        const updatedUser = await response.json();
        // Update AuthContext
        setUser(updatedUser);
        showToast("Saved");
        setIsEditing(false);
      } else {
        showToast("Save failed");
      }
    } catch {
      showToast("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    const saved = localStorage.getItem("saksham_profile_v1");
    setForm(saved ? JSON.parse(saved) : {
      ...initialState,
      fullName: user?.name || initialState.fullName,
      avatarUrl: user?.profileImage || initialState.avatarUrl,
      email: user?.email || initialState.email
    });
    setIsEditing(false);
    showToast("Changes discarded");
  };

  const onAvatarClick = () => fileInputRef.current?.click();

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(10);

    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", UPLOAD_PRESET);

    const fake = setInterval(() => {
      setUploadProgress((p) => (p < 90 ? p + 10 : p));
    }, 200);

    try {
      const res = await fetch(url, { method: "POST", body: fd });
      const data = await res.json();

      clearInterval(fake);
      setUploadProgress(100);

      if (data.secure_url) {
        const updated = { ...form, avatarUrl: data.secure_url };
        setForm(updated);
        localStorage.setItem("saksham_profile_v1", JSON.stringify(updated));
        showToast("Profile photo updated");
      } else {
        showToast("Upload failed");
      }
    } catch {
      showToast("Upload error");
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 900);
    }
  };

  const addEmail = () => {
    setIsEditing(true);
    const id = Date.now().toString();
    setForm((p) => ({
      ...p,
      emails: [...p.emails, { id, email: "", primary: false }],
    }));
  };

  const updateEmail = (id, email) => {
    setIsEditing(true);
    setForm((p) => ({
      ...p,
      emails: p.emails.map((em) => (em.id === id ? { ...em, email } : em)),
    }));
    scheduleAutosave();
  };

  const removeEmail = (id) => {
    setIsEditing(true);
    setForm((p) => ({
      ...p,
      emails: p.emails.filter((e) => e.id !== id),
    }));
    scheduleAutosave();
  };

  const makePrimary = (id) => {
    setIsEditing(true);
    setForm((p) => ({
      ...p,
      emails: p.emails.map((em) => ({ ...em, primary: em.id === id })),
    }));
    scheduleAutosave();
  };

  const miniNav = [
    { key: "profile", label: "Profile", refKey: "fullName" },
    { key: "personal", label: "Personal", refKey: "nickName" },
    { key: "contact", label: "Contact", refKey: "emails" },
    { key: "security", label: "Security", refKey: "timezone" },
  ];

  const jumpTo = (refKey) => {
    const el = focusRef.current[refKey];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    return () => clearTimeout(autosaveTimer.current);
  }, []);

  const content = (
    <div className="profile-wrapper-saksham">
      <div className="profile-card-saksham">
        <div className="profile-side-mini">
          {miniNav.map((m) => (
            <button key={m.key} className="mini-btn" onClick={() => jumpTo(m.refKey)}>
              {m.label}
            </button>
          ))}
        </div>

        <div className="profile-main-area">
          <div className="profile-top-row">
            <div className="profile-info">
              <div className="avatar-wrap">
                <img
                  src={form.avatarUrl}
                  className="profile-photo"
                  onClick={onAvatarClick}
                  alt="avatar"
                />
                <div className="avatar-edit-overlay" onClick={onAvatarClick}>
                  {uploading ? `Uploading ${uploadProgress}%` : "Edit"}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFile}
                  hidden
                />
              </div>

              <div>
                <h3>{form.fullName}</h3>
                <p className="muted">{form.email}</p>
                {saving && <div className="saving-pill">Saving…</div>}
              </div>
            </div>

            <div className="profile-actions">
              {!isEditing ? (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  Edit
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="save-btn" onClick={saveProfile}>Save</button>
                  <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                </div>
              )}
            </div>
          </div>

          <hr className="divider-line" />

          <div className="profile-grid">
            <div ref={(el) => (focusRef.current.fullName = el)} className="form-group">
              <label>Full Name</label>
              <input disabled={!isEditing} name="fullName" value={form.fullName} onChange={handleChange} />
            </div>

            <div ref={(el) => (focusRef.current.nickName = el)} className="form-group">
              <label>Nickname</label>
              <input disabled={!isEditing} name="nickName" value={form.nickName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select disabled={!isEditing} name="gender" value={form.gender} onChange={handleChange}>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Country</label>
              <input disabled={!isEditing} name="country" value={form.country} onChange={handleChange} />
            </div>

            <div class-name="form-group">
              <label>Language</label>
              <select disabled={!isEditing} name="language" value={form.language} onChange={handleChange}>
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>

            <div ref={(el) => (focusRef.current.timezone = el)} className="form-group">
              <label>Time Zone</label>
              <input disabled={!isEditing} name="timezone" value={form.timezone} onChange={handleChange} />
            </div>
          </div>

          <div ref={(el) => (focusRef.current.emails = el)} className="emails-section">
            <h4>Emails</h4>

            <div className="emails-list">
              {form.emails.map((em) => (
                <div className="email-row" key={em.id}>
                  <input
                    className="email-input"
                    disabled={!isEditing}
                    value={em.email}
                    onChange={(e) => updateEmail(em.id, e.target.value)}
                  />

                  <div className="email-actions">
                    {!em.primary && (
                      <button className="mini" disabled={!isEditing} onClick={() => makePrimary(em.id)}>
                        Make primary
                      </button>
                    )}

                    <button className="mini danger" disabled={!isEditing} onClick={() => removeEmail(em.id)}>
                      Remove
                    </button>

                    {em.primary && <span className="primary-pill">Primary</span>}
                  </div>
                </div>
              ))}
            </div>

            <button className="add-email" disabled={!isEditing} onClick={addEmail}>
              + Add email
            </button>
          </div>
        </div>
      </div>

      {toast && <div className="saksham-toast">{toast}</div>}
    </div>
  );

  if (isStudent) {
    return content;
  }

  return (
    <div className="teacher-root">
      <Sidebar active="Profile" />
      <div className="teacher-main">
        <Topbar title="Profile Settings" />
        {content}
      </div>
    </div>
  );
};

export default ProfileSettings;
