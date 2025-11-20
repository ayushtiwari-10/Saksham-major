// src/pages/StudentDashboard/pages/StudentOfflineClasses.jsx

import React, { useEffect, useState } from "react";
import "./StudentOfflineClasses.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// custom map marker
const classIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [36, 36],
});

const SAMPLE_CLASSES = [
  {
    id: 1,
    name: "Khan Guitar Classes",
    distance: "2.5 km",
    location: { lat: 22.7196, lng: 75.8577 },
    address: "Near Shastri Bridge",
  },
  {
    id: 2,
    name: "Riya Dance Academy",
    distance: "3.8 km",
    location: { lat: 22.7211, lng: 75.8500 },
    address: "Vijay Nagar",
  },
  {
    id: 3,
    name: "Fitness Pro Yoga Studio",
    distance: "1.9 km",
    location: { lat: 22.7153, lng: 75.8601 },
    address: "Regal Square",
  },
  {
    id: 4,
    name: "Cooking with Ananya",
    distance: "4.2 km",
    location: { lat: 22.7252, lng: 75.8622 },
    address: "Palasia",
  },
];

const StudentOfflineClasses = () => {
  const [userLocation, setUserLocation] = useState({
    lat: 22.7196,
    lng: 75.8577
  });

  // get live geolocation
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

  return (
    <div className="offline-page">

      {/* MAP SECTION */}
      <div className="offline-map-section">
        <h2>Nearby Classes</h2>

        <MapContainer
          center={[userLocation.lat, userLocation.lng]}
          zoom={13}
          scrollWheelZoom={true}
          className="offline-map"
        >
          <TileLayer
            attribution='© OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Student Marker */}
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>You are here</Popup>
          </Marker>

          {/* Class Markers */}
          {SAMPLE_CLASSES.map((cls) => (
            <Marker
              key={cls.id}
              position={[cls.location.lat, cls.location.lng]}
              icon={classIcon}
            >
              <Popup>
                <b>{cls.name}</b>
                <br />
                {cls.address}
                <br />
                <button
                  style={{
                    marginTop: "6px",
                    padding: "4px 6px",
                    border: "none",
                    background: "#2b59ff",
                    color: "#fff",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${cls.location.lat},${cls.location.lng}`
                    )
                  }
                >
                  Get Directions
                </button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* LIST SECTION */}
      <div className="offline-list-section">
        <h2>Available Classes</h2>

        {SAMPLE_CLASSES.map((cls) => (
          <div className="offline-card" key={cls.id}>
            <div className="offline-card-left" />

            <div className="offline-card-body">
              <h3>{cls.name}</h3>
              <p className="muted">{cls.address}</p>
              <p className="muted">📍 {cls.distance}</p>

              <button
                className="btn primary"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${cls.location.lat},${cls.location.lng}`
                  )
                }
              >
                View on Map
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default StudentOfflineClasses;
