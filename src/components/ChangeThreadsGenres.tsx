'use client';

import GenresNarrowMenu from '@/components/GenresNarrowMenu';
import SportsMenu from '@/components/SportsNarrowMenu';
import { useState } from 'react';
import { redirect, useSearchParams, usePathname } from 'next/navigation';

export default function ChangeThreadsOrder() {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [sports, setSports] = useState<string[]>([]);
    const [genres, setGenres] = useState<string[]>([]);

    const handleSportsChange = (sports: string[]) => 
        setSports(sports);

    const handleGenresChange = (genres: string[]) => 
        setGenres(genres);

    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const onsubmit = async () => {
        const genresString = genres.join(',');
        const order = searchParams.get('order');
        setOpenMenu(!openMenu);
        if (order) {
            redirect(`${pathname}?genres=${genresString}&order=${order}`);
        }
        else {
            redirect(`${pathname}?genres=${genresString}`);
        }
    }

    return (
        <div className="h-fit w-full my-2 pb-15 text-black z-2
        transition-transform duration-300 ease-in-out relative">
            <div>
                <button type="button" className="text-right w-fit text-white rounded p-2 bg-blue-600 hover:bg-blue-500" onClick={() => setOpenMenu(!openMenu)}>ジャンル絞込</button>
            </div>
            {openMenu &&
            <>
                <SportsMenu narrowedSports={sports} narrowedGenres={genres} setSports={handleSportsChange} setGenres={handleGenresChange}/>
                <GenresNarrowMenu sports={sports} genres={genres} setGenres={handleGenresChange}/>
                <button type="button" disabled={genres.length === 0} onClick={onsubmit}
                className={`absolute bottom-2 left-0 right-0 mx-auto w-fit text-white rounded p-2 
                ${genres.length !== 0 ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-300"} `}>
                    絞り込む
                </button>
            </>
            }
        </div>
    );
}