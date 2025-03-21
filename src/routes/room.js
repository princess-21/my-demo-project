const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected Routes: Room management (requires auth)
router.post('/allocate', authMiddleware, roomController.allocateRoom);
router.get('/allocations', authMiddleware, roomController.getAllAllocations);

module.exports = router;
