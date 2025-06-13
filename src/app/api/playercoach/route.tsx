import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';
import { getFileID } from '@/lib/getter';
import { addPlayerCoach2 } from '@/lib/actions';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || '';

    try {
        const fileID = (await getFileID(id)).fileID
        const jsonData = fs.readFileSync(`./public/jsonfile/sports_${fileID}.json`, 'utf-8');

        return new Response(jsonData, { status: 200 });
    } catch {
        return new Response(JSON.stringify('Error fetching genres'), { status: 500 });
    }
}

export async function POST(req: Request){
    const profile = await req.json();

    try { 
        const result = await addPlayerCoach2(profile);

        if (result.success) {
          return new Response(JSON.stringify({ message: "succeeded in post"}), { status: 200 });
        }
        else {
          return new Response(JSON.stringify({ message: "error in post" }), { status: 500 });
        }
        
    } catch {
        return new Response(JSON.stringify({ error: "error in post" }), { status: 500 });
    }
}

export async function PUT(req: Request) {
  try {
    const {id, ...profile} = await req.json();

    // 保存先のファイル名をIDベースに構成（外部からパスを推測されにくくするにはさらに工夫が必要）
    const filePath = path.join(process.cwd(), 'public', 'jsonfile', `sports_${id}.json`);

    await writeFile(filePath, JSON.stringify(profile, null, 2), 'utf-8');

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "error in put" }), { status: 500 });
  }
}