import ThreadDetails from '@/components/ThreadDetails';
import { getGenreLabelsByLanguage, getThreadsByGenresAndOrder } from '@/lib/getter';

export default async function ThreadsPage({ searchParams } : { searchParams: { genres: string, order: string }}) {
    const genreString = ((await searchParams).genres || '');
    const genreLabels = await getGenreLabelsByLanguage(genreString.split(','), 'jp');
    const order = (await searchParams).order || ''
    const threads = await getThreadsByGenresAndOrder(genreString.split(','), order);
    
    return (
        <div className="relative h-128 mx-auto overflow-y-auto">
            {genreLabels.length > 0 &&
            <div className="flex flex-col px-2 py-4 bg-gray-400 w-full border">
                <p className="text-white">絞り込み:</p>
                <p className="text-black font-bold">{genreLabels.join(', ')}</p>
            </div>
            }
            <ThreadDetails threads={threads} />
        </div>
    )
}