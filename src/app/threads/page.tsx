import ThreadDetails from '@/components/ThreadDetails';
import { getThreads, getGenreLabelsByLanguage } from '@/lib/getter';

export default async function ThreadsPage({ searchParams } : { searchParams: { genres: string }}) {
    const genres = ((await searchParams).genres || '').split(',');
    const genreLabels = await getGenreLabelsByLanguage(genres, 'jp');
    const threads = await getThreads(genres);
    return (
        <div className="h-128 border-2 mx-2 overflow-y-auto">
        {genreLabels.length > 0 &&
        <div className="flex flex-col overflow-x-auto px-2 py-4 bg-gray-400 w-full min-w-0 border">
            <p className="text-white">絞り込み:</p>
            <p className="text-black font-bold whitespace-nowrap w-max">{`${genreLabels}`}</p>
        </div>
        }
        <ThreadDetails threads={threads} />
        </div>
    )
}