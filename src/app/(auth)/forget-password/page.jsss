"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      setMessage('Email harus diisi!');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3008/users/forget_password', { email });
      setMessage(response.data.message);
      setOtpSent(true);  // Mark OTP as sent
    } catch (error) {
      setMessage(error.response?.data?.message || 'Terjadi kesalahan saat mengirim OTP.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Lupa Password</h2>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Kirim OTP'}
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            className="text-indigo-500 hover:underline"
            onClick={() => router.push('/')}
          >
            Kembali ke login
          </button>
        </div>
        {/* Link to OTP verification page if OTP is sent */}
        {otpSent && (
          <div className="mt-4 text-center">
            <a
              href={`/verifikasi-otp?email=${email}`}
              className="text-indigo-500 hover:underline"
            >
              Verifikasi OTP
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
