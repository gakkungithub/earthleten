import { useState, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';

import ThreadDetails from '@/components/ThreadDetails';
import { Thread } from '@/typeDeclar/typeComp';

import Link from 'next/link';

import FormNarrowThreads from '@/components/FormNarrowThreads';
import FormAddThreads from '@/components/FormAddThreads';

export default async function ThreadsResult({ params, searchParams } : { params: {menu: string}, searchParams: Promise<{genres: string}> }){

    return (
        <ul className="flex bg-blue-600 mb-4 pl-2">
          <li className={`block px-4 py-2 my-1 hover:bg-gray-100 rounded ${params.menu === 'narrow' ? "bg-fuchsia-600" : ""}`}>
              <Link className="no-underline text-blue-300" href="/">
              絞り込み</Link></li>
          <li className={`block text-blue-300 px-4 py-2 my-1 hover:bg-gray-100 rounded ${params.menu === '/add' ? "bg-fuchsia-600" : ""}`}>
              <Link className="no-underline text-blue-300" href="/threads">
              追加</Link></li>
        </ul>
    )
    
    return (
        <div className="flex">
            <div className="grid grid-cols-12 gap-2 w-full h-screen">
                <div className="xl:col-span-4 col-span-8 h-fit border-blue-600 border-2 text-black">
                    {openMenu === 'narrow' &&
                    <FormNarrowThreads setThreads={setThreads} setNarrowedGenres={setNarrowedGenres}/>
                    }
                    {openMenu === 'add' &&
                    <SessionProvider>
                        <FormAddThreads />
                    </SessionProvider>
                    }
                    {openMenu === '' &&
                    <div className="w-full h-full">
                        {narrowedGenres.length > 0 &&
                        <div className="flex flex-col overflow-x-auto px-2 py-4 bg-gray-400 w-full">
                        <p className="text-white">絞り込み:</p>
                        <p className="text-black font-bold whitespace-nowrap">{`${narrowedGenres}`}</p>
                        </div>
                        }
                        {threads && threads.length > 0 ? 
                        <ThreadDetails threads={threads} /> :
                        <div>表示できるスレッドがありません!!</div>
                        }
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}
