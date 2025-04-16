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
        <div className="relative border-2 border-blue-600 rounded m-2 h-16">
            <Link href={`/chat/${thread.id}`} className="absolute inset-0 hover:bg-green-50 z-10 flex justify-between items-start px-2">
                <span className="font-bold text-xl">{thread.title}</span>
                <span>{bdate.getFullYear()}年 {bdate.getMonth() + 1}月 {bdate.getDate()}日</span>
            </Link>
            <div className="absolute h-fit bottom-1 right-1 z-11">
                <Link className="flex items-center no-underline px-2 w-fit text-blue-600 hover:bg-gray-100 rounded" href={`/checkProfile/${user.name}`}>
                    {user.name}
                    <Image src={user.image || '/defaultIcon.png'} alt="" width={24} height={24} className="ml-2 rounded-full"/>
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