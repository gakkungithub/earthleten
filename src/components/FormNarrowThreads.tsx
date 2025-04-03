'use client';

import { useState } from 'react';
import { Thread } from '@/typeDeclar/typeComp';

import { Dispatch, SetStateAction } from 'react';

export default function FormNarrowThreads({ setThreads }: {
    setThreads: Dispatch<SetStateAction<Thread[]>>;
}){
    const [form, setform] = useState({
        sports: ['baseball', 'football', 'trackfield']
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
        // menu === 'aaa' or 'aaa-bbb' openMenu === 'aaa-bbb' => 
        if (menu === openMenu) {
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
                className={` text-center p-1 text-white rounded ${openMenu.includes(menu) ? "bg-fuchsia-600 hover:bg-fuchsia-500" : "bg-blue-600 hover:bg-blue-500" }`}>{label}</button>
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
                {openMenu.includes('baseball') &&
                <div className="col-span-2 flex flex-col space-y-1 px-2">
                    <label htmlFor="narrow_sports_baseball" className="flex items-center rounded">
                    <input id="narrow_sports_baseball" name="sports" type="checkbox" value="baseball"
                    checked={form.sports.includes('baseball')} onChange={handleCheckSports} className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='投手' menu='baseball-pitcher' />
                    <MenuButton label='野手' menu='baseball-fielder' />
                    <MenuButton label='二刀流' menu='baseball-twoway' />
                </div>
                }
                {openMenu.includes('football') &&
                <div className="col-span-2 flex flex-col space-y-1 px-2">
                    <label htmlFor="narrow_sports_football" className="flex items-center rounded">
                    <input id="narrow_sports_football" name="sports" type="checkbox" value="football"
                    checked={form.sports.includes('football')} onChange={handleCheckSports} className="mr-2" />
                    すべて選択</label>
                    <MenuButton label='GK' menu='football-GK' />
                    <MenuButton label='FW' menu='football-FW' />
                    <MenuButton label='MF' menu='football-MF' />
                    <MenuButton label='DF' menu='football-DF' />
                </div>
                }
                {openMenu.includes('trackfield') &&
                <div className="col-span-2 flex flex-col space-y-1 px-2">
                    <label htmlFor="narrow_sports_trackfield" className="flex items-center rounded">
                    <input id="narrow_sports_trackfield" name="sports" type="checkbox" value="trackfield"
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
                    <MenuButton label='混成競技' menu='trackfield-mix' />
                </div>
                }
            </div>
            <button type="button" onClick={narrow}
            className="fixed bottom-4 left-1/2 bg-blue-600 text-white rounded px-2 py-1 hover:bg-blue-500">
                検索
            </button>
        </form>
    );
}