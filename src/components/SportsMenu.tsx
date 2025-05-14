'use client';

import React, { Dispatch, SetStateAction } from 'react';

export default function SportsNarrow({narrowedSports, setSports, setGenres} : {narrowedSports: string[], setSports: Dispatch<SetStateAction<string[]>>, setGenres: Dispatch<SetStateAction<string[]>>}) {
    // #region menuConst 
    const sportsMap = ['baseball', 'football', 'trackfield'];

    const sportsJP: { [key: string]: string } = {
        baseball: '野球',
        football: 'サッカー',
        trackfield: '陸上',
    };
    // #endregion

    const sportsButtonHandler = (sports: string, included: boolean) => {
        setSports(included ?
            narrowedSports.filter((s) => s != sports) :
            Array.from(new Set([...narrowedSports, sports]))
        )
        if (included) {
            setGenres((prevGenres) => 
                prevGenres.filter((g) => !g.includes(sports))
            )
        }
    }
    
    return (
        <div className="h-fit w-full">
            <fieldset className="border text-center bg-white h-fit p-2">
                <legend className="font-bold">ジャンルの絞り込み</legend>
                <div className="space-x-2">
                {sportsMap.map((sports, sportsIndex) => {
                    const included = narrowedSports.includes(sports);
                    return (<button key={sportsIndex} className={`text-white p-1 rounded ${included ? "bg-fuchsia-600" : "bg-blue-600"}`} onClick={() => sportsButtonHandler(sports, included)}>{sportsJP[sports]}</button>)
                })}
                </div>
            </fieldset>
        </div>
    );
}
