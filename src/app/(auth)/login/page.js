"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Email dan password harus diisi!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3008/users/login', {
                email,
                password
            });
            // setError(response.data.message);

            // Simpan token, nama, dan role pengguna di localStorage
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('name', response.data.data.name);
            localStorage.setItem('role', response.data.data.role); // Simpan role pengguna

            // Redirect sesuai dengan role pengguna
            const role = response.data.data.role;
            if (role === 'admin') {
                router.push('/admin');
            } else if (role === 'user') {
                router.push('/user');
            } else {
                setError('Role tidak dikenali.');
            }
        } catch (error) {
            // console.error(error);
            setError(error.response?.data?.message || 'Terjadi kesalahan pada server.');
        }
    };
    const navigateToForgotPassword = () => {
        router.push('/forget-password');
    };

    const navigateToRegister = () => {
        router.push('/register');
    };


    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <div className="grid xl:w-[85%] w-[90%] items-center lg:flex lg:justify-between  lg:gap-20 lg:border-2 lg:shadow-2xl ">
                    {/* <!-- Bagian Gambar --> */}
                    <div className="flex flex-col items-center justify-center mb-8 md:mb-0">
                        {/* card */}
                        <div className="hidden lg:flex lg:justify-center lg:items-center">
                            <div className="relative bg-[#D0BFFF] xl:w-[35rem] xl:h-[35rem]  w-[30rem] h-[30rem] rounded-lg flex items-center justify-center">
                                <div className="relative bg-white xl:w-[30rem] xl:h-[30rem] w-[27rem] h-[27rem] rounded-lg flex items-center justify-center bg-opacity-50">
                                    <img
                                        src="/shopping-cart.svg"
                                        alt="gambar"
                                        className="absolute top-[50px] left-[250px] transform -translate-x-1/2 w-[28rem] h-[25rem]"
                                    />
                                    <div className="text-center"></div>
                                </div>
                            </div>
                        </div>
                        {/* end card */}
                        {/* image */}
                        <img
                            src="/shopping-cart.svg"
                            alt="Login"
                            className="block w-[70%] md:w-[50%] lg:hidden xl:hidden"
                        />
                        {/* end image */}
                    </div>
                    {/* <!-- Bagian Form --> */}
                    <form onSubmit={handleLogin} className="space-y-3 lg:w-1/3 w-full xl:w-1/3  xl:mx-20 ">
                        <div>
                            <h1 className="text-2xl font-bold text-[#8A6BDB]">Login</h1>
                            <p className="md:text-xl text-xl">Login to your account</p>
                        </div>
                        <div>
                            <label htmlFor="email" className="text-slate-800 text-lg">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="placeholder:p-2 placeholder:text-md border-2 block w-full rounded-lg px-5 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <InputPw password={password} setPassword={setPassword} />
                        </div>
                        <div>
                            <button
                                className="flex justify-end text-md text-blue-500 opacity-70 underline mt-2"
                                onClick={navigateToForgotPassword} type="button">
                                Forget password?
                            </button>

                        </div>
                        <div className="grid items-center gap-2">
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <button
                                className={` font-semibold  rounded-md p-1 w-full  whitespace-nowrap  max-w-md text-white text-md bg-purple-500  `}
                                type='submit' >
                                Login
                            </button>
                            <div className="text-md justify-center flex">
                                Don't have an account?
                                <button type='button' onClick={navigateToRegister} className="text-blue-500 text-md font-bold ml-1">
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                    {/* end form */}
                </div>
            </div>
        </>
    );
};

const InputPw = ({ password, setPassword }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <label className="text-slate-800 text-lg">Password</label>
            <div className="relative">
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    className="px-4 w-full py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-500"
                    placeholder="Enter password"
                />
                <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute inset-y-0 end-0 flex items-center px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-purple-500"
                >
                    {showPassword ? (
                        // Icon mata terbuka
                        <svg className="shrink-0 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5C5 5 2 12 2 12s3 7 10 7 10-7 10-7-3-7-10-7Z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    ) : (
                        // Icon mata tertutup
                        <svg className="shrink-0 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 2l20 20"></path>
                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        </svg>
                    )}
                </button>
            </div>
        </>
    );
};

