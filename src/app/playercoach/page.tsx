import Image from 'next/image';
import Link from 'next/link';
import { getWiki } from '@/lib/getter';


export default async function PlayerCoachPage() {
    const wikiCards = await getWiki();
    return (
        <>
            <div className="w-full grid lg:grid-cols-5 grid-cols-4 gap-4">
            {wikiCards.map((wc, index) => (
                <Link key={index} href={`/playercoach/profile/${wc.id}`} className="col-span-1 w-27 h-36 border-2 bg-blue-600 hover:bg-blue-300 mx-auto rounded">
                <ul className="text-black text-center rounded">
                    <li><Image src='/defaultIcon.png' alt="" width={64} height={64} className="rounded-full mx-auto"/></li>
                    <li>{wc.name}</li>
                    <li className="relative group text-sm text-center">
                        <span className="underline cursor-help">スポーツ</span>
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 hidden group-hover:block bg-white text-black border p-2 rounded shadow-lg z-10 w-fit">
                            {wc.sports.join(', ')}
                        </div>
                    </li>
                    <li className="relative group text-sm text-center">
                        <span className="underline cursor-help">ジャンル</span>
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 hidden group-hover:block bg-white text-black border p-2 rounded shadow-lg z-10 w-fit">
                            {wc.genres.join(', ')}
                        </div>
                    </li>
                </ul>
                </Link> 
            ))}
            </div>
            <Link href="/playercoach/profileAdd" className="fixed bottom-2 right-2 w-16 h-16 flex justify-center items-center text-white rounded-full bg-blue-600 hover:bg-blue-500">追加</Link>
        </>
    )
}