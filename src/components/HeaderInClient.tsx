'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

import UseAuth from '@/lib/useAuth';

export default function HeaderInClient() {
    const pathname = usePathname();
    const loginUser = UseAuth(pathname);
  
    const [showLogoutMenu, setShowLogoutMenu] = useState<boolean>(false);
    
    const handleLogout = () => {
      localStorage.removeItem("token");
      setShowLogoutMenu(false);
    };
  
    return (
        <>
        {showLogoutMenu &&
            <div className="fixed bg-gray-300 opacity-50 h-full w-full z-20"></div>
        }
        <h1 className="text-4xl text-indigo-800 font-bold my-2">Earthlete</h1>
        <ul className="flex bg-blue-600 mb-4 pl-2">
        <li className={`block px-4 py-2 my-1 hover:bg-gray-100 rounded ${pathname === '/' ? "bg-fuchsia-600" : ""}`}>
            <Link className="no-underline text-blue-300" href="/">
            ホーム</Link></li>
        <li className={`block text-blue-300 px-4 py-2 my-1 hover:bg-gray-100 rounded ${pathname === '/threads' ? "bg-fuchsia-600" : ""}`}>
            <Link className="no-underline text-blue-300" href="/threads">
            掲示板</Link></li>
        </ul>
        <ul className="flex fixed top-3 right-2">
        {pathname !== '/logIn' && !loginUser &&
        <li className="block px-3 py-1 my-1 hover:bg-gray-100 rounded">
            <Link className="no-underline text-blue-600" href="/logIn">
            ログイン</Link></li>
        }
        {pathname !== '/logOut' && loginUser &&
        <li className="block px-3 py-1 my-1 hover:bg-gray-100 rounded">
            <button className="text-blue-600" onClick={() => setShowLogoutMenu(!showLogoutMenu)}>
                ログアウト</button></li>
        }
        {pathname !== '/addAccount' && !loginUser &&
        <li className="block px-3 py-1 my-1 hover:bg-gray-100 rounded">
            <Link className="no-underline text-orange-400" href="/addAccount">
            新規登録</Link></li>
        }
        {pathname !== '/editProfile' && loginUser &&
        <li className="px-1 py-1 mx-2 rounded-full border">
            <Link className="text-blue-300" href="/editProfile">
            <Image src='/defaultIcon.png' alt="" width={32} height={32}/>
            </Link></li>
        }
        </ul>
        {showLogoutMenu && loginUser && 
        <div className="fixed flex top-0 justify-center items-center text-center w-full h-screen z-21">
        <div className=" border-black border-2 w-3/5 md:w-2/5 lg:w-1/5 h-1/5">
            <p className="my-6">ログアウトしますか？</p>
            <ul className="flex justify-around">
            <li><Link className="no-underline text-white bg-blue-600 p-4 rounded" onClick={ () => setShowLogoutMenu(false) } href={pathname}>
            キャンセル</Link></li>
            <li><Link className="no-underline text-white bg-red-600 p-4 rounded" onClick={handleLogout} href="/logOut">
            ログアウト</Link></li>
            </ul>
        </div>
        </div>
        }
        </>
    );
}