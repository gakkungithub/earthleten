import { getThread, getComments, getGenreNamesOfThread, getGenreLabelsByLanguage } from '@/lib/getter';
import { Thread, Comment } from '@/typeDeclar/typeComp';
import CommentComponent from '@/components/CommentComponent';

export default async function ChatPage({params} : {params: {id: string}}) {
    const thread : Thread = await getThread((await params).id);
    const genreNames: string[] = await getGenreNamesOfThread(thread.id);
    const genreLabels: string[] = await getGenreLabelsByLanguage(genreNames, 'jp');
    const comments : Comment[] = await getComments(thread.id) || [];

    return (
        <div>
            <div className="bg-blue-600 mb-4">
                <p className="text-blue-300 text-2xl font-bold px-4 py-2">{thread.title || ""}</p>
                {genreLabels.length > 0 &&
                <div className="p-4">
                    <p className="text-white">ジャンル:</p>
                    <div className="overflow-x-auto py-4 px-2 bg-gray-400 border rounded">
                        <p className="text-black font-bold whitespace-nowrap">{`${genreLabels}`}</p>
                    </div>
                </div>
                }
            </div>
            <div className="w-2/3 lg:w-1/2 mx-auto">
            {comments.map((comment, index) => (
                <CommentComponent key={index} uid={comment.uid} talk={comment.talk} cdate={new Date(comment.cdate)}/>
            ))}
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