import React, { useState } from "react";
import QRScanner from "../components/QRScanner";
import API from "../services/api";
import "./StudentPage.css";

const StudentPage = () => {
  const [scanning, setScanning] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | scanning | success | error
  const [message, setMessage] = useState("");

  const startScan = () => {
    setStatus("scanning");
    setMessage("");
    setScanning(true);
  };

  const stopScan = () => {
    setScanning(false);
    setStatus("idle");
  };

  const handleScanSuccess = async (text) => {
    setScanning(false);

    try {
      const data = JSON.parse(text);
      const res = await API.post("/attendance/mark", {
        studentRollNo: "CSE101",
        sessionId: data.sessionId,
      });

      setStatus("success");
      setMessage(res.data.message);
    } catch (err) {
      setStatus("error");
      setMessage(
        err.response?.data?.message || "Invalid QR or session expired"
      );
    }
  };

  return (
    <div className="student-extreme-bg">
      <div className="student-glass">
        {/* TOP HEADER (FACULTY STYLE) */}
        <div className="student-top">
          <h2>Student Control Panel</h2>
          <span className="live-dot"></span>
        </div>

        <p className="student-desc">
          Scan the live attendance QR displayed by faculty
        </p>

        {/* ACTION AREA */}
        {!scanning && status === "idle" && (
          <button className="primary-btn" onClick={startScan}>
            Start Attendance Scan
          </button>
        )}

        {scanning && (
          <>
            <div className="scanner-glow-wrapper">
              <QRScanner onScanSuccess={handleScanSuccess} />
            </div>
            <button className="secondary-btn" onClick={stopScan}>
              Stop Scan
            </button>
          </>
        )}

        {status === "success" && (
          <div className="status-glass success">
            <h3>Attendance Marked</h3>
            <p>{message}</p>
            <button className="secondary-btn" onClick={startScan}>
              Scan Again
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="status-glass error">
            <h3>Scan Failed</h3>
            <p>{message}</p>
            <button className="secondary-btn" onClick={startScan}>
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPage;
