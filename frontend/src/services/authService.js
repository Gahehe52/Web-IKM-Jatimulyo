import api from './api'; // Import instance axios [cite: 363]

export const loginUser = async (email, password) => {
  // Panggil endpoint /api/auth/login di backend [cite: 365]
  const response = await api.post('/auth/login', { email, password });
  return response.data; // Balikkan data (misal: { user, token }) [cite: 368]
};

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData); // [cite: 370]
  return response.data;
};