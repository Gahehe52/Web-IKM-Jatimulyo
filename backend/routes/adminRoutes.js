const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware'); // [cite: 707]
const { 
  getUnverifiedIkms, 
  verifyIkm,
  getAllUsers
} = require('../controllers/adminController');

// Rute ini hanya bisa diakses oleh Admin
router.get('/unverified', protect, authorize('admin'), getUnverifiedIkms); // [cite: 711]
router.put('/verify/:id', protect, authorize('admin'), verifyIkm); // [cite: 713]
router.get('/users', protect, authorize('admin'), getAllUsers); // Rute tambahan

module.exports = router;