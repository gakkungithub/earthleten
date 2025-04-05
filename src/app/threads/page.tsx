'use client';

import { useState, useEffect } from 'react';
import ThreadDetails from '@/components/ThreadDetails';
import { Thread } from '@/typeDeclar/typeComp';

import FormNarrowThreads from '@/components/FormNarrowThreads';
import FormAddThreads from '@/components/FormAddThreads';

export default function ThreadsResult(){
    const [threads, setThreads] = useState<Thread[]>([]);
    
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
                <div className="col-span-9 h-full border-blue-600 border-2 text-black relative">
                    {openMenu === 'narrow' &&
                    <FormNarrowThreads setThreads={setThreads}/>
                    }
                    {openMenu === 'add' &&
                    <FormAddThreads />
                    }
                    <div className="absolute z-1">
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
