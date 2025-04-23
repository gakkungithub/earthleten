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
    const gidList: {gid: string}[] = await prisma.ThreadOnGenre.findMany({
        where: {
            tid: tid,
        },
        select: {
            gid: true,
        }
    });

    const gids = gidList.map(g => g.gid);

    const genreList: {genre: string}[] = await prisma.Genre.findMany({
        where: {
            id: {
                in: gids,
            }
        },
        select: {
            genre: true,
        }
    });

    return genreList.map(g => g.genre);
}

// #region menuConst 
const menuMapJP: { [key: string]: string } = {
    baseball: '野球',
    football: 'サッカー',
    trackfield: '陸上',
    baseball_pitcher: '投手',
    baseball_fielder: '野手',
    baseball_other: 'その他',
    baseball_pitcher_starter: '先発',
    baseball_pitcher_setupman: '中継',
    baseball_pitcher_closer: '抑え',
    baseball_fielder_catcher: 'キャッチャー',
    baseball_fielder_first: 'ファースト',
    baseball_fielder_second: 'セカンド',
    baseball_fielder_third: 'サード',
    baseball_fielder_shortstop: 'ショート',
    baseball_fielder_left: 'レフト',
    baseball_fielder_center: 'センター',
    baseball_fielder_right: 'ライト',
    baseball_other_DH: 'DH',
    baseball_other_PH: 'PH',
    baseball_other_twoway: '二刀流',
    baseball_other_coach: '監督',
    football_GK: 'GK',
    football_FW: 'FW',
    football_MF: 'MF',
    football_DF: 'DF',
    football_GK_GK: 'GK',
    football_FW_CF: 'CF',
    football_FW_WG: 'WG',
    football_FW_ST: 'ST',
    football_MF_AM: 'AM',
    football_MF_CM: 'CM',
    football_MF_LM: 'LM',
    football_MF_RM: 'RM',
    football_MF_DM: 'DM',
    football_DF_RWB: 'RWB',
    football_DF_LWB: 'LWB',
    football_DF_CB: 'CB',
    football_DF_RB: 'RB',
    football_DF_LB: 'LB',
    football_DF_SW: 'SW',
    trackfield_short: '短距離',
    trackfield_hurdle: 'ハードル',
    trackfield_middle: '中距離',
    trackfield_long: '長距離',
    trackfield_relay: 'リレー',
    trackfield_marathon: 'マラソン',
    trackfield_walk: '競歩',
    trackfield_jump: '跳躍',
    trackfield_throw: '投てき',
    trackfield_mixed: '混成競技',
    trackfield_short_100m: '100m',
    trackfield_short_200m: '200m',
    trackfield_short_400m: '400m',
    trackfield_hurdle_100m: '100mハードル',
    trackfield_hurdle_110m: '110mハードル',
    trackfield_hurdle_400m: '400mハードル',
    trackfield_middle_800m: '800m',
    trackfield_middle_1000m: '1000m',
    trackfield_middle_1500m: '1500m',
    trackfield_middle_1mile: '1マイル',
    trackfield_middle_3000mSC: '3000m障害',
    trackfield_long_5000m: '5000m',
    trackfield_long_10000m: '10000m',
    trackfield_long_1h: '1時間',
    trackfield_relay_100m: '4×100m',
    trackfield_relay_200m: '4×200m',
    trackfield_relay_400m: '4×400m',
    trackfield_relay_800m: '4×800m',
    trackfield_marathon_1mile: '1マイル',
    trackfield_marathon_half: 'ハーフ',
    trackfield_marathon_full: 'フル',
    trackfield_marathon_100km: '100km',
    trackfield_walk_10000m: '10000m競歩',
    trackfield_walk_20000m: '20000m競歩',
    trackfield_walk_50000m: '50000m競歩',
    trackfield_walk_20km: '20km競歩',
    trackfield_walk_50km: '50km競歩',
    trackfield_jump_high: '走高跳',
    trackfield_jump_pole: '棒高跳',
    trackfield_jump_long: '走幅跳',
    trackfield_jump_triple: '三段跳',
    trackfield_throw_shotput: '砲丸投',
    trackfield_throw_disk: '円盤投',
    trackfield_throw_hammer: 'ハンマー投',
    trackfield_throw_javelin: 'やり投',
    trackfield_mixed_heptathlon: '七種競技',
    trackfield_mixed_decathlon: '十種競技'
};
// #endregion

export async function getGenreLabelsByLanguage(genres: string[], language: string): Promise<string[]> {
    // 後で言語によって変えられるようにする
    const genreLabels = genres.map((key) => menuMapJP[key]).filter((value) => value !== undefined);
    return genreLabels;
}

export async function getGenreLabelsBySuggest(genreString: string) {
    const genres = Object.entries(menuMapJP).filter(
        ([key, value]) => value.includes(genreString) && key.split('_').length === 3
    ) || [];
    return genres;
}

const genderMapJP: { [key: string]: string } = {
    male: '男性',
    female: '女性',
    private: '非公開',
};

export async function getGenderByLanguage(gender: string, language: string) {
    // 後で言語によって変えられるようにする
    return genderMapJP[gender];
}

/* スレッドをジャンルで取得する 
 * genreがundefinedの場合、絞り込まない */
export async function getThreadsByGenresAndOrder( genres: string[], order: string ) {
    const gidList : {id: string}[] = await getGenreIDs(genres);
    const gids = gidList.map(g => g.id);

    const orderBy = 
        order === 'most_comments' 
        ? {
            comments: {
                _count: 'desc',
            },
          } : 
          {
            bdate: order === 'oldest' ? 'asc' : 'desc',
          };

    return await prisma.Thread.findMany({
        include: {
            _count: {
                select: { comments: true},
            }
        },
        where: gids.length > 0 ? {
            genres: {
                some: {
                    gid: {
                        in: gids,
                    },
                },
            },
        }: {},
        orderBy,
    });
}

// スレッドをidから取得
export async function getThread( id: string ) {
    return await prisma.Thread.findUnique({
        where: {
            id: id,
        },
    });
}

// スレッドをユーザーIDで取得
export async function getThreadsByUserID( uid: string ) {
    return await prisma.Thread.findMany({
        include: {
            _count: {
                select: { comments: true},
            }
        },
        where: {
            uid: uid,
        },
        orderBy: {
            bdate: 'desc'
        },
    });
}

export async function getComments( tid: string ) {
    return await prisma.Comment.findMany({
        where: {
            tid: tid,
        },
    });
}

export async function getImageListOfComment( cid: string ) {
    const imageList: {url: string}[] = await prisma.CommentImage.findMany({
        where: {
            cid: cid,
        },
        select: {
            url: true,
        }
    });

    return imageList.map(image => image.url);
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