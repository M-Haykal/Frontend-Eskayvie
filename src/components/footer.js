const Footer = () => {
    return (
      <footer>
        <div className="mt-10 grid bg-[#AFA0D7] p-5">
          <div className="mb-0 flex items-center gap-5">
            <a href="#">
              <img src="/logoeskayvie.png" alt="Eskayvie Logo" className="w-14 h-14 rounded-full p-2 bg-white" />
            </a>
            <p className="text-2xl font-bold text-[#fefefe]">ESKAYVIE</p>
          </div>
  
          <div className="lg:flex lg:justify-between lg:gap-5 lg:mb-3">
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
  
            <div>
              <h1 className="text-lg font-bold text-white">Connect With Us!</h1>
              <p className="text-white">customercare@eskayvie.com</p>
              <p className="text-white">03-5511 1050</p>
            </div>
          </div>
  
          <div className="grid items-start mx-2 gap-3 md:flex md:justify-between text-white">
            <p>
              We shall continuously improve our products and services to enhance customer satisfaction and complying with ISO 9001 Quality Management System requirements.
            </p>
            <div className="grid gap-5">
              <p className="flex justify-center text-xl font-bold">Organization</p>
              <div className="lg:flex gap-5 grid grid-cols-1">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="w-32 p-2 rounded-xl bg-white bg-opacity-50">
                    <img src="/yayasan.png" alt="Organization Logo" />
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          <div className="border-2 border-x-transparent border-b-transparent pt-2 border-white flex justify-center items-center text-white font-bold text-lg mt-5">
            @2025 ESKAYVIE
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  