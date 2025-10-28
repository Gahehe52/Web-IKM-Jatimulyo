const express = require('express');
const router = express.Router();

// Impor controller yang berisi logika
const { 
  getUnverifiedIkms, 
  verifyIkm 
} = require('../controllers/adminController');

// Impor middleware untuk proteksi
const { protect, authorize } = require('../middleware/authMiddleware');

/* * =========================================
 * RUTE PRIVATE (Hanya untuk ADMIN)
 * =========================================
 */

// Semua rute di file ini akan diproteksi oleh 'protect' dan 'authorize('admin')'
// Kita bisa terapkan di setiap rute, atau di level router (lihat contoh di bawah)

// GET /api/admin/unverified
// Mendapatkan daftar IKM yang belum terverifikasi
router.get('/unverified', protect, authorize('admin'), getUnverifiedIkms);

// PUT /api/admin/verify/:ikm_id
// Admin menyetujui (memverifikasi) IKM
router.put('/verify/:ikm_id', protect, authorize('admin'), verifyIkm);


/*
// --- Cara Alternatif (Menerapkan middleware ke semua rute sekaligus) ---
// Jika SEMUA rute di file ini butuh proteksi yang sama,
// Anda bisa gunakan router.use() di bagian atas seperti ini:

router.use(protect);
router.use(authorize('admin'));

// Lalu rutenya bisa ditulis lebih bersih:
router.get('/unverified', getUnverifiedIkms);
router.put('/verify/:ikm_id', verifyIkm);

// Pilih salah satu cara, jangan dua-duanya. 
// Cara pertama (di setiap rute) lebih jelas untuk dibaca.
*/

module.exports = router;