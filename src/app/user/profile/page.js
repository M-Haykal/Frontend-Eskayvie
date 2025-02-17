"use client";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const Sidebar = () => {
  const menuItems = [
    // { name: "Dashboard", icon: <AiOutlineDashboard /> },
    // { name: "Orders", icon: <FaShoppingBag /> },
    // { name: "My Wishlist", icon: <FaHeart /> },
   
  ];

  return (
    <div className="w-64 h-screen text-white p-5 flex flex-col justify-between fixed left-0 top-0" style={{ backgroundColor: "#F2EDFF" }}>
      <div>
        <div className="flex gap-2 items-center">
          <img
            className="w-16 h-16 object-cover rounded-full"
            src="https://plus.unsplash.com/premium_photo-1663134075608-9f24cd28b260?q=80&w=2059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
          />
          <div>
            <h2 className="text-xl font-bold text-black">John Doe</h2>
          </div>
        </div>
        <ul className="mt-5">
          {menuItems.map((item) => (
            <li key={item.name} className="group flex items-center p-2 my-2 rounded cursor-pointer" style={{color: "black", backgroundColor: "#F2EDFF"}}>
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <button className="w-full bg-red-500 mb-6 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
        {/* <IoIosLogOut size={20} className="mr-2" /> */}
        Logout
      </button>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
      <div className="text-xl font-bold">Profile</div>
      {/* <FaShoppingBasket className="text-xl cursor-pointer" style={{ color: "#AFA0D7" }} /> */}
    </nav>
  );
};

const ProfilePage = ({user}) => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center text-center shadow-lg">
        {/* Foto Profil */}
        <img
          className="w-60 h-60  rounded-full object-cover"
          src="https://plus.unsplash.com/premium_photo-1663134075608-9f24cd28b260?q=80&w=2059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Profile"
        />

        <h2 className="text-5xl font-bold mt-4">{user?.name || "hahahah"}</h2>
        <p className="text-lg text-gray-500 mt-1">{user?.email}</p>
        <p className="text-lg text-gray-500 mt-1">{user?.role}</p>

        {/* Nomor Telepon */}
        <p className="text-lg text-gray-500 mt-1">+60 857 225 345 7110</p>

        {/* Tombol Edit */}
        <button className="mt-6 bg-purple-500 hover:bg-purple-600 text-white py-3 px-12 text-lg rounded-lg">
          Edit
        </button>
      </div>
    </div>
  );
};

const Layout = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
    
      try {
        // Decode token untuk mendapatkan ID user
        const decoded = jwtDecode(token);
        const userId = decoded.id; // Sesuaikan dengan struktur token
    
        // Fetch semua user
        const response = await axios.get("http://localhost:3008/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        // Cari user yang sesuai dengan ID dari token
        const userData = response.data.find((user) => user.id === userId);
    
        setUser(userData || null);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 h-screen overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Konten Profile */}
        <div className="p-8 mt-16 h-full">
          <ProfilePage user={user} />
        </div>
      </div>
    </div>
  );
};

export default Layout;

