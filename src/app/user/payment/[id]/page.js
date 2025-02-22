"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import Footer from "@/components/footer";
const Checkout = () => {
  const [order, setOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [voucherCode, setVoucherCode] = useState("");
  const { id } = useParams();
  const BASE_URL = "http://localhost:3008";
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authorized. Please log in first.");
      router.push("/login");
      return;
    }

    if (!id) return;

     const fetchOrderData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/orders/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      console.log("Data order:", data); // 👉 Cek isi data order di console

      if (res.status === 200) {
        setOrder(data.data_order);
        setTotalAmount(data.data_order.totalAmount);
      } else {
        alert("Error fetching order data.");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
      alert("Error fetching order data.");
    }
  };

  fetchOrderData();
}, [id, router]);

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authorized. Please log in first.");
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:3008/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: order.id,
          amount: totalAmount,
          method: paymentMethod,
        }),
      });

      const data = await res.json();
      if (res.status === 201) {
        alert("Payment successful!");
      } else {
        alert("Error during payment: " + data.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error processing payment.");
    }
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div className="max-w mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Products ordered</h1>
      <div className="border rounded-lg p-4 mb-4">
        {order.orderItems.map((item) => (
          <div key={item.product.id} className="flex justify-between items-center border-b pb-3 mb-3">
            <div className="flex items-center">
            <img src={`${BASE_URL}/${item.product.image}`
  }
  alt={item.product.name}
  className="w-16 h-16 rounded mr-3"
/>
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-sm text-gray-500">{item.product.description}</p>
                <p className="text-sm text-gray-700">Quantity: <span className="font-bold">{item.quantity}</span></p> 
              </div>
            </div>
            <p className="font-semibold">$ {item.price}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold mb-3">Payment Methods</h2>
      <div className="flex gap-2 mb-4">
        {["Credit Card", "COD", "Paypal", "E-Wallet", "Dana"].map((method) => (
          <button
            key={method}
            className={`px-4 py-2 rounded-lg ${paymentMethod === method ? "bg-purple-500 text-white" : "bg-gray-200"}`}
            onClick={() => setPaymentMethod(method)}
          >
            {method}
          </button>
        ))}
      </div>

    
      <div className="border p-4 rounded-lg bg-gray-100">
        <h2 className="font-bold mb-2">Total</h2>
        <p className="flex justify-between text-gray-600">
          Subtotal: <span>$ {totalAmount}</span>
        </p>
        <p className="flex justify-between text-gray-600">
          Discount: <span>- $0</span>
        </p>
        <p className="flex justify-between text-lg font-bold mt-2">
          Total: <span>$ {totalAmount}</span>
        </p>
        <button
          onClick={handlePayment}
          className="bg-purple-500 text-white w-full py-2 mt-4 rounded-lg"
        >
          ORDER
        </button>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Checkout;
