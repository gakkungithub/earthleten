'use server';

import prisma from './prisma';
import { getUserByName, getHash } from '@/lib/getter';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

// export async function addThread(data) {
//     const thread = await prisma.Thread.create({
//         title: data.title,
//         sports: data.sports,
//     });
// }

// id        String    @id @default(cuid())
// user      User      @relation(fields: [uid], references: [id])
// uid       String
// title     String
// sports    String
// bdate     DateTime  @default(now())
// comments  Comment[]

type UserProfile = {
    name: string,
    gender: string,
    bdate: Date | null,
    height: number | null,
    weight: number | null,
    image?: string,
}
export async function editUserProfile(data: UserProfile): Promise<{ success: boolean, message?: string }>{
    try {
        await prisma.User.create({data});
        return { success: true };

    } catch (error: unknown) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return { success: false, message: `ユーザー名 ${data.name} は既に使われています` };
            }
            else {
                return { success: false, message: "予期せぬPrism内のエラーが生じました" };
            }
        }
        else {
            return { success: false, message: "予期せぬエラーが生じました" };
        }
    }
}

type UserValues = {
    name: string,
    password: string,
}
export async function addUser(data: UserValues): Promise<{ success: boolean, message?: string }> {
    try {
        await prisma.User.create({data});
        return { success: true };

    } catch (error: unknown) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return { success: false, message: `ユーザー名 ${data.name} は既に使われています` };
            }
            else {
                return { success: false, message: "予期せぬPrism内のエラーが生じました" };
            }
        }
        else {
            return { success: false, message: "予期せぬエラーが生じました" };
        }
    }
}

export async function LogIn(data: UserValues): Promise<{ success: boolean, message?: string }> {
    try {
        const user = await getUserByName(data.name);
        
        // ここにクッキーの機能を作る
        if (user.password === await getHash(data.password)) {
            return { success: true };
        }
        else {
            return { success: false };
        }

    } catch (error: unknown) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return { success: false, message: `ユーザー名 ${data.name} は既に使われています` };
            }
            else {
                return { success: false, message: "予期せぬPrism内のエラーが生じました" };
            }
        }
        else {
            return { success: false, message: "予期せぬエラーが生じました" };
        }
    }
}

