import prisma from './prisma';
import { Color, Gender } from '@prisma/client';
import { User, Profile, Data, Teamname } from '@/typeDeclar/typeComp';

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
 * スポーツのIDをスポーツ名から取得
 */
export async function getSportIDs( sports: string[] ) : Promise<string[]> {
    const sidList : { id: string }[] = await prisma.Sport.findMany({
        where: {
            sport: {
                in: sports,
            },
        },
        select: {
            id: true,
        }
    });

    return sidList.map(s => s.id);
}

/*
 * ジャンルのIDをジャンル名から取得
 */
export async function getGenreIDs( genres: string[] ) : Promise<string[]> {
    const gidList : { id: string }[] = await prisma.Genre.findMany({
        where: {
            genre: {
                in: genres,
            },
        },
        select: {
            id: true,
        }
    });

    return gidList.map(g => g.id);
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
    const genres = Object.entries(menuMapJP).filter(([key, value]) => 
        key.split('_').length === 3 && value.includes(genreString)
    );
    return genres;
}

const genderMapJP: Record<Gender, string> = {
    MALE: '男性',
    FEMALE: '女性',
    PRIVATE: '非公開',
}

export async function getGenderByLanguage(gender: Gender, language: string) {
    // 後で言語によって変えられるようにする
    return genderMapJP[gender];
}

export type Wiki = {
    id: string;
    name: string;
    gender: Gender;
    bdate: Date;
    isBdatePrivate: boolean;
    isHeightPrivate: boolean;
    isWeightPrivate: boolean;
    height: number;
    weight: number;
    bgColor: Color;
    textColor: Color;
    createdAt: Date;
    updatedAt: Date;
    data: {results: {id: string; position: string; columns: {id: string; value: string;}[]; rows: {id: string; cells: {id: string; value: string; highlightColor: Color;}[];}[];}[];
            allowedColors: {id: string; color: Color; explanation: string;}[];}
    teamnames: Teamname[];
    scripts: {id: string; section: string; texts: {text: string}[];}[];
    awards: {id: string; section: string; titles: {id: string; name: string; years: {year: number}[];}[];}[];
    sports: {sport:{sport: string;};}[]; 
    genres: {genre:{genre: string;};}[];
}

// export type Data = {
//     results: Result[];
//     highlightInfo: Partial<Record<Color, string>>;
// }

// export type Result = {
//     position: string;
//     id: string;
//     columns: TableColCell[];
//     rows: TableRow[];
// };

// export type TableColCell = {
//     value: string;
//     id: string;
// }

// export type TableRow = {
//     id: string;
//     cells: TableCell[];
// }

// export type TableCell = {
//     value: string | number;
//     id: string;
//     highlightColor?: string;
// }

// 選手・監督の概要カードのための情報
export async function getWiki() {
  const wikis : Wiki[] = await prisma.Wiki.findMany({
        select: {
            id: true,
            name: true,
            gender: true,
            bdate: true,
            height: true,
            weight: true,
            isBdatePrivate: true,
            isHeightPrivate: true,
            isWeightPrivate: true,
            bgColor: true,
            textColor: true,
            createdAt: true,
            updatedAt: true,
            teamnames: {
                select: {
                    id: true,
                    name: true,
                    start: true,
                    end: true
                }
            },
            scripts: {
                select: {
                    id: true,
                    section: true,
                    texts: {
                        select: {
                            text: true
                        }
                    }
                }
            },
            awards: {
                select: {
                    id: true,
                    section: true,
                    titles:{
                        select: {
                            id: true,
                            name: true,
                            years: {
                                select: {
                                    year: true
                                }
                            }
                        }
                    }
                }
            },
            sports: {
                select: {
                    sport: {
                        select: {
                            sport: true // ← Sports モデルの sports フィールド（名前）
                        }
                    }
                }
            },
            genres: {
                select: {
                    genre: {
                        select: {
                            genre: true // ← Genre モデルの genre フィールド（名前）
                        }
                    }
                }
            },
            data: {
                select: {
                    results: {
                        select: {
                            id: true,
                            position: true,
                            columns: {
                                select: {
                                    id: true,
                                    value: true
                                }
                            },
                            rows: {
                                select: {
                                    id: true,
                                    cells: {
                                        select: {
                                            id: true,
                                            value: true,
                                            highlightColor: true,
                                        }
                                    }
                                }
                            }
                        }
                    },
                    allowedColors: {
                        select: {
                            id: true,
                            color: true,
                            explanation: true
                        }
                    }
                }
            }
        }
    });

  return wikis.map(w => ({
    ...w,
    data: {
        results: w.data.results,
        highlightInfo: Object.fromEntries(
            w.data.allowedColors.map(ac =>
                [ac.color, ac.explanation]
            )
        ) as Partial<Record<Color, string>>,
        // highlightInfo: Partial<Record<Color, string>>;
    },
    scripts: w.scripts.map(script => ({
        id: script.id,
        section: script.section,
        texts: script.texts.map(t => t.text)  // text文字列だけを抽出
    })),
    awards: w.awards.map(a => ({
        id: a.id,
        section: a.section,
        titles: a.titles.map(t => ({
            id: t.id,
            name: t.name,
            years: t.years.map(y => y.year)
        }))
    })),
    sports: w.sports.map(s => menuMapJP[s.sport.sport]),
    genres: w.genres.map(g => menuMapJP[g.genre.genre])
  }))
}

