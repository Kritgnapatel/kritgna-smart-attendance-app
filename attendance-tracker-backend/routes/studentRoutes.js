import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// CREATE STUDENT
router.post("/", async (req, res) => {
  try {
    const { name, rollNo, branch } = req.body;

    const student = new Student({
      name,
      rollNo,
      branch,
    });

    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET ALL STUDENTS
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
