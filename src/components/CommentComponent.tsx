import { getUserByID } from '@/lib/getter';
import { Thread, Comment } from '@/typeDeclar/typeComp';
import Link from 'next/link';
import Image from 'next/image';

export default async function CommentComponent({uid, talk, cdate} : {uid: string, talk: string, cdate: Date}) {
    const user = await getUserByID(uid);

    return (
        <div className="border-2 mx-auto rounded">
            <div className="flex justify-between px-2">
                <div className="flex">
                    <Link className="flex items-center no-underline w-fit text-blue-600 hover:bg-gray-100 rounded" href={`/checkProfile/${user.name}`}>
                    <Image src={user.image || '/defaultIcon.png'} alt="" width={24} height={24} className="mr-2 rounded-full"/>                   
                    {user.name}
                    </Link>
                </div>
                <p>{cdate.getFullYear()}/{cdate.getMonth() + 1}/{cdate.getDate()}/
                    {String(cdate.getHours()).padStart(2, '0')}:{String(cdate.getMinutes()).padStart(2, '0')}:{String(cdate.getSeconds()).padStart(2, '0')}</p>
            </div>
            <p className="text-right px-2">{talk}</p>
        </div>
    )
}