'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type CboxData = {
    sports: {
        main: string[],
        sub1: string[],
        sub2: string[],
    }
}

export default function GenresNarrowMenu({sports, genres, setGenres} : {sports: string[], genres: string[], setGenres: (genres: string[]) => void }) {
    // #region menuConst 
    const menuMap: {[key: string] : {genres: string[], level: number} } = {
        sports: {genres: ['baseball', 'football', 'trackfield'], level: -1},
        baseball: {genres: ['baseball_pitcher', 'baseball_fielder', 'baseball_other'], level: 0},
        baseball_pitcher: {genres: ['baseball_pitcher_starter', 'baseball_pitcher_setupman','baseball_pitcher_closer'], level: 1},
        baseball_fielder: {genres: ['baseball_fielder_catcher', 'baseball_fielder_first', 'baseball_fielder_second', 'baseball_fielder_third',
            'baseball_fielder_shortstop', 'baseball_fielder_left', 'baseball_fielder_center', 'baseball_fielder_right'], level: 1},
        baseball_other: {genres: ['baseball_other_DH', 'baseball_other_PH', 'baseball_other_twoway', 'baseball_other_coach'], level: 1},
        football: {genres: ['football_GK', 'football_FW', 'football_MF', 'football_DF'], level: 0},
        football_GK: {genres: ['football_GK_GK'], level: 1},
        football_FW: {genres: ['football_FW_CF', 'football_FW_WG', 'football_FW_ST'], level: 1},
        football_MF: {genres: ['football_MF_AM', 'football_MF_CM', 'football_MF_LM', 'football_MF_RM', 'football_MF_DM'], level: 1},
        football_DF: {genres: ['football_DF_RWB', 'football_DF_LWB', 'football_DF_CB', 'football_DF_RB', 'football_DF_LB', 'football_DF_SW'], level: 1},
        trackfield: {genres: ['trackfield_short', 'trackfield_hurdle', 'trackfield_middle', 'trackfield_long', 'trackfield_relay', 
                    'trackfield_marathon', 'trackfield_walk', 'trackfield_jump', 'trackfield_throw', 'trackfield_mixed'], level: 0},
        trackfield_short: {genres: ['trackfield_short_100m', 'trackfield_short_200m', 'trackfield_short_400m'], level: 1},
        trackfield_hurdle: {genres: ['trackfield_hurdle_100m', 'trackfield_hurdle_110m', 'trackfield_hurdle_400m'], level: 1},
        trackfield_middle: {genres: ['trackfield_middle_800m', 'trackfield_middle_1000m', 'trackfield_middle_1500m', 'trackfield_middle_1mile', 'trackfield_middle_3000mSC'], level: 1},
        trackfield_long: {genres: ['trackfield_long_5000m', 'trackfield_long_10000m', 'trackfield_long_1h'], level: 1},
        trackfield_relay: {genres: ['trackfield_relay_100m', 'trackfield_relay_200m', 'trackfield_relay_400m', 'trackfield_relay_800m'], level: 1},
        trackfield_marathon: {genres: ['trackfield_marathon_1mile', 'trackfield_marathon_half', 'trackfield_marathon_full', 'trackfield_marathon_100km'], level: 1},
        trackfield_walk: {genres: ['trackfield_walk_10000m', 'trackfield_walk_20000m', 'trackfield_walk_50000m', 'trackfield_walk_20km', 'trackfield_walk_50km'], level: 1},
        trackfield_jump: {genres: ['trackfield_jump_high', 'trackfield_jump_pole', 'trackfield_jump_long', 'trackfield_jump_triple'], level: 1},
        trackfield_throw: {genres: ['trackfield_throw_shotput', 'trackfield_throw_disk', 'trackfield_throw_hammer', 'trackfield_throw_javelin'], level: 1},
        trackfield_mixed: {genres: ['trackfield_mixed_heptathlon', 'trackfield_mixed_decathlon'], level: 1},
    };

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
    // #endregion

    const [genreSuggests, setGenreSuggests] = useState<[string, string][]>([]);

    // #region formSettings
    const { register, handleSubmit, getValues, watch, setValue } = useForm<CboxData>({
        defaultValues: { sports: { main: [], sub1: [], sub2: genres } }
    });

    const [openMenu, setOpenMenu] = useState<string>('');
    
    const watchMain = watch('sports.main');
    const watchSub1 = watch('sports.sub1');
    const watchSub2 = watch('sports.sub2');

    const handleCheckSports = ({e, regName} : { e: React.ChangeEvent<HTMLInputElement>, regName: "sports.main" | "sports.sub1" | "sports.sub2" }) => {
        const prevValues = (() => {
            switch (regName) {
                case 'sports.main':
                    return watchMain;
                case 'sports.sub1':
                    return watchSub1;
                case 'sports.sub2':
                    return watchSub2;
                default:
                    return undefined;
            }
        })();
        if ( prevValues !== undefined ) {
            // リストに値がある場合はリストから値を消す
            if (e.target.checked) {
                setValue(regName, [...prevValues, e.target.value]);
                if (regName === 'sports.main') {
                    const allSub1Genres = menuMap[e.target.value].genres
                    setValue('sports.sub1', [...new Set([...watchSub1, ...allSub1Genres])]);
                    allSub1Genres.map((genre) => {
                        const allSub2Genres = menuMap[genre].genres;
                        setValue('sports.sub2', [...new Set([...getValues('sports.sub2'), ...allSub2Genres])]);
                    });
                }
                else if (regName === 'sports.sub1') {
                    const allSub2Genres = menuMap[e.target.value].genres
                    setValue('sports.sub2', [...new Set([...watchSub2, ...allSub2Genres])]);
                }
            }
            else {
                const crntValues = prevValues.filter(value => value !== e.target.value);
                setValue(regName, [...crntValues]);
                if (regName === 'sports.main') {
                    const allSub1Genres = menuMap[e.target.value].genres;
                    setValue('sports.sub1', [...new Set(watchSub1.filter(genre => !allSub1Genres.includes(genre)))]);
                    allSub1Genres.map((genre) => {
                        const allSub2Genres = menuMap[genre].genres;
                        setValue('sports.sub2', [...new Set(watchSub2.filter(genre => !allSub2Genres.includes(genre)))]);  
                    });
                }
                else if (regName === 'sports.sub1') {
                    const allSub2Genres = menuMap[e.target.value].genres;
                    setValue('sports.sub2', [...new Set(watchSub2.filter(genre => !allSub2Genres.includes(genre)))]);
                }
            }
        }
    };

    const controlOpenMenu = (menu: string) => {
        if (openMenu.includes(menu)) {
            const lastIndex = menu.lastIndexOf('_');
            if (lastIndex === -1) {
                setOpenMenu('');
            }
            else {
                setOpenMenu(menu.substring(0, lastIndex));
            }
        }
        else {
            setOpenMenu(menu);
        } 
    }
    
    const MenuButton = ({label, menu} : {label: string, menu: string}) => {
        return <button onClick={() => controlOpenMenu(menu)} 
                className={`text-center p-1 whitespace-nowrap text-white rounded ${openMenu.includes(menu) ? "bg-fuchsia-600 hover:bg-fuchsia-500" : "bg-blue-600 hover:bg-blue-500" }`}>{label}</button>
    }

    const MenuInput = ({label, value, level} : {label: string, value: string, level: number}) => {
        const regName = `sports.${level === 0 ? 'main' : `sub${level}` }` as 'sports.main' | 'sports.sub1' | 'sports.sub2';
        return (
        <label htmlFor={`narrow-sports-${value}`} className="flex items-center rounded text-xs">
            <input id={`narrow-sports-${value}`} type="checkbox" value={value}
            className="mr-2" checked={regName.includes(value)} 
            {...register(regName, 
                {onChange: (e) => {handleCheckSports({e, regName})}})
            } />
            <span className="whitespace-nowrap">{label}</span>
        </label>);
    }

    const updateSuggests = async (value: string) => {
        if (value) {
            const response = await fetch(`/api/genres?genreString=${value}`);
            if (response.ok) {
                const genreSuggests = (await response.json()) as [string, string][];
                const gSFiltered = genreSuggests.filter(([key, ]) => 
                    sports.some(sports => key.includes(sports)) &&
                    !genres.some(genre => key.includes(genre))
                );
                setGenreSuggests(gSFiltered);
            }
        }
        else {
            setGenreSuggests([]);
        }
    }
    // #endregion
    
    return (
        <div className="h-fit w-full">
            <fieldset className="border text-center bg-white h-fit px-2">
                <legend className="font-bold">ジャンルの絞り込み</legend>
                <form onSubmit={handleSubmit(() => setGenres(watchSub2))} className="flex flex-col items-center h-fit w-full
                bg-white text-black z-2 transition-transform duration-300 ease-in-out space-y-4">
                    <div className="relative">
                        <label htmlFor='genreSuggests'>
                            🔍 <input type="text" id='genreSuggests' className="border-2 rounded"
                            onChange={(e) => updateSuggests(e.target.value)}/>
                        </label>
                        {genreSuggests.length > 0 &&
                            <ul className="absolute top-full z-12 overflow-y-auto w-full h-64 bg-white border-2">
                            {genreSuggests.map((genreSuggest) => (
                                <li key={genreSuggest[0]} onClick={() => {
                                    setGenres(Array.from(new Set([...genres, genreSuggest[0]])))
                                    setValue('sports.sub2', [...watchSub2, genreSuggest[0]]);
                                    setGenreSuggests((prevGenreSuggests) => {
                                        const removedSuggests = prevGenreSuggests.filter(suggest => suggest[0] !== genreSuggest[0]);
                                        return removedSuggests
                                    })
                                }}
                                className="border rounded text-white bg-blue-600 w-fit px-4 mx-auto hover:cursor-pointer">
                                    {genreSuggest[1]}
                                </li>
                            ))}
                            </ul>
                        }
                    </div>
                    <div className="grid grid-cols-9 w-full items-start">
                    {Object.entries(menuMap).map(([key, value]) => (
                    <React.Fragment key={key}>
                        { key === 'sports' ?
                            //最上層のメニュー
                            (<div className="col-span-3 flex flex-col space-y-1 pl-2">
                                <p className="text-center text-xs">　　</p>
                                {value.genres.map((genre) => ( sports.includes(genre) && <MenuButton key={genre} label={menuMapJP[genre]} menu={genre}/> ))}
                            </div>) :
                            (<>
                            {!menuMap[value.genres[0]] ? 
                                // 最下層のメニュー
                                (<>
                                {openMenu.includes(key) && sports.some(sport => openMenu.includes(sport)) &&
                                <div className="col-span-3 flex flex-col space-y-1 pl-2">
                                    <MenuInput label='すべて選択' value={key} level={value.level} />
                                    {value.genres.map((genre) => ( <MenuInput key={genre} label={menuMapJP[genre]} value={genre} level={value.level+1}/> ))}
                                </div>
                                }
                                </>) :
                                // 中間層のメニュー
                                (<>
                                {openMenu.includes(key) && sports.some(sport => openMenu.includes(sport)) && 
                                <div className="col-span-3 flex flex-col space-y-1 pl-2">
                                    <MenuInput label='すべて選択' value={key} level={value.level} />
                                    {value.genres.map((genre) => ( <MenuButton key={genre} label={menuMapJP[genre]} menu={genre}/>))}
                                </div>
                                }
                                </>)
                            }
                            </>)
                        }
                    </React.Fragment>
                    ))}
                    </div>
                    <button type="submit" disabled={!(watchSub2.length || genres.length)} 
                    className={`w-fit text-white rounded p-2 mb-2 ${watchSub2.length || genres.length ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-300"} `}>
                        ジャンルを決定
                    </button>
                </form>
            </fieldset>
            {genres.length > 0 &&
            <div className="flex flex-col px-2 py-4 bg-gray-400 border">
                <p className="text-white">選択したジャンル:</p>
                <p className="text-black font-bold whitespace-normal">{genres.map((genre) => menuMapJP[genre]).join(', ')}</p>
            </div>
            }
        </div>
    );
}
