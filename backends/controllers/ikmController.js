// Impor koneksi database yang sudah kita buat di config
const db = require('../config/db');

/*
 * @desc    Mendapatkan SEMUA IKM yang sudah terverifikasi
 * @route   GET /api/ikm
 * @access  Publik
 */
exports.getVerifiedIkms = async (req, res) => {
  try {
    // 1. Ambil data IKM yang status 'is_verified' nya true
    // Kita juga bisa tambahkan filter sederhana dari query string, misal /api/ikm?kategori=kuliner
    // (Tapi untuk sekarang, kita ambil semua dulu)
    
    // Kita 'JOIN' dengan tabel categories untuk mendapatkan nama kategori
    // Ini query yang sedikit lebih canggih tapi sangat berguna
    const query = `
      SELECT p.*, string_agg(c.nama_kategori, ', ') AS kategori 
      FROM ikm_profiles p
      LEFT JOIN ikm_categories ic ON p.profile_id = ic.ikm_profile_id
      LEFT JOIN categories c ON ic.category_id = c.category_id
      WHERE p.is_verified = true
      GROUP BY p.profile_id;
    `;
    
    const { rows } = await db.query(query);

    // 2. Kirim datanya sebagai JSON
    res.status(200).json(rows);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

/*
 * @desc    Mendapatkan detail SATU IKM spesifik
 * @route   GET /api/ikm/:id
 * @access  Publik
 */
exports.getIkmById = async (req, res) => {
  try {
    // 1. Ambil 'id' dari parameter URL (misal: /api/ikm/12 -> id = 12)
    const { id } = req.params;

    // 2. Ambil data profil IKM
    const profileQuery = db.query('SELECT * FROM ikm_profiles WHERE profile_id = $1 AND is_verified = true', [id]);
    
    // 3. Ambil data produk-produk yang dimiliki IKM tersebut
    const productsQuery = db.query('SELECT * FROM products WHERE ikm_profile_id = $1', [id]);

    // 4. Jalankan kedua query secara bersamaan untuk efisiensi
    const [profileResult, productsResult] = await Promise.all([profileQuery, productsQuery]);

    // 5. Cek apakah profilnya ada
    if (profileResult.rows.length === 0) {
      return res.status(404).json({ message: 'IKM tidak ditemukan atau belum terverifikasi' });
    }

    // 6. Gabungkan hasilnya: 1 objek profil + 1 array produk di dalamnya
    const ikm = profileResult.rows[0];
    ikm.products = productsResult.rows;

    // 7. Kirim datanya
    res.status(200).json(ikm);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

/*
 * @desc    IKM meng-update profilnya sendiri
 * @route   PUT /api/ikm/profile
 * @access  Private (IKM Only)
 */
exports.updateIkmProfile = async (req, res) => {
  try {
    // 1. Ambil user_id dari token (didapat dari middleware 'protect')
    // Ini memastikan IKM hanya bisa update profilnya sendiri
    const { user_id } = req.user;

    // 2. Ambil data baru dari body request
    const { nama_usaha, nama_pemilik, alamat, no_telepon, deskripsi_usaha, kapasitas_produksi } = req.body;

    // 3. Buat query UPDATE
    const query = `
      UPDATE ikm_profiles
      SET nama_usaha = $1, nama_pemilik = $2, alamat = $3, no_telepon = $4, deskripsi_usaha = $5, kapasitas_produksi = $6
      WHERE user_id = $7
      RETURNING *
    `;
    const params = [nama_usaha, nama_pemilik, alamat, no_telepon, deskripsi_usaha, kapasitas_produksi, user_id];

    // 4. Eksekusi query
    const { rows } = await db.query(query, params);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Profil IKM tidak ditemukan untuk user ini' });
    }

    // 5. Kirim data profil yang sudah ter-update
    res.status(200).json({ message: 'Profil berhasil diperbarui', profile: rows[0] });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

/*
 * @desc    IKM menambah produk baru ke portofolionya
 * @route   POST /api/ikm/products
 * @access  Private (IKM Only)
 */
exports.addIkmProduct = async (req, res) => {
  try {
    // 1. Ambil user_id dari token
    const { user_id } = req.user;
    
    // 2. Ambil data produk baru dari body request
    const { nama_produk, deskripsi_produk, foto_produk_url } = req.body;

    // 3. Kita butuh 'profile_id', tapi kita cuma punya 'user_id' dari token.
    //    Jadi, kita cari dulu 'profile_id' berdasarkan 'user_id'
    const profileResult = await db.query('SELECT profile_id FROM ikm_profiles WHERE user_id = $1', [user_id]);

    if (profileResult.rows.length === 0) {
      return res.status(404).json({ message: 'Profil IKM tidak ditemukan' });
    }
    
    const { profile_id } = profileResult.rows[0]; // Sekarang kita punya profile_id

    // 4. Buat query INSERT produk baru
    const query = `
      INSERT INTO products (ikm_profile_id, nama_produk, deskripsi_produk, foto_produk_url)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const params = [profile_id, nama_produk, deskripsi_produk, foto_produk_url];

    // 5. Eksekusi query
    const { rows } = await db.query(query, params);

    // 6. Kirim data produk yang baru dibuat
    res.status(201).json({ message: 'Produk berhasil ditambahkan', product: rows[0] });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};