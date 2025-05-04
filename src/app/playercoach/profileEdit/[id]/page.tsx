'use client';

import { useEffect, useState, Dispatch, SetStateAction } from 'react';
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

type CellLocation = 
    [number, number, number]

type TableCell = {
    value: string | number | null;
    id: string;
    highlightColor?: string;
}

type TableColCell = {
    value: string;
    id: string;
}

type TableRow = {
    id: string;
    cells: TableCell[];
}

type Result = {
    position: string;
    id: string;
    columns: TableColCell[];
    rows: TableRow[];
};

type Data = {
    results: Result[];
    highlightInfo: Partial<Record<string, string>>;
}

type Profile = {
    scripts: Script[];
    data: Data;
    awards: Award[];
    color: Color | null;
}

type Title = {
    id: string; 
    name: string; 
    years: number[];
}

type Award = {
    id: string;
    section: string;
    titles: Title[];
}

type Color = {
    bgcolor: string;
    textcolor: string;
}

function ResultTableCell({tableCellInfo, usedHColors, isAddLinePlace, setProfile} : 
    {tableCellInfo: {tableCell: TableCell, cellLocation: CellLocation;}; usedHColors: string[]; isAddLinePlace: boolean; setProfile: Dispatch<SetStateAction<Profile | null>>}){
    const [openHighlightColorMenu, setOpenHighlightColorMenu] = useState<boolean>(false);
    const {tableCell, cellLocation} = tableCellInfo;
    const [resultIndex, rowIndex, cellIndex] = cellLocation;

    const currentColor = tableCell.highlightColor || "";
    return (
        <td className={`relative border-black border px-4 whitespace-nowrap text-center
            ${tableCell?.highlightColor ? tableCell?.highlightColor : ""} ${isAddLinePlace && "border-l-4 border-l-fuchsia-600"}`}>
            <input type="text" onFocus={() => setOpenHighlightColorMenu(true)} 
            onBlur={() => setOpenHighlightColorMenu(false)}
            defaultValue={tableCell.value !== null ? tableCell.value : ""} className="border rounded" />
            {openHighlightColorMenu &&
                <div className="absolute top-full left-0 z-10 flex w-full px-4 space-x-2">
                {usedHColors.map((usedHColor) => (
                    <button type="button" key={usedHColor} 
                    onMouseDown={() => {
                        setProfile((prevProfile) => {
                            if (!prevProfile) return prevProfile;

                            return {
                                ...prevProfile,
                                data: {
                                    ...prevProfile.data,
                                    results: [
                                        ...prevProfile.data.results.slice(0, resultIndex),
                                        {
                                            ...prevProfile.data.results[resultIndex],
                                            rows: [
                                                ...prevProfile.data.results[resultIndex].rows.slice(0, rowIndex),
                                                {
                                                    ...prevProfile.data.results[resultIndex].rows[rowIndex],
                                                    cells: [
                                                        ...prevProfile.data.results[resultIndex].rows[rowIndex].cells.slice(0, cellIndex),
                                                        {...prevProfile.data.results[resultIndex].rows[rowIndex].cells[cellIndex], highlightColor: `text-${usedHColor}`},
                                                        ...prevProfile.data.results[resultIndex].rows[rowIndex].cells.slice(cellIndex+1)
                                                    ]
                                                },
                                                ...prevProfile.data.results[resultIndex].rows.slice(rowIndex+1)
                                            ]
                                        },
                                        ...prevProfile.data.results.slice(resultIndex+1)

                                    ]
                                }
                            }
                        })
                    }}
                    className={`w-4 h-4 bg-${usedHColor} ${currentColor.includes(usedHColor) ? "rounded" : "rounded-full"}`}>
                    </button>
                ))}
                </div>
                // <SetHighlightColor usedHColors={usedHColors} currentColor={tableCell.highlightColor || ""} cellLocation={cellLocation} />
            }
        </td>
    )
}

