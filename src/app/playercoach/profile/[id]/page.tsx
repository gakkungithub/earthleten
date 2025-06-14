import Image from 'next/image';
import Link from 'next/link';
import { getWikiByID, getGenreLabelsByLanguage, getGenderByLanguage } from '@/lib/getter';
import { colorClassMap } from '@/typeDeclar/const';
  
export default async function PlayerCoachProfilePage({params}: {params: {id: string}}) {
    const { id } = await params;
    const wiki = await getWikiByID(id);

    if (!wiki) return <p>該当するWikiが見つかりません。</p>;

    const {stats, scripts, data, awards, themeColor} = wiki;

    const genreLabels = await getGenreLabelsByLanguage(stats.genres, 'jp');

    return (
        <>
        <div className={`border-2 px-2 rounded-3xl my-4 ${colorClassMap[themeColor.textColor].text} ${colorClassMap[themeColor.bgColor].bg}`}>
            <div className="flex items-center no-underline w-fit rounded">
                <Image src='/defaultIcon.png' alt="" width={128} height={256} className={`mr-2 border-2 bg-gray-600 ${colorClassMap[themeColor.textColor].border} rounded-full`}/>                   
                <ul className="mt-2">
                    <li className="flex flex-col space-y-2 items-center">
                        <p className="text-4xl font-bold">{stats.name}</p>
                        <p className="text-2xl whitespace-nowrap font-bold">{(await getGenreLabelsByLanguage(stats.sports, 'jp')).join(', ')}</p>
                        <p>[{genreLabels.join(', ')}]</p>
                    </li>
                    <li className="px-2">
                        <div className="flex flex-col items-start">
                        {stats.teamnames?.map((team, index) => (
                            <div key={index} className="flex flex-col items-start">
                                <p>
                                    <span className="font-bold text-lg">{team.name} </span>
                                    <span>{team.start}〜{team.end !== null ? team.end : "現役"}</span>
                                </p>
                                {index !== (stats.teamnames?.length || 0) - 1 && (
                                    <div className="text-lg text-center">↓</div>
                                )}
                            </div>
                        ))}
                        </div>
                    </li>
                </ul>
            </div>
            <div className="border-t-2">
                <p className="font-bold">プロフィール</p>
                <ul className="list-none ml-4">
                    <li>性別: {await getGenderByLanguage(stats.gender, 'jp')}</li>
                    <li>誕生日: {stats.isBdatePrivate ? "非公開" : stats.bdate.join('/')}</li>
                    <li>身長: {stats.isHeightPrivate ? "非公開" : `${stats.height} cm`}</li>
                    <li>体重: {stats.isWeightPrivate ? "非公開" : `${stats.weight} kg`}</li>
                </ul>
            </div>
        </div>
        <div className="w-full h-128 overflow-y-auto border-2 p-2 my-2 rounded">
            {scripts.map((script, scriptIndex) => (
                <div key={scriptIndex}>
                    <p className="border-b-2 font-bold">{script.section}</p>
                    {script.texts.map((text, textIndex) => (
                        <p key={textIndex}>{text}</p>
                    ))}
                </div>
            ))}
        </div>
        <h2 className="font-bold text-3xl my-2">- 成績 -</h2>
        <div className="border-2">
            <div className="h-128 overflow-y-auto p-2">
                {data.results.map((result) => (
                <div key={result.id} className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <caption className="caption-top text-left font-semibold text-lg mb-2">
                            {result.position}
                        </caption>
                        <thead className="bg-gray-200">
                            <tr>
                                {result.columns.map((tableColCell) => (
                                    <th key={tableColCell.id} className="border p-2 whitespace-nowrap">
                                        {tableColCell.value}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {result.rows.map((row) => (
                                <tr key={row.id} className="text-center">
                                    {row.cells.map((cell) => (
                                        <td key={cell.id} className={`border-black border px-4 py-2 whitespace-nowrap ${cell?.highlightColor || ""}`}>
                                        {cell.value !== "" ? cell.value : "-"}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                ))}
            </div>
            <ul className="list-disc mx-6">
                {Object.entries(data.highlightInfo).map(([color, sentence]) => (
                        <li key={color} className={`my-2 text-${color}`}>{sentence}</li>
                    ))
                }
            </ul>
        </div>
        <h2 className="font-bold text-3xl my-2">- 受賞 -</h2>
        <div className="h-128 overflow-y-auto border-2 p-2">
            {awards.map((award) => (
            <div key={award.id} className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                <caption className="caption-top text-left font-semibold text-lg mb-2">
                    {award.section}
                </caption>
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border p-2 whitespace-nowrap">
                            タイトル名 
                        </th>
                        <th className="border p-2 whitespace-nowrap">
                            年度
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {award.titles.map((title) => (
                        <tr key={title.id} className="text-center">
                            <td className="border px-4 py-2 whitespace-nowrap">
                                {title.name}
                            </td>
                            <td className="border px-4 py-2 whitespace-nowrap">
                                {title.years.length != 1 && `${title.years.length}回 `}
                                ({title.years.join(',')})
                            </td>               
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            ))}
        </div>
        <Link href={`/playercoach/profileEdit/${id}`} className="fixed bottom-2 right-2 w-16 h-16 flex justify-center items-center text-white rounded-full bg-blue-600 hover:bg-blue-500">編集開始</Link>
        </>
    )
}