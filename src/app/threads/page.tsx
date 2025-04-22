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
        <div className="flex relative mx-auto w-fit">
            <div className="w-1/2 lg:w-1/3">
                <ChangeThreadsOrder />
                <ChangeThreadsGenres />
            </div>
            <div className="w-fit h-128 border-2 mx-2 overflow-y-auto">
                {genreLabels.length > 0 &&
                <div className="flex flex-col overflow-x-auto px-2 py-4 bg-gray-400 w-full min-w-0 border">
                    <p className="text-white">絞り込み:</p>
                    <p className="text-black font-bold whitespace-nowrap w-max">{`${genreLabels}`}</p>
                </div>
                }
                <ThreadDetails threads={threads} />
            </div>
            <Link className="absolute bottom-1 left-1 flex items-center justify-center text-white rounded-full w-12 h-12 bg-blue-600" href='/threads/add'>
            追加</Link>
        </div>
    )
}