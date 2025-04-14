import prisma from './prisma';
import { User } from '@/typeDeclar/typeComp';

/* ユーザーをidから取得する
 * typeは型のPromiseとなる必要がある */
export async function getUserByID(id: string): Promise<User>{
    return await prisma.User.findUnique({
        where: {
            id: id
        }
    });
}
// ユーザーをnameから取得する
export async function getUserByName(name: string): Promise<User>{
    return await prisma.User.findUnique({
        where: {
            name: name
        }
    }); 
}

/*
 * ジャンルのIDを取得
 */
export async function getGenreIDs( genres: string[] ) {
    return await prisma.Genre.findMany({
        where: {
            genre: {
                in: genres,
            },
        },
        select: {
            id: true,
        }
    });
}

/* 
 * ジャンルを取得
 */
export async function getGenreNamesOfThread( tid: string ) {
    const gidList: {id: string}[] = await prisma.ThreadOnGenre.findMany({
        where: {
            tid: tid,
        },
        select: {
            gid: true,
        }
    });

    const gids = gidList.map(g => g.id);

    return await prisma.Genre.findMany({
        where: {
            id: {
                in: gids,
            }
        },
    });

}
/* スレッドを取得する 
 * genreがundefinedの場合、絞り込まない */
export async function getThreads( genres: string[] ) {
    const gidList : {id: string}[] = await getGenreIDs(genres);
    const gids = gidList.map(g => g.id);
    
    if (gids.length === 0) {
        return await prisma.Thread.findMany({
            orderBy: {
                bdate: 'desc'
            }
        });
    }
    return await prisma.Thread.findMany({
        where: gids.length > 0 && {
            genres: {
                some: {
                    gid: {
                        in: gids,
                    },
                },
            },
        },
        orderBy: {
            bdate: 'desc'
        },
    });
}

/* ハッシュ値を取得する(主にパスワード用) 
 * もし仮にパスワードの安全性が失われそうになったらここを変形する 
 */
export async function getHash( plaintext: string ) {
    const textUint8 = new TextEncoder().encode(plaintext);
    const hashBuffer = await crypto.subtle.digest('SHA-256', textUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}