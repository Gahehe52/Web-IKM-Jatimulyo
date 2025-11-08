import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; //
import { loginUser } from '../services/authService'; //
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); //
  const navigate = useNavigate(); //
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => { //
    setLoading(true);
    try {
      // 1. Panggil API service
      const response = await loginUser(data.email, data.password); //
      // 2. Jika sukses, simpan ke context
      login(response.user, response.token); //
      
      toast.success('Login berhasil!');

      // 3. Arahkan ke halaman dashboard
      if (response.user.role === 'ikm') navigate('/dashboard-ikm'); //
      else if (response.user.role === 'admin') navigate('/dashboard-admin'); //
      else navigate('/'); // Fallback
      
    } catch (err) {
      const message = err.response?.data?.message || 'Login gagal. Periksa email dan password.';
      toast.error(message); //
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
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">Email</label>
            <input
              {...register("email", { required: "Email wajib diisi" })}
              id="email-address"
              type="email"
              autoComplete="email"
              className={`appearance-none rounded-none relative block w-full px-3 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm`}
              placeholder="Alamat Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              {...register("password", { required: "Password wajib diisi" })}
              id="password"
              type="password"
              autoComplete="current-password"
              className={`appearance-none rounded-none relative block w-full px-3 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm`}
              placeholder="Password"
            />
          </div>
        </div>

        {(errors.email || errors.password) && (
          <div className="text-sm text-red-600">
            {errors.email && <p>{errors.email.message}</p>}
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        )}

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