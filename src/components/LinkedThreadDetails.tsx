import Link from 'next/link';
import { Thread } from '@/typeDeclar/typeComp';
import { getUserByID } from '@/lib/getter';
import Image from 'next/image';

export default async function LinkedThreadDetails( {thread} : {thread: Thread} ){
    const bdate = new Date(thread.bdate);
    const user = await getUserByID(thread.uid);

    return (
        <div className="grid grid-cols-2 grid-rows-2 border-blue-600 border-2 m-2">
            <Link href={`/thread/${thread.id}`} className="hover:bg-green-50 w-fit px-2">
                <span className="font-bold text-xl">{thread.title}</span>
            </Link>
            <p className="px-2">
                {bdate.getFullYear()}/{bdate.getMonth() + 1}/{bdate.getDate()}/
                {String(bdate.getHours()).padStart(2, '0')}:{String(bdate.getMinutes()).padStart(2, '0')}:{String(bdate.getSeconds()).padStart(2, '0')}
            </p>
            <span className="text-sm px-2">コメント({thread._count.comments})</span>
            <Link className="flex items-center no-underline px-2 w-fit text-blue-600 hover:bg-gray-100 rounded" href={`/checkProfile/${user.name}`}>
                {user.name}
                <Image src={user.image || '/defaultIcon.png'} alt="" width={24} height={24} className="ml-2 rounded-full"/>
            </Link>
        </div>
    );
}