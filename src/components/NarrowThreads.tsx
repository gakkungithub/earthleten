'use client';

import { useState } from 'react';

type formThreadsProp = {
    onSubmit: (genres: string[]) => void;
}

export default function NarrowThreads({ onSubmit }: formThreadsProp){
    const [form, setform] = useState({
        sports: ['baseball', 'football', 'trackfield']
    });
    
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

    const submit = async () => {
        onSubmit(form.sports);
    };
    
    const [openMenu, setOpenMenu] = useState<string>("");

    const openMenuHandler = (menu: string) => {
        setOpenMenu((openMenu === menu ? "" : menu));
    };

    return (
        <div className="grid grid-cols-12 gap-2 w-full h-screen">
            <div className="col-span-2 flex flex-col space-y-4">
                <button type="button" onClick={() => openMenuHandler('narrow')}
                className=" bg-blue-600 text-white rounded px-2 py-1 mr-2 hover:bg-blue-500">
                    絞り込み
                </button>
                <button type="button" onClick={() => openMenuHandler('add')}
                className=" bg-blue-600 text-white rounded px-2 py-1 mr-2 hover:bg-blue-500">
                    追加
                </button>
            </div>
            {openMenu === 'narrow' &&
            <form className="col-span-9 h-full bg-gray-300 text-black
            transition-transform duration-300 ease-in-out">
                <div>
                    <fieldset　className="ml-2 mt-1">
                    <legend className="text-1xl font-bold">スポーツ</legend>
                        <label htmlFor="sports_baseball" className="mr-2">野球</label>
                        <input id="sports_baseball" name="sports" type="checkbox" value="baseball"
                        checked={form.sports.includes('baseball')} 
                        onChange={handleCheckSports} /><br />
                        <label htmlFor="sports_football" className="mr-2">サッカー</label>
                        <input id="sports_football" name="sports" type="checkbox" value="football"
                        checked={form.sports.includes('football')} 
                        onChange={handleCheckSports} /><br />
                        <label htmlFor="sports_trackfield" className="mr-2">陸上</label>
                        <input id="sports_trackfield" name="sports" type="checkbox" value="trackfield"
                        checked={form.sports.includes('trackfield')} 
                        onChange={handleCheckSports} /><br />        
                    </fieldset>
                    <button type="button" onClick={submit}
                    className="fixed bottom-4 left-1/2 bg-blue-600 text-white rounded px-2 py-1 mr-2 hover:bg-blue-500">
                        検索
                    </button>
                </div>
            </form>
            }
            {openMenu === 'add' &&
            <form className="col-span-9 h-full bg-gray-300 text-black
            transition-transform duration-300 ease-in-out">
                {/* <div>
                    <fieldset　className="ml-2 mt-1">
                    <legend className="text-1xl font-bold">スポーツ</legend>
                        <label htmlFor="sports_baseball" className="mr-2">野球</label>
                        <input id="sports_baseball" name="sports" type="checkbox" value="baseball"
                        checked={form.sports.includes('baseball')} 
                        onChange={handleCheckSports} /><br />
                        <label htmlFor="sports_football" className="mr-2">サッカー</label>
                        <input id="sports_football" name="sports" type="checkbox" value="football"
                        checked={form.sports.includes('football')} 
                        onChange={handleCheckSports} /><br />
                        <label htmlFor="sports_trackfield" className="mr-2">陸上</label>
                        <input id="sports_trackfield" name="sports" type="checkbox" value="trackfield"
                        checked={form.sports.includes('trackfield')} 
                        onChange={handleCheckSports} /><br />        
                    </fieldset>
                    <button type="button" onClick={submit}
                    className="fixed bottom-4 left-1/2 bg-blue-600 text-white rounded px-2 py-1 mr-2 hover:bg-blue-500">
                        検索
                    </button>
                </div> */}
            </form>
            }
        </div>
    );
}

export function AddThreads(){

}

