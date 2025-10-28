import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Terima 'roles' sebagai prop untuk mengecek role [cite: 417]
const ProtectedRoute = ({ roles }) => {
  const { isAuthenticated, user } = useAuth(); // [cite: 418, 421]

  // 1. Cek apakah sudah login [cite: 419]
  if (!isAuthenticated) {
    // Jika belum, lempar ke halaman login [cite: 422]
    return <Navigate to="/login" replace />; // [cite: 423]
  }

  // 2. Cek apakah role-nya sesuai [cite: 425]
  // 'roles' adalah array, misal: ['admin'] atau ['ikm']
  if (roles && !roles.includes(user?.role)) { // [cite: 427]
    // Jika role tidak sesuai, lempar ke halaman utama
    return <Navigate to="/" replace />; // [cite: 431]
  }

  // 3. Jika lolos semua, tampilkan halaman yang dituju
  return <Outlet />; // [cite: 434]
};

export default ProtectedRoute;