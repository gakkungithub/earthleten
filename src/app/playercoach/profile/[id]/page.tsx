import Image from 'next/image';
import fs from 'fs';
// import path from 'path';

type Script = {
    section: string;
    texts: string[];
}

type HighlightCell = {
    value: string | number;
    color: string;
}

type HighlightInfo = {
    color: string;
    sentence: string;
}

type Result = {
    position: string;
    columns: string[];
    rows: (string | number | null | HighlightCell)[][];
};

type Award = {
    section: string;
    titles: {name: string; years: number[]}[];
}

type Color = {
    bgcolor: string;
    textcolor: string;
}

function isHighlightCell(obj: unknown): obj is HighlightCell {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "value" in obj &&
      "color" in obj &&
      (typeof obj.value === "string" || typeof obj.value === "number") &&
      typeof obj.color === "string"
    );
}
  
  
export default async function PlayerCoachProfilePage({params}: {params: {id: string}}) {
    const jsonData = fs.readFileSync('./public/jsonfile/sports_kgavvaaxha_5.json', 'utf-8');
    const {scripts, data, awards, color}: {scripts: Script[], data: {results: Result[], highlightInfo?: HighlightInfo[]}, awards: Award[], color: Color | null} = JSON.parse(jsonData);

    return (
        <>
        {/* 色を選んで変える(設定されてない場合はデフォルトの色(現状はtext-white, bg-gray-400)) */}
        <div className={`border-2 px-2 rounded-3xl my-4 ${color?.textcolor || "text-white"} ${color?.bgcolor || "bg-gray-400"}`}>
            <div className="flex items-center no-underline w-fit rounded">
                <Image src='/defaultIcon.png' alt="" width={128} height={128} className="mr-2 rounded-full"/>                   
                <ul>
                    <li className="flex gap-x-2 items-center">
                        <p className="text-4xl font-bold">{(await params).id}</p>
                        <p className="text-2xl whitespace-nowrap font-bold">[野球]</p>
                        <p>ピッチャー, ライト</p>
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
                {data.results.map((result, recordIndex) => (
                <div key={recordIndex} className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <caption className="caption-top text-left font-semibold text-lg mb-2">
                            {result.position}
                        </caption>
                        <thead className="bg-gray-200">
                            <tr>
                                {result.columns.map((col, colIndex) => (
                                    <th key={colIndex} className="border p-2 whitespace-nowrap">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {result.rows.map((row, index) => (
                                <tr key={index} className="text-center">
                                    {row.map((cell, cellIndex) => {
                                        if (isHighlightCell(cell)) {
                                            return (
                                                <td key={cellIndex} className={`border-black border px-4 py-2 whitespace-nowrap ${cell.color}`}>
                                                {cell.value}
                                                </td>
                                            )
                                        } 
                                        else {
                                            return (
                                                <td key={cellIndex} className="border px-4 py-2 whitespace-nowrap">
                                                { cell !== null ? cell : "-"}
                                                </td>
                                            )
                                        }
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                ))}
            </div>
            <ul className="list-disc mx-6">
                {data.highlightInfo &&
                    data.highlightInfo.map((hl, hlIndex) => (
                        <li key={hlIndex} className={`my-2 ${hl.color}`}>{hl.sentence}</li>
                    ))
                }
            </ul>
        </div>
        <h2 className="font-bold text-3xl my-2">- 受賞 -</h2>
        <div className="h-128 overflow-y-auto border-2 p-2">
            {awards.map((award, awardIndex) => (
            <div key={awardIndex} className="overflow-x-auto">
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
                    {award.titles.map((title, titleIndex) => (
                        <tr key={titleIndex} className="text-center">
                            <td className="border px-4 py-2 whitespace-nowrap">
                                {title.name}
                            </td>
                            <td className="border px-4 py-2 whitespace-nowrap">
                                {title.years.length != 1 && `(${title.years.length}回) `}
                                {title.years.join(', ')}
                            </td>               
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            ))}
        </div>
        </>
    )
}