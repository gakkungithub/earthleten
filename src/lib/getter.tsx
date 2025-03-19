import prisma from './prisma';
import { User } from '@/typeDeclar/typeComp';

/* ユーザーをidから取得する
 * typeは型のPromiseとなる必要がある */
export async function getUser(id: string): Promise<User>{
    return await prisma.User.findUnique({
        where: {
            id: id
        }
    });
}

type genreProp = {
    genres: string[]
}

/* スレッドを取得する 
 * genreがundefinedの場合、絞り込まない */
export async function getThreads( genres : genreProp){
    return await prisma.Thread.findMany({
        where: {
            genres: {
                in: genres
            }
        },
        orderBy: {
            bdate: 'desc'
        }
    });
}