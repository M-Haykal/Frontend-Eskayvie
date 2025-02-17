"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = useParams(); // Dapatkan ID dari URL
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
    <div className="container mx-auto p-4">
      <button
        onClick={() => router.back()}
        className="mb-4 bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
      >
        Kembali
      </button>
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

      {/* Menampilkan gambar produk secara dinamis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {product.images && product.images.length > 0 ? (
          product.images.map((image, index) => (
            <img
              key={index}
              src={image.url ? `${BASE_URL}${image.url}` : "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-96 object-cover rounded-md mb-4"
            />
          ))
        ) : (
          <img
            src="/placeholder.jpg"
            alt="No images available"
            className="w-full h-96 object-cover rounded-md mb-4"
          />
        )}
      </div>

      <p className="text-gray-600">{product.description}</p>
      <p className="text-xl font-bold mt-2">Rp {product.price}</p>
      <p>Stock: {product.stock}</p>
      <p>
        Rating:{" "}
        {product.averageRating
          ? product.averageRating.toFixed(1)
          : "No rating available"}
      </p>
      <p>Category: {product.category.name}</p>

      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Reviews:</h2>
        {product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-100 p-4 rounded-lg mb-2 shadow"
            >
              <p className="font-semibold">Rating: {review.rating}/5</p>
              <p>{review.comment}</p>
              <img
                src={`${BASE_URL}${review.mediaUrls}`}
                alt="Review Image"
                className="w-32 h-32 object-cover mt-2 rounded overflow-hidden block"
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
