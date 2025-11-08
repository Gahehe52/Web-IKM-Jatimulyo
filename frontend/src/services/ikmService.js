import api from './api';

// Mengambil SEMUA IKM (untuk halaman direktori)
export const getAllIkms = async () => {
  // Ini akan memanggil GET http://localhost:5000/api/ikm
  const response = await api.get('/ikm'); 
  return response.data;
};

// Mengambil SATU IKM (untuk halaman detail)
export const getIkmById = async (id) => {
  // Ini akan memanggil GET http://localhost:5000/api/ikm/:id
  const response = await api.get(`/ikm/${id}`);
  return response.data;
};

// (NEW) Mengambil profil IKM yang sedang login
export const getMyIkmProfile = async () => {
  // Ini akan memanggil GET http://localhost:5000/api/ikm/profile/me
  const response = await api.get('/ikm/profile/me');
  return response.data;
};

// Mengupdate profil IKM (untuk dashboard IKM)
export const updateIkmProfile = async (profileData) => {
  // 'profileData' bisa berisi { nama_usaha, desc, link, dll }
  // Ini akan memanggil PUT http://localhost:5000/api/ikm/profile
  const response = await api.put('/ikm/profile', profileData); 
  return response.data;
};

// (Untuk Admin) Mengambil IKM yang belum diverifikasi
export const getUnverifiedIkms = async () => {
  const response = await api.get('/admin/unverified');
  return response.data;
};

// (Untuk Admin) Memverifikasi IKM
export const verifyIkm = async (id) => {
  const response = await api.put(`/admin/verify/${id}`);
  return response.data;
};