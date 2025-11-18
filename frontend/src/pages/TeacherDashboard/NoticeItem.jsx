import React from "react";

/**
 * NoticeItem
 * props:
 *  - notice: {id, text, pinned}
 *  - onEdit, onDelete, onTogglePin
 */

const NoticeItem = ({ notice, onEdit, onDelete, onTogglePin }) => {
  return (
    <div className={`notice-item ${notice.pinned ? "pinned" : ""}`}>
      <div className="notice-left">
        <div className="notice-text">{notice.text}</div>
      </div>

      <div className="notice-actions">
        <button className="icon-btn" title={notice.pinned ? "Unpin" : "Pin"} onClick={onTogglePin}>
          {notice.pinned ? "📌" : "📍"}
        </button>
        <button className="icon-btn" title="Edit" onClick={onEdit}>
          ✎
        </button>
        <button className="icon-btn danger" title="Delete" onClick={onDelete}>
          🗑
        </button>
      </div>
    </div>
  );
};

export default NoticeItem;
