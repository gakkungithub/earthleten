import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: Request){
    const profile = await req.json();

    try { 
        const filePath = path.join(process.cwd(), 'public/jsonfile', 'sports_kgavvaaxha_3.json'); // public ではなく data ディレクトリなど
        await writeFile(filePath, JSON.stringify(profile, null, 2), 'utf-8');

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch {
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const profile = await req.json();
    const { id } = params;

    // 保存先のファイル名をIDベースに構成（外部からパスを推測されにくくするにはさらに工夫が必要）
    const filePath = path.join(process.cwd(), 'public', 'jsonfile', `sports_${id}.json`);

    await writeFile(filePath, JSON.stringify(profile, null, 2), 'utf-8');

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}