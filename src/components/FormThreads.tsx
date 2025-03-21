'use client';

import { useState } from 'react';

type formThreadsProp = {
    onSubmit: (genres: string[]) => void;
}

export default function FormThreads({ onSubmit }: formThreadsProp){
    const [form, setform] = useState({
        sports: ['野球', 'サッカー', '陸上']
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
        toggleDrawer();
    };
    
    const [show, setShow] = useState<boolean>(false)
    const toggleDrawer = () => {
        setShow(!show);
    };

    return (
        <div>
        {!show && 
        <button type="button" onClick={toggleDrawer}
        className="top-4 left-4 bg-blue-600 text-white rounded px-2 py-1 mr-2 hover:bg-blue-500">
            絞り込み
        </button>
        }
        {show && 
        <div>
            <form className="top-0 left-0 h-full bg-gray-100 text-black
            transition-transform duration-300 ease-in-out">
                <button type="button" onClick={toggleDrawer}
                className=" bg-blue-600 text-white rounded px-2 py-1 mr-2 hover:bg-blue-500">
                    閉じる
                </button>
                <fieldset　className="ml-2 mt-1">
                <legend className="text-1xl font-bold">スポーツ</legend>
                    <label htmlFor="sports_baseball">野球</label>
                    <input id="sports_baseball" name="sports" type="checkbox" value="baseball"
                    checked={form.sports.includes('野球')} 
                    onChange={handleCheckSports} /><br />
                    <label htmlFor="sports_football">サッカー</label>
                    <input id="sports_football" name="sports" type="checkbox" value="football"
                    checked={form.sports.includes('サッカー')} 
                    onChange={handleCheckSports} /><br />
                    <label htmlFor="sports_trackfield">陸上</label>
                    <input id="sports_trackfield" name="sports" type="checkbox" value="trackfield"
                    checked={form.sports.includes('陸上')} 
                    onChange={handleCheckSports} /><br />        
                </fieldset>
                <button type="button" onClick={submit}
                className="mx-auto bg-blue-600 text-white rounded px-2 py-1 mr-2 hover:bg-blue-500">
                    検索
                </button>
            </form>
        </div>
        }
        </div>
    );
}

