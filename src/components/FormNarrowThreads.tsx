'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { Thread } from '@/typeDeclar/typeComp';
import MenuNarrow from '@/components/MenuNarrow';
import getGenreNamesByLanguage from '@/lib/getGenreNamesByLanguage';

export default function FormNarrowThreads({ setThreads, setNarrowedGenres }: {
    setThreads: Dispatch<SetStateAction<Thread[]>>,
    setNarrowedGenres: Dispatch<SetStateAction<string[]>>
}){
    const [genres, setGenres] = useState<string[]>([]);

    const onsubmit = async () => {
        const response = await fetch(`/api/threads?genres=${genres.join(',')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const threadsdata = await response.json();
            const genreLabels = await getGenreNamesByLanguage(genres, 'jp');
            setNarrowedGenres(genreLabels);
            setThreads(threadsdata);
        }
    }

    return (
        <div className="h-fit w-full pb-15 bg-gray-300 text-black z-2
        transition-transform duration-300 ease-in-out relative">
            <MenuNarrow setGenres={setGenres}/>
            <button type="button" disabled={genres.length === 0} onClick={onsubmit}
            className={`absolute bottom-2 left-0 right-0 mx-auto w-fit text-white rounded p-2 
            ${genres.length !== 0 ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-300"} `}>
                検索
            </button>
        </div>
    );
}