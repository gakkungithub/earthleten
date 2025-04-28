import { getUserByName, getGenderByLanguage, getGenreLabelsByLanguage, getThreadsByUserID } from '@/lib/getter';
import Image from 'next/image';
import ThreadDetails from '@/components/ThreadDetails';

export default async function checkProfilePage({params, searchParams} : {params: {name: string}, searchParams: { genres: string, order: string }}) {
    const user = await getUserByName((await params).name);
    const genreArray = ((await searchParams).genres || '').split(',');
    const genreLabels = await getGenreLabelsByLanguage(genreArray, 'jp');
    const order = (await searchParams).order || ''
    // ここで並び替えを適用する必要あり。
    const threads = await getThreadsByUserID(user.id, genreArray, order);

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
        {genreLabels.length > 0 &&
        <div className="flex flex-col px-2 py-4 bg-gray-400 w-full border border-b-0 rounded-t-2xl">
            <p className="text-white">絞り込み:</p>
            <p className="text-black font-bold">{genreLabels.join(', ')}</p>
        </div>
        }
        <ThreadDetails threads={threads} />
    </div>
    </div>
    );

}