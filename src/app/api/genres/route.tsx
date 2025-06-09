import { getGenreLabelsBySuggest } from '@/lib/getter';

// ジャンルタグをサジェストで取得する
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const genreString = searchParams.get('genreString') || '';

    try {
        const genreSuggests = await getGenreLabelsBySuggest(genreString);

        return new Response(JSON.stringify(genreSuggests), { status: 200 });
    } catch {
        return new Response(JSON.stringify('Error fetching genres'), { status: 500 });
    }
}