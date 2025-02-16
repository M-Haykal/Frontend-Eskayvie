"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Helper function untuk mendapatkan userId dari token
const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = JSON.parse(atob(token.split(".")[1])); // Decode token JWT
    console.log(decoded);  // Cek apa yang ada di decoded
    return decoded.id;

  }
  return null;
};


const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null); // userId diambil dari token
  const router = useRouter(); // Router untuk melakukan navigasi ke halaman checkout

  useEffect(() => {
    // Ambil userId dari token saat halaman pertama kali dimuat
    const id = getUserIdFromToken();
    setUserId(id);

    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:3007/products");
      setProducts(res.data.data);
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.productId === product.id);
    if (existingItem) {
      // Update quantity jika produk sudah ada di cart
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
      const res = await axios.post("http://localhost:3007/orders", orderData);
      const data = await res.data;

      if (res.status === 200) {
        alert("Order placed successfully!");
        setCart([]); // Clear the cart after successful order
        router.push(`/admin/payment/${data.data_order.id}`); // Mengarahkan ke halaman checkout dengan order ID
      } else {
        alert("Error placing order: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Error placing order");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Product List</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-xl font-bold mt-2">Rp {product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Cart</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between py-2">
                <span>{products.find((p) => p.id === item.productId)?.name}</span>
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
                    className="text-lg font-semibold mr-2"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
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
                    className="text-lg font-semibold ml-2"
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      setCart(cart.filter((cartItem) => cartItem.productId !== item.productId))
                    }
                    className="ml-4 text-red-500"
                  >
                    &#x1F5D1;
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
