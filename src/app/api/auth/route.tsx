import { getUserByName, getHash } from '@/lib/getter';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { SignJWT } from 'jose';

export async function POST(req: Response) {
    const { data } = await req.json();
    const { name, password: inputPassword } = data;
    try {
        const user = await getUserByName(name);
        
        const { password: gotPassword, ...userWithoutPassword } = user;

        // ここにクッキーの機能を作る
        if (gotPassword === await getHash(inputPassword)) {
            const secretKey = new TextEncoder().encode("prisma-supabase");
            const token = await new SignJWT(userWithoutPassword).setProtectedHeader({alg:"HS256"})
            .setExpirationTime("2h")
            .sign(secretKey);

            return new Response(JSON.stringify(token), { status: 200 });
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