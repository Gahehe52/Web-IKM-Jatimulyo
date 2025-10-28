import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="animate-fadeIn">
      {/* Banner Section - dari .banner di style.css */}
      {/* Taruh gambar /public/assets/images/desa.jpg */}
      <section className="w-full h-80 md:h-96 -mt-4 -mx-4">
        <img 
          src="/assets/images/desa.jpg" 
          alt="Desa Jatimulyo" 
          className="w-full h-full object-cover border-b-4 border-secondary"
        />
      </section>

      {/* Home Content Section - dari .home-content */}
      <section className="text-center max-w-4xl mx-auto py-16 px-5">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Selamat Datang di Desa Jatimulyo
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Desa Jatimulyo merupakan desa yang kaya akan potensi industri kecil menengah (IKM),
          dengan beragam produk unggulan berbasis sumber daya lokal. Melalui kolaborasi,
          inovasi, dan semangat masyarakatnya, Desa Jatimulyo terus tumbuh menjadi desa kreatif
          dan mandiri.
        </p>

        {/* Highlight Section - dari .highlight-section */}
        <div className="flex justify-center flex-wrap gap-6 my-12">
          {/* Highlight Card - dari .highlight-card */}
          <div className="bg-white rounded-xl shadow-lg p-7 w-72 transition-transform duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-primary mb-2">🌾 Produk Unggulan</h3>
            <p className="text-gray-600">Temukan berbagai produk lokal terbaik hasil karya warga.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-7 w-72 transition-transform duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-primary mb-2">🤝 Kemitraan</h3>
            <p className="text-gray-600">Kami membuka peluang kerja sama untuk pengembangan IKM.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-7 w-72 transition-transform duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-primary mb-2">💡 Inovasi Digital</h3>
            <p className="text-gray-600">Mendorong digitalisasi dan pemasaran online produk IKM.</p>
          </div>
        </div>

        {/* CTA Button - dari .cta-btn */}
        <Link 
          to="/direktori" 
          className="inline-block bg-secondary text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-md transition-colors duration-300 hover:bg-green-700"
        >
          Lihat Daftar IKM
        </Link>
      </section>
    </div>
  );
};

export default HomePage;