"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const productchart = () => {
  const router = useRouter();
  const [paymentData] = useState([
    { name: 'COD', value: 100 },
    { name: 'Pay Later', value: 580 },
    { name: 'Kredit', value: 100 },
    { name: 'Bank', value: 450 },
    { name: 'E-Money', value: 680 }
  ]);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/admin/productchart');
//     }
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     router.push('/admin/productchart');
//   };

  const getChartDimensions = () => {
    if (typeof window === 'undefined') return { width: 800, height: 400 };
    
    const screenWidth = window.innerWidth;
    let width = 1200;
    
    if (screenWidth < 640) {
      width = screenWidth - 40;
    } else if (screenWidth < 1024) {
      width = screenWidth - 100;
    }
    
    // Increased height for better vertical proportion
    return { width, height: 500 };
  };

  const { width, height } = getChartDimensions();

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-blue-600 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul>
          <li className="mb-4 hover:bg-blue-700 p-2 rounded cursor-pointer" onClick={() => router.push('/')}>Dashboard</li>
          <li className="mb-4 hover:bg-blue-700 p-2 rounded cursor-pointer" onClick={() => router.push('/admin/product')}>Products</li>
          <li className="mb-4 hover:bg-blue-700 p-2 rounded cursor-pointer" onClick={() => router.push('/admin/category')}>Category</li>
          <li className="mb-4 hover:bg-blue-700 p-2 rounded cursor-pointer" onClick={() => router.push('/admin/order')}>Order</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Payment</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <a href="#" className="py-4 px-1 text-gray-500 hover:text-gray-700">
                Payment overview
              </a>
              <a href="#" className="py-4 px-1 border-b-2 border-purple-500 text-purple-600">
                Payment chart
              </a>
            </nav>
          </div>
        </div>

        {/* Chart Container */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-6xl mx-auto">
            {/* <div className="flex justify-center">
              <BarChart 
                width={width} 
                height={height} 
                data={paymentData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 14 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  domain={[0, 1000]}
                  tick={{ fontSize: 14 }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(124, 58, 237, 0.1)' }}
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '12px'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#7C3AED" 
                  radius={[8, 8, 0, 0]}
                  barSize={130} // Increased from 60 to 80 for wider bars
                />
              </BarChart>
            </div> */}
            <div className="text-center text-sm text-gray-500 mt-6">
              2024 © Eskayvie
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default productchart;