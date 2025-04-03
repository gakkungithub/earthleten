'use client';

import { useState } from 'react';

export default function FormAddThreads(){
    // const [form, setform] = useState({
    //     sports: ['baseball', 'football', 'trackfield']
    // });
    
    // const handleCheckSports = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const fsp = form.sports;
    //     if (e.target.checked) {
    //         fsp.push(e.target.value);
    //     }
    //     else {
    //         fsp.splice(fsp.indexOf(e.target.value), 1);
    //     }
    //     setform({
    //         ...form,
    //         [e.target.name]: fsp
    //     });
    // };

    // const narrow = async () => {
    //     onSubmit(form.sports);
    // };

    return (
        <form className="h-full bg-gray-300 text-black
        transition-transform duration-300 ease-in-out">
            <div>
                <fieldset　className="pl-2">
                <legend className="text-1xl font-bold">スポーツ</legend>
                    <input id="add_sports_baseball" type="radio" name="sports" value="baseball" /> 
                    <label htmlFor="add_sports_baseball" className="m-2">野球</label><br />                     
                    <input id="add_sports_football" type="radio" name="sports" value="football" />
                    <label htmlFor="add_sports_football" className="m-2">サッカー</label><br />  
                    <input id="add_sports_trackfield" type="radio" name="sports" value="trackfield" /> 
                    <label htmlFor="add_sports_trackfield" className="m-2">陸上</label><br />    
                </fieldset>
            </div>
            <button type="button"
            className="fixed bottom-4 left-1/2 bg-blue-600 text-white rounded px-2 py-1 hover:bg-blue-500">
                登録
            </button>
        </form>
    );
}