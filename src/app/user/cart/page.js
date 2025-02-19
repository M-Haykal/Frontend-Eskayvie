"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import axiosInstance from '@/utils/axiosInstance';


const Cart = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/orders");
        setOrders(res.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
    <Navbar />
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-lg p-4 mb-4"
            >
              <h2 className="text-xl font-semibold">{order.id}</h2>
              <p className="text-gray-600">Status: {order.status}</p>
              <p className="text-gray-600">Total: ${order.totalAmount}</p>

              <h3 className="text-lg font-semibold mt-4">Items:</h3>
              <ul className="list-disc list-inside">
                {order.orderItems.map((item) => (
                  <li key={item.id}>
                    {item.product.name} - Qty: {item.quantity} - Price: ${item.product.price}
                  </li>
                ))}
              </ul>

            </div>
          ))
        ) : (
          <div className="col-span-3">
            <p className="text-center">No orders found.</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Cart;
