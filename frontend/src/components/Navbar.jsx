import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // [cite: 270]

// Komponen helper untuk NavLink agar bisa mendeteksi 'active'
const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  // Menerjemahkan .nav-link.active dan animasi garis bawah dari style.css
  return (
    <Link
      to={to}
      className={`relative font-medium py-2 px-1 transition-colors
        ${isActive ? 'text-green-200' : 'text-white'} 
        hover:text-green-200 
        after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] 
        after:bg-white after:transition-all after:duration-300
        ${isActive ? 'after:w-full' : 'after:w-0'} 
        hover:after:w-full`}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth(); // [cite: 272]
  const navigate = useNavigate();

  const handleLogout = () => { // [cite: 273]
    logout();
    navigate('/login'); // [cite: 276]
  };

  return (
    // Menerjemahkan #navbar dari style.css
    <nav className="bg-primary shadow-lg p-3 sticky top-0 z-50">
      {/* Menerjemahkan .nav-container */}
      <div className="container mx-auto flex justify-between items-center px-4 md:px-10">
        <Link to="/" className="text-xl font-bold text-white">
          {/* Ganti dengan logo.png Anda. Taruh logo di folder /public/assets/ */}
          <img src="/assets/logo.png" alt="Logo Desa" className="h-11" /> {/* */}
        </Link>
        
        {/* Menerjemahkan <nav> */}
        <div className="flex items-center space-x-5">
          <NavLink to="/">Beranda</NavLink>
          <NavLink to="/direktori">IKM Desa</NavLink>
          
          {isAuthenticated ? ( // [cite: 285]
            <>
              {/* [cite: 288] */}
              {user?.role === 'ikm' && <NavLink to="/dashboard-ikm">Dashboard</NavLink>}
              {user?.role === 'admin' && <NavLink to="/dashboard-admin">Dashboard</NavLink>}
              <button onClick={handleLogout} className="text-red-400 hover:text-red-300 font-medium ml-2">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              {/* Tombol Daftar kustom */}
              <Link 
                to="/register" 
                className="bg-white text-primary font-semibold px-4 py-1.5 rounded-md text-sm transition hover:bg-gray-200"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;