import express from "express";
import Faculty from "../models/Faculty.js";

const router = express.Router();

// CREATE FACULTY
router.post("/create", async (req, res) => {
  try {
    const { name, facultyId, department } = req.body;

    const faculty = new Faculty({
      name,
      facultyId,
      department,
    });

    const savedFaculty = await faculty.save();
    res.status(201).json(savedFaculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
