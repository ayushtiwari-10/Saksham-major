import React from "react";
import "./../pages/StudentDashboard/StudentDashboard.css";

/**
 * CourseCard — small reusable card for student enrolled courses
 * props:
 *  - course: {id, title, thumbnail, progress}
 *  - onOpen()
 */
const CourseCard = ({ course, onOpen = () => {} }) => {
  return (
    <div className="course-card" onClick={onOpen}>
      <div className="course-thumb" style={{ backgroundImage: `url(${course.thumbnail})` }} />
      <div className="course-body">
        <h4>{course.title}</h4>
        <div className="progress-line">
          <div className="progress-fill" style={{ width: `${course.progress}%` }} />
        </div>
        <small>{course.progress}% completed</small>
      </div>
    </div>
  );
};

export default CourseCard;
