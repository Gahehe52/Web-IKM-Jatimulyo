import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: localStorage.getItem('token') || null, // [cite: 116]
    isAuthenticated: !!localStorage.getItem('token'), // [cite: 118]
  });

  // [cite: 121-128]
  useEffect(() => {
    if (auth.token) {
      // TODO: Buat fungsi untuk memvalidasi token ke backend
      // Jika valid, set data user. Jika tidak, panggil logout().
      // Untuk sekarang, kita akan mengambil data user dari token
      // (asumsi backend mengirim data user saat login)
      //
      // Anda perlu library seperti jwt-decode: npm install jwt-decode
      // import { jwtDecode } from 'jwt-decode';
      // try {
      //   const decoded = jwtDecode(auth.token);
      //   // Cek apakah token expired
      //   if (decoded.exp * 1000 < Date.now()) {
      //     logout();
      //   } else {
      //     // Ini asumsi data user ada di dalam token
      //     setAuth(prev => ({ ...prev, user: { id: decoded.userId, role: decoded.role } }));
      //   }
      // } catch (error) {
      //   logout();
      // }
    }
  }, [auth.token]);

  // Fungsi Login [cite: 130]
  const login = (userData, token) => {
    localStorage.setItem('token', token); // [cite: 131]
    setAuth({
      user: userData,
      token: token,
      isAuthenticated: true,
    });
  };

  // Fungsi Logout [cite: 140]
  const logout = () => {
    localStorage.removeItem('token'); // [cite: 141]
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook [cite: 155]
export const useAuth = () => {
  return useContext(AuthContext);
};