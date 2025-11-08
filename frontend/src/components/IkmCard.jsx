import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Convert Link to a motion component
const MotionLink = motion(Link);

// Terima 'ikm' sebagai prop
const IkmCard = ({ ikm }) => {
  // Ganti placeholder jika gambar tidak ada
  const imageUrl = ikm.img || 'https://via.placeholder.com/300x200';
  
  return (
    // Menerjemahkan .ikm-card dari style.css
    <MotionLink 
      layout // Add layout prop for smooth filtering animation
      to={`/profil/${ikm.id}`} // Disesuaikan dengan data Anda (bukan profile_id)
      className="block bg-white rounded-xl shadow-lg overflow-hidden"
      
      // Add animation props
      whileHover={{ y: -5, scale: 1.02 }} // Lifts up and scales
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      
      // Initial animation
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <img 
        src={imageUrl} 
        alt={ikm.nama_usaha || ikm.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        {/* Tampilkan status verifikasi jika ada */}
        {ikm.is_verified && (
          <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full font-medium">
            Terverifikasi
          </span>
        )}
        <h3 className="text-xl font-bold text-primary mt-2 mb-1">
          {ikm.nama_usaha || ikm.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {ikm.desc || 'Deskripsi produk belum tersedia.'}
        </p>
      </div>
    </MotionLink>
  );
};

export default IkmCard;