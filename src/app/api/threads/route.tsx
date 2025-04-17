import { getThreads, getGenreIDs } from '@/lib/getter';
import { addThread } from '@/lib/actions';

// ジャンルを追加する
export async function POST(req: Request){
    const { threadData } = await req.json();

    try {
        // genreのIDを取得
        const genres = threadData.genres;
        const gidList : {id: string}[] = await getGenreIDs(genres);
        const gids = gidList.map(g => g.id);

        const result = await addThread({
            uid: threadData.uid,
            title: threadData.title,
            gids: gids,
            comment1: threadData.comment1,
            topImageList: threadData.topImageList,
        });

        return new Response(JSON.stringify('Succeeded adding threads'), { status: 200 });
    } catch {
        return new Response(JSON.stringify('Error adding threads'), { status: 500 });
    }
}

// ジャンルを絞り込んでスレッドを取得する
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const genres = searchParams.get('genres')?.split(',') || [];

    try {
        const threads = await getThreads(genres);

        return new Response(JSON.stringify(threads), { status: 200 });
    } catch {
        return new Response(JSON.stringify('Error fetching threads'), { status: 500 });
    } 

}