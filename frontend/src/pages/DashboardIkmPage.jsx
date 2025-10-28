import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getIkmById, updateIkmProfile } from '../services/ikmService';

const DashboardIkmPage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ nama_usaha: '', desc: '', link: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // TODO: Logika untuk mengambil profile.id
  // Saat ini, kita tidak tahu 'profile.id' dari user.
  // Kita perlu endpoint baru (misal GET /api/ikm/my-profile)
  // Untuk sementara, kita skip loading data.

  // useEffect(() => {
  //   const fetchMyProfile = async () => {
  //     try {
  //       // Anda perlu membuat endpoint ini di backend
  //       const data = await getMyProfile(); 
  //       setProfile(data);
  //     } catch (err) {
  //       setError("Gagal memuat profil.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchMyProfile();
  // }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      // Panggil API update [cite: 702-703]
      await updateIkmProfile(profile); 
      setSuccess('Profil berhasil diperbarui!');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memperbarui profil.');
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

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        {error && <p className="text-red-600 font-medium">{error}</p>}
        {success && <p className="text-green-600 font-medium">{success}</p>}
        
        <div>
          <label htmlFor="nama_usaha" className="block text-sm font-medium text-gray-700">Nama Usaha</label>
          <input
            type="text"
            name="nama_usaha"
            id="nama_usaha"
            value={profile.nama_usaha}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"
          />
        </div>

        <div>
          <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Deskripsi</label>
          <textarea
            name="desc"
            id="desc"
            rows="4"
            value={profile.desc}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"
          />
        </div>

        <div>
          <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link (GoFood/Tokopedia, dll)</label>
          <input
            type="url"
            name="link"
            id="link"
            value={profile.link}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"
          />
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