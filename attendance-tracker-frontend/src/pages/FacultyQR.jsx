import React, { useState, useEffect } from "react";
import API from "../services/api";
import "./FacultyDashboard.css";

const FacultyQR = () => {
  const [qrCode, setQrCode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateQR = async () => {
    try {
      setLoading(true);

      // Create session
      const createRes = await API.post("/sessions/create", {
        facultyId: "FAC101",
      });

      const sessionId = createRes.data.sessionId;

      // Get QR
      const qrRes = await API.get(`/sessions/qr/${sessionId}`);

      setQrCode(qrRes.data.qrCode);

      // Calculate countdown
      const expiryTime = new Date(qrRes.data.expiresAt).getTime();
      const now = Date.now();
      setTimeLeft(Math.floor((expiryTime - now) / 1000));
    } catch (err) {
      alert("Error generating QR");
    } finally {
      setLoading(false);
    }
  };

  // Countdown timer
  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      setQrCode(null);
      setTimeLeft(null);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="faculty-extreme-bg">
      <div className="faculty-glass">
        <div className="faculty-top">
          <h2>Live Attendance</h2>
          <span className="live-dot"></span>
        </div>

        <p className="faculty-desc">
          Generate QR for students to mark attendance
        </p>

        {!qrCode && (
          <button className="primary-btn" onClick={generateQR}>
            {loading ? "Generating..." : "Generate QR"}
          </button>
        )}

        {qrCode && (
          <>
            <div className="qr-glow-wrapper">
              <img src={qrCode} alt="QR Code" />
            </div>

            {timeLeft !== null && (
              <div className="neon-timer">
                Time Left:{" "}
                {Math.floor(timeLeft / 60)
                  .toString()
                  .padStart(2, "0")}
                :
                {(timeLeft % 60).toString().padStart(2, "0")}
              </div>
            )}

            <button
              className="secondary-btn"
              onClick={() => {
                setQrCode(null);
                setTimeLeft(null);
              }}
            >
              End Session
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FacultyQR;
