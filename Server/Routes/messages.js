const express = require("express");
const Support = require("../models/contactMessage.js");

const Router = express.Router();

Router.post("/contact", async (req, res) => {
  try {
    const data = await Support.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: "Failed to save message" });
  }
});

module.exports = Router;