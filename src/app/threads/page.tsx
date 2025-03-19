'use client';

import { useEffect, useState } from 'react';
import { getThreads } from '@/lib/getter';
import ThreadDetails from '@/components/ThreadDetails';
import { Thread } from '@/typeDeclar/typeComp';

export default function ThreadsResult(){
    const [threads, setThreads] = useState<Thread[]>([]);

    useEffect(() => {
        const fetchThreads = async () => {
            const stringGenres = localStorage.getItem("sports");
            if (stringGenres) {
                const savedThreads = await getThreads(JSON.parse(stringGenres));
                setThreads(savedThreads ?? []);
            }
            else {
                setThreads([]);
            }
        };
        fetchThreads();
    }, []);

    return (
        <>
        <ThreadDetails threads={threads} />
        </>
    )
}