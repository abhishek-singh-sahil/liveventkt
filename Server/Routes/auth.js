const express = require('express')
const Router = express.Router()
const { register, login, verifyOTP, updateProfile, updateEmail, sendChangeEmailOtp } = require('../Controllers/authController')
const { protect } = require('../Middleware/auth')
Router.post('/register', register)
Router.post('/login', login)
Router.post('/verifyOTP', verifyOTP)
Router.put("/update", protect, updateProfile);
Router.post("/sendotp", protect, sendChangeEmailOtp);
Router.post("/update-email", protect, updateEmail);
module.exports = Router
