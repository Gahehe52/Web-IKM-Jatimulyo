import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const userData = { ...data, role: 'ikm' };
      await registerUser(userData);
      toast.success('Registrasi sukses! Anda akan diarahkan ke halaman login.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registrasi gagal. Coba lagi.');
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
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <input
              {...register("nama_usaha", { required: "Nama usaha wajib diisi" })}
              type="text"
              className={`appearance-none relative block w-full px-3 py-3 border ${errors.nama_usaha ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm`}
              placeholder="Nama Usaha (IKM)"
            />
            {errors.nama_usaha && <p className="text-red-500 text-xs mt-1">{errors.nama_usaha.message}</p>}
          </div>

          <div>
            <input
              {...register("email", { required: "Email wajib diisi", pattern: { value: /^\S+@\S+$/i, message: "Email tidak valid" } })}
              type="email"
              autoComplete="email"
              className={`appearance-none relative block w-full px-3 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm`}
              placeholder="Alamat Email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              {...register("password", { required: "Password wajib diisi", minLength: { value: 6, message: "Password minimal 6 karakter" } })}
              type="password"
              autoComplete="new-password"
              className={`appearance-none relative block w-full px-3 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm`}
              placeholder="Password (min. 6 karakter)"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={loading}
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