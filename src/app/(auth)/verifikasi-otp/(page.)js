"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function VerifyOtpPage() {
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Mengambil email dari query params dan set hanya sekali saat komponen pertama kali dimuat
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromQuery = urlParams.get('email');
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, []); // Hanya dijalankan sekali ketika komponen pertama kali dimuat

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Cek jika OTP atau password baru kosong
    if (!otpCode || !newPassword) {
      setMessage('Semua kolom harus diisi!');
      setLoading(false);
      return;
    }

    try {
      // Mengirim permintaan POST ke backend untuk memverifikasi OTP
      const response = await axios.post('http://localhost:3008/users/verify-otp', {
        email,
        otpCode: Number(otpCode), // Pastikan OTP yang dikirim adalah angka
        newPassword
      });

      setMessage(response.data.message);
      setLoading(false);

      // Redirect ke login setelah berhasil reset password
      router.push('/login');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Terjadi kesalahan saat verifikasi OTP.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Verifikasi OTP</h2>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Kode OTP</label>
            <input
              type="number" // Membuat input hanya menerima angka
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan OTP"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)} // Tetap menyimpan input sebagai string
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Password Baru</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan password baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Verifikasi OTP'}
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            className="text-indigo-500 hover:underline"
            onClick={() => router.push('/login')}
          >
            Kembali ke login
          </button>
        </div>
      </div>
    </div>
  );
}
