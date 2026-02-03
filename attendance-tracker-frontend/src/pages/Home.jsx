import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-extreme-bg">
      <div className="home-glass">
        <h1 className="home-title">
          Smart Attendance <span>System</span>
        </h1>

        <p className="home-tagline">
          Secure • Fast • QR-based attendance for modern classrooms
        </p>

        <div className="home-cards">
          <div
            className="home-card faculty-card"
            onClick={() => navigate("/faculty")}
          >
            <div className="icon">👨‍🏫</div>
            <h3>Faculty</h3>
            <p>Generate secure QR & manage live sessions</p>
          </div>

          <div
            className="home-card student-card"
            onClick={() => navigate("/student")}
          >
            <div className="icon">🎓</div>
            <h3>Student</h3>
            <p>Scan QR instantly & mark attendance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
