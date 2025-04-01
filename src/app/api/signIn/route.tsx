import { getUserByName, getHash } from '@/lib/getter';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
// import { SignJWT } from 'jose';

export async function POST(req: Response) {
    const { name, password: inputPassword } = await req.json();
    try {
        const { id, name: gotName, password: gotPassword, image } = await getUserByName(name);
        const user = {
            id: id,
            name: gotName,
            image: image,
        }
        // ここにクッキーの機能を作る
        if (gotPassword === await getHash(inputPassword)) {
            return new Response(JSON.stringify(user), { status: 200 });
        }
        else {
            return new Response(JSON.stringify('パスワードが異なります'), { status: 401 });
        }

    } catch (error: unknown) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2001') {
                return new Response(JSON.stringify(`サーバ名 ${name} が見つかりません。`), { status: 401 });
            }
            else {
                return new Response(JSON.stringify("予期せぬPrism内のエラーが生じました"), { status: 401 });  
            }
        }
        else {
            return new Response(JSON.stringify("予期せぬエラーが生じました"), { status: 401 });
        }
    }
}