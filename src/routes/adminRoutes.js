const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Public Route: Admin login
router.post('/login', adminController.loginAdmin);

// Protected Route: Admin dashboard (requires auth)
router.get('/dashboard', authMiddleware, adminController.viewDashboard);

module.exports = router;
