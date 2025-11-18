import React from "react";
import "./CourseCarousel.css";

const courses = [
  {
    id: 1,
    title: "Knitting",
    image:
      "https://img.freepik.com/free-photo/knitting-needles-wool-yarn_23-2148422645.jpg",
  },
  {
    id: 2,
    title: "Knitting",
    image:
      "https://img.freepik.com/free-photo/knitting-needles-wool-yarn_23-2148422645.jpg",
  },
  {
    id: 3,
    title: "Knitting",
    image:
      "https://img.freepik.com/free-photo/knitting-needles-wool-yarn_23-2148422645.jpg",
  },
  {
    id: 4,
    title: "Knitting",
    image:
      "https://img.freepik.com/free-photo/knitting-needles-wool-yarn_23-2148422645.jpg",
  },
];

const CourseCarousel = () => {
  return (
    <section className="carousel-section">
      <h2 className="carousel-title">Browse Our Top Courses</h2>
      <p className="carousel-subtext">
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y
        archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de
        las industrias desde el año 1500, cuando un impresor.
      </p>

      <div className="carousel-container">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.title} />
            <div className="course-info">
              <h3>{course.title}</h3>
              <button className="view-btn">
                {course.id === 4 ? "Continue" : "View"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="view-all-container">
        <button className="view-all-btn">View All</button>
      </div>
    </section>
  );
};

export default CourseCarousel;
