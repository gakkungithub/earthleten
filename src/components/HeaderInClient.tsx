'use client';

import Link from 'next/link';
import Image from 'next/image';

import { usePathname } from 'next/navigation';

export default function HeaderInClient() {
    const pathname = usePathname();

    return (
        <>
        <h1 className="text-4xl text-indigo-800 font-bold my-2">
            Earthlete
        </h1>
        <ul className="flex bg-blue-600 mb-4 pl-2">
        <li className="block px-4 py-2 my-1 hover:bg-gray-100 rounded">
            <Link className="no-underline text-blue-300" href="/">
            ホーム</Link></li>
        <li className="block text-blue-300 px-4 py-2 my-1 hover:bg-gray-100 rounded">
            <Link className="no-underline text-blue-300" href="/threads">
            掲示板</Link></li>
        </ul>
        <ul className="flex fixed top-3 right-2">
        <li className="block px-3 py-1 my-1 hover:bg-gray-100 rounded">
            <Link className="no-underline text-blue-600" href="/logIn">
            ログイン</Link></li>
        <li className="block px-3 py-1 my-1 hover:bg-gray-100 rounded">
            <Link className="no-underline text-orange-400" href="/addAcount">
            新規登録</Link></li>
        <li className="px-1 py-1 mx-2 rounded-full border">
            <Link className="text-blue-300" href="/editProfile">
            <Image src='/defaultIcon.png' alt="" width={32} height={32}/>
            </Link></li>
        </ul>
        </>
    );
}