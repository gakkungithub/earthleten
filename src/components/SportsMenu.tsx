'use client';

import React, { Dispatch, SetStateAction } from 'react';

export default function SportsNarrow({narrowedSports, setSports} : {narrowedSports: string[], setSports: Dispatch<SetStateAction<string[]>>}) {
    // #region menuConst 
    const sportsMap = ['baseball', 'football', 'trackfield'];

    const sportsJP: { [key: string]: string } = {
        baseball: '野球',
        football: 'サッカー',
        trackfield: '陸上',
    };
    // #endregion

    const sportsButtonHandler = (sports: string) => {
        setSports((prevSports) => {
            if (prevSports.includes(sports)) {
                return (prevSports.filter((s) => s != sports))
            }
            else {
                return Array.from(new Set([...prevSports, sports]))
            }
        })
    }
    
    return (
        <div className="h-fit w-full">
            <fieldset className="border text-center bg-white h-fit p-2">
                <legend className="font-bold">ジャンルの絞り込み</legend>
                <div className="space-x-2">
                {sportsMap.map((sports, sportsIndex) => (
                    <button key={sportsIndex} className={`text-white p-1 rounded ${narrowedSports.includes(sports) ? "bg-fuchsia-600" : "bg-blue-600"}`} onClick={() => sportsButtonHandler(sports)}>{sportsJP[sports]}</button>
                ))}
                </div>
            </fieldset>
        </div>
    );
}
