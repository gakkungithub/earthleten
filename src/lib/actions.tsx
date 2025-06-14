'use server';

import prisma from './prisma';
import { RoleType, TeamName, Color } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Profile, Teamname, Script, Award, Title } from '@/typeDeclar/typeComp';
import { getSportIDs, getGenreIDs } from '@/lib/getter';

export async function addThread(data: {uid: string, title: string, gids: string[], comment1: string, topImageList: string[]}) : Promise<boolean> {
    try {
        const thread = await prisma.Thread.create({
            data: {
                uid: data.uid,
                title: data.title,
            },
        });
        const tid = thread.id as string;

        const threadOnGenres = data.gids.map(gid => ({
            tid,
            gid,
        }));

        await prisma.ThreadOnGenre.createMany({
            data: threadOnGenres,
        });
        return await addComment({tid: tid, uid: data.uid, talk: data.comment1, imageList: data.topImageList});
    } catch {
        return false;
    }
}

export async function addComment(data: {tid: string, uid: string, talk: string, imageList: string[]}): Promise<boolean> {
    try {
        const comment = await prisma.Comment.create({
            data: {
                tid: data.tid,
                uid: data.uid,
                talk: data.talk,
            }
        });
        const cid = comment.id as string;

        const commentImage = data.imageList.map(image => ({
            url: image,
            cid: cid,
        }));

        await prisma.CommentImage.createMany({
            data: commentImage,
        });
        return true;

    } catch {
        return false;
    }
}

export async function editUserProfile(data: {
    id: string, name: string, gender: string, bdate: Date | null,
    height: number | null, weight: number | null, image?: string,
}): Promise<{ success: boolean, message?: string }>{
    try {
        const { id, ...updateData } = data;
        await prisma.User.update({
            where: { id: id },
            data: updateData,
        });
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

export async function addUser(data: {name: string, password: string}): Promise<{ success: boolean, message?: string }> {
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

export async function addPlayerCoach(profile: Profile) {
    try{
        const {awards, themeColor, data, scripts, stats} = profile;

        const sids = await getSportIDs(stats.sports);
        const gids = await getGenreIDs(stats.genres);

        const newWiki = await prisma.Wiki.create({ 
            data: {
                name: stats.name,
                // 後で変える
                role: RoleType.PLAYER,
                gender: stats.gender,
                bdate: new Date(stats.bdate[2], stats.bdate[0]-1, stats.bdate[1]),
                height: stats.height,
                weight: stats.weight,
                isBdatePrivate: stats.isBdatePrivate,
                isHeightPrivate: stats.isHeightPrivate,
                isWeightPrivate: stats.isWeightPrivate,
                bgColor: themeColor.bgColor,
                textColor: themeColor.textColor,
                teamnames: {
                    create: stats.teamnames.map((tn: Teamname) => ({
                        name: tn.name,
                        start: tn.start,
                        end: tn.end
                    }))
                },
                sports: {
                    create: sids.map((sid) => ({
                        sport: {
                            connect: { id: sid }
                        }
                    }))
                },
                genres: {
                    create: gids.map((gid) => ({
                        genre: {
                            connect: { id: gid }
                        }
                    }))
                },
                scripts: {
                    create: scripts.map((s: Script) => ({
                        section: s.section,
                        texts: {
                            create: s.texts.map((text: string) => ({
                                text: text
                            }))
                        }
                    }))
                },
                data: {
                    create: {
                        allowedColors: {
                            create: (Object.entries(data.highlightInfo)).map((h) => (
                                {
                                    color: h[0] as Color,
                                    explanation: h[1]
                                }
                            ))
                        },
                        results: {
                            create: data.results.map((rs) => (
                                {
                                    position: rs.position,
                                    columns: {
                                        create: rs.columns.map((col) => (
                                            {
                                                value: col.value
                                            }
                                        ))
                                    },
                                    rows: {
                                        create: rs.rows.map((row) => (
                                            {
                                                cells: {
                                                    create: row.cells.map((cell) => (
                                                        {
                                                            value: cell.value,
                                                            highlightColor: cell.highlightColor
                                                        }
                                                    ))
                                                }
                                            }
                                        ))
                                    }
                                }
                            ))
                        }
                    }
                },
                awards: {
                    create: awards.map((a: Award) => ({
                        section: a.section,
                        titles: {
                            create: a.titles.map((title: Title) => ({
                                name: title.name,
                                years: {
                                    create: title.years.map((year: number) => ({
                                        year: year
                                    }))
                                }
                            }))
                        }
                    }))
                }
            }
        });

        return { success: true, message: "正しくデータが保存されました" };
    }catch(error){
        console.log(error);
        return { success: false, message: "予期せぬエラーが生じました" };
    }
}






