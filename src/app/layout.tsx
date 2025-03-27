'use client';

import './globals.css';
// googleのフォントの一種であるInconsolataをインポートしている
import { Inconsolata } from 'next/font/google';

import Link from 'next/link';
import Image from 'next/image';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import UseAuth from '@/lib/useAuth';

const fnt = Inconsolata({ subsets: ['latin']})

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  useEffect(() => {
    document.title = (() : string => {
      switch (pathname) {
        case '/':
          return 'ホームページ - Earthlete';
        case '/threads':
          return 'スレッド一覧 - Earthlete';
        case '/logIn':
          return 'ログイン - Earthlete';
        case '/addAccount':
          return 'アカウント登録 - Earthlete';
        case '/editProfile':
          return 'プロフィール設定 - Earthlete';
        default:
          return 'Earthlete';
      }
    })();
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'The App for athletes');
    }
  }, [pathname])

  const loginUser = UseAuth(pathname);

  return (
    <html lang="ja">
      <body className={fnt.className}>
        <h1 className="text-4xl text-indigo-800 font-bold my-2">
            Earthlete
        </h1>
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
            <Link className="no-underline text-blue-600" href="/logOut">
            ログアウト</Link></li>
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
        <div className="mx-2">
          {children}
        </div>
      </body>
    </html>
  );
}
