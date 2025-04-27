'use client';

import { useState } from 'react';
import ChangeThreadsOrder from '@/components/ChangeThreadsOrder';
import ChangeThreadsGenres from '@/components/ChangeThreadsGenres';

export default function NarrowMenu(){
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    return (
        <>
        <button type="button" className="text-right w-fit text-white rounded p-2 bg-blue-600 hover:bg-blue-500" onClick={() => setOpenMenu(!openMenu)}>
            並び替え
        </button>
        {openMenu &&
            <div className="bg-gray-200 p-2 border-2">
            <ChangeThreadsOrder />
            <ChangeThreadsGenres />
            </div>
        }
        </>
    )
}