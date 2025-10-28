// Memuat environment variables (dari file .env) paling pertama
require('dotenv').config(); 

// Impor library yang dibutuhkan
const express = require('express');
const cors = require('cors');

// Impor file rute yang sudah kita buat
const authRoutes = require('./routes/authRoutes');
const ikmRoutes = require('./routes/ikmRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Inisialisasi aplikasi Express
const app = express();

// Tentukan PORT. Ambil dari .env, atau gunakan 5000 jika tidak ada
const PORT = process.env.PORT || 5000;

/*
 * ===================================
 * MIDDLEWARE
 * ===================================
 */

// 1. CORS (Cross-Origin Resource Sharing)
//    Mengizinkan frontend Anda (di localhost:5173) untuk berbicara
//    dengan backend Anda (di localhost:5000)
app.use(cors());

// 2. Body Parser
//    Mengizinkan server untuk membaca data JSON yang dikirim
//    di dalam body request (req.body)
app.use(express.json());


/*
 * ===================================
 * RUTE / ENDPOINTS
 * ===================================
 */

// Mengarahkan semua request yang dimulai dengan '/api/auth'
// untuk ditangani oleh file 'authRoutes.js'
app.use('/api/auth', authRoutes);

// Mengarahkan semua request yang dimulai dengan '/api/ikm'
// untuk ditangani oleh file 'ikmRoutes.js'
app.use('/api/ikm', ikmRoutes);

// Mengarahkan semua request yang dimulai dengan '/api/admin'
// untuk ditangani oleh file 'adminRoutes.js'
app.use('/api/admin', adminRoutes);

// Rute "Selamat Datang" untuk path root (/)
// Ini untuk mengetes apakah server berjalan di browser
app.get('/', (req, res) => {
  res.send('Selamat Datang di API MitraLink IKM! Server berjalan.');
});


/*
 * ===================================
 * MENJALANKAN SERVER
 * ===================================
 */

// Mulai server dan dengarkan koneksi di PORT yang ditentukan
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});