import { useRouter } from 'next/router';
import ThreadsPage from '@/components/ThreadsPage'

export default function ThreadsLayout(){
    const router = useRouter();
    const genres = Array.isArray(router.query.genres) ? router.query.genres : router.query.genres ? [router.query.genres] : [];

    return(
        <>
        <ThreadsPage genres={genres}/>
        </>
    );
}