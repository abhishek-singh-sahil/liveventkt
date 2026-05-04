const express = require('express')
const Router = express.Router()

// 🔥 Added forgotPassword and resetPassword to the imports
const { 
  register, 
  login, 
  verifyOTP, 
  updateProfile, 
  updateEmail, 
  sendChangeEmailOtp, 
  forgotPassword, 
  resetPassword 
} = require('../Controllers/authController')

const { protect } = require('../Middleware/auth')

Router.post('/register', register)
Router.post('/login', login)
Router.post('/verifyOTP', verifyOTP)
Router.put("/update", protect, updateProfile);
Router.post("/sendotp", protect, sendChangeEmailOtp);
Router.post("/update-email", protect, updateEmail);

// ==============================
// 🔑 PASSWORD RESET ROUTES
// ==============================
Router.post('/forgot-password', forgotPassword);
Router.post('/reset-password', resetPassword);

module.exports = Router