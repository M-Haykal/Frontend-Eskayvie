"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Email dan password harus diisi!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3008/users/login', {
        email,
        password
      });
      setMessage(response.data.message);

      // Simpan token, nama, dan role pengguna di localStorage
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('name', response.data.data.name);
      localStorage.setItem('role', response.data.data.role); // Simpan role pengguna

      // Redirect sesuai dengan role pengguna
      const role = response.data.data.role;
      if (role === 'admin') {
        router.push('/admin');
      } else if (role === 'user') {
        router.push('/user');
      } else {
        setMessage('Role tidak dikenali.');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Terjadi kesalahan pada server.');
    }
  };

  const navigateToForgotPassword = () => {
    router.push('/forget-password');
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
       <button
        onClick={() => router.back()}
        className="mb-4 bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
      >
        Kembali
      </button>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            className="text-indigo-500 hover:underline"
            onClick={navigateToRegister}
          >
            No have account?
          </button>
        </div>
        <div className="text-center mt-4">
          <button
            className="text-indigo-500 hover:underline"
            onClick={navigateToForgotPassword}
          >
            Lupa password?
          </button>
        </div>
      </div>
    </div>
  );
}
