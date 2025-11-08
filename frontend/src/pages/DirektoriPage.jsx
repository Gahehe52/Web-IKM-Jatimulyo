import React, { useState, useEffect } from 'react';
import IkmCard from '../components/IkmCard';
import SearchFilter from '../components/SearchFilter';
import { getAllIkms } from '../services/ikmService'; // Import API service
import SkeletonCard from '../components/SkeletonCard'; // Import Skeleton
import { AnimatePresence } from 'framer-motion';

const DirektoriPage = () => {
  const [ikms, setIkms] = useState([]);
  const [filteredIkms, setFilteredIkms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // 1. Ambil data saat komponen dimuat
  useEffect(() => {
    const fetchIkms = async () => {
      try {
        setLoading(true);
        const data = await getAllIkms();
        setIkms(data);
        setFilteredIkms(data); // Awalnya tampilkan semua
        setError(null);
      } catch (err) {
        setError("Gagal memuat data IKM. Coba lagi nanti.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchIkms();
  }, []);

  // 2. Terapkan filter saat state filter berubah
  useEffect(() => {
    let result = ikms;

    // Filter berdasarkan pencarian
    if (searchTerm) {
      result = result.filter(ikm => 
        (ikm.nama_usaha || ikm.name).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter berdasarkan kategori
    if (filterCategory) {
      result = result.filter(ikm => 
        (ikm.kategori || 'lainnya').toLowerCase() === filterCategory.toLowerCase()
      );
    }

    setFilteredIkms(result);
  }, [searchTerm, filterCategory, ikms]);


  return (
    // ikm-container
    <div className="container mx-auto max-w-6xl py-12 px-5">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary mb-3">Industri Kecil Menengah (IKM)</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Jelajahi produk unggulan dari pelaku IKM Desa Jatimulyo yang telah terdaftar.
        </p>
      </div>

      <SearchFilter 
        onSearchChange={setSearchTerm}
        onFilterChange={setFilterCategory}
      />

      {/* ikm-list */}
      {error && <p className="text-center text-lg text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          // Tampilkan 6 skeleton card saat loading
          [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <AnimatePresence>
            {filteredIkms.length > 0 ? (
              filteredIkms.map(ikm => (
                <IkmCard key={ikm.id} ikm={ikm} />
              ))
            ) : (
              // Tampil jika tidak loading dan tidak ada hasil
              <p className="text-center text-lg text-gray-600 col-span-3">
                Tidak ada IKM yang ditemukan.
              </p>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default DirektoriPage;