import React from "react";
import "./../pages/TeacherDashboard/sections/TeacherVideos.css";

/**
 * VideoCard
 * Props:
 *  - video: { id, title, thumbnail, status, progress, enrolled, duration }
 *  - onEdit(id), onDelete(id), onAnalytics(id), onTogglePublish(id)
 */
const VideoCard = ({ video, onEdit, onDelete, onAnalytics, onTogglePublish }) => {
  return (
    <div className="tv-card">
      <div
        className="tv-thumb"
        style={{ backgroundImage: `url(${video.thumbnail})` }}
        aria-hidden="true"
      />
      <div className="tv-body">
        <div className="tv-row">
          <h4 className="tv-title">{video.title}</h4>
          <div className={`badge ${video.status === "published" ? "pub" : "draft"}`}>
            {video.status}
          </div>
        </div>

        <div className="tv-meta">
          <span>{video.enrolled ?? 0} students</span>
          <span>•</span>
          <span>{video.duration ?? "—"}</span>
        </div>

        <div className="tv-progress">
          <div className="tv-progress-bar" style={{ width: `${video.progress ?? 0}%` }} />
          <small>{video.progress ?? 0}%</small>
        </div>

        <div className="tv-actions">
          <button className="btn-sm" onClick={() => onEdit(video.id)}>Edit</button>
          <button className="btn-sm ghost" onClick={() => onAnalytics(video.id)}>Analytics</button>
          <button className="btn-sm danger" onClick={() => onDelete(video.id)}>Delete</button>
        </div>

        <div className="tv-publish">
          <label className="switch">
            <input
              type="checkbox"
              checked={video.status === "published"}
              onChange={() => onTogglePublish(video.id)}
            />
            <span className="slider" />
          </label>
          <small className="publish-text">{video.status === "published" ? "Published" : "Draft"}</small>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
