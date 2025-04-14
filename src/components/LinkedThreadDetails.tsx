import Link from 'next/link';
import { Thread } from '@/typeDeclar/typeComp';
import { getUserByID } from '@/lib/getter';
import Image from 'next/image';
// import { getGenreNamesOfThread } from '@/lib/getter';

export default async function LinkedThreadDetails( {thread} : {thread: Thread} ){
    const bdate = new Date(thread.bdate);
    const user = await getUserByID(thread.uid);
    // console.log(await isImageAvailable(user.image));

    return (
        <div className="border-2 border-blue-600 rounded m-2 p-2">
            <div className="flex justify-between items-center">
                <Link href={`/chat/${thread.id}`} className="hover:bg-gray-100 font-bold text-2xl px-2 rounded">{thread.title}</Link>
                <span>{bdate.getFullYear()}年 {bdate.getMonth() + 1}月 {bdate.getDate()}日</span>
            </div>
            <div className="flex justify-end ">
                <Link className="flex items-center no-underline height-2 px-2 w-fit text-blue-600 hover:bg-gray-100 rounded" href={`/checkProfile/${user.name}`}>
                    {user.name}
                    <Image src={user.image || '/defaultIcon.png'} alt="" width={16} height={16} 
                    className="ml-2 rounded-full"/>
                </Link>
            </div>
        </div>
    );
}

// async function isImageAvailable(url: string): Promise<boolean> {
//     try {
//         const res = await fetch(url, { method: 'HEAD' });
//         return res.ok && (res.headers.get('content-type')?.startsWith('image/') || false);
//     }
//     catch {
//         return false;
//     }
// }