import LinkedThreadDetails from '@/components/LinkedThreadDetails';
import { getThreads } from '@/lib/getter';
import { Thread } from '@/typeDeclar/typeComp';

export default async function ThreadsTemp2Page({ searchParams } : { searchParams: { genres: string }}) {
    const genres = ((await searchParams).genres || '').split(',');
    const threads = await getThreads(genres);
    return (
        <div className="h-fit border-2 mx-2">
        {threads && threads.length > 0 ?
            <> {threads.map((t: Thread) => (
                <LinkedThreadDetails thread={t} key={t.id}/>
            ))} </>:
            <div>表示できるスレッドがありません!!</div>
        }
        </div>
    )
  }

// {threads && threads.length > 0 ? 
// <ThreadDetails threads={threads} /> :
// <div>表示できるスレッドがありません!!</div>
// }