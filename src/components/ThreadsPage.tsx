import FormThreads from '@/components/FormThreads'
import ThreadDetails from '@/components/ThreadDetails'
import { getThreads } from '@/lib/getter';

type genreProp = {
    genres: string[]
}

export default async function ThreadsPage( genres : genreProp ) {
    // スレッド一覧を取得する
    const threads = await getThreads(genres);

    return(
        <>
        <FormThreads />
        <ThreadDetails threads={threads} />
        </>
    );
}