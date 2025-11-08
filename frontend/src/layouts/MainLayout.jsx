import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  const location = useLocation();

  return (
    // Kita gunakan bg-light (abu-abu) dari style.css asli Anda
    <div className="flex flex-col min-h-screen bg-light">
      <Navbar />
      <main className="flex-grow">
        {/* AnimatePresence wraps the outlet for page transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname} // Key is crucial for AnimatePresence
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;