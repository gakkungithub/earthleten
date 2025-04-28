'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { signOut } from 'next-auth/react';

import { redirect } from 'next/navigation';

//ここにはloginとimageしか使わない(idやnameはクライアントコンポーネントでuseSessionを使って取得する)
export default function HeaderButtons({ login, image } : { login: boolean, image: string}) {
    const [showLogoutMenu, setShowLogoutMenu] = useState<boolean>(false);
    const pathname = usePathname();

    const [showThreadsMenu, setShowThreadsMenu] = useState<boolean>(false);

    const handleLogout = () => {
      signOut();
      setShowLogoutMenu(false);
    };

    useEffect(() => {
        if (!login && !['/', '/signIn', '/addAccount'].includes(pathname)) {
            redirect('/signIn');
        }
    }, [pathname, login]);
  
    return (
        <>
        {showLogoutMenu &&
            <div className="fixed top-0 left-0 bg-gray-300 opacity-50 h-full w-full z-20"></div>
        }
        <ul className="flex bg-blue-600 pl-2 text-center">
          <li className={`block px-4 py-2 my-1 hover:bg-gray-100 rounded ${pathname === '/' ? "bg-fuchsia-600" : ""}`}>
              <Link className="no-underline text-blue-300" href="/">
              ホーム</Link></li>
          <li className={`relative block text-blue-300 px-4 py-2 my-1 hover:bg-gray-100 hover:rounded-b-none rounded ${pathname.includes('/threads') && "bg-fuchsia-600"}`}
          onMouseEnter={() => setShowThreadsMenu(true)} onMouseLeave={() => setShowThreadsMenu(false)}>
              <Link className="no-underline text-blue-300" href="/threads" onClick={() => setShowThreadsMenu(false)}>
              掲示板</Link>
              {showThreadsMenu &&
                <ul className="absolute left-0 top-full min-w-max z-11">
                    <li className={`block px-4 py-2 bg-blue-600 hover:bg-gray-100 ${pathname === '/threads/add' && "bg-fuchsia-600"}`}>
                    <Link className="no-underline text-white" href='/threads/add' onClick={() => setShowThreadsMenu(false)}>
                    追加</Link></li>
                </ul>
              }
          </li>
          <li className={`block px-4 py-2 my-1 hover:bg-gray-100 rounded ${pathname === '/playerCoachProfiles' ? "bg-fuchsia-600" : ""}`}>
              <Link className="no-underline text-blue-300" href="/playerCoachProfiles">
              選手・監督</Link></li>
        </ul>
        <ul className="flex fixed top-3 right-2">
          {pathname !== '/logIn' && !login &&
          <li className="block px-3 py-1 my-1 hover:bg-gray-100 rounded">
              <Link className="no-underline text-blue-600" href="/signIn">
              サインイン</Link></li>
          }
          {pathname !== '/logOut' && login &&
          <li className="block px-3 py-1 my-1 hover:bg-gray-100 rounded">
              <button className="text-blue-600" onClick={() => setShowLogoutMenu(!showLogoutMenu)}>
              サインアウト</button></li>
          }
          {pathname !== '/addAccount' && !login &&
          <li className="block px-3 py-1 my-1 hover:bg-gray-100 rounded">
              <Link className="no-underline text-orange-400" href="/addAccount">
              新規登録</Link></li>
          }
          {pathname !== '/editProfile' && login &&
          <li className="px-1 py-1 mx-2 rounded-full border">
              <Link className="text-blue-300" href="/editProfile">
              <Image src={image || '/defaultIcon.png'} alt="" width={32} height={32}/>
              </Link></li>
          }
        </ul>
        {showLogoutMenu && login && 
        <div className="fixed flex top-0 left-0 justify-center items-center text-center w-full h-screen z-21">
            <div className=" border-black border-2 w-3/5 md:w-2/5 lg:w-1/5 h-1/5">
                <p className="my-6">ログアウトしますか？</p>
                <ul className="flex justify-around">
                <li><Link className="no-underline text-white bg-blue-600 p-4 rounded" onClick={ () => setShowLogoutMenu(false) } href={pathname || "/"}>
                キャンセル</Link></li>
                <li><Link className="no-underline text-white bg-red-600 p-4 rounded" onClick={handleLogout} href="/">
                サインアウト</Link></li>
                </ul>
            </div>
        </div>
        }
        </>
    );
}