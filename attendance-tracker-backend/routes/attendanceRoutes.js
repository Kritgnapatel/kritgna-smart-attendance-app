import express from "express";
import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";
import Session from "../models/Session.js";

const router = express.Router();

// MARK ATTENDANCE (QR Scan)
router.post("/mark", async (req, res) => {
  try {
    const { studentRollNo, sessionId } = req.body;

    // 1️⃣ Check student
    const student = await Student.findOne({ rollNo: studentRollNo });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 2️⃣ Check session
    const session = await Session.findById(sessionId);
    if (!session || !session.isActive) {
      return res.status(400).json({ message: "Invalid or inactive session" });
    }

    // 3️⃣ Check expiry
    if (Date.now() > new Date(session.expiresAt).getTime()) {
      session.isActive = false;
      await session.save();
      return res.status(400).json({ message: "Session expired" });
    }

    // 4️⃣ Mark attendance
    const attendance = new Attendance({
      student: student._id,
      session: session._id,
    });

    await attendance.save();

    res.status(201).json({ message: "Attendance marked successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Attendance already marked" });
    }
    res.status(500).json({ message: error.message });
  }
});

export default router;
