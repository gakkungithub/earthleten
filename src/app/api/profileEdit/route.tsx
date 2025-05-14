import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: Request){
    const profile = await req.json();

    try {
        const filePath = path.join(process.cwd(), 'data', 'sports_kgavvaaxha_3.json'); // public ではなく data ディレクトリなど
        await writeFile(filePath, JSON.stringify(profile, null, 2), 'utf-8');

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch {
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
}