import React, { useState, useEffect } from 'react';
import { getUnverifiedIkms, verifyIkm } from '../services/ikmService';

const DashboardAdminPage = () => {
  const [ikms, setIkms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUnverified = async () => {
    try {
      setLoading(true);
      const data = await getUnverifiedIkms(); // [cite: 711]
      setIkms(data);
    } catch (err) {
      setError('Gagal memuat data IKM.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnverified();
  }, []);

  const handleVerify = async (id) => {
    try {
      await verifyIkm(id); // [cite: 713]
      // Refresh daftar
      fetchUnverified(); 
    } catch (err) {
      alert('Gagal memverifikasi IKM.');
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-12 px-5">
      <h1 className="text-3xl font-bold text-primary mb-8">
        Dashboard Admin
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Selamat datang, Admin. Berikut adalah daftar IKM yang menunggu verifikasi Anda.
      </p>

      {loading && <p>Memuat...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Usaha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tindakan</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ikms.map((ikm) => (
              <tr key={ikm.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ikm.nama_usaha}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ikm.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleVerify(ikm.id)}
                    className="text-white bg-secondary hover:bg-green-700 px-3 py-1 rounded-md"
                  >
                    Verifikasi
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {ikms.length === 0 && !loading && (
          <p className="text-center p-5 text-gray-500">Tidak ada IKM yang perlu diverifikasi.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardAdminPage;