'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

//ここにはloginとimageしか使わない(idやnameはクライアントコンポーネントでuseSessionを使って取得する)
export default function HeaderButtons() {
    const pathname = usePathname();
  
    return (
        <ul className="flex bg-blue-600 mb-4 pl-2">
          <li className={`block px-4 py-2 my-1 hover:bg-gray-100 rounded ${pathname === '/threads' && "bg-fuchsia-600"}`}>
              <Link className="no-underline text-blue-300" href='/threads'>
              一覧</Link></li>
          <li className={`block px-4 py-2 my-1 hover:bg-gray-100 rounded ${pathname === '/threads/narrow' && "bg-fuchsia-600"}`}>
              <Link className="no-underline text-blue-300" href='/threads/narrow'>
              絞り込み</Link></li>
          <li className={`block text-blue-300 px-4 py-2 my-1 hover:bg-gray-100 rounded ${pathname === '/threads/add' && "bg-fuchsia-600"}`}>
              <Link className="no-underline text-blue-300" href='/threads/add'>
              追加</Link></li>
        </ul>
    );
}