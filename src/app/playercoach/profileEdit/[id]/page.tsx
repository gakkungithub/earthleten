'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import MenuNarrow from '@/components/MenuNarrow';

import { v4 } from 'uuid';
// import path from 'path';

type Script = {
    id: string;
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

export default function PlayerCoachProfileEditPage(){
    const [profile, setProfile] = useState<{scripts: Script[], data: {results: Result[], highlightInfo?: HighlightInfo[]}, awards: Award[], color: Color | null} | null>(null);
    const [currentImage, setCurrentImage] = useState<string>("");
    const [genres, setGenres] = useState<string[]>([]);
    const [openGenreMenu, setOpenGenreMenu] = useState<boolean>(false);
    const params = useParams();

    const bgcolor: string = profile?.color?.bgcolor || "gray-400";
    const textcolor: string = profile?.color?.textcolor || "white"

    useEffect(() => {
        fetch('/jsonfile/sports_kgavvaaxha.json')
        .then((res) => res.json())
        .then((json) => setProfile(json))
        .catch(() => redirect(`/playercoach/profile/${params.id}`));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addScript = () => {
        if(!profile) return;

        const newScript: Script = { id: v4(), section: "", texts: []};
        setProfile({
            ...profile,
            scripts: [...profile.scripts, newScript]
        });
    }

    const deleteScript = (id: string) => {
        if(!profile?.scripts) return;

        const confirmed = window.confirm("本当に削除しますか?");

        if (confirmed) {
            const newScripts = profile.scripts.filter(script => script.id !== id);
            setProfile({
                ...profile,
                scripts: newScripts
            });
        }
    }
    
    return (
        <>
        {/* 色を選んで変える(設定されてない場合はデフォルトの色(現状はtext-white, bg-gray-400)) */}
        <div className={`border-2 px-2 rounded-3xl my-4 text-${textcolor} bg-${bgcolor}`}>
            <div className="flex items-start no-underline w-fit rounded my-2">
                <form>
                    <fieldset className="p-2 border text-center">
                        <legend className="font-bold">自画像</legend>
                        <div className="mx-auto mb-4 h-32 w-32 rounded-full border">
                            {currentImage !== "" &&
                            <Image src={currentImage} alt="" width={128} height={128} className="m-auto rounded-full"/>
                            }
                        </div>
                        <label htmlFor="self-image" className={`cursor-pointer px-4 py-2 bg-${textcolor} text-${bgcolor}`}>画像を選択</label>
                        <input id="self-image" type="file" accept="image/*" className="hidden" 
                            onChange={(e) => {
                                const file = e.currentTarget.files ? window.URL.createObjectURL(e.currentTarget.files[0]) : currentImage;
                                setCurrentImage((prevImage) => file || prevImage)
                            }} />
                        {/* <div>{errors.image?.message}</div> */}
                    </fieldset>
                </form>
                <div className="relative m-2">
                    <form>
                        <fieldset className="mx-2">
                            <ul className="space-y-2">
                                <li>
                                    <label htmlFor="name">名前: 
                                        <input id="name" type="text" defaultValue={params.id} className="ml-2 border w-48 h-8 rounded text-3xl" />
                                    </label>
                                </li>
                                <li>
                                    <label htmlFor="teamname">チームネーム: 
                                        <input id="teamname" type="text" defaultValue="がっくんウォーリアーズ" className="ml-2 border w-48 rounded" />
                                    </label>
                                </li>
                                <li className="flex">
                                    <button type="button" onClick={() => setOpenGenreMenu(!openGenreMenu)} 
                                    className={`w-fit rounded ${openGenreMenu && `bg-${textcolor} text-${bgcolor}`}`}>ジャンル: </button>
                                    <div className="w-60 border rounded mx-2">
                                        <p className="overflow-x-auto">{genres.join(',')}</p>
                                    </div>
                                </li>
                            </ul>
                        </fieldset>
                    </form>
                    {openGenreMenu &&
                        <div className="absolute top-full left-2 text-black">
                            <MenuNarrow setGenres={setGenres}/>
                        </div>
                    }
                </div>
            </div>
            <form className="border-t-2 py-2">
                <p className="font-bold">プロフィール</p>
                <ul className="list-none ml-4 space-y-2">
                    <li className="flex items-center">
                        性別: 
                        <div className="flex flex-col">
                            <label htmlFor="gender-male" className="mx-2">
                                <input id="gender-male" type="radio" value="male" /> 男性
                            </label>                    
                            <label htmlFor="gender-female" className="mx-2">
                                <input id="gender-female" type="radio" value="female" /> 女性
                            </label>
                            <label htmlFor="gender-private" className="mx-2">
                                <input id="gender-private" type="radio" value="private" /> 非公開
                            </label>
                        </div>
                    </li>
                    <li className="flex items-center">
                        誕生日:
                        <div className="flex justify-center items-center">
                            <input id="bdate" type="number" step="1" className="border w-12 m-2" />
                            <p>年</p>
                            <input id="bdate" type="number" step="1" className="border w-12 m-2" />
                            <p>月</p>
                            <input id="bdate" type="number" step="1" className="border w-12 m-2" />
                            <p>日</p> 
                        </div>                  
                    </li>
                    <li className="flex items-center">
                        <label htmlFor="height">身長:</label>
                        <input id="height" type="number" step="0.1" className="border w-12 mx-2" />
                        <p>cm</p>
                    </li>
                    <li className="flex items-center">
                        <label htmlFor="weight">体重:</label>
                        <input id="weight" type="number" step="0.1" className="border w-12 mx-2" />
                        <p>kg</p>
                    </li>
                </ul>
            </form>
        </div>
        <div className="w-full h-128 overflow-y-auto border-2 p-2 my-2 rounded text-center">
            {(profile?.scripts || []).map((script) => (
                <div key={script.id} className="flex flex-col py-2">
                    <div className="flex justify-between border-b-2 font-bold">
                        <input type="text" defaultValue={script.section} />
                        <button onClick={() => deleteScript(script.id)} className="w-fit bg-gray-600 hover:bg-gray-500 text-white rounded p-2 my-2">削除</button>
                    </div>
                    <textarea defaultValue={script.texts.join('\n')} className="h-32"/>
                </div>
            ))}
            <button onClick={addScript} className="w-fit bg-blue-600 hover:bg-blue-500 text-white rounded p-2">▼項目の追加▼</button>
        </div>
        <h2 className="font-bold text-3xl my-2">- 成績 -</h2>
        <div className="border-2">
            <div className="h-128 overflow-y-auto p-2">
                {(profile?.data?.results || []).map((result, recordIndex) => (
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
                {(profile?.data?.highlightInfo || []).map((hl, hlIndex) => (
                        <li key={hlIndex} className={`my-2 ${hl.color}`}>{hl.sentence}</li>
                    ))
                }
            </ul>
        </div>
        <h2 className="font-bold text-3xl my-2">- 受賞 -</h2>
        <div className="h-128 overflow-y-auto border-2 p-2">
            {(profile?.awards || []).map((award, awardIndex) => (
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
        <Link href={`/playercoach/profile/${params.id}`} className="fixed bottom-2 right-2 w-16 h-16 flex justify-center items-center text-white rounded-full bg-orange-600 hover:bg-orange-500">編集終了</Link>
        </>
    )
}