import React, { useState, useEffect } from 'react';
import { getUnverifiedIkms, verifyIkm } from '../services/ikmService';
import { toast } from 'react-hot-toast';

const DashboardAdminPage = () => {
  const [ikms, setIkms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUnverified = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getUnverifiedIkms(); //
      setIkms(data);
    } catch (err) {
      setError('Gagal memuat data IKM.');
      toast.error('Gagal memuat data IKM.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnverified();
  }, []);

  const handleVerify = async (id, nama_usaha) => {
    try {
      await verifyIkm(id); //
      toast.success(`${nama_usaha} berhasil diverifikasi!`);
      // Refresh daftar
      fetchUnverified(); 
    } catch (err) {
      toast.error('Gagal memverifikasi IKM.');
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

      {loading && <p className="text-center p-5">Memuat...</p>}
      {error && !loading && <p className="text-red-500 text-center p-5">{error}</p>}
      
      {!loading && !error && (
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
                      onClick={() => handleVerify(ikm.id, ikm.nama_usaha)}
                      className="text-white bg-secondary hover:bg-green-700 px-3 py-1 rounded-md transition-colors"
                    >
                      Verifikasi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {ikms.length === 0 && (
            <p className="text-center p-5 text-gray-500">Tidak ada IKM yang perlu diverifikasi.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardAdminPage;