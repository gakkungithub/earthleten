'use client';

import { useState, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';

import ThreadDetails from '@/components/ThreadDetails';
import { Thread } from '@/typeDeclar/typeComp';

import FormNarrowThreads from '@/components/FormNarrowThreads';
import FormAddThreads from '@/components/FormAddThreads';

export default function ThreadsResult(){
    const [threads, setThreads] = useState<Thread[]>([]);
    const [narrowedGenres, setNarrowedGenres] = useState<string[]>([]);
    
    const [openMenu, setOpenMenu] = useState<string>("");

    const openMenuHandler = (menu: string) => {
        setOpenMenu((openMenu === menu ? "" : menu));
    };

    useEffect(() => {setOpenMenu("")}, [threads])
    
    return (
        <div className="flex">
            <div className="grid grid-cols-12 gap-2 w-full h-screen">
                <div className="col-span-2 flex flex-col space-y-4">
                    <button type="button" onClick={() => openMenuHandler('narrow')}
                    className={` text-white rounded px-2 py-1 mr-2 ${openMenu === 'narrow' ? "bg-fuchsia-600 hover:bg-fuchsia-500" : "bg-blue-600 hover:bg-blue-500"}`}>
                        絞り込み
                    </button>
                    <button type="button" onClick={() => openMenuHandler('add')}
                    className={` text-white rounded px-2 py-1 mr-2 ${openMenu === 'add' ? "bg-fuchsia-600 hover:bg-fuchsia-500" : "bg-blue-600 hover:bg-blue-500"}`}>
                        追加
                    </button>
                </div>
                <div className="md:col-span-4 col-span-8 md:h-1/2 h-2/3 border-blue-600 border-2 text-black relative">
                    {openMenu === 'narrow' &&
                    <FormNarrowThreads setThreads={setThreads} setNarrowedGenres={setNarrowedGenres}/>
                    }
                    {openMenu === 'add' &&
                    <SessionProvider>
                        <FormAddThreads />
                    </SessionProvider>
                    }
                    <div className="absolute z-1 w-full ">
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
                </div>
            </div>
        </div>
    )
}
