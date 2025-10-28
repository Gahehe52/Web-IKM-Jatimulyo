import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [namaUsaha, setNamaUsaha] = useState('');
  const [role, setRole] = useState('ikm'); // Default role 'ikm'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      setLoading(false);
      return;
    }

    try {
      const userData = { email, password, role, nama_usaha: namaUsaha };
      await registerUser(userData);
      setSuccess('Registrasi sukses! Anda akan diarahkan ke halaman login.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl z-10">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold text-primary">
          Daftar Akun Baru
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sudah punya akun? <Link to="/login" className="font-medium text-secondary hover:text-green-700">
            Login di sini
          </Link>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && <p className="text-red-600 text-sm text-center font-medium">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center font-medium">{success}</p>}
        
        <div className="rounded-md shadow-sm space-y-4">
          <input
            name="nama_usaha"
            type="text"
            required
            className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
            placeholder="Nama Usaha (IKM)"
            value={namaUsaha}
            onChange={(e) => setNamaUsaha(e.target.value)}
          />
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
            placeholder="Alamat Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
            placeholder="Password (min. 6 karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="hidden" name="role" value={role} />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading || success}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition disabled:bg-gray-400"
          >
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;