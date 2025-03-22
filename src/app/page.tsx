'use client';

import { redirect } from 'next/navigation';

export default function Home() {
  return (
    <div className="flex fixed items-center top-0 right-0 my-3">
    <button type="button" onClick={() => redirect('/signIn')}
    className=" bg-orange-400 text-white rounded px-2 py-1 mr-2 hover:bg-orange-300">
        サインイン
    </button>
    <button type="button"
    className=" bg-blue-600 text-white rounded px-2 py-1 mr-2 hover:bg-blue-500">
        ログイン
    </button>
    </div>
  );
}
