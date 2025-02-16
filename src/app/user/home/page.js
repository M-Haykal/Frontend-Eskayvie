"use client";

import Image from 'next/image';

export default function ProductShowcase() {
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
      <section className="text-center py-16 px-4">
        <div className="relative max-w-4xl mx-auto">
          {/* <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            loop={true}
            className="rounded-lg shadow-lg"
          >
            <SwiperSlide>
              <div className="relative">
                <Image src="/image/banner.png" alt="Eskayvie Products" layout="responsive" width={1000} height={500} className="w-full h-auto rounded-lg max-w-full max-h-[900px]" />
                <div className="absolute top-10 left-10">
                </div>
              </div>
            </SwiperSlide>
          </Swiper> */}
        </div>
      </section>
      <section className="text-center py-16 px-4">
        <h1 className="text-3xl font-bold text-black">Our Products</h1>
        <p className="text-lg text-gray-600 mt-2">
          Explore a range of products meticulously crafted to inspire and
          enhance a healthier, more confident lifestyle.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-10 p-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="bg-gray-100 p-6 rounded-lg shadow-lg w-64">
              <Image
                src={`/image/eskayvie${item}.png`}
                alt={`Product ${item}`}
                layout="responsive"
                width={250}
                height={250}
                className="w-full h-60 object-cover rounded-md"
              />
              <h3 className="mt-4 text-xl font-semibold">Product {item}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-purple-100 py-16 text-center px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <Image
            src="/image/doctor.png"
            alt="Doctor Image"
            width={400}
            height={300}
            className="w-full md:w-1/2 object-cover"
          />
          <div className="text-left p-8 md:w-1/2">
            <h2 className="text-3xl font-bold text-purple-700">
              Our Product Standards
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              From the beginning, it has been our top priority to ensure that
              our products are safe and effective, and that they meet global
              security standards.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#AFA0D7] py-16 mt-7 text-center rounded-xl px-4">
        <div className="flex flex-wrap justify-center gap-10">
          {["100 natural", "shield100", "nodrugs", "halal100", "lovehand"].map((icon, index) => (
            <div key={index} className="text-center">
              <Image
                src={`/image/${icon}.png`}
                alt={`Feature ${index + 1}`}
                width={64}
                height={64}
                className="mx-auto"
              />
              <p className="mt-2 text-white font-semibold">100% Natural Ingredients {index + 1}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="text-center py-16 px-4">
        <h2 className="text-3xl font-bold text-black">Favorite Products</h2>
        <div className="container mx-auto flex flex-col md:flex-row items-center relative">
          <div className="relative w-full md:w-1/2">
            <Image
              src="/image/cloud1.jpeg"
              alt="Cloud background"
              width={400}
              height={300}
              className="w-full max-w-xl object-cover mx-auto"
            />
            <Image
              src="/image/Phytax.png"
              alt="Phytax Product"
              width={200}
              height={200}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <div className="text-left p-8 md:w-1/2">
            <h2 className="text-3xl font-bold text-black">Phytax</h2>
            <p className="text-lg text-gray-600 mt-4">
              Expertly crafted from a unique blend of twelve specially selected phytonutrients. This unique composition creates Phytax, a specialized formulation designed to enhance your wellness.
            </p>
            <button className="bg-[#AFA0D7] text-white rounded-md w-40 h-10 mt-5 shadow-md focus:ring-2 focus:ring-purple-300">
              Shop now
            </button>
          </div>
        </div>
        <div className="container mx-auto flex flex-col md:flex-row items-center relative">
          <div className="text-left p-8 md:w-1/2 md:ml-8">
            <h2 className="text-3xl font-bold text-black">botak</h2>
            <p className="text-lg text-gray-600 mt-4">
              Expertly crafted from a unique blend of twelve specially selected phytonutrients. This unique composition creates Phytax, a specialized formulation designed to enhance your wellness.
            </p>
            <button className="bg-[#AFA0D7] text-white rounded-md w-40 h-10 mt-5 shadow-md focus:ring-2 focus:ring-purple-300">
              Shop now
            </button>
          </div>
          <div className="relative w-full md:w-1/2">
            <Image
              src="/image/cloud1.jpeg"
              alt="Cloud background"
              width={400}
              height={300}
              className="w-full max-w-xl object-cover mx-auto"
            />
            <Image
              src="/image/Phytax.png"
              alt="Phytax Product"
              width={200}
              height={200}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </section>
      <section className="bg-white py-16 px-4">
        <h2 className="text-3xl font-bold text-black text-center">Eskayvie News</h2>
        <p className="text-lg text-gray-600 text-center mt-2">
          Read news, stories, answers to questions, and facts about Eskayvie.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={`/image/Phytax.png`}
                alt={`Eskayvie News ${item}`}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <p className="text-sm text-gray-500 font-medium">ADMIN ESKAYVIE - January 16, 2023</p>
                <h3 className="mt-2 text-lg font-bold text-gray-900 hover:text-purple-600 transition-colors">
                  {item === 1
                    ? "Gastritis Medicine Gets Banned! What Will Happen?"
                    : "Don't Do These 7 Things To Avoid High Blood Pressure!"}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">
                  {item === 1
                    ? "Wow, many people panicked when the popular gastritis medicine was banned! Don't panic! Here is a solution."
                    : "Have you ever experienced pain in the neck and headache continuously for no reason? If YES, blood pressure."}
                </p>
                <div className="mt-4">
                  <a
                    href="#"
                    className="inline-block text-purple-600 font-semibold border border-purple-600 px-4 py-2 rounded-full hover:bg-purple-600 hover:text-white transition-all"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-purple-100 py-8 px-7 rounded-x1 border border-gray-200 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 w-full">
            <Image
              src="/image/ThisIsEskayvie21.jpeg"
              alt="Eskayvie Reception"
              width={600}
              height={400}
              className="rounded-xl object-cover"
            />
          </div>
          <div className="text-left p-8 md:w-1/2">
            <h2 className="text-4xl font-extrabold text-purple-700">This is Eskayvie</h2>
            <p className="text-lg text-gray-600 mt-4 leading-relaxed">
              Discover the company's history and learn how Eskayvie has empowered
              entrepreneurs with business opportunities for over 15 years.
            </p>
            <button className="mt-6 px-6 py-3 bg-white text-black font-bold rounded-md border border-black hover:bg-gray-200 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>
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
