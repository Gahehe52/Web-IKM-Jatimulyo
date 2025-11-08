import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Animation variants for staggering children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 100 }
  },
};

const HomePage = () => {
  return (
    <div className="animate-fadeIn">
      {/* Banner Section */}
      <section className="w-full h-80 md:h-96">
        <img 
          src="/assets/images/desa.jpg" 
          alt="Desa Jatimulyo" 
          className="w-full h-full object-cover border-b-4 border-secondary"
        />
      </section>

      {/* Home Content Section */}
      <section className="container mx-auto text-center max-w-4xl py-16 px-5">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Selamat Datang di Desa Jatimulyo
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Desa Jatimulyo merupakan desa yang kaya akan potensi industri kecil menengah (IKM),
          dengan beragam produk unggulan berbasis sumber daya lokal. Melalui kolaborasi,
          inovasi, dan semangat masyarakatnya, Desa Jatimulyo terus tumbuh menjadi desa kreatif
          dan mandiri.
        </p>

        {/* Highlight Section */}
        <motion.div 
          className="flex justify-center flex-wrap gap-6 my-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Highlight Card 1 */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-7 w-72"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)" }}
          >
            <h3 className="text-xl font-semibold text-primary mb-2">🌾 Produk Unggulan</h3>
            <p className="text-gray-600">Temukan berbagai produk lokal terbaik hasil karya warga.</p>
          </motion.div>
          {/* Highlight Card 2 */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-7 w-72"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)" }}
          >
            <h3 className="text-xl font-semibold text-primary mb-2">🤝 Kemitraan</h3>
            <p className="text-gray-600">Kami membuka peluang kerja sama untuk pengembangan IKM.</p>
          </motion.div>
          {/* Highlight Card 3 */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-7 w-72"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)" }}
          >
            <h3 className="text-xl font-semibold text-primary mb-2">💡 Inovasi Digital</h3>
            <p className="text-gray-600">Mendorong digitalisasi dan pemasaran online produk IKM.</p>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <Link 
          to="/direktori" 
          className="inline-block bg-secondary text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 hover:bg-green-700 hover:shadow-lg"
        >
          Lihat Daftar IKM
        </Link>
      </section>
    </div>
  );
};

export default HomePage;