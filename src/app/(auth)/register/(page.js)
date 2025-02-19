"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const registerPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
      });
      const [message, setMessage] = useState('');
      const [loading, setLoading] = useState(false);
      const [success, setSuccess] = useState(false);
      const router = useRouter();
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        setSuccess(false);
        try {
          const response = await axios.post('http://localhost:3008/users/register', formData);
          setMessage(response.data.message);
          setSuccess(true);
        } catch (error) {
          setMessage(error.response?.data?.message || 'Terjadi kesalahan.');
        } finally {
          setLoading(false);
        }
      };
    
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md transition-all duration-300">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Register</h2>
            {message && (
              <p className={`text-center ${success ? 'text-green-500' : 'text-red-500'}`}>{message}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Nama Lengkap"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                required
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                required
              >
                <option value="">Pilih Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            <div className='flex items-center'>
            <button onClick={() => router.push('/')}>
              have account?
            </button>
            </div>
              <button
                type="submit"
                className={`w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Memproses...' : 'Daftar'}
              </button>
            </form>
            {success && (
              <div className="mt-4 text-center">
                <p className="text-green-500">Registrasi berhasil! Anda akan diarahkan ke <a href="/" className="text-blue-500 underline">halaman utama</a>...</p>
              </div>
            )}
          </div>
        </div>
      );
};

export default registerPage;
