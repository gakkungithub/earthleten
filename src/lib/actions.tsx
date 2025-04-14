'use server';

import prisma from './prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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

