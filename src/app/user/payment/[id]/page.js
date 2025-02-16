"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Menggunakan useParams untuk App Router

const Checkout = () => {
  const [order, setOrder] = useState(null); // Untuk menyimpan data order
  const [paymentMethod, setPaymentMethod] = useState(""); // Untuk menyimpan metode pembayaran yang dipilih
  const [totalAmount, setTotalAmount] = useState(0); // Untuk menyimpan total amount
  const { id } = useParams(); // Mengambil orderId dari params URL

  useEffect(() => {
    if (!id) return; // Tunggu hingga id tersedia

    // Mengambil data order berdasarkan orderId
    const fetchOrderData = async () => {
      try {
        const res = await fetch(`http://localhost:3007/orders/${id}`);
        const data = await res.json();

        if (res.status === 200) {
          setOrder(data.data_order);
          setTotalAmount(data.data_order.totalAmount); // Mengatur total amount
        } else {
          alert("Error fetching order data.");
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
        alert("Error fetching order data.");
      }
    };

    fetchOrderData();
  }, [id]);

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    // Kirim data pembayaran ke backend
    try {
      const res = await fetch("http://localhost:3007/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Tabel Order Items */}
      <table className="min-w-full table-auto border-collapse border border-gray-300 mb-6">
        <thead>
          <tr>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.orderItems.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.product.name}</td>
              <td className="border px-4 py-2">{item.quantity}</td>
              <td className="border px-4 py-2">Rp {item.product.price}</td>
              <td className="border px-4 py-2">Rp {item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Amount */}
      <div className="mb-6">
        <strong>Total Amount: </strong>
        <span className="text-xl font-semibold">Rp {totalAmount}</span>
      </div>

      {/* Dropdown Payment Method */}
      <div className="mb-6">
        <label htmlFor="paymentMethod" className="block font-semibold mb-2">
          Payment Method
        </label>
        <select
          id="paymentMethod"
          className="border p-2 rounded w-full"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select Payment Method</option>
          <option value="credit_card">Credit Card</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      {/* Button Checkout */}
      <button
        onClick={handlePayment}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;
