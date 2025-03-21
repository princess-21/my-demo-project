const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Public Route: Admin login
router.post('/login', adminController.loginAdmin);

// Protected Route: Admin dashboard (requires auth)
router.get('/dashboard', authMiddleware, adminController.viewDashboard);

module.exports = router;


// const jwt = require('jsonwebtoken');

// const adminAuthMiddleware = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, 'your_jwt_secret');
//     req.admin = decoded.adminId;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// module.exports = adminAuthMiddleware;
