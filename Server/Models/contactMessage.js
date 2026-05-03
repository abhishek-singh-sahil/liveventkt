const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  website: String,
  message: String,
}, { timestamps: true });

module.exports = mongoose.model("Support", supportSchema);