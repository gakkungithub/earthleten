import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 } from 'uuid';
import { getSportsIDs, getGenreIDs } from '@/lib/getter';
import { addPlayerCoach } from '@/lib/actions';

export async function POST(req: Request){
    const profile = await req.json();

    try { 
        const id = v4();
        const filePath = path.join(process.cwd(), 'public/jsonfile', `sports_${id}.json`); // public ではなく data ディレクトリなど
        await writeFile(filePath, JSON.stringify(profile, null, 2), 'utf-8');

        const sids = await getSportsIDs(profile.stats.sports);
        const gids = await getGenreIDs(profile.stats.genres);

        const result = await addPlayerCoach({name: profile.stats.name, fileID: id, sids: sids, gids: gids})

        if (result.success) {
          return new Response(JSON.stringify({ id: id }), { status: 200 });
        }
        else {
          console.log(result.message)
          return new Response(JSON.stringify({ id: id }), { status: 500 });
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