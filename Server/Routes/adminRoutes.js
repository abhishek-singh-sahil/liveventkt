const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../Controllers/adminController');

// Ensure you have admin middleware to protect this!
router.get('/dashboard-stats', getDashboardStats);

module.exports = router;