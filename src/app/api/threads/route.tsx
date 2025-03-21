import { getThreads } from '@/lib/getter';

export async function POST(req: Request){
    const { genres } = await req.json();

    try {
        const threads = await getThreads(genres);
        return new Response(JSON.stringify(threads), { status: 200 });
    } catch {
        return new Response('Error fetching threads', { status: 500 });
    }
}