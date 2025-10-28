import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // [cite: 378]
import { loginUser } from '../services/authService'; // [cite: 379]

const LoginPage = () => {
  const [email, setEmail] = useState(''); // [cite: 381]
  const [password, setPassword] = useState(''); // [cite: 382]
  const [error, setError] = useState(''); // [cite: 383]
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // [cite: 384]
  const navigate = useNavigate(); // [cite: 377]

  const handleSubmit = async (e) => { // [cite: 387]
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // 1. Panggil API service [cite: 391]
      const data = await loginUser(email, password); // [cite: 392]
      // 2. Jika sukses, simpan ke context [cite: 393]
      login(data.user, data.token); // [cite: 394]
      
      // 3. Arahkan ke halaman dashboard [cite: 395]
      if (data.user.role === 'ikm') navigate('/dashboard-ikm'); // [cite: 396]
      else if (data.user.role === 'admin') navigate('/dashboard-admin'); // [cite: 397-398]
      else navigate('/'); // Fallback
      
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal. Periksa email dan password.'); // [cite: 402]
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl z-10">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold text-primary">
          Login ke Akun Anda
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Atau <Link to="/register" className="font-medium text-secondary hover:text-green-700">
            daftar akun baru
          </Link>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && <p className="text-red-600 text-sm text-center font-medium">{error}</p>}
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">Email</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
              placeholder="Alamat Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;