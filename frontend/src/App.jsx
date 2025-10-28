import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DirektoriPage from './pages/DirektoriPage';
import ProfilePage from './pages/ProfilePage';
import DashboardIkmPage from './pages/DashboardIkmPage';
import DashboardAdminPage from './pages/DashboardAdminPage';

// Import layout dan komponen protected route
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute'; // [cite: 442]

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Publik dengan Navbar/Footer */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="direktori" element={<DirektoriPage />} />
          <Route path="profil/:ikmId" element={<ProfilePage />} />
        </Route>

        {/* Rute untuk Login/Register (Layout Berbeda) */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* Rute Terproteksi (Hanya IKM) */}
        <Route element={<ProtectedRoute roles={['ikm']} />}>
          <Route path="/dashboard-ikm" element={<DashboardIkmPage />} />
        </Route>
        
        {/* Rute Terproteksi (Hanya Admin) */}
        <Route element={<ProtectedRoute roles={['admin']} />}>
          <Route path="/dashboard-admin" element={<DashboardAdminPage />} />
        </Route>

        <Route path="*" element={
          <div className="flex items-center justify-center h-screen">
            <h1 className="text-3xl font-bold">404 Halaman Tidak Ditemukan</h1>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;