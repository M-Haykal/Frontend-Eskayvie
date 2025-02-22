"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

const OTPPage = () => {
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromQuery = urlParams.get("email");
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, []);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!otpCode || !newPassword) {
      setMessage("Semua kolom harus diisi!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3008/users/verify-otp", {
        email,
        otpCode: Number(otpCode),
        newPassword,
      });
      setMessage(response.data.message);
      setLoading(false);
      router.push("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Terjadi kesalahan saat verifikasi OTP.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-purple-100 px-6">
      <button className="absolute top-5 left-5 w-10 h-10 bg-purple-400 rounded-full flex justify-center items-center shadow-md hover:bg-purple-500" onClick={() => router.back()}>
        &#8592;
      </button>

      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col md:flex-row items-center w-full max-w-4xl relative">
        <div className="flex justify-center items-center">
          <div className="bg-purple-200 rounded-full p-8">
            <Image src="/otp-img.svg" alt="OTP Illustration" width={900} height={0} priority />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start ml-0 md:ml-10 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-2">OTP Verification</h2>
          <p className="text-gray-600 mb-4 text-center md:text-left">Please enter the 4-digit code sent to your email.</p>

          {message && <p className="text-red-500 text-center mb-4">{message}</p>}

          <form onSubmit={handleVerifyOtp} className="w-full">
            <div className="flex flex-col space-y-4">
              <input
                type="number"
                className="w-full h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter OTP"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
              />
              <input
                type="password"
                className="w-full h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button type="submit" className="w-full px-6 py-3 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700" disabled={loading}>
                {loading ? "Processing..." : "Verify OTP"}
              </button>
            </div>
          </form>

          <p className="text-gray-500 text-sm mt-3">
            Didn't receive the code? <span className="text-purple-600 font-semibold cursor-pointer">Resend</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
