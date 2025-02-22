"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaStar, FaShoppingCart, FaTrash, FaMinus, FaPlus, } from "react-icons/fa";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = JSON.parse(atob(token.split(".")[1])); // Decode token JWT
    return decoded.id;
  }
  return null;
};

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const BASE_URL = "http://localhost:3008";
  const router = useRouter();

  useEffect(() => {
    const id = getUserIdFromToken();
    setUserId(id);

    // Fetch products
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
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === product.id);
      return existingItem
        ? prevCart.map((item) =>
            item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prevCart, { productId: product.id, quantity: 1 }];
    });
  };

  const handleCheckout = async () => {
    if (!userId) return alert("You need to be logged in to checkout.");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${BASE_URL}/orders`,
        { userId, status: "pending", orderItems: cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        alert("Order placed successfully!");
        setCart([]);
        router.push(`/user/payment/${res.data.data_order.id}`);
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
    <div className="flex">
      <div className="flex-1">
        <Navbar />

        <div className="p-6 mt-16">
          <h1 className="text-lg font-bold">Categories</h1>

          <div className="mt-6">
            <h2 className="text-lg font-bold">All Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-3">
              {products.map((product) => (
                <div key={product.id} className="border rounded-lg shadow-md p-4 bg-white relative">
                  {/* Klik gambar untuk lihat detail */}
                  <img
                    src={product.images?.length > 0 ? `${BASE_URL}${product.images[0].url}` : "/placeholder.jpg"}
                    alt={product.name}
                    className="w-full object-cover mb-3 cursor-pointer"
                    onClick={() => router.push(`/user/detail_product/${product.id}`)}
                  />
                  <h3 className="text-sm font-semibold">{product.name}</h3>
                  <p className="text-sm font-bold" style={{ color: "#AFA0D7" }}>
                    Rp {product.price}
                  </p>

                  {/* Tombol dengan icon */}
                  <div className="mt-2 flex justify-between">
                    {/* Button Review (Bintang di Kiri) */}
                    <button
                      onClick={() => handleOpenModal(product.id)}
                      className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 flex items-center"
                    >
                     Rating <FaStar className="mr-2"/>
                    </button>

                    {/* Button Add to Cart (Keranjang di Kanan) */}
                    <button
                    onClick={() => addToCart(product)}
                    className="bg-purple-500 text-white py-2 px-4 rounded flex items-center hover:bg-purple-600"
                  >
                    Tambah <FaShoppingCart size={16} className="ml-2" />
                  </button>


                   {/* Tombol Cart di kanan bawah */}
    <button
      onClick={() => setIsCartOpen(true)}
      className="fixed bottom-6 right-6 bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-400"
    >
      <FaShoppingCart className=""/> ({cart.length})
    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {isCartOpen && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 flex flex-col md:flex-row">
      {/* Daftar Produk di Cart */}
      <div className="w-full md:w-2/3 p-4">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <ul className="divide-y">
          {cart.map((item, index) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) return null;
            return (
              <li key={index} className="flex justify-between py-3 items-center">
                <span className="font-medium text-gray-800">{product.name}</span>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      setCart(
                        cart.map((cartItem) =>
                          cartItem.productId === item.productId && cartItem.quantity > 1
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
                  <button
                    onClick={() =>
                      setCart(cart.filter((cartItem) => cartItem.productId !== item.productId))
                    }
                    className="ml-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
       
      </div>

      {/* Bagian Total dan Checkout */}
      <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded-lg">
  <h3 className="text-xl font-bold">TOTAL DETAILS</h3>
  
  {cart.length > 0 ? (
    <div className="mt-4 space-y-2">
      {(() => {
        let subtotal = cart.reduce((total, item) => {
          const product = products.find((p) => p.id === item.productId);
          return product ? total + product.price * item.quantity : total;
        }, 0);

        let discountTotal = cart.reduce((total, item) => {
          const product = products.find((p) => p.id === item.productId);
          return product && product.discount ? total + product.discount * item.quantity : total;
        }, 0);

        let total = subtotal - discountTotal;

        return (
          <>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount Product</span>
              <span>- Rp {discountTotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="border-t mt-2 pt-2 flex justify-between font-bold">
              <span>TOTAL</span>
              <span>Rp {total.toLocaleString("id-ID")}</span>
            </div>
          </>
        );
      })()}
    </div>
  ) : (
    <p className="text-gray-500 mt-4">Keranjang kosong.</p>
  )}

  {/* Tombol Checkout */}
  <button
    onClick={handleCheckout}
    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 mt-4 rounded-lg"
    disabled={cart.length === 0}
  >
    CHECKOUT
  </button>

  {/* Tombol Batal (Menutup Modal) */}
  <button
    onClick={() => setIsCartOpen(false)} // Tutup modal cart saat ditekan
    className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 mt-2 rounded-lg"
  >
    BATAL
  </button>
</div>
    </div>
  </div>
)}


          {/* Modal Review */}
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
                  <button onClick={handleCloseModal} className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md">
                    Batal
                  </button>
                  <button onClick={handleSubmitReview} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                    Kirim Review
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
