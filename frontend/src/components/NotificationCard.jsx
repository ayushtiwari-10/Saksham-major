import React from 'react';
import './NotificationCard.css';

const NotificationCard = ({ type, message, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return 'ℹ';
    }
  };

  return (
    <div className={`notification-card ${type}`}>
      <div className="notification-icon">{getIcon()}</div>
      <div className="notification-content">
        <p>{message}</p>
      </div>
      <button className="notification-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default NotificationCard;
