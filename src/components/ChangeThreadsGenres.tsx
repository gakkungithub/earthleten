'use client';

import MenuNarrow from '@/components/MenuNarrow';
import { useState } from 'react';
import { redirect, useSearchParams, usePathname } from 'next/navigation';

export default function ChangeThreadsOrder() {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [genres, setGenres] = useState<string[]>([]);

    const onsubmit = async () => {
        const genresString = genres.join(',');
        const order = searchParams.get('order');
        if (order) {
            redirect(`${pathname}?genres=${genresString}&order=${order}`);
        }
        else {
            redirect(`${pathname}?genres=${genresString}`);
        }
    }

    return (
        <div className="h-fit w-full my-2 pb-15 bg-gray-300 text-black z-2
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