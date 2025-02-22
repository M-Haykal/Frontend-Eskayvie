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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-white">
        <button
          onClick={() => router.back()}
          className="absolute top-5 left-5 w-10 h-10 bg-white rounded-full flex justify-center items-center shadow-md hover:bg-purple-500"
        >
        
          {/* <FontAwesomeIcon icon={faArrowLeft} color="#6B46C1" /> */}
        </button>
      <div className="relative bg-white shadow-xl rounded-2xl p-8 flex max-w-5xl w-full">
        
        {/* Tombol Kembali */}

        {/* Bagian Kiri (Ilustrasi) */}
        <div className="w-1/2 bg-purple-100 rounded-xl flex items-center justify-center p-10">
          <img src="/forgot-pic.svg" alt="Forgot Password" className="w-4/3" />
        </div>

        {/* Bagian Kanan (Form) */}
        <div className="w-1/2 p-4 flex items-center justify-center">
          <div className="w-full">
            <h2 className="text-2xl  font-bold text-purple-600">Forgot Password</h2>
            <p className="text-gray-500 mb-6">
              Enter the email address associated with your account.
            </p>

            <form onSubmit={handleForgotPassword}>
              <div className="mb-4 relative">
                <label className="block text-gray-700">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute right-3 top-3 text-gray-500"
                  /> */}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
                disabled={loading}
              >
                {loading ? "Processing..." : "Reset Password"}
              </button>

              {message && <p className="text-sm text-gray-500 mt-4 text-center">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
