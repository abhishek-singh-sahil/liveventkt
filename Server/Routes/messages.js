const express = require("express");
const Support = require("../Models/contactMessage.js");

// 🔥 IMPORT MAIL FUNCTIONS
const {
  sendContactAutoReply,
  sendAdminNotification, // 👈 Imported the new admin mail function
} = require("../utils/mail.js");

const Router = express.Router();

Router.post("/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, website, message } = req.body;

    // ✅ VALIDATION
    if (!email || !message) {
      return res.status(400).json({
        success: false,
        message: "Email and message are required",
      });
    }

    // ✅ SAVE TO DB
    const data = await Support.create({
      firstName,
      lastName,
      email,
      phone,
      website,
      message,
    });

    // =========================
    // 📩 1. AUTO REPLY TO USER
    // =========================
    await sendContactAutoReply(email, firstName);

    // =========================
    // 📩 2. MAIL TO ADMIN (YOU)
    // =========================
    // 👈 Now we just pass the data to our utility function
    await sendAdminNotification(firstName, lastName, email, phone, website, message); 

    // ✅ RESPONSE
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data,
    });

  } catch (err) {
    console.error("❌ Contact error:", err.message);

    res.status(500).json({
      success: false,
      message: "Failed to process request",
    });
  }
});

module.exports = Router;