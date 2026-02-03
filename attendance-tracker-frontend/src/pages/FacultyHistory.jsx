import React from "react";
import "./FacultyDashboard.css";

const historyData = [
  {
    date: "01 Feb 2026",
    subject: "DBMS",
    total: 60,
    present: 52,
    absent: ["CSE103", "CSE118", "CSE131", "CSE144", "CSE150", "CSE162", "CSE170", "CSE188"],
  },
  {
    date: "30 Jan 2026",
    subject: "Operating Systems",
    total: 60,
    present: 55,
    absent: ["CSE109", "CSE121", "CSE137", "CSE160", "CSE176"],
  },
  {
    date: "28 Jan 2026",
    subject: "Computer Networks",
    total: 60,
    present: 58,
    absent: ["CSE115", "CSE149"],
  },
  {
    date: "26 Jan 2026",
    subject: "DBMS",
    total: 60,
    present: 50,
    absent: ["CSE101", "CSE104", "CSE119", "CSE135", "CSE141", "CSE168", "CSE180", "CSE192", "CSE199", "CSE205"],
  },
  {
    date: "24 Jan 2026",
    subject: "Data Structures",
    total: 60,
    present: 57,
    absent: ["CSE126", "CSE174", "CSE183"],
  },
];

const FacultyHistory = () => {
  const totalClasses = historyData.length;
  const avgAttendance = Math.round(
    historyData.reduce((acc, s) => acc + s.present, 0) / totalClasses
  );

  return (
    <div className="faculty-extreme-bg">
      <div className="faculty-glass history-panel extreme">
        {/* HEADER */}
        <div className="faculty-top">
          <h2>Attendance Analytics</h2>
          <span className="live-dot"></span>
        </div>

        <p className="faculty-desc">
          Detailed attendance insights across recent classes
        </p>

        {/* SUMMARY STRIP */}
        <div className="summary-strip">
          <div className="summary-box">
            <strong>{totalClasses}</strong>
            <span>Classes Conducted</span>
          </div>
          <div className="summary-box highlight">
            <strong>{avgAttendance}</strong>
            <span>Avg Present</span>
          </div>
          <div className="summary-box">
            <strong>60</strong>
            <span>Total Students</span>
          </div>
        </div>

        {/* SESSION CARDS */}
        <div className="history-list premium">
          {historyData.map((session, index) => (
            <div key={index} className="history-card premium">
              {/* SESSION HEADER */}
              <div className="history-header premium">
                <div>
                  <h3>{session.date}</h3>
                  <p className="subject">{session.subject}</p>
                </div>
                <span className="session-badge">
                  {session.present}/{session.total} Present
                </span>
              </div>

              {/* STATS */}
              <div className="history-stats premium">
                <div className="stat-box present">
                  <strong>{session.present}</strong>
                  <span>Present</span>
                </div>
                <div className="stat-box absent">
                  <strong>{session.total - session.present}</strong>
                  <span>Absent</span>
                </div>
              </div>

              {/* ABSENT LIST */}
              <div className="absent-list premium">
                <p>Absent Students</p>
                <div className="chips">
                  {session.absent.map((roll) => (
                    <span key={roll} className="chip premium">
                      {roll}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyHistory;
