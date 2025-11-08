import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyIkmProfile, updateIkmProfile } from '../services/ikmService';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const DashboardIkmPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      nama_usaha: '',
      desc: '',
      link: '',
      img: ''
    }
  });

  // 1. Fetch existing profile data on load
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const data = await getMyIkmProfile(); 
        // 2. Set form values with data from API
        setValue('nama_usaha', data.nama_usaha);
        setValue('desc', data.desc);
        setValue('link', data.link);
        setValue('img', data.img);
      } catch (err) {
        toast.error("Gagal memuat profil.");
      }
    };
    fetchMyProfile();
  }, [setValue]);

  // 3. Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Panggil API update
      await updateIkmProfile(data); 
      toast.success('Profil berhasil diperbarui!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal memperbarui profil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-12 px-5">
      <h1 className="text-3xl font-bold text-primary mb-2">
        Dashboard IKM
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Selamat datang, {user?.email}! Di sini Anda dapat mengedit profil IKM Anda.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        
        <div>
          <label htmlFor="nama_usaha" className="block text-sm font-medium text-gray-700">Nama Usaha</label>
          <input
            {...register("nama_usaha", { required: "Nama usaha wajib diisi" })}
            type="text"
            id="nama_usaha"
            className={`mt-1 block w-full px-3 py-2 border ${errors.nama_usaha ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary`}
          />
          {errors.nama_usaha && <p className="text-red-500 text-xs mt-1">{errors.nama_usaha.message}</p>}
        </div>

        <div>
          <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Deskripsi</label>
          <textarea
            {...register("desc")}
            id="desc"
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"
          />
        </div>

        <div>
          <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link (GoFood/Tokopedia, dll)</label>
          <input
            {...register("link", { pattern: { value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, message: "URL tidak valid" } })}
            type="url"
            id="link"
            className={`mt-1 block w-full px-3 py-2 border ${errors.link ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary`}
          />
          {errors.link && <p className="text-red-500 text-xs mt-1">{errors.link.message}</p>}
        </div>

        <div>
          <label htmlFor="img" className="block text-sm font-medium text-gray-700">Link Gambar (URL)</label>
          <input
            {...register("img", { pattern: { value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, message: "URL tidak valid" } })}
            type="url"
            id="img"
            className={`mt-1 block w-full px-3 py-2 border ${errors.img ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary`}
          />
          {errors.img && <p className="text-red-500 text-xs mt-1">{errors.img.message}</p>}
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 disabled:bg-gray-400"
          >
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardIkmPage;