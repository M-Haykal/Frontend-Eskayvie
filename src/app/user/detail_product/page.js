"use client";


export default function DetailProduk() {
    return (
        <>
            <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
            <div className="text-[#AFA0D7] text-2xl font-firamono font-bold">
                <h1>ESKAYVIE</h1>
            </div>
            <div className="flex items-center">
                <ul className="text-purple-600 text-lg flex gap-6 md:gap-10 mr-4 md:mr-20">
                    <li>
                        home
                    </li>
                    <li>
                        <div className="hover:text-purple-800 cursor-pointer text-[#9B8BC4]">
                            About Us
                        </div>
                    </li>
                    <li>
                        <div className="hover:text-purple-800 cursor-pointer text-[#9B8BC4]">
                            Blog
                        </div>
                    </li>
                    <li>
                        <div className="hover:text-purple-800 cursor-pointer text-[#9B8BC4]">
                            Contact Us
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
            <div className="max-w-4xl mx-auto p-4 shadow-lg rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <img
                            src="/image/Phytax.png"
                            alt="Waxed Canvas Messenger Bag"
                            className="w-full rounded-lg"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Obat</h1>
                        <p className="text-gray-600 text-sm mt-1">822 Dilihat • 471 Terjual</p>
                        <p className="text-2xl font-semibold text-green-600 mt-2">Rp580.000</p>
                        <p className="text-gray-700 mt-3">
                            Ini merupakan tanda obat yang dinilai "aman" . Obat bebas yaitu obat yang bisa dibeli bebas di apotek, bahkan di warung, tanpa resep dokter, ditandai dengan lingkaran hijau bergaris tepi hitam. Obat bebas ini digunakan untuk mengobati gejala penyakit yang ringan misalnya vitamin dan antasida.
                        </p>
                        <div className="flex items-center mt-4">
                            <button className="px-3 py-1 border rounded-l">-</button>
                            <span className="px-4 border-y">1</span>
                            <button className="px-3 py-1 border rounded-r">+</button>
                        </div>
                        <div className="flex flex-col gap-3 mt-4">
                            <button className="bg-green-600 text-white py-2 rounded-lg w-full">
                                Beli Sekarang
                            </button>
                            <button className="bg-green-500 text-white py-2 rounded-lg w-full">
                                Beli Lewat WhatsApp
                            </button>
                        </div>
                        <div className="mt-6 border-t pt-4">
                            <h3 className="font-semibold">Alasan berbelanja di Eskyvie</h3>
                            <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
                                <li>Pesanan sebelum jam 2 siang akan diproses di hari yang sama</li>
                                <li>Garansi uang kembali</li>
                                <li>Bisa COD - Bayar setelah barang sampai</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
            {/* Footer content */}
            <div className="mt-10 grid bg-[#AFA0D7] p-5">
                <div className="mb-6 flex items-center gap-5 ">
                    <a href="">
                        <img src="/image/logoeskayvie.png" alt="" className="w-14 h-14 rounded-full p-2 bg-white" />
                    </a>
                    <p className="text-2xl font-bold text-[#fefefe]">ESKAYVIE</p>
                </div>
                <div className="lg:flex lg:justify-between lg:gap-5  lg:mb-3">
                    <div className="w-full mb-2">
                        <p className="text-md text-[#fefefe]">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum alias
                            dignissimos animi qui aliquid aut temporibus quisquam accusamus
                            soluta, voluptatum reiciendis libero optio assumenda et quidem
                            quasi reprehenderit tempore consequatur. Lorem ipsum dolor sit
                            amet consectetur adipisicing elit. Laborum quaerat quibusdam nisi
                            commodi veniam, esse sunt voluptas officia autem dignissimos odio
                            eos mollitia perspiciatis, placeat dolore? Tempore, dicta.
                        </p>
                    </div>

                    <div className="gird">
                        <h1 className="text-lg font-bold text-white">Connect With Us!</h1>
                        <p className='text-white'>customercare@eskayvie.com
                        </p>
                        <p className='text-white'> 03-5511 1050</p>
                    </div>
                </div>

                <div className="grid items-start mx-2 gap-3 md:flex md:justify-between text-white">
                    <p>
                        We shall continuously improve our products and services to enhance customer satisfaction and complying with ISO 9001 Quality Management System requirements.
                    </p>
                    <div className='grid gap-5'>
                        <p className='flex justify-center text-xl font-bold'>Organization</p>
                        <div className='lg:flex gap-5 grid grid-cols-1'>
                            <div className='w-32 p-2 rounded-xl bg-white bg-opacity-50'>

                                <img src="/image/yayasan.png" alt="" />
                            </div>
                            <div className='w-32 p-2 rounded-xl bg-white bg-opacity-50'>

                                <img src="/image/yayasan.png" alt="" />
                            </div>
                            <div className='w-32 p-2 rounded-xl bg-white bg-opacity-50'>

                                <img src="/image/yayasan.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" boder-2 border-2 border-x-transparent border-b-transparent pt-2 border-white flex justify-center items-center text-white font-bold text-lg mt-5">
                    @2025 ESKAYVIE
                </div>
            </div>
        </footer>
        </>
    );
}