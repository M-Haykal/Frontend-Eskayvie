import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';


const Navbar = () => {
      const [name, setName] = useState("");
    
        const router = useRouter();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        router.push('/login');
      };
      const getNameFromStorage = () => {
        const nameFromStorage = localStorage.getItem("name");
        if (nameFromStorage) {
          setName(nameFromStorage);
        }
      };
      
      useEffect(() => {
        getNameFromStorage();
      }, []);
    return (
        <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
            <div className="text-[#AFA0D7] text-2xl font-firamono font-bold">
                <h1>ESKAYVIE</h1>
            </div>
            <div className="flex items-center">
                <ul className="text-purple-600 text-lg flex gap-6 md:gap-10 mr-4 md:mr-20">
                    <Link href="/">
                        <div className="hover:text-purple-800 cursor-pointer text-[#9B8BC4]">home</div>
                    </Link>
                    <Link href="/user/product">
                        <div className="hover:text-purple-800 cursor-pointer text-[#9B8BC4]">Product</div>
                    </Link>
                    <Link href="/user/cart">
                        <div className="hover:text-purple-800 cursor-pointer text-[#9B8BC4]">Cart</div>
                    </Link>
                    {!localStorage.getItem('token') ? (
                        <Link href="/login" className='hover:text-purple-800 cursor-pointer text-[#9B8BC4]' onClick={() => router.push('/login')}>
                            login
                        </Link>
                    ) : (
                        <>
                            <Link href="/user/profile">
                                <div className="hover:text-purple-800 cursor-pointer text-[#9B8BC4]">Hallo, {name}</div>
                            </Link>
                            <button className="hover:text-purple-800 cursor-pointer text-[#c48b8b]" onClick={handleLogout}>Logout</button>
                        </>
                    )}

                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
