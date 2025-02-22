"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

// Helper function untuk mendapatkan userId dari token
const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = JSON.parse(atob(token.split(".")[1])); // Decode token JWT
    console.log(decoded); // Cek apa yang ada di decoded
    return decoded.id;
  }
  return null;
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const BASE_URL = "http://localhost:3008";
  const router = useRouter();

  useEffect(() => {
    // Ambil userId dari token saat halaman pertama kali dimuat
    const id = getUserIdFromToken();
    setUserId(id);

    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();
        if (res.ok) {
          setProducts(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  },
  []);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.productId === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { productId: product.id, quantity: 1 }]);
    }
  };

  const handleCheckout = async () => {
    if (!userId) {
      alert("You need to be logged in to checkout.");
      return;
    }

    const orderData = {
      userId: userId,
      status: "pending",
      orderItems: cart,
    };

    try {
      const token = localStorage.getItem("token"); 
      const res = await axios.post(`${BASE_URL}/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.data;

      if (res.status === 200) {
        alert("Order placed successfully!");
        setCart([]); // Clear the cart after successful order
        router.push(`/user/payment/${data.data_order.id}`);
      } else {
        alert("Error placing order: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Error placing order");
    }
  };

  const handleOpenModal = (productId) => {
    setSelectedProduct(productId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setRating(0);
    setComment("");
    setImage(null);
    setIsModalOpen(false);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmitReview = async () => {
    if (!rating || !comment || !image) {
      alert("Rating, komentar, dan gambar harus diisi.");
      return;
    }

    const formData = new FormData();
    formData.append("productId", selectedProduct);
    formData.append("rating", rating);
    formData.append("comment", comment);
    formData.append("image", image);

    try {
      const res = await fetch(`${BASE_URL}/reviews`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Review berhasil ditambahkan!");
        handleCloseModal();
      } else {
        alert(data.error || "Gagal menambahkan review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Terjadi kesalahan. Coba lagi nanti.");
    }
  };

  return (
    <>
    <Navbar />
    <div className="container mx-auto p-4">
    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={
                product.images[0]
                  ? `${BASE_URL}${product.images[0].url}`
                  : "/placeholder.jpg"
              }
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="font-bold text-lg">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.category?.name}</p>
            <p className="text-xl font-bold mt-2" style={{ color: "purple" }}>Rp {product.price}</p>
            <button
              onClick={() => handleOpenModal(product.id)}
              className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Beri Rating
            </button>

            <button
        onClick={() => addToCart(product)}
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
      >
        Add to Cart
      </button>


            <button
                onClick={() => router.push(`/user/detail_product/${product.id}`)}
                className="mt-2 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
              >
                Lihat Detail
              </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Beri Review</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Rating (1-5):</label>
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Komentar:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
                rows="4"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Upload Gambar:</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
              >
                Batal
              </button>
              <button
                onClick={handleSubmitReview}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Kirim Review
              </button>
            </div>
          </div>
        </div>
      )}

      {cart.length > 0 && (
  <div className="mt-8 p-6 bg-white shadow-lg rounded-lg">
    <h2 className="text-xl font-semibold border-b pb-3">Cart</h2>
    <ul className="divide-y">
      {cart.map((item, index) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return (
          <li key={index} className="flex justify-between py-3 items-center">
            <span className="font-medium text-gray-800">{product.name}</span>
            <div className="flex items-center">
              {/* Tombol Minus */}
              <button
                onClick={() =>
                  setCart(
                    cart.map((cartItem) =>
                      cartItem.productId === item.productId &&
                      cartItem.quantity > 1
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                    )
                  )
                }
                className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                disabled={item.quantity === 1}
              >
                -
              </button>

              <span className="mx-3 font-semibold">{item.quantity}</span>

              {/* Tombol Plus */}
              <button
                onClick={() =>
                  setCart(
                    cart.map((cartItem) =>
                      cartItem.productId === item.productId
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                    )
                  )
                }
                className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                +
              </button>

              {/* Tombol Trash */}
              <button
                onClick={() =>
                  setCart(cart.filter((cartItem) => cartItem.productId !== item.productId))
                }
                className="ml-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                🗑️
              </button>
            </div>
          </li>
        );
      })}
    </ul>

    <button
      onClick={handleCheckout}
      className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all"
    >
      Checkout
    </button>
  </div>
)}



    </div>
    </>
  );
};

export default Home;
