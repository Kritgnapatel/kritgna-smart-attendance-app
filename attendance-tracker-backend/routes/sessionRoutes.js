import express from "express";
import Session from "../models/Session.js";
import QRCode from "qrcode";

const router = express.Router();

// CREATE SESSION
router.post("/create", async (req, res) => {
  try {
    // session expiry: 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const session = new Session({
      faculty: null,   // 🔑 IMPORTANT FIX
      expiresAt,
      isActive: true,
    });

    const savedSession = await session.save();

    res.status(201).json({
      sessionId: savedSession._id,
      expiresAt: savedSession.expiresAt,
    });
  } catch (error) {
    console.error("SESSION CREATE ERROR:", error);
    res.status(500).json({ message: "Session create failed" });
  }
});

// GENERATE QR
router.get("/qr/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findById(sessionId);

    if (!session || !session.isActive) {
      return res.status(404).json({ message: "Invalid or expired session" });
    }

    const qrData = JSON.stringify({ sessionId });

    const qrCode = await QRCode.toDataURL(qrData);

    res.status(200).json({
      qrCode,
      expiresAt: session.expiresAt,
    });
  } catch (error) {
    console.error("QR ERROR:", error);
    res.status(500).json({ message: "QR generation failed" });
  }
});

export default router;
