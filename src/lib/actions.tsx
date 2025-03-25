'use server';

import prisma from './prisma';
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

type InputUserValues = {
    name: string,
    gender: string,
    bdate: Date | null,
    height: number | null,
    weight: number | null,
    image?: string,
}

export async function addUser(data: InputUserValues){
    try {
        const user = await prisma.User.create({data});

        return { success: true, message: `ようこそ ${user.name} さん!!`}
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

// id        String    @id @default(cuid())
// threads   Thread[]
// comments  Comment[]
// name      String    @unique
// gender    String
// bdate     DateTime
// height    Float
// weight    Float
// image     String