import { getThread, getComments, getGenreNamesOfThread, getGenreLabelsByLanguage } from '@/lib/getter';
import { Thread, Comment } from '@/typeDeclar/typeComp';
import CommentComponent from '@/components/CommentComponent';
import AddComment from '@/components/AddComment';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic  = 'force-dynamic';

export default async function ChatPage({params} : {params: {tid: string}}) {
    const thread : Thread = await getThread((await params).tid);
    const genreNames: string[] = await getGenreNamesOfThread(thread.id);
    const genreLabels: string[] = await getGenreLabelsByLanguage(genreNames, 'jp');
    const comments : Comment[] = await getComments(thread.id) || [];

    const session = await getServerSession(authOptions);

    return (
        <div>
            <div className="bg-blue-600 mb-4 p-4">
                <div className="flex text-blue-300 text-2xl font-bold py-2 justify-between">
                    <span>{thread.title || ""}</span>
                    <span>
                    {thread.bdate.getFullYear()}/{thread.bdate.getMonth() + 1}/{thread.bdate.getDate()}/
                    {String(thread.bdate.getHours()).padStart(2, '0')}:{String(thread.bdate.getMinutes()).padStart(2, '0')}:{String(thread.bdate.getSeconds()).padStart(2, '0')}
                    </span>
                </div>
                <Link className="flex items-center no-underline w-fit text-blue-300 hover:bg-gray-100 py-2 rounded" href={`/checkProfile/${session?.user.name}`}>
                <Image src={session?.user.image || '/defaultIcon.png'} alt="" width={24} height={24} className="mr-2 rounded-full"/>                   
                {session?.user.name}
                </Link>
                {genreLabels.length > 0 &&
                <div>
                    <p className="text-white">ジャンル:</p>
                    <div className="overflow-x-auto py-4 px-2 bg-gray-400 border rounded">
                        <p className="text-black font-bold whitespace-nowrap">{`${genreLabels}`}</p>
                    </div>
                </div>
                }
            </div>
            <div className="w-2/3 lg:w-1/2 mx-auto">
            {comments.map((comment, index) => (
                <CommentComponent key={index} cid={comment.id} uid={comment.uid} talk={comment.talk} cdate={comment.cdate}/>
            ))}
            <AddComment uid={session?.user.id || ''} tid={(await params).tid}/>
            </div>
        </div>

    )
}

// id        String    @id @default(cuid())
// user      User      @relation(fields: [uid], references: [id])
// uid       String
// title     String
// genres    ThreadOnGenre[]
// bdate     DateTime  @default(now())
// comments  Comment[]
// }

// model ThreadOnGenre {
// thread    Thread    @relation(fields: [tid], references: [id])
// tid       String
// genre     Genre     @relation(fields: [gid], references: [id])
// gid       String

// @@id([tid, gid])
// }

// model Genre {
// id        String    @id @default(cuid())
// genre     String    @unique
// threads   ThreadOnGenre[]
// }

// model Comment {
// id        String    @id @default(cuid())
// thread    Thread    @relation(fields: [tid], references: [id])
// tid       String
// user      User      @relation(fields: [uid], references: [id])
// uid       String
// talk      String
// image     CommentImage[]
// video     CommentVideo[]
// cdate     DateTime  @default(now())
// }

// model CommentImage {
// id        String    @id @default(cuid())
// url       String
// comment   Comment   @relation(fields: [cid], references: [id])
// cid       String
// }