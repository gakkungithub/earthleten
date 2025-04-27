import { getUserByName, getGenderByLanguage, getThreadsByUserID } from '@/lib/getter';
import Image from 'next/image';
import ThreadDetails from '@/components/ThreadDetails';

export default async function checkProfilePage({params} : {params: {name: string}}) {
    const user = await getUserByName((await params).name);
    // ここで並び替えを適用する必要あり。
    const threads = await getThreadsByUserID(user.id);

    return (
    <div className="w-2/3 mx-auto">
    <div className="border-2 px-2 rounded my-4">
        <li className="flex items-center no-underline w-fit rounded">
            <Image src={user.image || '/defaultIcon.png'} alt="" width={128} height={128} className="mr-2 rounded-full"/>                   
            <span className="mx-2">{user.name}</span>
        </li>
        <div className="border-t-2">
            <p className="font-bold">プロフィール</p>
            <ul className="list-none text-black ml-4">
                <li>性別: {await getGenderByLanguage(user.gender, 'jp')}</li>
                <li>誕生日: {user.bdate.getFullYear()}年 {user.bdate.getMonth()}月 {user.bdate.getDate()}日</li>
                <li>身長: {user.height}cm</li>
                <li>体重: {user.weight}kg</li>
            </ul>
        </div>
    </div>
    <div className="w-full">
        <p className="px-2 text-center">{threads.length > 0 ? 
        `↓ ${user.name}さんが立てたスレッドです ↓` : `${user.name}さんのスレッドはありません`}</p>
        <ThreadDetails threads={threads} />
    </div>
    </div>
    );

}