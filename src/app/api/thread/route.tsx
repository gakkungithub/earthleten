import { addComment } from '@/lib/actions';

// ジャンルを追加する
export async function POST(req: Request){
    const { commentData } = await req.json();

    try {
        const result = await addComment({tid: commentData.tid, uid: commentData.uid, talk: commentData.comment, imageList: commentData.commentImageList});

        return new Response(JSON.stringify('Succeeded adding threads'), { status: 200 });
    } catch {
        return new Response(JSON.stringify('Error adding threads'), { status: 500 });
    }
}