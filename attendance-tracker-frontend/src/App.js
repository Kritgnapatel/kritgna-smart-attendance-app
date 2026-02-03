import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FacultyDashboard from "./pages/FacultyDashboard";
import FacultyLive from "./pages/FacultyLive";
import FacultyHistory from "./pages/FacultyHistory";
import StudentPage from "./pages/StudentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/faculty/live" element={<FacultyLive />} />
        <Route path="/faculty/history" element={<FacultyHistory />} />
        <Route path="/student" element={<StudentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
