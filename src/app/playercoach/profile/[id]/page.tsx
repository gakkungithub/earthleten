import Image from 'next/image';

export default async function PlayerCoachProfilePage({params}: {params: {id: string}}) {
    return (
        <>
        {/* 色を選んで変える(設定されてない場合はデフォルトの色(現状はtext-white, bg-gray-400)) */}
        <div className="border-2 px-2 rounded-3xl my-4 text-white bg-gray-400">
            <div className="flex items-center no-underline w-fit rounded">
                <Image src='/defaultIcon.png' alt="" width={128} height={128} className="mr-2 rounded-full"/>                   
                <ul>
                    <li className="flex gap-x-2 items-center">
                        <p className="text-4xl font-bold">{(await params).id}</p>
                        <p className="text-2xl whitespace-nowrap font-bold">[野球]</p>
                        <p>ショート, セカンド</p>
                    </li>
                    <li>がっくんウォーリアーズ</li>
                </ul>
            </div>
            <div className="border-t-2">
                <p className="font-bold">プロフィール</p>
                <ul className="list-none ml-4">
                    <li>性別:男</li>
                    <li>誕生日:12/29/1993</li>
                    <li>身長: 171cm</li>
                    <li>体重: 67kg</li>
                </ul>
            </div>
        </div>
        <table>
            {/* ここにオンラインで取得した選手の成績表を掲載する */}
        </table>
        </>
    )
}