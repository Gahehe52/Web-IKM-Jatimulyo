const express = require('express');
const router = express.Router();

// Impor controller yang berisi logika
const { 
  getVerifiedIkms, 
  getIkmById, 
  updateIkmProfile, 
  addIkmProduct 
} = require('../controllers/ikmController');

// Impor middleware untuk proteksi
const { protect, authorize } = require('../middleware/authMiddleware');

/* * =========================================
 * RUTE PUBLIK (Bisa diakses siapa saja)
 * =========================================
 */

// GET /api/ikm
// Mendapatkan semua IKM yang sudah terverifikasi
router.get('/', getVerifiedIkms);

// GET /api/ikm/:id
// Mendapatkan detail satu IKM spesifik
router.get('/:id', getIkmById);

/* * =========================================
 * RUTE PRIVATE (Hanya untuk IKM)
 * =========================================
 */

// PUT /api/ikm/profile
// IKM meng-update profilnya sendiri
// 'protect' memastikan user sudah login
// 'authorize('ikm')' memastikan user adalah IKM
router.put('/profile', protect, authorize('ikm'), updateIkmProfile);

// POST /api/ikm/products
// IKM menambah produk baru
router.post('/products', protect, authorize('ikm'), addIkmProduct);


module.exports = router;