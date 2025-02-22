"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = useParams(); 
  const BASE_URL = "http://localhost:3008";

  useEffect(() => {
    if (id) {
      const fetchProductDetails = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/products/${id}`);
          setProduct(res.data.data);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };

      fetchProductDetails();
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
      >
        Kembali
      </button>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* BAGIAN GAMBAR */}
        <div className="relative">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0].url ? `${BASE_URL}${product.images[0].url}` : "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg"
            />
          ) : (
            <img
              src="/placeholder.jpg"
              alt="No images available"
              className="w-full h-auto object-cover rounded-lg"
            />
          )}

          {/* TOMBOL FAVORIT */}
          <button className="absolute top-4 left-4 bg-white p-2 rounded-full shadow">
            💜
          </button>
          
          {/* TOMBOL SHARE */}
          <button className="absolute bottom-4 left-4 bg-white p-2 rounded-full shadow">
            🔄
          </button>
        </div>

        {/* BAGIAN DETAIL PRODUK */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500">{product.category.name}</p>

          {/* RATING */}
          <div className="flex items-center mt-2">
            <span className="text-yellow-500 text-lg">★★★★★</span>
            <span className="ml-2 text-gray-600">{product.averageRating?.toFixed(1) || "No rating"}</span>
          </div>

          {/* HARGA & DISKON */}
          <div className="flex items-center mt-2 space-x-2">
            <span className="text-2xl font-bold text-purple-700">Rp {product.price}</span>
            <span className="text-gray-400 line-through">Rp {product.oldPrice}</span>
          </div>

          {/* INPUT JUMLAH */}
          <div className="flex items-center space-x-4 mt-4">
            <button className="px-4 py-2 bg-gray-200 text-xl rounded">-</button>
            <span className="text-lg">1</span>
            <button className="px-4 py-2 bg-gray-200 text-xl rounded">+</button>
          </div>

          {/* TOMBOL BELI */}
          <div className="flex space-x-4 mt-6">
            <button className="flex-1 bg-gray-200 text-black py-3 rounded">Add to Cart</button>
            <button className="flex-1 bg-purple-600 text-white py-3 rounded">Buy Now</button>
          </div>
        </div>
      </div>

      {/* REVIEW SECTION */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Reviews:</h2>
        {product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <div key={review.id} className="bg-gray-100 p-4 rounded-lg mb-2 shadow">
              <p className="font-semibold">Rating: {review.rating}/5</p>
              <p>{review.comment}</p>
              <img
                src={`${BASE_URL}${review.mediaUrls}`}
                alt="Review Image"
                className="w-32 h-32 object-cover mt-2 rounded"
              />
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