function ResultTable({result, resultIndex, usedHColors, setProfile}:{result: Result, resultIndex: number, usedHColors: string[], setProfile: Dispatch<SetStateAction<Profile | null>>}){
    const [openAddLineMenu, setOpenAddLineMenu] = useState<boolean>(false);
    const [rowOrColumn, setRowOrColumn] = useState<string>('none');
    const [rocNum, setRocNum] = useState<number>(1);

    const max = rowOrColumn === 'row' ? result.rows.length : result.columns.length;

    useEffect(() => {
        if (rocNum > max) {
            setRocNum(max);
        }
        else if (rocNum < 0) {
            setRocNum(0);
        }
    }, [rocNum, max]);

    return (
    <div className="relative overflow-x-auto">
        <table className={`table-auto w-full border-gray-300 my-2 ${rowOrColumn === 'column' && rocNum === max ? "border-r-4 border-r-fuchsia-600": ""}`}>
            <caption className="relative caption-top font-semibold text-left text-lg mb-4 w-fit">
                <input type="text" defaultValue={result.position} className="border rounded" />
                <div className="absolute flex -top-2 left-full w-fit z-12">
                    <button onClick={() => {
                        if (openAddLineMenu) {
                            setRowOrColumn('none');
                        }
                        setOpenAddLineMenu(!openAddLineMenu)}
                    } className={`w-fit text-white whitespace-nowrap rounded p-2 mx-2 ${openAddLineMenu ? "bg-fuchsia-600" : "bg-blue-600 hover:bg-blue-500"}`}>
                        行・列を追加
                    </button>
                    <button onClick={() => {
                        setProfile((prevProfile) => {
                            if (!prevProfile) return prevProfile;

                            return {
                                ...prevProfile,
                                data: {
                                    ...prevProfile.data,
                                    results: prevProfile.data.results.filter((_, index) => index !== resultIndex)
                                }
                            }
                        })
                    }}
                    className="w-fit bg-gray-600 hover:bg-gray-500 text-white whitespace-nowrap rounded p-2 mx-2">
                        表を削除
                    </button>
                </div>
            </caption>
            <thead>
                <tr>
                    <th></th>
                    {result.columns.map((tableColCell, colIndex) => (
                        <th key={tableColCell.id} className={`relative border bg-gray-200 ${rowOrColumn === 'column' && rocNum === colIndex && "border-l-4 border-l-fuchsia-600"}`}>
                            <button onClick={() => {
                                setProfile((prevProfile) => {
                                    const newCols = result.columns.filter((_, index) => index !== colIndex);
                                    const newRows = result.rows.map(row => ({
                                        id: row.id,
                                        cells: row.cells.filter((_, index) => index !== colIndex)
                                    }));
                                    if (!prevProfile) return prevProfile;

                                    return {
                                        ...prevProfile,
                                        data: {
                                            ...prevProfile.data,
                                            results: prevProfile.data.results.map((res, index) => 
                                                index === resultIndex
                                                    ? {
                                                        ...res,
                                                        columns: newCols,
                                                        rows: newRows
                                                    }: res
                                            )
                                        }
                                    }
                                })
                            }} className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex w-4 h-4 bg-gray-400 text-white rounded-full items-center justify-center z-10">
                                &times;
                            </button>
                            <input type="text" defaultValue={tableColCell.value} className="border rounded my-2" />
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className={rowOrColumn === 'row' && rocNum === max ? "border-b-4 border-fuchsia-600": ""}>
                {result.rows.map((tableRow, rowIndex) => (
                    <tr key={tableRow.id} className={rowOrColumn === 'row' && rocNum === rowIndex ? "border-t-4 border-fuchsia-600": ""}>
                        <td className="relative pl-2">
                            <button onClick={() => {
                                setProfile((prevProfile) => {
                                    const newRows = result.rows.filter((_, index) => index !== rowIndex);
                                    if (!prevProfile) return prevProfile;

                                    return {
                                        ...prevProfile,
                                        data: {
                                            ...prevProfile.data,
                                            results: prevProfile.data.results.map((res, index) => 
                                                index === resultIndex
                                                    ? {
                                                        ...res,
                                                        rows: newRows
                                                    }: res
                                            )
                                        }
                                    }
                                })
                            }}
                            className="absolute left-0 top-1/2 -translate-y-1/2 flex w-4 h-4 bg-gray-400 text-white rounded-full items-center justify-center z-10">&times;</button>
                        </td>
                        {tableRow.cells.map((cell, cellIndex) => (
                            <ResultTableCell key={cell.id} tableCellInfo={{tableCell: cell, cellLocation: [resultIndex, rowIndex, cellIndex]}} usedHColors={usedHColors} isAddLinePlace={rowOrColumn === 'column' && rocNum === cellIndex} setProfile={setProfile}/>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        {openAddLineMenu &&
        <div className="absolute top-0 left-0 flex justify-center items-center h-full w-full z-11">
            <div className="flex items-center bg-white rounded w-fit border p-2">
                <select name="rowOrColumn" value={rowOrColumn} onChange={(e) => {setRowOrColumn(e.target.value)}} className="mr-2">
                    <option value="none"></option>
                    <option value="row">行</option>
                    <option value="column">列</option>
                </select>
                {rowOrColumn !== 'none' ?
                <>
                    <input type="number" step={1} value={rocNum} onChange={(e) => {setRocNum(Number(e.target.value))}} min={0} max={max} className="w-24 border rounded mx-2" />に
                    <button className="w-fit text-white whitespace-nowrap rounded p-2 mx-2 bg-blue-600 hover:bg-blue-500"
                    onClick={() => {
                        if (rowOrColumn === 'row') {
                            setProfile((prevProfile) => {
                                if (!prevProfile) return prevProfile;
    
                                return {
                                    ...prevProfile,
                                    data: {
                                        ...prevProfile.data,
                                        results: prevProfile.data.results.map((res, resIndex) => {
                                            if (resIndex === resultIndex) {
                                                return {
                                                    ...result,
                                                    rows: [
                                                        ...result.rows.slice(0, rocNum), 
                                                        {id: v4(), cells: Array.from({length: result.columns.length},() => (
                                                            {id: v4(), value: null}
                                                        ))}, 
                                                        ...result.rows.slice(rocNum)
                                                    ]
                                                };
                                            }
                                            return res;
                                        }
                                    )
                                    }
                                }
                            })
                        }
                        else if (rowOrColumn === 'column') {
                            setProfile((prevProfile) => {
                                if (!prevProfile) return prevProfile;
    
                                return {
                                    ...prevProfile,
                                    data: {
                                        ...prevProfile.data,
                                        results: prevProfile.data.results.map((res, resIndex) => {
                                            if (resIndex === resultIndex) {
                                                return {
                                                    ...result,
                                                    rows: result.rows.map((row) => ({
                                                        ...row,
                                                        cells: [...row.cells.slice(0, rocNum), 
                                                            {id: v4(), value: ""}, 
                                                            ...row.cells.slice(rocNum)
                                                        ]
                                                    })),
                                                    columns: [
                                                        ...result.columns.slice(0, rocNum),
                                                        {id: v4(), value: ""},
                                                        ...result.columns.slice(rocNum)
                                                    ]
                                                };
                                            }
                                            return res;
                                        }
                                    )
                                    }
                                }
                            })
                        }
                    }}>
                        追加する
                    </button>
                </> :
                <p>行か列かを選んでください</p>
                }
            </div>
        </div>
        }
    </div>
    );
}

function ResultTables({data, setProfile}:{data: Data, setProfile: Dispatch<SetStateAction<Profile | null>>}){
    const highlightColors = ["red-600", "blue-600", "gray-600", "green-600", "yellow-600"];
    const usedHColors = highlightColors.filter(color => data.highlightInfo[color] !== undefined);
    const unusedHColors = highlightColors.filter(color => data.highlightInfo[color] === undefined);
    const [openHighlightMenu, setOpenHighlightMenu] = useState<boolean>(false);

    const addHColor = (colorName: string) => {
        data.highlightInfo[colorName] = "";
        setOpenHighlightMenu(!openHighlightMenu);
    }

    return (
        <>
        <h2 className="font-bold text-3xl my-2">- 成績 -</h2>
        <div className="border-2">
            <div className="h-128 border-2 m-2 overflow-y-auto p-2 space-y-2">
                <>
                {data.results.map((result, resultIndex) => (
                    <ResultTable key={result.id} result={result} resultIndex={resultIndex} usedHColors={usedHColors} setProfile={setProfile} />
                ))}
                <button type="button" onClick={() => 
                    setProfile((prevProfile) => {
                        if (!prevProfile) return prevProfile;

                        return {
                            ...prevProfile,
                            data: {
                                ...prevProfile.data,
                                results: [
                                    ...prevProfile.data.results,
                                    {
                                        position: "",
                                        id: v4(),
                                        columns: Array.from({length: 2},() => (
                                            {id: v4(), value: ""}
                                        )),
                                        rows: [
                                            {
                                                id: v4(),
                                                cells: Array.from({length: 2},() => (
                                                    {id: v4(), value: null}
                                                ))
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    })
                    } className="w-fit bg-blue-600 hover:bg-blue-500 text-white rounded p-2">▼表を追加▼</button>
                </>
            </div>
            <ul className="mx-4">
                {usedHColors.map((color) => (
                    <li key={color} className={`flex my-2 text-${color} items-center`}> 
                        <p className={`w-4 h-4 rounded ${
                            color === "red-600" ? "bg-red-600" :
                            color === "blue-600" ? "bg-blue-600" :
                            color === "green-600" ? "bg-green-600" :
                            color === "yellow-600" ? "bg-yellow-600" :
                            color === "gray-600" ? "bg-gray-600" : ""
                        }`}></p>
                        <input type="text" defaultValue={data.highlightInfo[color]} className="mx-2 border rounded" />
                    </li>
                ))}
            </ul>
            <div className="relative m-2">
                <button type="button" onClick={() => setOpenHighlightMenu(!openHighlightMenu)} className="w-fit bg-blue-600 hover:bg-blue-500 text-white rounded p-2">▼ハイライトを追加▼</button>
                {openHighlightMenu &&
                    <div className="absolute top-full left-0 z-10 bg-white border-2 rounded">
                        <p>↓追加するハイライトの色を選んでください↓</p>
                        <div className="flex m-2 w-full space-x-2">
                            {unusedHColors.map((color) => (
                                <button key={color} onClick={() => addHColor(color)} className={`w-4 h-4 bg-${color} rounded`}></button>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
        </>
    );
}

function TitleTable({title, titleLocation, crntYear, setProfile}:{title: Title, titleLocation: [number, number], crntYear: string, setProfile: Dispatch<SetStateAction<Profile | null>>}){
    const [year, setYear] = useState<string>(crntYear);

    const [awardIndex, titleIndex] = titleLocation;
    useEffect(() => {
        if (Number(year) > Number(crntYear)) {
            setYear(crntYear);
        }
    }, [year, crntYear]);
    
    return (
        <tr key={title.id} className="text-center">
            <td className="pl-2"></td>
            <td className="relative border whitespace-nowrap">
                <button onClick={() => {
                        // setProfile((prevProfile) => {
                        //     const newRows = result.rows.filter((_, index) => index !== rowIndex);
                        //     if (!prevProfile) return prevProfile;

                        //     return {
                        //         ...prevProfile,
                        //         data: {
                        //             ...prevProfile.data,
                        //             results: prevProfile.data.results.map((res, index) => 
                        //                 index === resultIndex
                        //                     ? {
                        //                         ...res,
                        //                         rows: newRows
                        //                     }: res
                        //             )
                        //         }
                        //     }
                        // })
                    }}
                    className="absolute -left-2 top-1/2 -translate-y-1/2 flex w-4 h-4 bg-gray-400 text-white rounded-full items-center justify-center z-10">&times;
                </button>
                <input type="text" defaultValue={title.name} className="border rounded" />
            </td>
            <td className="border whitespace-nowrap text-left">
                {title.years.length > 0 &&
                    <p className="p-2 border-b-2">{title.years.join(',')}</p>
                }
                <input type="number" step={1} max={crntYear} value={year} onChange={(e) => {setYear(e.target.value)}} className="m-2 border rounded w-12" />
                <button type="button" className="w-fit text-white whitespace-nowrap rounded p-2 my-2 bg-blue-600 hover:bg-blue-500"
                onClick={() => {
                    setProfile((prevProfile) => {
                        const newYear = Number(year);

                        if (!prevProfile || title.years.includes(newYear)) return prevProfile;
                        
                        const insertIndex = title.years.findIndex(y => y > newYear);

                        return {
                            ...prevProfile, 
                            awards: [
                                ...prevProfile.awards.slice(0, awardIndex),
                                {...prevProfile.awards[awardIndex], 
                                    titles: [
                                        ...prevProfile.awards[awardIndex].titles.slice(0, titleIndex),
                                        {
                                            ...title,
                                            years: 
                                                insertIndex === -1
                                                ? [...title.years, newYear]
                                                : [
                                                    ...title.years.slice(0, insertIndex),
                                                    newYear,
                                                    ...title.years.slice(insertIndex)
                                                ]
                                        },
                                        ...prevProfile.awards[awardIndex].titles.slice(titleIndex+1)
                                    ] 
                                },
                                ...prevProfile.awards.slice(awardIndex+1)
                            ]
                        }

                    })
                }}>
                    追加
                </button>
            </td>               
        </tr>
    );
}

function AwardTables({awards, setProfile}:{awards:Award[], setProfile: Dispatch<SetStateAction<Profile | null>>}){
    const crntYear = String((new Date()).getFullYear());

    return (
        <>
        <h2 className="font-bold text-3xl my-2">- 受賞 -</h2>
        <div className="h-128 overflow-y-auto border-2 p-2 space-y-2">
            {awards.map((award, awardIndex) => (
            <div key={award.id} className="overflow-x-auto border-2 p-2">
                <table className="table-auto w-full border-collapse">
                    <caption className="caption-top text-left font-semibold text-lg mb-2">
                        <input type="text" defaultValue={award.section} className="border rounded" />
                        <button onClick={() => {
                            setProfile((prevProfile) => {
                                if (!prevProfile) return prevProfile;

                                return {
                                    ...prevProfile,
                                    awards: prevProfile.awards.filter((_, index) => index !== awardIndex)
                                }
                            })
                        }} className="w-fit text-white whitespace-nowrap rounded p-2 m-2 bg-gray-600 hover:bg-gray-500">
                            表を削除
                        </button>
                    </caption>
                    <thead>
                        <tr>
                            <th></th>
                            <th className="border bg-gray-200 py-2 whitespace-nowrap">
                                タイトル名 
                            </th>
                            <th className="border bg-gray-200 py-2 whitespace-nowrap">
                                年度
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {award.titles.map((title, titleIndex) => (
                            <TitleTable key={title.id} title={title} titleLocation={[awardIndex, titleIndex]} crntYear={crntYear} setProfile={setProfile} />
                        ))}
                    </tbody>
                </table>
                <button onClick={() => {
                    setProfile((prevProfile) => {
                        if (!prevProfile) return prevProfile;

                        return {
                            ...prevProfile,
                            awards: [
                                ...prevProfile.awards.slice(0,awardIndex),
                                {
                                    ...prevProfile.awards[awardIndex],
                                    titles: [
                                        ...prevProfile.awards[awardIndex].titles,
                                        {
                                            id: v4(),
                                            name: "", 
                                            years: []
                                        }
                                    ]
                                },
                                ...prevProfile.awards.slice(awardIndex+1)
                            ]
                        }
                    })
                }} className="w-fit text-white whitespace-nowrap rounded p-2 m-2 bg-blue-600 hover:bg-blue-500">
                    ▼タイトルを追加▼
                </button>
            </div>
            ))}
        <button onClick={() => {
            setProfile((prevProfile) => {
                if (!prevProfile) return prevProfile;

                return {
                    ...prevProfile,
                    awards: [
                        ...prevProfile.awards,
                        {
                            id: v4(),
                            section: "",
                            titles: [
                                {
                                    id: v4(),
                                    name: "", 
                                    years: []
                                }
                            ]
                        }
                    ]
                }
            })
        }} className="w-fit text-white whitespace-nowrap rounded p-2 m-2 bg-blue-600 hover:bg-blue-500">
            ▼セクションを追加▼
        </button>
        </div>
        </>
    );
}

export default function PlayerCoachProfileEditPage(){
    const [profile, setProfile] = useState<Profile | null>(null);

    const [currentImage, setCurrentImage] = useState<string>("");
    const [genres, setGenres] = useState<string[]>([]);
    const [openGenreMenu, setOpenGenreMenu] = useState<boolean>(false);

    const params = useParams();

    const bgcolor: string = profile?.color?.bgcolor || "gray-400";
    const textcolor: string = profile?.color?.textcolor || "white"

    useEffect(() => {
        fetch('/jsonfile/sports_kgavvaaxha_1.json')
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
            <button onClick={addScript} className="w-fit bg-blue-600 hover:bg-blue-500 text-white rounded p-2">▼項目を追加▼</button>
        </div>
        {profile?.data &&
            <ResultTables data={profile.data} setProfile={setProfile} />
        }
        {profile?.awards &&
            <AwardTables awards={profile.awards} setProfile={setProfile} />
        }
        <Link href={`/playercoach/profile/${params.id}`} className="fixed bottom-2 right-2 w-16 h-16 flex justify-center items-center text-white rounded-full bg-orange-600 hover:bg-orange-500">編集終了</Link>
        </>
    )
}