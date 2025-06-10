'use client';

import { useEffect, useState, useMemo, Dispatch, SetStateAction } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import MenuNarrowProfileEdit from '@/components/MenuNarrowProfileEdit';
import SportsMenu from '@/components/SportsMenu';

import { v4 } from 'uuid';
import clsx from 'clsx';
// import path from 'path';

type Teamname = {
    name: string;
    start: number;
    end: number | null;
    id: string;
}

type Stats = {
    name: string;
    teamnames: Teamname[];
    sports: string[];
    genres: string[];
    gender: string;
    bdate: [number, number, number];
    height: number;
    weight: number;
    privateFields: PrivateFields;
}

type Script = {
    id: string;
    section: string;
    texts: string[];
}

type CellLocation = 
    [number, number, number]

type TableCell = {
    value: string | number;
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
    stats: Stats;
    scripts: Script[];
    data: Data;
    awards: Award[];
    color: Color;
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

// 今はjsonファイル内に入れているが、profileAddメニューができたらデータベースでこのフィールドを管理する
type PrivateFields = {
    bdate: boolean;
    height: boolean;
    weight: boolean;
}

const colorClassMap: Record<string, { bg: string; text: string }> = {
  red: { bg: 'bg-red-600', text: 'text-red-600' },
  orange: { bg: 'bg-orange-600', text: 'text-orange-600' },
  yellow: { bg: 'bg-yellow-600', text: 'text-yellow-600' },
  lime: { bg: 'bg-lime-400', text: 'text-lime-400' },
  green: { bg: 'bg-green-600', text: 'text-green-600' },
  sky: { bg: 'bg-sky-500', text: 'text-sky-500' },
  blue: { bg: 'bg-blue-600', text: 'text-blue-600' },
  purple: { bg: 'bg-purple-600', text: 'text-purple-600' },
  amber: { bg: 'bg-amber-700', text: 'text-amber-700' },
  gray: { bg: 'bg-gray-600', text: 'text-gray-600' },
  black: { bg: 'bg-black', text: 'text-black' },
  white: { bg: 'bg-white', text: 'text-white' },
}

function SetThemeColors({bgcolor, textcolor, setProfile}:{bgcolor: string, textcolor: string, setProfile: Dispatch<SetStateAction<Profile | null>>}) {
    const getColorCSS = (type: 'bg' | 'text', color: string): string => {
        const isSelected = type === 'bg' ? color === bgcolor : color === textcolor;

        return clsx(
            colorClassMap[color].bg,
            isSelected ? 'w-6 h-6' : 'w-4 h-4',
            'border-2 rounded'
        );
    };

    const setColor = (type: string, color: string) => {
        if (type === 'bg'){
            setProfile((prevProfile) => {
                if (!prevProfile) return prevProfile;

                return {
                    ...prevProfile,
                    color: {
                        ...prevProfile.color,
                        bgcolor: color
                    }
                }
            })
        }
        else if (type === 'text'){
            setProfile((prevProfile) => {
                if (!prevProfile) return prevProfile;

                return {
                    ...prevProfile,
                    color: {
                        ...prevProfile.color,
                        textcolor: color
                    }
                }
            })
        }
    }

    const colorKeys = Object.keys(colorClassMap)

    return (
        <div className="space-y-2">
            <div className="flex space-x-2 items-center">
                <p>背景色: </p>
                {colorKeys.map((color) => (
                    <button key={`bg-${color}`} onClick={() => setColor('bg', color)} className={getColorCSS('bg', color)}></button>
                ))}
            </div>
            <div className="flex space-x-2 items-center">
                <p>文字色: </p>
                {colorKeys.map((color) => (
                    <button key={`bg-${color}`} onClick={() => setColor('text', color)} className={getColorCSS('text', color)}></button>
                ))}
            </div>
        </div>
    )
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
            defaultValue={tableCell.value} className="border rounded" />
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
                                                            {id: v4(), value: ""}
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
                                                    {id: v4(), value: ""}
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

function AwardTables({awards, setProfile}:{ awards:Award[], setProfile: Dispatch<SetStateAction<Profile | null>> }){
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

function TeamHistoryInput({ teamnames, byear, setProfile }: { teamnames: Teamname[], byear: number, setProfile: Dispatch<SetStateAction<Profile | null>> }) {
    const [teamInsertRow, setTeamInsertRow] = useState<number>(0);
    const maxRow = teamnames.length;
    const thisYear = (new Date()).getFullYear();
    const [isActive, setIsActive] = useState<boolean>(maxRow === 0 ? false : teamnames[maxRow-1].end === null);

    // チームを追加
    const addEntry = () => 
        setProfile((prevProfile) => {
            if (!prevProfile?.stats?.teamnames) return prevProfile;

            return {
                ...prevProfile,
                stats: {
                    ...prevProfile.stats,
                    teamnames: [
                        ...teamnames.slice(0, teamInsertRow),
                        {
                            name: "",
                            start: teamInsertRow === 0 ? byear : (teamnames[teamInsertRow-1].end ?? 0), 
                            end: teamInsertRow === maxRow ? ( isActive ? null : thisYear) : teamnames[teamInsertRow].start, 
                            id: v4()
                        },
                        ...teamnames.slice(teamInsertRow)
                    ]
                }
            }
        });
    
    // チーム名の変化を管理
    const updateEntry = (index: number, name: string) => {
        setProfile((prevProfile) => {
            if (!prevProfile?.stats?.teamnames) return prevProfile;

            return {
                ...prevProfile,
                stats: {
                    ...prevProfile.stats,
                    teamnames: [
                        ...teamnames.slice(0, index),
                        {
                            ...teamnames[index], 
                            name: name
                        },
                        ...teamnames.slice(index+1)
                    ]
                }
            }
        });     
    }

    // 入団年と退団年の値の変化を管理 (値が上下限を超える場合、フィルタリングする)
    const updateStartEnd = (index: number, type: string, value: number, min: number, max: number) => {
        setProfile((prevProfile) => {
            if (!prevProfile?.stats?.teamnames) return prevProfile;

            const correctValue = () => {
                if (value < min) {
                    return min;
                }
                else if (value > max) {
                    return max;
                }
                return value;
            }

            return {
                ...prevProfile,
                stats: {
                    ...prevProfile.stats,
                    teamnames: [
                        ...teamnames.slice(0, index),
                        {
                            ...teamnames[index], 
                            [type]: correctValue()
                        },
                        ...teamnames.slice(index+1)
                    ]
                }
            }
        });     
    }
  
    // チーム履歴を消去
    const removeEntry = (index: number) => {
        setProfile((prevProfile) => {
            if (!prevProfile?.stats?.teamnames) return prevProfile;

            return {
                ...prevProfile,
                stats: {
                    ...prevProfile.stats,
                    // チームが一つしかなければ空配列(スライスで切り出すとindexエラーになる)
                    teamnames: maxRow === 1 ?
                    [] :
                        // 最終チーム（所属中) を消すならその1個前のチームの退団年をnullすなわち所属中にする
                        isActive && maxRow-1 === index?
                        [
                            ...teamnames.slice(0, maxRow-2),
                            {...teamnames[maxRow-2], end: null}   
                        ] :
                        [
                            ...teamnames.slice(0, index),
                            ...teamnames.slice(index+1)
                        ]
                }
            }
        });
    };

    // 現役か引退済かを設定
    const handleActive = (checked: boolean) => {
        setIsActive(checked);

        setProfile((prevProfile) => {
            if (!prevProfile?.stats?.teamnames) return prevProfile;

            return {
                ...prevProfile,
                stats: {
                    ...prevProfile.stats,
                    teamnames: maxRow ? 
                    [
                        ...teamnames.slice(0, maxRow-1),
                        {
                            ...teamnames[maxRow-1], 
                            end: checked ? null : (new Date()).getFullYear()
                        },
                    ] :
                    []
                }
            }
        }); 
    }

    useEffect(() => {
        if (teamInsertRow >= maxRow) {
            if (isActive && maxRow) {
                setTeamInsertRow(maxRow-1);
            }
            else {
                setTeamInsertRow(maxRow);
            }
        }
    }, [teamInsertRow, maxRow, isActive])
  
    return (
        <div className={`overflow-x-auto w-full ${teamInsertRow === teamnames.length ? "border-b-4 border-fuchsia-600" : ""}`}>
            <h2 className="text-lg font-bold">チーム履歴</h2>
            <button type="button" onClick={addEntry} className="my-2 py-1 rounded">＋ チーム追加</button>
            <label>
                <span className="mx-2">追加列</span>
                <input id="teamInsertCol" type="number" value={teamInsertRow} onChange={(e) => setTeamInsertRow(Number(e.target.value))} 
                    min={0} max={maxRow} className="rounded border px-1" />
            </label>
            <label>
                <span className="mx-2">現役?</span>
                <input type="checkbox" checked={isActive} onChange={(e) => handleActive(e.target.checked)}/>
            </label>
            <div className="min-w-max">
                {teamnames.map((teamname, teamNameIndex) => (
                    <div key={teamname.id} className={`flex space-x-2 items-center mb-2 w-fit ${teamInsertRow === teamNameIndex ? "border-t-4 border-fuchsia-600" : ""}`}>
                        <input
                            type="text"
                            value={teamname.name}
                            placeholder="チーム名"
                            onChange={(e) => updateEntry(teamNameIndex, e.target.value)}
                            className="border rounded p-1"
                        />
                        <input
                            type="number"
                            value={teamname.start}
                            placeholder="入団年"
                            onChange={(e) => updateStartEnd(teamNameIndex, "start", Number(e.target.value), Number(e.target.min), Number(e.target.max))}
                            min={teamNameIndex > 0 ? (teamnames[teamNameIndex-1].end || 0): byear}
                            max={teamname.end === null ? thisYear : teamname.end}
                            className="border rounded p-1 w-16"
                        />
                        <input
                            type="number"
                            value={teamname.end ?? ""}
                            disabled={teamname.end === null}
                            placeholder="退団年"
                            onChange={(e) => updateStartEnd(teamNameIndex, "end", Number(e.target.value), Number(e.target.min), Number(e.target.max))}
                            min={teamname.start}
                            max={teamNameIndex === maxRow-1 ? thisYear : teamnames[teamNameIndex+1].start}
                            className="border rounded p-1 w-16"
                        />
                        <button type="button" onClick={() => removeEntry(teamNameIndex)} className="flex w-4 h-4 bg-gray-400 text-white rounded-full items-center justify-center">&times;</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ProfileInput({ stats, setProfile }: { stats: Stats, setProfile: Dispatch<SetStateAction<Profile | null>> }) {
    function getMaxDayOfMonth(month: number, year: number): number {
        if ([1, 3, 5, 7, 8, 10, 12].includes(month)) return 31;
        if ([4, 6, 9, 11].includes(month)) return 30;
        // 2月の処理
        const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        return isLeapYear ? 29 : 28;
      }

    const [month, day, year] = stats.bdate

    const correctedDay = useMemo(() => {
        const maxDay = getMaxDayOfMonth(month, year);
        return Math.min(day, maxDay);
    }, [month, day, year]);

    const genderOnChange = (gender: string) => 
        setProfile((prevProfile) => {
            if (!prevProfile) return prevProfile

            return {
                ...prevProfile,
                stats: {
                    ...prevProfile.stats,
                    gender: gender
                }
            }
        });

    const bdateOnChange = (value: string, level: string) => 
        setProfile((prevProfile) => {
            if (!prevProfile?.stats) return prevProfile;

            const newBdate = (): [number, number, number] => {
                switch (level) {
                    case "year":
                        return [prevProfile.stats.bdate[0], prevProfile.stats.bdate?.[1], Number(value)];
                    case "month":
                        return [Number(value), prevProfile.stats.bdate[1], prevProfile.stats.bdate?.[2]];
                    case "day":
                        return [prevProfile.stats.bdate[0], Number(value), prevProfile.stats.bdate?.[2]]
                    default:
                        return prevProfile.stats.bdate;
                }
            }
            
            return {
                ...prevProfile,
                stats: {
                    ...prevProfile.stats,
                    bdate: newBdate()
                }
            }
        })

    const setPrivate = (type: "bdate" | "height" | "weight", checked: boolean) => 
        setProfile((prevProfile) => {
            if (!prevProfile?.stats?.bdate) return prevProfile;

            const newPrivateFields = (): PrivateFields => {
                switch (type) {
                    case "bdate":
                        return {
                            ...stats.privateFields,
                            bdate: checked
                        };
                    case "height":
                        return {
                            ...stats.privateFields,
                            height: checked 
                        };
                    case "weight":
                        return {
                            ...stats.privateFields,
                            weight: checked
                        };
                    default:
                        return stats.privateFields;
                }
            }
            
            return {
                ...prevProfile,
                stats: {
                    ...stats,
                    privateFields: newPrivateFields()
                }
            }
        })

    return (
        <form className="border-t-2 py-2">
        <p className="font-bold">プロフィール</p>
        <ul className="list-none ml-4 space-y-2">
            <li className="flex items-center">
                性別: 
                <div className="flex flex-col">
                    <label htmlFor="gender-male" className="mx-2">
                        <input id="gender-male" type="radio" value="male" checked={stats?.gender === "male"} 
                        onChange={() => genderOnChange('male')}/> 男性
                    </label>                    
                    <label htmlFor="gender-female" className="mx-2">
                        <input id="gender-female" type="radio" value="female" checked={stats?.gender === "female"} 
                            onChange={() => genderOnChange('female')}/> 女性
                    </label>
                    <label htmlFor="gender-private" className="mx-2">
                        <input id="gender-private" type="radio" value="private" checked={stats?.gender === "private"} 
                            onChange={() => genderOnChange('private')}/> 非公開
                    </label>
                </div>
            </li>
            <li className="flex items-center">
                誕生日:
                <div className="flex justify-center items-center mr-2">
                    <input id="year" type="number" step="1" value={stats.bdate[2]}
                    max={stats?.teamnames?.[0] ? stats.teamnames[0].start : (new Date()).getFullYear()} 
                    onChange={(e) => bdateOnChange(e.target.value, "year")} 
                    disabled={stats.privateFields.bdate} className="border w-12 m-2" />
                    <p>年</p>
                    <input id="month" type="number" step="1" value={stats.bdate[0]} min={1} max={12}
                    onChange={(e) => bdateOnChange(e.target.value, "month")} 
                    disabled={stats.privateFields.bdate} className="border w-12 m-2" />
                    <p>月</p>
                    <input id="day" type="number" step="1" value={correctedDay} min={1}
                    onChange={(e) => bdateOnChange(e.target.value, "day")} 
                    disabled={stats.privateFields.bdate} className="border w-12 m-2" />
                    <p>日</p> 
                </div>
                <label> / 非公開: <input type="checkbox" defaultChecked={stats.privateFields.bdate} onChange={(e) => setPrivate("bdate", e.target.checked)} /></label>                 
            </li>
            <li className="flex items-center">
                <label htmlFor="height">身長:</label>
                <input id="height" type="number" step="0.1" defaultValue={stats.height} 
                disabled={stats.privateFields.height} className="border w-12 mx-2" />
                <p>cm</p>
                <label className="ml-2"> / 非公開: <input type="checkbox" defaultChecked={stats.privateFields.height} onChange={(e) => setPrivate("height", e.target.checked)} /></label>
            </li>
            <li className="flex items-center">
                <label htmlFor="weight">体重:</label>
                <input id="weight" type="number" step="0.1" defaultValue={stats.weight} 
                disabled={stats.privateFields.weight} className="border w-12 mx-2" />
                <p>kg</p>
                <label className="ml-2"> / 非公開: <input type="checkbox" defaultChecked={stats.privateFields.weight} onChange={(e) => setPrivate("weight", e.target.checked)} /></label>
            </li>
        </ul>
        </form>
    )
}

function ScriptTables({ scripts, setProfile }: { scripts: Script[], setProfile: Dispatch<SetStateAction<Profile | null>> }) {
    const addScript = () => 
        setProfile((prevProfile) => {
            if (!prevProfile) return prevProfile;

            const newScript: Script = { id: v4(), section: "", texts: []};

            return {
                ...prevProfile,
                scripts: [...prevProfile.scripts, newScript]
            }
        });

    const deleteScript = (id: string) => {
        const confirmed = window.confirm("本当に削除しますか?");
        
        if (confirmed) {
            setProfile((prevProfile) => {
                if (!prevProfile) return prevProfile;
    
                const newScripts = scripts.filter(script => script.id !== id);
    
                return {
                    ...prevProfile,
                    scripts: newScripts
                }
            });
        }
    }
    
    return (
        <div className="w-full h-128 overflow-y-auto border-2 p-2 my-2 rounded text-center">
            {scripts.map((script, scriptIndex) => (
                <div key={script.id} className="flex flex-col py-2">
                    <div className="flex justify-between border-b-2 font-bold">
                        <input type="text" defaultValue={script.section} onChange={(e) => {
                            setProfile((prevProfile) => {
                                if (!prevProfile) return prevProfile;

                                return {
                                    ...prevProfile,
                                    scripts: [
                                        ...prevProfile.scripts.slice(0, scriptIndex),
                                        {...prevProfile.scripts[scriptIndex], section: e.target.value},
                                        ...prevProfile.scripts.slice(scriptIndex+1)
                                    ]
                                }
                            })
                        }}/>
                        <button onClick={() => deleteScript(script.id)} className="w-fit bg-gray-600 hover:bg-gray-500 text-white rounded p-2 my-2">削除</button>
                    </div>
                    <textarea defaultValue={script.texts.join('\n')} onChange={(e) => {
                            setProfile((prevProfile) => {
                                if (!prevProfile) return prevProfile;

                                return {
                                    ...prevProfile,
                                    scripts: [
                                        ...prevProfile.scripts.slice(0, scriptIndex),
                                        {...prevProfile.scripts[scriptIndex], texts: e.target.value.split('\n')},
                                        ...prevProfile.scripts.slice(scriptIndex+1)
                                    ]
                                }
                            })
                        }} className="h-32"/>
                </div>
            ))}
            <button onClick={addScript} className="w-fit bg-blue-600 hover:bg-blue-500 text-white rounded p-2">▼項目を追加▼</button>
        </div>
    )
}

function SportsGenreMenus({ sports, genres, textcolor, bgcolor, setProfile }: { sports: string[], genres: string[], textcolor: string, bgcolor: string, setProfile: Dispatch<SetStateAction<Profile | null>> }) {
    const [openSportsMenu, setOpenSportsMenu] = useState<boolean>(false);
    const [openGenresMenu, setOpenGenresMenu] = useState<boolean>(false);
    
    const setSports = (sports: string[]) => 
        setProfile((prevProfile) => {
            if (!prevProfile) return prevProfile;
            
            return {
                ...prevProfile,
                stats: {
                    ...prevProfile.stats,
                    sports: sports
                }
            }
        });
    
    const setGenres = (genres: string[]) => 
        setProfile((prevProfile) => {
            if (!prevProfile) return prevProfile;
            
            return {
                ...prevProfile,
                stats: {
                    ...prevProfile.stats,
                    genres: genres
                }
            }
        });

    const menuMapJP: { [key: string]: string } = {
        baseball: '野球',
        football: 'サッカー',
        trackfield: '陸上',
        baseball_pitcher: '投手',
        baseball_fielder: '野手',
        baseball_other: 'その他',
        baseball_pitcher_starter: '先発',
        baseball_pitcher_setupman: '中継',
        baseball_pitcher_closer: '抑え',
        baseball_fielder_catcher: 'キャッチャー',
        baseball_fielder_first: 'ファースト',
        baseball_fielder_second: 'セカンド',
        baseball_fielder_third: 'サード',
        baseball_fielder_shortstop: 'ショート',
        baseball_fielder_left: 'レフト',
        baseball_fielder_center: 'センター',
        baseball_fielder_right: 'ライト',
        baseball_other_DH: 'DH',
        baseball_other_PH: 'PH',
        baseball_other_twoway: '二刀流',
        baseball_other_coach: '監督',
        football_GK: 'GK',
        football_FW: 'FW',
        football_MF: 'MF',
        football_DF: 'DF',
        football_GK_GK: 'GK',
        football_FW_CF: 'CF',
        football_FW_WG: 'WG',
        football_FW_ST: 'ST',
        football_MF_AM: 'AM',
        football_MF_CM: 'CM',
        football_MF_LM: 'LM',
        football_MF_RM: 'RM',
        football_MF_DM: 'DM',
        football_DF_RWB: 'RWB',
        football_DF_LWB: 'LWB',
        football_DF_CB: 'CB',
        football_DF_RB: 'RB',
        football_DF_LB: 'LB',
        football_DF_SW: 'SW',
        trackfield_short: '短距離',
        trackfield_hurdle: 'ハードル',
        trackfield_middle: '中距離',
        trackfield_long: '長距離',
        trackfield_relay: 'リレー',
        trackfield_marathon: 'マラソン',
        trackfield_walk: '競歩',
        trackfield_jump: '跳躍',
        trackfield_throw: '投てき',
        trackfield_mixed: '混成競技',
        trackfield_short_100m: '100m',
        trackfield_short_200m: '200m',
        trackfield_short_400m: '400m',
        trackfield_hurdle_100m: '100mハードル',
        trackfield_hurdle_110m: '110mハードル',
        trackfield_hurdle_400m: '400mハードル',
        trackfield_middle_800m: '800m',
        trackfield_middle_1000m: '1000m',
        trackfield_middle_1500m: '1500m',
        trackfield_middle_1mile: '1マイル',
        trackfield_middle_3000mSC: '3000m障害',
        trackfield_long_5000m: '5000m',
        trackfield_long_10000m: '10000m',
        trackfield_long_1h: '1時間',
        trackfield_relay_100m: '4×100m',
        trackfield_relay_200m: '4×200m',
        trackfield_relay_400m: '4×400m',
        trackfield_relay_800m: '4×800m',
        trackfield_marathon_1mile: '1マイル',
        trackfield_marathon_half: 'ハーフ',
        trackfield_marathon_full: 'フル',
        trackfield_marathon_100km: '100km',
        trackfield_walk_10000m: '10000m競歩',
        trackfield_walk_20000m: '20000m競歩',
        trackfield_walk_50000m: '50000m競歩',
        trackfield_walk_20km: '20km競歩',
        trackfield_walk_50km: '50km競歩',
        trackfield_jump_high: '走高跳',
        trackfield_jump_pole: '棒高跳',
        trackfield_jump_long: '走幅跳',
        trackfield_jump_triple: '三段跳',
        trackfield_throw_shotput: '砲丸投',
        trackfield_throw_disk: '円盤投',
        trackfield_throw_hammer: 'ハンマー投',
        trackfield_throw_javelin: 'やり投',
        trackfield_mixed_heptathlon: '七種競技',
        trackfield_mixed_decathlon: '十種競技'
    };

    return (
        <>
            <li>
                <div className="relative">
                    <button type="button" onClick={() => {
                        setOpenSportsMenu(!openSportsMenu);
                        setOpenGenresMenu(false);
                    }}
                    className={`w-fit rounded ${openSportsMenu && colorClassMap[textcolor].bg + colorClassMap[bgcolor].text}`}>＋ スポーツ追加</button>
                    {openSportsMenu &&
                        <div className="absolute top-full text-black z-11">
                            {/* <MenuNarrow setGenres={setGenres}/> */}
                            <SportsMenu narrowedSports={sports} narrowedGenres={genres} setSports={setSports} setGenres={setGenres}/>
                        </div>
                    }
                </div>
                <div className="w-60 border rounded mx-2">
                    <p className="overflow-x-auto">{
                        sports.map((sports) => menuMapJP[sports]).join(', ')
                    }</p>
                </div>
            </li>
            <li>
                <div className="relative">
                    <button type="button" onClick={() => {
                        setOpenGenresMenu(!openGenresMenu);
                        setOpenSportsMenu(false);
                    }}
                    className={`w-fit rounded ${openGenresMenu && colorClassMap[textcolor].bg + colorClassMap[bgcolor].text}`}>＋ ジャンル追加</button>
                    {openGenresMenu &&
                        <div className="absolute top-full text-black z-11">
                            <MenuNarrowProfileEdit sports={sports} genres={genres} setGenres={setGenres}/>
                        </div>
                    }
                </div>
                <div className="w-60 border rounded mx-2">
                    <p className="overflow-x-auto">{
                        genres.map((genre) => menuMapJP[genre]).join(', ')
                    }</p>
                </div>
            </li>
        </>
    )
}

export default function PlayerCoachProfileEditPage(){
    const [profile, setProfile] = useState<Profile | null>(null);

    const [currentImage, setCurrentImage] = useState<string>("");
      
    const params = useParams();

    const bgcolor: string = profile?.color.bgcolor || "gray";
    const textcolor: string = profile?.color.textcolor || "white"

    // '/jsonfile/sports_kgavvaaxha_3.json'
    useEffect(() => {
        fetch(`/api/playercoach?id=${params.id}`)
        .then((res) => res.json())
        .then((json) => {
            setProfile(json);
        })
        .catch(() => router.push(`/playercoach/profile/${params.id}`));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const router = useRouter();

    const submitHandler = async () => {
        if (!profile) return;

        // 名前がないなら変更を受け付けない
        if (profile.stats.name === ""){
            alert("名前が入力されていません!!");
            return;
        }
        else if (profile.stats.teamnames.length === 0){
            alert("スポーツ欄が空です!!");
            return;
        }
        else if (profile.stats.genres.length === 0){
            alert("ジャンル欄が空です!!")
            return;
        }

        const scripts = profile.scripts.filter((script) => script.section !== "");

        const data = {
            ...profile.data,
            results: profile.data.results.filter((result) => 
                result.position !== "" ||
                !result.columns.every(column => column.value === "")
            ),
            highlightInfo: Object.fromEntries(Object.entries(profile.data.highlightInfo).filter(([, value]) => value !== "")) as Partial<Record<string, string>>
        }

        const awards = 
            profile.awards.filter((award) => award.section !== "")
            .map((award) => ({
                ...award,
                titles: award.titles.filter((title) => title.years.length > 0)   
            }))
            .filter((award) => award.titles.length > 0)

        const sentProfile = {
            ...profile,
            scripts: scripts,
            data: data,
            awards: awards
        };

// type Profile = {
//     stats: Stats;
//     scripts: Script[];
//     data: Data;
//     awards: Award[];
//     color: Color;
// }

        try {
            const response = await fetch(`/api/playercoach`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: "kgavvaaxha_3",
                    ...sentProfile
                }),
            });
    
            if (response.ok){
                console.log('succeess in save');
                router.push(`/playercoach/profile/${params.id}`);
            }
            else {
                console.error('error in save');
            }
        } catch (err) {
            console.error('error in connection', err);
        }
    }
    
    return (
        <>
        <SetThemeColors bgcolor={bgcolor} textcolor={textcolor} setProfile={setProfile} />
        {/* 色を選んで変える(設定されてない場合はデフォルトの色(現状はtext-white, bg-gray-400)) */}
        <div className={`border-2 px-2 rounded-3xl my-4 w-fit mx-auto ${colorClassMap[bgcolor].bg} ${colorClassMap[textcolor].text}`}>
            <div className="flex items-start no-underline rounded mt-2 space-x-2">
                <form>
                    <fieldset className="p-2 border text-center">
                        <legend className="font-bold">自画像</legend>
                        <div className="mx-auto mb-4 w-32 h-fit border">
                            {currentImage !== "" &&
                            <Image src={currentImage} alt="" width={128} height={256} className="m-auto"/>
                            }
                        </div>
                        <label htmlFor="self-image" className="cursor-pointer px-4 py-2">画像を選択</label>
                        <input id="self-image" type="file" accept="image/*" className="hidden" 
                            onChange={(e) => {
                                const file = e.currentTarget.files ? window.URL.createObjectURL(e.currentTarget.files[0]) : currentImage;
                                setCurrentImage((prevImage) => file || prevImage)
                            }} />
                    </fieldset>
                </form>
                <div className="px-2 border-l-2">
                    <h2>選手情報</h2>
                    <div className="relative py-2">
                        <ul className="space-y-2 w-full">
                            <li>
                                <label htmlFor="name">名前: 
                                    <input id="name" type="text" defaultValue={profile?.stats.name || ""} 
                                    onChange={(e) => setProfile((prevProfile) => {
                                        if (!prevProfile?.stats?.name) return prevProfile;

                                        return {
                                            ...prevProfile,
                                            stats: {
                                                ...prevProfile.stats,
                                                name: e.target.value
                                            }
                                        }
                                    })}
                                    className="ml-2 border w-48 h-8 rounded text-3xl" />
                                </label>
                            </li>
                            <li className="w-full">
                                {profile?.stats.teamnames &&
                                    <TeamHistoryInput teamnames={profile.stats.teamnames} byear={profile?.stats?.bdate?.[2] || 0} setProfile={setProfile} />
                                }
                            </li>
                            {profile?.stats.sports && profile?.stats.genres &&
                                <SportsGenreMenus sports={profile.stats.sports} genres={profile.stats.genres} textcolor={textcolor} bgcolor={bgcolor} setProfile={setProfile}/>
                            }
                        </ul>
                    </div>
                </div>
            </div>
            {profile?.stats &&
                <ProfileInput stats={profile.stats} setProfile={setProfile}/>
            }
        </div>
        {profile?.scripts &&
            <ScriptTables scripts={profile.scripts} setProfile={setProfile}/>
        }
        {profile?.data &&
            <ResultTables data={profile.data} setProfile={setProfile} />
        }
        {profile?.awards &&
            <AwardTables awards={profile.awards} setProfile={setProfile} />
        }
        <button type="button" onClick={submitHandler} className="fixed bottom-2 right-2 w-16 h-16 flex justify-center items-center text-white rounded-full bg-orange-600 hover:bg-orange-500">編集終了</button>
        </>
    )
}