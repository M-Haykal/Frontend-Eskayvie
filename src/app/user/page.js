"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";


// import { FaHeart, FaShoppingBag, FaShoppingBasket, FaStar, FaDollarSign, FaSearch } from "react-icons/fa";
// import { AiOutlineDashboard } from "react-icons/ai";
// import { IoIosLogOut } from "react-icons/io";

// const Sidebar = () => {
//   const menuItems = [
//     // { name: "Dashboard", icon: <AiOutlineDashboard /> },
//     // { name: "Orders", icon: <FaShoppingBag /> },
//     // { name: "My Wishlist", icon: <FaHeart /> },
//   ];
 



//   return (
//     <div className="w-64 h-screen text-white p-5 flex flex-col justify-between fixed left-0 top-0 bg-purple-100">
//       <div>
//         {/* Profile */}
//         <div className="flex gap-2 items-center">
//           <img
//             className="w-16 h-16 object-cover rounded-full"
//             src="https://plus.unsplash.com/premium_photo-1663134075608-9f24cd28b260?q=80&w=2059&auto=format&fit=crop"
//             alt="Profile"
//           />
//           <div>
//             <h2 className="text-xl font-bold text-black">
//               {name ? name : "Loading..."}
//             </h2>
//           </div>
//         </div>
//         {/* Menu */}
//         <ul className="mt-5">
//           {menuItems.map((item) => (
//             <li key={item.name} className="flex items-center p-2 my-2 rounded cursor-pointer text-black hover:bg-purple-200">
//               {item.icon}
//               <span className="ml-2">{item.name}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//       {/* Logout Button */}
//       <button onClick={handleLogout} className="w-full bg-red-500 mb-6 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
//         {/* <IoIosLogOut size={20} className="mr-2" /> */}
//         Logout
//       </button>
//     </div>
//   );
// };

// const Navbar = () => {
//   return (
//     <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-64 right-0">
//     <div className="text-xl font-bold">Dashboard</div>

//     {/* Search Bar & Cart Icon */}
//     <div className="flex items-center gap-4">
//       <div className="flex items-center border rounded-lg px-3 py-1">
//         {/* <FaSearch className="text-gray-500" /> */}
//         <input
//           type="text"
//           placeholder="Search..."
//           className="ml-2 border-none outline-none text-sm "
//         />
//       </div>
//       {/* <FaShoppingBasket className="text-xl cursor-pointer text-purple-500" /> */}
//     </div>
//   </nav>
//   );
// };

export default function Dashboard() {


    const products = [
      { name: "Phytax Combo", price: "55.03", oldPrice: "85.37", rating: "4.9", image: "/phytax.svg" },
      { name: "Phytax Combo", price: "55.03", oldPrice: "85.37", rating: "4.9", image: "/phytax.svg" },
      { name: "Phytax Combo", price: "55.03", oldPrice: "85.37", rating: "4.9", image: "/phytax.svg" },
      { name: "Phytax Combo", price: "55.03", oldPrice: "85.37", rating: "4.9", image: "/phytax.svg" },
      { name: "Phytax Combo", price: "55.03", oldPrice: "85.37", rating: "4.9", image: "/phytax.svg" },
    ];
  
    return (
      <div className="flex">
        {/* Sidebar */}
        {/* <Sidebar /> */}
  
        {/* Main Content */}
        <div className="flex-1">
          {/* Navbar */}
          <Navbar />
  
          <div className="p-6 mt-16">
            {/* Banner */}
            <div className="text-black p-0 rounded-lg">
              <h1 className="text-lg font-bold">Categories</h1>
            </div>
  
            {/* Kategori */}
            <div className="flex gap-3 mt-4">
              {["Health & Wellness", "Lifestyle", "Merchandise"].map((category, index) => (
                <button key={index} className="border px-4 py-2 rounded-lg text-sm">
                  {category}
                </button>
              ))}
            </div>
  
            {/* Rekomendasi Produk */}
            <div className="mt-6">
              <h2 className="text-lg font-bold">Recommendations</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-3">
                {products.map((product, index) => (
                  <div key={index} className="border rounded-lg shadow-md p-4 relative bg-white">
                    {/* LOVE ICON */}
                    <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                      {/* <FaHeart size={20} /> */}
                    </button>
  
                    <img src={product.image} alt={product.name} className="w-full object-cover mb-3" />
                    <h3 className="text-sm font-semibold">{product.name}</h3>
                    <p className=" text-sm font-bold flex items-center gap-1" style={{ color: "#AFA0D7" }}>
                      {/* <FaDollarSign className="" style={{ color: "#AFA0D7" }} /> {product.price}  */}
                      <span className="line-through text-gray-400 text-xs flex items-center gap-1">
                        {/* <FaDollarSign className="text-gray-400" /> {product.oldPrice} */}
                      </span>
                    </p>
                    <p className="text-yellow-500 text-xs flex items-center gap-1">
                      {/* <FaStar /> {product.rating} */}
                    </p>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Produk Baru */}
            <div className="mt-6">
              <h2 className="text-lg font-bold">New Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-3">
                {products.map((product, index) => (
                  <div key={index} className="border rounded-lg shadow-md p-4 relative bg-white">
                    {/* LOVE ICON */}
                    <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                      {/* <FaHeart size={20} /> */}
                    </button>
  
                    <img src={product.image} alt={product.name} className="w-full object-cover mb-3" />
                    <h3 className="text-sm font-semibold">{product.name}</h3>
                    <p className=" text-sm font-bold flex items-center gap-1" style={{ color: "#AFA0D7" }}>
                      {/* <FaDollarSign className="" style={{ color: "#AFA0D7" }} /> {product.price}  */}
                      <span className="line-through text-gray-400 text-xs flex items-center gap-1">
                        {/* <FaDollarSign className="text-gray-400" /> {product.oldPrice} */}
                      </span>
                    </p>
                    <p className="text-yellow-500 text-xs flex items-center gap-1">
                      {/* <FaStar /> {product.rating} */}
                    </p>
                  </div>
                ))}
              </div>
            </div>
  
          </div>
        </div>
      </div>
    );
  }