export async function getWikiByID(id: string): Promise<Profile | null> {
    try {
        const wiki : Wiki = await prisma.Wiki.findUnique({
            where: {
                id: id
            },
            include: {
                teamnames: true,
                scripts: {
                    include: {
                        texts: true
                    }
                },
                data: {
                    include: {
                        results: {
                            include: {
                                columns: true,
                                rows: {
                                    include: {
                                        cells: true
                                    }
                                }
                            }
                        },
                        allowedColors: true
                    }
                },
                awards: {
                    include: {
                        titles: {
                            include: {
                                years: true
                            }
                        }
                    }
                },
                sports: {
                    include: {
                        sport: true
                    }
                },
                genres: {
                    include: {
                        genre: true
                    }
                }
            }
        });

    return {
        stats: {
            name: wiki.name,
            teamnames: wiki.teamnames,
            sports: wiki.sports.map(s => s.sport.sport),
            genres: wiki.genres.map(g => g.genre.genre),
            gender: wiki.gender,
            bdate: [wiki.bdate.getMonth()-1, wiki.bdate.getDate(), wiki.bdate.getFullYear()],
            height: wiki.height,
            weight: wiki.weight,
            isBdatePrivate: wiki.isBdatePrivate,
            isHeightPrivate: wiki.isHeightPrivate,
            isWeightPrivate: wiki.isWeightPrivate,
        },
        scripts: wiki.scripts.map(script => ({
            id: script.id,
            section: script.section,
            texts: script.texts.map(t => t.text)  // text文字列だけを抽出
        })),
        data: {
            results: wiki.data.results,
            highlightInfo: Object.fromEntries(
                wiki.data.allowedColors.map(ac =>
                    [ac.color, ac.explanation]
                )
            ) as Partial<Record<Color, string>>,
            // highlightInfo: Partial<Record<Color, string>>;
        },
        awards: wiki.awards.map(a => ({
            id: a.id,
            section: a.section,
            titles: a.titles.map(t => ({
                id: t.id,
                name: t.name,
                years: t.years.map(y => y.year)
            }))
        })),
        themeColor: {
            bgColor: wiki.bgColor,
            textColor: wiki.textColor
        }
    }

    }catch(error){
        console.log(error);
        return null;
    }
}

// 選手・監督の名前からファイル名を取得
export async function getFileID(id: string) : Promise<{ fileID: string; }> {
  return await prisma.Wiki.findUnique({
        where: {
            id: id,
        },
        select: {
            fileID: true,
        }
    });
}


/* スレッドをジャンルで取得する 
 * genreがundefinedの場合、絞り込まない */
export async function getThreadsByGenresAndOrder( genres: string[], order: string ) {
    const gids = await getGenreIDs(genres);

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
export async function getThreadsByUserID( uid: string, genres: string[], order: string ) {
    const gids = await getGenreIDs(genres);

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
        where: {
            AND: [
                gids.length > 0 ? {
                    genres: {
                        some: {
                            gid: {
                                in: gids,
                            },
                        },
                    },
                }: {},
                {
                    uid: uid,
                }
            ]
        },
        orderBy,
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