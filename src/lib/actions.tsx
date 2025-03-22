import prisma from './prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export async function addThread(data) {
    const thread = await prisma.Thread.create({
        title: data.title,
        sports: data.sports,
    });
}

// id        String    @id @default(cuid())
// user      User      @relation(fields: [uid], references: [id])
// uid       String
// title     String
// sports    String
// bdate     DateTime  @default(now())
// comments  Comment[]

type inputUserProp = {
    name: string,
    gender: string,
    bdate: Date,
    height: number,
    weight: number,
    image: string
}

export async function addUser(data: inputUserProp){
    try {
        const user = await prisma.User.create({
            name: data.name,
            gender: data.gender,
            bdate: data.bdate,
            height: data.height,
            weight: data.weight,
            image: data.image
        });
        return { success: true, message: `ようこそ ${user.name} さん!!`}
    } catch (error) {
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