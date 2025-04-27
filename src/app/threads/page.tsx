import ThreadDetails from '@/components/ThreadDetails';
import Link from 'next/link';
import { getGenreLabelsByLanguage, getThreadsByGenresAndOrder } from '@/lib/getter';

export default async function ThreadsPage({ searchParams } : { searchParams: { genres: string, order: string }}) {
    const genreString = ((await searchParams).genres || '');
    const genreLabels = await getGenreLabelsByLanguage(genreString.split(','), 'jp');
    const order = (await searchParams).order || ''
    const threads = await getThreadsByGenresAndOrder(genreString.split(','), order);
    
    return (
        <div className="relative w-2/3 h-128 mx-auto overflow-y-auto">
            {genreLabels.length > 0 &&
            <div className="flex flex-col px-2 py-4 bg-gray-400 w-full border">
                <p className="text-white">絞り込み:</p>
                <p className="text-black font-bold">{genreLabels.join(', ')}</p>
            </div>
            }
            <ThreadDetails threads={threads} />
            <div className="absolute bottom-1 right-1 flex">
                <Link className="flex items-center justify-center text-white rounded-full w-12 h-12 bg-blue-600" href='/threads/add'>
                追加</Link>
            </div>
        </div>
    )
}