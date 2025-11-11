import React from 'react';

const SearchFilter = ({ onSearchChange, onFilterChange }) => {
  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Cari nama IKM..."
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select 
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="">Semua Kategori</option>
        <option value="makanan">Makanan</option>
        <option value="kerajinan">Kerajinan</option>
        <option value="minuman">Minuman</option>
        <option value="jasa">Jasa</option>
        <option value="bahan tekstil">Bahan Tekstil</option>
      </select>
    </div>
  );
};

export default SearchFilter;