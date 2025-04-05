'use client';

import { useState } from 'react';
import { Thread } from '@/typeDeclar/typeComp';

import { Dispatch, SetStateAction } from 'react';

export default function FormNarrowThreads({ setThreads }: {
    setThreads: Dispatch<SetStateAction<Thread[]>>;
}){
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

    const MenuInput = ({label, id, value, } : {label: string, id: string, value: string}) => {
        return <label htmlFor={`narrow-sports-${id}`} className="flex items-center rounded">
        <input id={`narrow-sports-${id}`} name="sports" type="checkbox" value={value}
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

    return (
        <form className="h-full bg-gray-300 text-black
        transition-transform duration-300 ease-in-out">
            <div className="grid grid-cols-8">
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <p className="text-center">スポーツ</p>
                    <MenuButton label='野球' menu='baseball' />
                    <MenuButton label='サッカー' menu='football' />
                    <MenuButton label='陸上' menu='trackfield' />
                </div>
                {
                // #region sports
                }
                {openMenu.includes('baseball') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-baseball" className="flex items-center rounded">
                    <input id="narrow-sports-baseball" name="sports" type="checkbox" value="baseball"
                    checked={form.sports.includes('baseball')} onChange={handleCheckSports} className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='投手' menu='baseball-pitcher' />
                    <MenuButton label='野手' menu='baseball-fielder' />
                    <MenuButton label='その他' menu='baseball-other' />
                </div>
                }
                {openMenu.includes('football') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-football" className="flex items-center rounded">
                    <input id="narrow-sports-football" name="sports" type="checkbox" value="football"
                    checked={form.sports.includes('football')} onChange={handleCheckSports} className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='GK' menu='football-GK' />
                    <MenuButton label='FW' menu='football-FW' />
                    <MenuButton label='MF' menu='football-MF' />
                    <MenuButton label='DF' menu='football-DF' />
                </div>
                }
                {openMenu.includes('trackfield') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-trackfield" className="flex items-center rounded">
                    <input id="narrow-sports-trackfield" name="sports" type="checkbox" value="trackfield"
                    checked={form.sports.includes('trackfield')} onChange={handleCheckSports} className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='短距離' menu='trackfield-short' />
                    <MenuButton label='ハードル' menu='trackfield-hurdle' />
                    <MenuButton label='中距離' menu='trackfield-middle' />
                    <MenuButton label='長距離' menu='trackfield-long' />
                    <MenuButton label='リレー' menu='trackfield-relay' />
                    <MenuButton label='マラソン' menu='trackfield-marathon' />
                    <MenuButton label='競歩' menu='trackfield-walk' />
                    <MenuButton label='跳躍' menu='trackfield-jump' />
                    <MenuButton label='投てき' menu='trackfield-throw' />
                    <MenuButton label='混成競技' menu='trackfield-mixed' />
                </div>
                }
                {
                // #endregion
                }
                {
                // #region sports-sub1
                }
                {
                // #region baseball
                }
                {openMenu.includes('baseball-pitcher') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-baseball-pitcher" className="flex items-center rounded">
                    <input id="narrow-sports-baseball-pitcher" name="sports" type="checkbox" value="baseball-pitcher"
                    className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='先発' menu='baseball-pitcher-starter' />
                    <MenuButton label='中継ぎ' menu='baseball-pitcher-setupman' />
                    <MenuButton label='抑え' menu='baseball-pitcher-closer' />
                </div>
                }
                {openMenu.includes('baseball-fielder') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-baseball-fielder" className="flex items-center rounded">
                    <input id="narrow-sports-baseball-fielder" name="sports" type="checkbox" value="baseball-fielder"
                    className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='キャッチャー' menu='baseball-fielder-catcher' />
                    <MenuButton label='ファースト' menu='baseball-fielder-first' />
                    <MenuButton label='セカンド' menu='baseball-fielder-second' />
                    <MenuButton label='サード' menu='baseball-fielder-third' />
                    <MenuButton label='ショート' menu='baseball-fielder-shortstop' />
                    <MenuButton label='レフト' menu='baseball-fielder-left' />
                    <MenuButton label='センター' menu='baseball-fielder-center' />
                    <MenuButton label='ライト' menu='baseball-fielder-right' />
                </div>
                }
                {openMenu.includes('baseball-other') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-baseball-other" className="flex items-center rounded">
                    <input id="narrow-sports-baseball-other" name="sports" type="checkbox" value="baseball-other"
                    className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='DH' menu='baseball-other-DH' />
                    <MenuButton label='PH' menu='baseball-other-PH' />
                    <MenuButton label='二刀流' menu='baseball-other-twoway' />
                    <MenuButton label='監督' menu='baseball-other-coach' />
                </div>
                }
                { 
                // #endregion
                }
                {
                // #region football
                }
                {openMenu.includes('football-GK') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-football-GK" className="flex items-center rounded">
                    <input id="narrow-sports-football-GK" name="sports" type="checkbox" value="football-GK"
                    className="mr-2" />
                    すべて選択</label>
                    {/* <MenuButton label='先発' menu='baseball-pitcher-starter' />
                    <MenuButton label='中継ぎ' menu='baseball-pitcher-setupman' />
                    <MenuButton label='抑え' menu='baseball-pitcher-closer' /> */}
                </div>
                }
                {openMenu.includes('football-FW') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-football-FW" className="flex items-center rounded">
                    <input id="narrow-sports-football-FW" name="sports" type="checkbox" value="football-FW"
                    className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='CF' menu='football-FW-CF' />
                    <MenuButton label='WG' menu='football-FW-WG' />
                    <MenuButton label='ST' menu='football-FW-ST' />
                </div>
                }
                {openMenu.includes('football-MF') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-football-MF" className="flex items-center rounded">
                    <input id="narrow-sports-football-MF" name="sports" type="checkbox" value="football-MF"
                    className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='AM' menu='football-MF-AM' />
                    <MenuButton label='CM' menu='football-MF-CM' />
                    <MenuButton label='LM' menu='football-MF-LM' />
                    <MenuButton label='RM' menu='football-MF-RM' />
                    <MenuButton label='DM' menu='football-MF-DM' />
                </div>
                }
                {openMenu.includes('football-DF') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-football-DF" className="flex items-center rounded">
                    <input id="narrow-sports-football-DF" name="sports" type="checkbox" value="football-DF"
                    className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='RWB' menu='football-DF-RWB' />
                    <MenuButton label='LWB' menu='football-DF-LWB' />
                    <MenuButton label='CB' menu='football-DF-CB' />
                    <MenuButton label='RB' menu='football-DF-RB' />
                    <MenuButton label='LB' menu='football-DF-LB' />
                    <MenuButton label='SW' menu="football-DF-SW" />
                </div>
                }
                { 
                // #endregion
                }
                {
                // #region trackfield
                }
                {openMenu.includes('trackfield-short') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-trackfield-short" className="flex items-center rounded">
                    <input id="narrow-sports-trackfield-short" name="sports" type="checkbox" value="trackfield-short"
                    className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='100m' menu='trackfield-short-100m' />
                    <MenuButton label='200m' menu='trackfield-short-200m' />
                    <MenuButton label='400m' menu='trackfield-short-400m' />
                </div>
                }
                {openMenu.includes('trackfield-hurdle') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-trackfield-hurdle" className="flex items-center rounded">
                    <input id="narrow-sports-trackfield-hurdle" name="sports" type="checkbox" value="trackfield-hurdle"
                    className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='100mハードル' menu='trackfield-hurdle-100m' />
                    <MenuButton label='110mハードル' menu='trackfield-hurdle-110m' />
                    <MenuButton label='400mハードル' menu='trackfield-hurdle-400m' />
                </div>
                }
                {openMenu.includes('trackfield-middle') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-trackfield-middle" className="flex items-center rounded">
                    <input id="narrow-sports-trackfield-middle" name="sports" type="checkbox" value="trackfield-middle"
                    className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='800m' menu='trackfield-middle-800m' />
                    <MenuButton label='1000m' menu='trackfield-middle-1000m' />
                    <MenuButton label='1500m' menu='trackfield-middle-1500m' />
                    <MenuButton label='1マイル' menu='trackfield-middle-1mile' />
                    <MenuButton label='2000m' menu='trackfield-middle-2000m' />
                    <MenuButton label='3000m' menu='trackfield-middle-1mile' />
                    <MenuButton label='3000m障害' menu='trackfield-middle-3000mSC' />
                </div>
                }
                {openMenu.includes('trackfield-long') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-trackfield-long" className="flex items-center rounded">
                    <input id="narrow-sports-trackfield-long" name="sports" type="checkbox" value="trackfield-long"
                    className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='5000m' menu='trackfield-long-5000m' />
                    <MenuButton label='10000m' menu='trackfield-long-10000m' />
                    <MenuButton label='1時間' menu='trackfield-long-1h' />
                </div>
                }
                {openMenu.includes('trackfield-relay') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-trackfield-relay" className="flex items-center rounded">
                    <input id="narrow-sports-trackfield-relay" name="sports" type="checkbox" value="trackfield-relay"
                    className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='4×100m' menu='trackfield-relay-100m' />
                    <MenuButton label='4×200m' menu='trackfield-relay-200m' />
                    <MenuButton label='4×400m' menu='trackfield-relay-400m' />
                    <MenuButton label='4×800m' menu='trackfield-relay-800m' />
                </div>
                }
                {openMenu.includes('trackfield-marathon') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-trackfield-marathon" className="flex items-center rounded">
                    <input id="narrow-sports-trackfield-marathon" name="sports" type="checkbox" value="trackfield-marathon"
                    className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='1マイル' menu='trackfield-marathon-1mile' />
                    <MenuButton label='ハーフ' menu='trackfield-marathon-half' />
                    <MenuButton label='フル' menu='trackfield-marathon-full' />
                    <MenuButton label='100km' menu='trackfield-marathon-100km' />
                </div>
                }
                {openMenu.includes('trackfield-walk') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-trackfield-walk" className="flex items-center rounded">
                    <input id="narrow-sports-trackfield-walk" name="sports" type="checkbox" value="trackfield-walk"
                    className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='10000m' menu='trackfield-walk-10000m' />
                    <MenuButton label='20000m' menu='trackfield-walk-20000m' />
                    <MenuButton label='50000m' menu='trackfield-walk-50000m' />
                    <MenuButton label='20km' menu='trackfield-walk-20km' />
                    <MenuButton label='50km' menu='trackfield-walk-50km' />
                </div>
                }
                {openMenu.includes('trackfield-jump') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-trackfield-jump" className="flex items-center rounded">
                    <input id="narrow-sports-trackfield-jump" name="sports" type="checkbox" value="trackfield-jump"
                    className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='走高跳' menu='trackfield-jump-high' />
                    <MenuButton label='棒高跳' menu='trackfield-pole' />
                    <MenuButton label='走幅跳' menu='trackfield-long' />
                    <MenuButton label='三段跳' menu='trackfield-triple' />
                </div>
                }
                {openMenu.includes('trackfield-throw') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-trackfield-throw" className="flex items-center rounded">
                    <input id="narrow-sports-trackfield-throw" name="sports" type="checkbox" value="trackfield-throw"
                    className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='砲丸投' menu='trackfield-throw-shotput' />
                    <MenuButton label='円盤投' menu='trackfield-throw-disk' />
                    <MenuButton label='ハンマー投' menu='trackfield-throw-hammer' />
                    <MenuButton label='やり投' menu='trackfield-throw-javelin' />
                </div>
                }
                {openMenu.includes('trackfield-mixed') &&
                <div className="col-span-2 flex flex-col space-y-1 pl-2">
                    <label htmlFor="narrow-sports-trackfield-mixed" className="flex items-center rounded">
                    <input id="narrow-sports-trackfield-mixed" name="sports" type="checkbox" value="trackfield-mixed"
                    className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='七種競技' menu='trackfield-mixed-heptathlon' />
                    <MenuButton label='十種競技' menu='trackfield-mixed-decathlon' />
                </div>
                }
                { 
                // #endregion
                }
                {
                // #endregion
                }
            </div>
            <button type="button" onClick={narrow}
            className="fixed bottom-4 left-1/2 bg-blue-600 text-white rounded px-2 py-1 hover:bg-blue-500">
                検索
            </button>
        </form>
    );
}