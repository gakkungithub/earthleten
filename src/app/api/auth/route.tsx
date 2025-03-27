import { getUserByName, getHash } from '@/lib/getter';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextApiRequest, NextApiResponse } from 'next';
import { SignJWT } from 'jose';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { name, password: inputPassword } = await req.body();

    try {
        const user = await getUserByName(name);
        const { password: gotPassword, ...userWithoutPassword } = user;

        // ここにクッキーの機能を作る
        if (gotPassword === await getHash(inputPassword)) {
            const secretKey = new TextEncoder().encode("prisma-supabase");
            const token = await new SignJWT(userWithoutPassword).setProtectedHeader({alg:"HS256"})
            .setExpirationTime("2h")
            .sign(secretKey);

            return res.status(200).json({ token: token });
        }
        else {
            return res.status(401).json({ message: 'パスワードが異なります。'});
        }

    } catch (error: unknown) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2001') {
                return res.status(401).json({ message: `サーバ名 ${name} が見つかりません。`});
            }
            else {
                return res.status(401).json({ message: "予期せぬPrism内のエラーが生じました"});
            }
        }
        else {
            return res.status(401).json({ message: "予期せぬエラーが生じました"});
        }
    }

}