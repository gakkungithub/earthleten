'use client';

import React, { useState } from 'react';
import MenuNarrow from '@/components/MenuNarrow';
import { redirect } from 'next/navigation';

export default function NarrowThreadsPage(){
    const [genres, setGenres] = useState<string[]>([]);

    const onsubmit = async () => {
        const genresString = genres.join(',');
        redirect(`/threads${genresString === '' ? '' : '?genres=' }${genresString}`);
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