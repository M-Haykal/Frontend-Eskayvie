"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';


export default function CategoryPage() {
const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Jika tidak ada token, redirect ke halaman login
      router.push('/');
    }
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3008/categorys");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!categoryName) {
      setError("Category name is required");
      return;
    }

    try {
      await axios.post("http://localhost:3008/categorys", {
        name: categoryName,
      });
      setCategoryName("");
      fetchCategories();
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to add category. Please try again."
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
       <button
        onClick={() => router.back()}
        className="mb-4 bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
      >
        Kembali
      </button>
      <h1 className="text-2xl font-bold mb-4">Category Management</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">Category Name:</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Category
        </button>
      </form>

      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">ID</th>
            <th className="border px-4 py-2 text-left">Category Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-t">
              <td className="border px-4 py-2">{category.id}</td>
              <td className="border px-4 py-2">{category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
