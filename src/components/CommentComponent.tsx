import { getUserByID, getImageListOfComment } from '@/lib/getter';
import Link from 'next/link';
import Image from 'next/image';

export default async function CommentComponent({cid, uid, talk, cdate} : {cid: string, uid: string, talk: string, cdate: Date}) {
    const user = await getUserByID(uid);
    const images = await getImageListOfComment(cid);

    return (
        <div className="border-2 mx-auto rounded">
            <div className="flex justify-between px-2">
                <Link className="flex items-center no-underline w-fit text-blue-600 hover:bg-gray-100 rounded" href={`/checkProfile/${user.name}`}>
                <Image src={user.image || '/defaultIcon.png'} alt="" width={24} height={24} className="mr-2 rounded-full"/>                   
                {user.name}
                </Link>
                <p>{cdate.getFullYear()}/{cdate.getMonth() + 1}/{cdate.getDate()}/
                    {String(cdate.getHours()).padStart(2, '0')}:{String(cdate.getMinutes()).padStart(2, '0')}:{String(cdate.getSeconds()).padStart(2, '0')}</p>
            </div>
            <p className="text-left px-2">{talk}</p>
            <div className="flex items-center overflow-x-auto">
                {images.map((image, index) => (
                    <Image key={index} src={image || '/defaultIcon.png'} alt="" width={128} height={128} className="m-4 shrink-0"/>
                ))}
            </div>
        </div>
    )
}