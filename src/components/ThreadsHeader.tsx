'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import ChangeThreadsOrder from '@/components/ChangeThreadsOrder';
import ChangeThreadsGenres from '@/components/ChangeThreadsGenres';
import Link from 'next/link';

export default function ThreadsHeader(){
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    return (
        <div className="flex justify-between items-start p-2">
            <div>
                <button type="button" className="text-right w-fit text-white rounded p-2 bg-blue-600 hover:bg-blue-500" onClick={() => setOpenMenu(!openMenu)}>
                    並び替え
                </button>
                {openMenu &&
                    <div className="bg-gray-200 p-2 border-2">
                    <ChangeThreadsOrder />
                    <ChangeThreadsGenres />
                    </div>
                }
            </div>
            {pathname === '/threads' &&
                <Link className="text-right w-fit text-white rounded p-2 bg-orange-400 hover:bg-orange-300" href='/threads/add'>
                　追加　</Link>
            }
        </div>
    )
}