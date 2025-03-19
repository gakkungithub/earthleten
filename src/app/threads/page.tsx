import { useRouter } from 'next/router';
import BoardThreads from '@/components/BoardThreads'

export default function ThreadsPage(){
    const router = useRouter();
    const genres = Array.isArray(router.query.genres) ? router.query.genres : router.query.genres ? [router.query.genres] : [];

    return(
        <>
        <BoardThreads genres={genres}/>
        </>
    );
}