import {getGenreLabelsBySuggest} from '@/lib/getter';

// ジャンルタグをサジェストで取得する
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const genreString = searchParams.get('genreString') || '';

    try {
        const genres = await getGenreLabelsBySuggest(genreString);

        return new Response(JSON.stringify(genres), { status: 200 });
    } catch {
        return new Response(JSON.stringify('Error fetching genres'), { status: 500 });
    }
}