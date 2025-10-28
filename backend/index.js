require('dotenv').config(); // [cite: 574]
const express = require('express');
const cors = require('cors');

// Nanti kita akan import rute-rute di sini [cite: 575]
const authRoutes = require('./routes/authRoutes');
const ikmRoutes = require('./routes/ikmRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000; // [cite: 578]

// Middleware [cite: 579]
app.use(cors()); // [cite: 580]
app.use(express.json()); // [cite: 581]

// Gunakan Rute [cite: 582]
app.use('/api/auth', authRoutes); // [cite: 583]
app.use('/api/ikm', ikmRoutes); // [cite: 584]
app.use('/api/admin', adminRoutes); // [cite: 585]

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`); // [cite: 587]
});