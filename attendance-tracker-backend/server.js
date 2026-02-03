import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";


const app = express();
app.use(cors());

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/faculty", facultyRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/attendance", attendanceRoutes);

app.get("/", (req, res) => {
  res.send("Smart Attendance Tracker API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
