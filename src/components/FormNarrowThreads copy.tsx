'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Thread } from '@/typeDeclar/typeComp';

import { Dispatch, SetStateAction } from 'react';

type CboxData = {
    sports: {
        main: string[],
        sub1: string[],
        sub2: string[],
    }
}

export default function FormNarrowThreads({ setThreads }: {
    setThreads: Dispatch<SetStateAction<Thread[]>>;
}){
    const menuMap = {
        sports: {genres: ['baseball', 'football', 'trackfield'], bottom: false},
        baseball: {genres: ['baseball_pitcher', 'baseball_fielder', 'baseball_other'], bottom: false},
        baseball_pitcher: {genres: ['baseball_pitcher-starter', 'baseball_pitcher-setupman','baseball_pitcher_closer'], bottom: true},
        baseball_fielder: {genres: ['baseball_fielder_catcher', 'baseball_fielder_first', 'baseball_fielder_second', 'baseball_fielder_third',
            'baseball_fielder_shortstop', 'baseball_fielder_left', 'baseball_fielder_center', 'baseball_fielder_right'], bottom: true},
        baseball_other: {genres: ['baseball_other_DH', 'baseball_other_PH', 'baseball_other_twoway', 'baseball_other_coach'], bottom: true},
        football: {genres: ['football_GK', 'football_FW', 'football_MF', 'football_DF'], bottom: false},
        football_GK: {genres: ['football_GK_GK'], bottom: true},
        football_FW: {genres: ['football_FW_CF', 'football_FW_WG', 'football_FW_ST'], bottom: true},
        football_MF: {genres: ['football_MF_AM', 'football_MF_CM', 'football_MF_LM', 'football_MF_RM', 'football_MF_DM'], bottom: true},
        football_DF: {genres: ['football_DF_RWB', 'football_DF_LWB', 'football_DF_CB', 'football_DF_RB', 'football_DF_LB', 'football_DF_SW'], bottom: true},
        trackfield: {genres: ['trackfield_short', 'trackfield_hurdle', 'trackfield_middle', 'trackfield_long', 'trackfield_relay', 
                    'trackfield_marathon', 'trackfield_walk', 'trackfield_jump', 'trackfield_throw', 'trackfield_mixed'], bottom: false},
        trackfield_short: {genres: ['trackfield_short_100m', 'trackfield_short_200m', 'trackfield_short_400m'], bottom: true},
        trackfield_hurdle: {genres: ['trackfield_hurdle_100m', 'trackfield_hurdle_110m', 'trackfield_hurdle_400m'], bottom: true},
        trackfield_middle: {genres: ['trackfield_middle_800m', 'trackfield_middle_1000m', 'trackfield_middle_1500m', 'trackfield_middle_1mile', 'trackfield_middle_3000mSC'], bottom: true},
        trackfield_long: {genres: ['trackfield_long_5000m', 'trackfield_long_10000m', 'trackfield_long_1h'], bottom: true},
        trackfield_relay: {genres: ['trackfield_relay_100m', 'trackfield_relay_200m', 'trackfield_relay_400m', 'trackfield_relay_800m'], bottom: true},
        trackfield_marathon: {genres: ['trackfield_marathon_1mile', 'trackfield_marathon_half', 'trackfield_marathon_full', 'trackfield_marathon_100km'], bottom: true},
        trackfield_walk: {genres: ['trackfield_walk_10000m', 'trackfield_walk_20000m', 'trackfield_walk_50000m', 'trackfield_walk_20km', 'trackfield_walk_50km'], bottom: true},
        trackfield_jump: {genres: ['trackfield_jump_high', 'trackfield_jump_pole', 'trackfield_jump_long', 'trackfield_jump_triple'], bottom: true},
        trackfield_throw: {genres: ['trackfield_throw_shotput', 'trackfield_throw_disk', 'trackfield_throw_hammer'], bottom: true},
        trackfield_mixed: {genres: ['trackfield_throw_javelin', 'trackfield_mixed_heptathlon', 'trackfield_mixed_decathlon'], bottom: true},
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

    // #region formSetting
    const { register, handleSubmit, formState: { errors } } = useForm<CboxData>({
        defaultValues: { sports: { main: [], sub1: [], sub2: [] } }
    });

    const [form, setform] = useState<{sports: string[]}>({
        sports: []
    });

    const [openMenu, setOpenMenu] = useState<string>('');
    
    const handleCheckSports = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fsp = form.sports;
        if (e.target.checked) {
            fsp.push(e.target.value);
        }
        else {
            fsp.splice(fsp.indexOf(e.target.value), 1);
        }
        setform({
            ...form,
            [e.target.name]: fsp
        });
    };

    const controlOpenMenu = (menu: string) => {
        if (openMenu.includes(menu)) {
            const lastIndex = menu.lastIndexOf('-');
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
                className={`text-center p-1 text-white rounded ${openMenu.includes(menu) ? "bg-fuchsia-600 hover:bg-fuchsia-500" : "bg-blue-600 hover:bg-blue-500" }`}>{label}</button>
    }

    const MenuInput = ({label, value, } : {label: string, value: string}) => {
        return <label htmlFor={`narrow-sports-${value}`} className="flex items-center rounded">
        <input id={`narrow-sports-${value}`} name="sports" type="checkbox" value={value}
        className="mr-2" />{label}</label>
    }

    const narrow = async () => {
        const genres = form.sports;
        const response = await fetch('/api/threads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ genres }),
        });

        if (response.ok) {
            const threadsdata = await response.json();
            setThreads(threadsdata);
        }
    };

    // #endregion

    return (
        <form className="h-full bg-gray-300 text-black
        transition-transform duration-300 ease-in-out">
            <div className="grid grid-cols-8">
            {Object.entries(menuMap).map(([key, value]) => (
            // もし最下層のメニューなら
            <>
            { key === 'sports' ?
                (<div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <p className="text-center">スポーツ</p>
                    {value.genres.map((genre) => ( <><MenuButton label={menuMapJP[genre]} menu={genre}/></> ))};
                </div>) :
                (<>
                {value.bottom ? 
                    (<>
                    {openMenu.includes(key) && 
                    <div className="col-span-2 flex flex-col space-y-1 pl-2">
                        <MenuInput label='すべて選択' value={key} />
                        {value.genres.map((genre) => ( <><MenuInput label={menuMapJP[genre]} value={genre}/></> ))};
                    </div>
                    }
                    </>) :
                    (<>
                    {openMenu.includes(key) && 
                    <div className="col-span-2 flex flex-col space-y-1 pl-2">
                        <MenuInput label='すべて選択' value={key} />
                        {value.genres.map((genre) => ( <><MenuButton label={menuMapJP[genre]} menu={genre}/></> ))};
                    </div>
                    }
                    </>)
                }
                </>)
            }
            </>
            ))}
            </div>
            <button type="button" onClick={narrow}
            className="fixed bottom-4 left-1/2 bg-blue-600 text-white rounded px-2 py-1 hover:bg-blue-500">
                検索
            </button>
        </form>
    );
}