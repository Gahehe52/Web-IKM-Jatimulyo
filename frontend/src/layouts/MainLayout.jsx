import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    // Kita gunakan bg-light (abu-abu) dari style.css asli Anda
    <div className="flex flex-col min-h-screen bg-light">
      <Navbar />
      <main className="flex-grow">
        {/* Konten halaman (Outlet) sekarang akan otomatis full-width */}
        {/* Halaman seperti HomePage sendiri yang akan mengatur batasnya */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;