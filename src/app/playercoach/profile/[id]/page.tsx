import Image from 'next/image';
import fs from 'fs';
// import path from 'path';

type Records = {
    position: string;
    columns: string[];
    rows: (string | number | null)[][];
  };

  
export default async function PlayerCoachProfilePage({params}: {params: {id: string}}) {
    const jsonData = fs.readFileSync('./public/jsonfile/sports_kgavvaaxha.json', 'utf-8');
    const records: Records[] = JSON.parse(jsonData);

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
            {records.map((record, recordIndex) => (
            <div key={recordIndex} className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                <caption className="caption-top text-left font-semibold text-lg mb-2">
                    {record.position}
                </caption>
                <thead className="bg-gray-200">
                    <tr>
                        {record.columns.map((col, colIndex) => (
                            <th key={colIndex} className="border p-2">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {record.rows.map((row, index) => (
                        <tr key={index} className="text-center">
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="border px-4 py-2">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            ))}
        </>
    )
}

// {
//     "year": 2015,
//     "team": "大阪ホワイトタイガース",
//     "stats": {
//         "試合数": 25,
//         "勝利": 15,
//         "敗北": 5,
//         "防御率": 2.30
//       }
// },