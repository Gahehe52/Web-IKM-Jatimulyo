import React from 'react';
import { Outlet } from 'react-router-dom'; // [cite: 247]
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    // Kita gunakan bg-light (abu-abu) dari style.css asli Anda
    <div className="flex flex-col min-h-screen bg-light">
      <Navbar />
      <main className="flex-grow">
        {/* Halaman (HomePage, LoginPage, dll) akan dirender di sini */}
        <Outlet /> {/* [cite: 255] */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;