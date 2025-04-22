import Link from 'next/link';
import { Thread } from '@/typeDeclar/typeComp';
import { getUserByID } from '@/lib/getter';
import Image from 'next/image';

export default async function LinkedThreadDetails( {thread} : {thread: Thread} ){
    const bdate = new Date(thread.bdate);
    const user = await getUserByID(thread.uid);

    return (
        <div className="relative border-blue-600 border-2 rounded m-2">
            <Link href={`/thread/${thread.id}`} className="grid grid-cols-2 grid-rows-2 hover:bg-green-50 w-fit px-2">
                <p className="font-bold text-xl">{thread.title}</p>
                <p>
                    {bdate.getFullYear()}/{bdate.getMonth() + 1}/{bdate.getDate()}/
                    {String(bdate.getHours()).padStart(2, '0')}:{String(bdate.getMinutes()).padStart(2, '0')}:{String(bdate.getSeconds()).padStart(2, '0')}
                </p>
                <p>コメント({thread._count.comments})</p>
            </Link>
            <Link className="absolute bottom-1 right-0 flex w-fit text-blue-600 hover:bg-gray-100 rounded px-2" href={`/checkProfile/${user.name}`}>
                {user.name}
                <Image src={user.image || '/defaultIcon.png'} alt="" width={24} height={24} className="ml-2 rounded-full"/>
            </Link>
        </div>
    );
}