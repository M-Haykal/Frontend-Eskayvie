"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Untuk toggle password
  const router = useRouter();
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    setSuccess(false);
    try {
      const response = await axios.post(
        "http://localhost:3008/users/register",
        formData
      );
      // setMessage(response.data.message);
      router.push("/login");
      setSuccess(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-white">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 flex max-w-4xl w-full">
        {/* Bagian Kiri (Form) */}
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-bold text-purple-600">Sign Up</h2>
          <p className="text-gray-500 mb-6">Create your account</p>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="name"
                placeholder="Enter username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password + Icon Mata 👁️ */}
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {/* <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /> */}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            {message && <p style={{ color: 'red' }}>{message}</p>}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            {/* Login Redirect */}
            <p className="text-sm text-gray-500 mt-4 text-center">
              Have an account?{" "}
              <a href="#" className="text-purple-600 font-bold hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>

        {/* Bagian Kanan (Gambar) */}
        <div className="w-1/2 bg-purple-100 rounded-xl flex items-center justify-center p-6">
          <img src="/register-pic.svg" alt="Discount Illustration" className="w-3/4" />
        </div>
      </div>
    </div>
  );
}
