import { getUserByID } from '@/lib/getter';

export async function POST(req: Request){
    const { id } = await req.json();

    try {
        const userProfile = await getUserByID(id);

        return new Response(JSON.stringify(userProfile), { status: 200 });
    } catch {
        return new Response(JSON.stringify('Error fetching profile'), { status: 500 });
    }
}