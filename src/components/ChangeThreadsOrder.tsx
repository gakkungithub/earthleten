'use client';

import { redirect, useSearchParams, usePathname } from 'next/navigation';

export default function ChangeThreadsOrder() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    
    const handleChangeOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const genres = searchParams.get('genres');
        if (genres) {
            redirect(`${pathname}?genres=${genres}&order=${e.target.value}`);
        }
        else {
            redirect(`${pathname}?order=${e.target.value}`);
        }
    }

    return (
        <select onChange={handleChangeOrder} className="border-blue-600 border-2 rounded-3xl">
            <option value="newest">新しい順</option>
            <option value="oldest">古い順</option>
            <option value="most_comments">コメントが多い順</option>
        </select>
    )
}