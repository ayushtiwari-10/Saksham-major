import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import VriddhiWidget from "../../../components/VriddhiWidget";
import { AuthContext } from "../../../contexts/AuthContext";
import API from "../../../services/api"; // ✅ ADDED
import "./StudentHome.css";

const SAMPLE_COURSES = new Array(8).fill(0).map((_, i) => ({
  id: `c${i + 1}`,
  title: "Knitting",
  hours: 7 + i,
  progress: [39, 64, 12, 80, 25][i % 5],
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR55RFQw9Jn7yKwyG66HNJz0hjK5NJ6DbShxA&s",
}));

const SAMPLE_OFFLINE_CLASSES = [
  {
    id: 1,
    name: "Khan Guitar Classes",
    distance: "2.5 km",
    location: { lat: 22.7196, lng: 75.8577 },
    address: "Near Shastri Bridge",
    category: "Music",
  },
  {
    id: 2,
    name: "Riya Dance Academy",
    distance: "3.8 km",
    location: { lat: 22.7211, lng: 75.85 },
    address: "Vijay Nagar",
    category: "Dance",
  },
  {
    id: 3,
    name: "Fitness Pro Yoga Studio",
    distance: "1.9 km",
    location: { lat: 22.7153, lng: 75.8601 },
    address: "Regal Square",
    category: "Fitness",
  },
  {
    id: 4,
    name: "Cooking with Ananya",
    distance: "4.2 km",
    location: { lat: 22.7252, lng: 75.8622 },
    address: "Palasia",
    category: "Cooking",
  },
];

// Map icons
const classIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [28, 28],
});

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [28, 28],
});

const StudentHome = () => {
  const { user } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("New");
  const [courseFilter, setCourseFilter] = useState("Active");
  const [userLocation, setUserLocation] = useState({
    lat: 22.7196,
    lng: 75.8577,
  });

  // ✅ NEW STATE (for recommendations)
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  // 📍 Geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    }
  }, []);

  // ✅ FETCH RECOMMENDATIONS
  useEffect(() => {
    API.get("/recommendations")
      .then((res) => {
        console.log("Recommendations:", res.data);
        setRecommendedCourses(res.data);
      })
      .catch((err) => {
        console.error("Error fetching recommendations", err);
      });
  }, []);

  return (
    <div className="student-content">
      {/* Banner */}
      <div className="banner-wrapper">
        <div className="student-banner professional-banner">
          <div className="banner-content-glass">
            <div className="banner-left">
              <div className="welcome-circle">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="User"
                />
              </div>
              <div className="welcome-text">
                <h1>
                  Welcome back,{" "}
                  <span className="highlight-text">
                    {user?.name || "Student"}!
                  </span>
                </h1>
                <p className="banner-subtitle">
                  Ready to achieve your daily goals?
                </p>
              </div>
            </div>

            <div className="banner-controls">
              <div className="stats-card glass-stats">
                <div className="stat">
                  <div className="num">4</div>
                  <div className="label">Active Courses</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                  <div className="num">10</div>
                  <div className="label">Completed</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                  <div className="num">6</div>
                  <div className="label">Saved</div>
                </div>
              </div>
              <VriddhiWidget />
            </div>
          </div>
        </div>
      </div>

      {/* Offline Classes */}
      <div className="offline-section">
        <div className="offline-header">
          <h3 className="section-title">Offline nearby classes</h3>
          <Link to="/student/offline" className="see-all-link">
            See all on map →
          </Link>
        </div>

        <div className="offline-content">
          <div className="offline-map-container">
            <MapContainer
              center={[userLocation.lat, userLocation.lng]}
              zoom={13}
              scrollWheelZoom={false}
              className="offline-mini-map"
            >
              <TileLayer
                attribution="© OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[userLocation.lat, userLocation.lng]}
                icon={userIcon}
              >
                <Popup>You are here</Popup>
              </Marker>

              {SAMPLE_OFFLINE_CLASSES.slice(0, 3).map((cls) => (
                <Marker
                  key={cls.id}
                  position={[cls.location.lat, cls.location.lng]}
                  icon={classIcon}
                >
                  <Popup>
                    <b>{cls.name}</b>
                    <br />
                    {cls.address}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="offline-cards-container">
            {SAMPLE_OFFLINE_CLASSES.map((cls) => (
              <div className="offline-class-card" key={cls.id}>
                <div className="class-category-badge">{cls.category}</div>
                <div className="class-info">
                  <h4>{cls.name}</h4>
                  <p className="class-address">{cls.address}</p>
                  <span>📍 {cls.distance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <h3 className="section-title">Recommended for you</h3>

      <div className="recommended-scroll">
        {recommendedCourses.length === 0 ? (
          <p>No recommendations yet</p>
        ) : (
          recommendedCourses.map((c, index) => (
            <div className="rec-card" key={index}>
              <img
                src={c.image || "https://via.placeholder.com/150"}
                alt=""
                className="rec-img"
              />
              <div className="rec-title">{c.title}</div>
              <button className="btn primary">View</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentHome;