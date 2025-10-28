import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getIkmById } from '../services/ikmService';

const ProfilePage = () => {
  const { ikmId } = useParams(); // Mendapatkan ID dari URL [cite: 202]
  const [ikm, setIkm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIkm = async () => {
      try {
        setLoading(true);
        const data = await getIkmById(ikmId);
        setIkm(data);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data IKM.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchIkm();
  }, [ikmId]);

  if (loading) return <div className="text-center p-10 text-lg">Memuat data IKM...</div>;
  if (error) return <div className="text-center p-10 text-lg text-red-500">{error}</div>;
  if (!ikm) return <div className="text-center p-10 text-lg">Data IKM tidak ditemukan.</div>;

  return (
    // ikm-detail
    <div className="py-16 px-5 max-w-5xl mx-auto animate-fadeIn">
      {/* ikm-detail-content */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        <img 
          id="ikm-img"
          src={ikm.img || 'https://via.placeholder.com/400x300'} 
          alt={ikm.nama_usaha || ikm.name} 
          className="w-full md:w-[400px] h-auto rounded-xl shadow-xl object-cover"
        />
        {/* ikm-info */}
        <div className="flex-1">
          <h1 id="ikm-name" className="text-4xl font-bold text-primary mb-5">{ikm.nama_usaha || ikm.name}</h1>
          <p id="ikm-desc" className="text-gray-700 text-lg mb-8 leading-relaxed">{ikm.desc || 'Deskripsi belum tersedia.'}</p>
          
          <div className="flex flex-wrap gap-4 items-center">
            {/* buy-btn dari style.css */}
            <a 
              id="ikm-link"
              href={ikm.link || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-secondary text-white text-lg font-semibold py-3 px-7 rounded-lg shadow-md transition-colors duration-300 hover:bg-green-700"
            >
              🛒 Beli Sekarang
            </a>
            {/* back-button dari style.css */}
            <Link 
              to="/direktori" 
              className="inline-block bg-primary text-white font-medium py-3 px-7 rounded-lg transition-colors duration-300 hover:bg-green-900"
            >
              ← Kembali
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;