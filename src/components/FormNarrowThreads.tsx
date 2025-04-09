'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { Thread } from '@/typeDeclar/typeComp';
import MenuNarrow from '@/components/MenuNarrow';

export default function FormNarrowThreads({ setThreads, setNarrowedGenres }: {
    setThreads: Dispatch<SetStateAction<Thread[]>>,
    setNarrowedGenres: Dispatch<SetStateAction<string[]>>
}){
    const [genres, setGenres] = useState<string[]>([]);

    const onsubmit = async () => {
        const response = await fetch('/api/threads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ genres }),
        });

        if (response.ok) {
            const threadsdata = await response.json();;
            setNarrowedGenres(genres);
            setThreads(threadsdata);
        }
    }

    return (
        <div className="absolute h-full w-full bg-gray-300 text-black z-2
        transition-transform duration-300 ease-in-out">
            <MenuNarrow setGenres={setGenres}/>
            <button type="button" disabled={genres.length === 0} onClick={onsubmit}
            className={`absolute bottom-4 left-0 right-0 mx-auto w-fit text-white rounded p-2 ${genres.length !== 0 ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-300"} `}>
                検索
            </button>
        </div>
    );
}