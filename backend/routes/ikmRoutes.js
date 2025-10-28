const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware'); // [cite: 695]
const { 
  getVerifiedIkms, 
  getIkmById, 
  updateIkmProfile,
  getMyIkmProfile
} = require('../controllers/ikmController');

// Rute Publik (Siapapun boleh akses)
router.get('/', getVerifiedIkms); // [cite: 699]
router.get('/:id', getIkmById); // [cite: 700]

// Rute Terproteksi (Hanya IKM yang login)
router.get('/profile/me', protect, authorize('ikm'), getMyIkmProfile);
router.put('/profile', protect, authorize('ikm'), updateIkmProfile); // [cite: 702-703]

module.exports = router;