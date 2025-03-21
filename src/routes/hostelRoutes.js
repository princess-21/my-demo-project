const express = require('express');
const router = express.Router();
const hostelController = require('../controllers/hostelController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected Routes: Hostel management (requires auth)
router.post('/add', authMiddleware, hostelController.addHostel);
router.get('/list', authMiddleware, hostelController.getHostels);

module.exports = router;
