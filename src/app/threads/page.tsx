import ThreadDetails from '@/components/ThreadDetails';
import Link from 'next/link';
import { getGenreLabelsByLanguage, getThreadsByGenresAndOrder } from '@/lib/getter';
import ChangeThreadsGenres from '@/components/ChangeThreadsGenres';
import ChangeThreadsOrder from '@/components/ChangeThreadsOrder';

export default async function ThreadsPage({ searchParams } : { searchParams: { genres: string, order: string }}) {
    const genres = ((await searchParams).genres || '').split(',');
    const genreLabels = await getGenreLabelsByLanguage(genres, 'jp');
    const order = (await searchParams).order || ''
    const threads = await getThreadsByGenresAndOrder(genres, order);
    
    return (
        <div className="flex mx-auto w-fit">
            <div className="w-1/2 lg:w-1/3">
                <ChangeThreadsOrder />
                <ChangeThreadsGenres />
            </div>
            <div className="relative w-1/2 xl:w-1/4 h-128 border-2 mx-2 overflow-y-auto">
                {genreLabels.length > 0 &&
                <div className="flex flex-col px-2 py-4 bg-gray-400 w-full border">
                    <p className="text-white">絞り込み:</p>
                    <p className="text-black font-bold">{genreLabels.join(', ')}</p>
                </div>
                }
                <ThreadDetails threads={threads} />
                <Link className="absolute bottom-1 right-1 flex items-center justify-center text-white rounded-full w-12 h-12 bg-blue-600" href='/threads/add'>
                追加</Link>
            </div>
        </div>
    )
}