import Image from 'next/image';
import Link from 'next/link';

export default async function PlayerCoachPage() {
    const profiles = ['one', 'two', 'three', 'four', 'five'];
    return (
        <>
            <div className="w-full grid lg:grid-cols-5 grid-cols-4 gap-4">
            {profiles.map((profile, index) => (
                <Link key={index} href={`/playercoach/profile/${profile}`} className="col-span-1 w-27 h-36 border-2 bg-blue-600 hover:bg-blue-300 mx-auto rounded">
                <ul className=" text-black text-center rounded">
                    <li><Image src='/defaultIcon.png' alt="" width={64} height={64} className="rounded-full mx-auto"/></li>
                    <li>{profile}</li>
                    <li>野球</li>
                    <li>[ファースト]</li>
                </ul>
                </Link>
            ))}
            </div>
            <Link href="/playercoach/profileAdd" className="fixed bottom-2 right-2 w-16 h-16 flex justify-center items-center text-white rounded-full bg-blue-600 hover:bg-blue-500">追加</Link>
        </>
    )
}