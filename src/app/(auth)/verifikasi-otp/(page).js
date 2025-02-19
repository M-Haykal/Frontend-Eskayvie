"use client";

import { useState } from "react";
// import { FaArrowLeft } from "react-icons/fa";
// import OtpInput from "react-otp-input";
import Image from "next/image";

const OTPPage = () => {
  const [otp, setOtp] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-purple-100 px-6">

        {/* Tombol Kembali */}
        <button className="absolute top-5 left-5 w-10 h-10 bg-purple-400 rounded-full flex justify-center items-center shadow-md hover:bg-purple-500">
          {/* <FaArrowLeft className="text-white text-lg" /> */}
        </button>

      {/* Container */}
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col md:flex-row items-center w-full max-w-4xl relative">
        

        {/* Gambar */}
        <div className="flex justify-center items-center">
          <div className="bg-purple-200 rounded-full p-8">
            <Image
              src="/otp-img.svg"
              alt="OTP Illustration"
              width={900}
              height={0}
              priority
            />
          </div>
        </div>

        {/* Form OTP */}
        <div className="flex flex-col items-center md:items-start ml-0 md:ml-10 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-2">OTP Verification</h2>
          <p className="text-gray-600 mb-4 text-center md:text-left">
            Please enter the 4 digit code sent to your email.
          </p>

          {/* Input OTP */}
          <div className="flex justify-center w-full">
            {/* <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              containerStyle="flex justify-center gap-4 w-full"
              renderInput={(props) => (
                <input
                  {...props}
                  className="flex-grow w-full h-16 md:w-16 md:h-16 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              )}
            /> */}
          </div>

          {/* Tombol Submit */}
          <button className="w-full md:w-auto px-6 py-3 bg-purple-600 text-white font-bold rounded-md mt-5 hover:bg-purple-700">
            Enter Code
          </button>

          {/* Resend Link */}
          <p className="text-gray-500 text-sm mt-3">
            Didn't receive the code in <span className="font-semibold">00:58?</span>{" "}
            <span className="text-purple-600 font-semibold cursor-pointer">Resend</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
