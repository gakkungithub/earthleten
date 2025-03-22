'use client';

import { useState } from 'react';
import ThreadDetails from '@/components/ThreadDetails';
import NarrowThreads from '@/components/NarrowThreads';
import { Thread } from '@/typeDeclar/typeComp';

export default function ThreadsResult(){
    const [threads, setThreads] = useState<Thread[]>([]);

    const fetchThreads = async (genres: string[]) => {
        const response = await fetch('/api/threads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ genres }),
        });

        if (response.ok) {
            const threadsdata = await response.json();
            setThreads(threadsdata)
        }
        // else {
        //     // console.error("Failed to fetch threads");
        // }
    };
    
    return (
        <div className="flex">
            <NarrowThreads onSubmit={fetchThreads}/>
            {threads ? 
            <ThreadDetails threads={threads} /> :
            <div>表示できるスレッドがありません!!</div>
            }
        </div>
    )
}
