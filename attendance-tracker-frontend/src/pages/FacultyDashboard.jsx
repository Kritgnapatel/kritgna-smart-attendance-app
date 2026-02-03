import React from "react";
import { useNavigate } from "react-router-dom";
import "./FacultyDashboard.css";

const FacultyDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="faculty-extreme-bg">
      <div className="faculty-glass faculty-home">
        <div className="faculty-top">
          <h2>Faculty Command Center</h2>
          <span className="live-dot"></span>
        </div>

        <p className="faculty-desc">
          Manage live attendance and review past class records
        </p>

        <div className="faculty-options extreme">
          {/* PRIMARY CARD */}
          <div
            className="faculty-option-card primary"
            onClick={() => navigate("/faculty/live")}
          >
            <h3>Live Attendance</h3>
            <p>Generate QR for the current class</p>
            <span className="card-tag">LIVE</span>
          </div>

          {/* SECONDARY CARD */}
          <div
            className="faculty-option-card secondary"
            onClick={() => navigate("/faculty/history")}
          >
            <h3>Attendance History</h3>
            <p>Review past attendance data</p>
            <span className="card-tag subtle">ANALYTICS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
