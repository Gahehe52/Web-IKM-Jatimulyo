import axios from 'axios';

// Buat instance axios [cite: 342]
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // <-- Sesuaikan dengan URL backend Anda [cite: 343]
});

// (BEST PRACTICE) Tambahkan Interceptor untuk mengirim Token
// Setiap request akan dicegat dan ditambahkan header Authorization [cite: 345-347]
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // [cite: 349]
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // [cite: 351]
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;