'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function SignInPage(){
    const [selectedImage, setImage] = useState<File>();

    return (
    // legendは横並びにできない
    <div className="w-full">
        <h2 className="text-2xl text-black text-center">サインイン</h2>
        <form className="flex flex-col mx-auto justify-center space-y-2 p-2 w-1/2 md:w-1/3 lg:w-1/4 bg-gray-200">
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">ユーザー名</legend>
                <input id="username" type="text" name="name" className="border w-32 rounded" />
            </fieldset>
            <fieldset className="p-2 border bg-white">
                <legend className="text-center font-bold">性別</legend>
                <div className="w-fit m-auto">
                    <label htmlFor="gender_male" className="m-2"><input id="gender_male" type="radio" name="gender" value="male" /> 男性</label><br />                    
                    <label htmlFor="gender_female" className="m-2"><input id="gender_female" type="radio" name="gender" value="female" /> 女性</label><br /> 
                    <label htmlFor="gender_other" className="m-2"><input id="gender_other" type="radio" name="gender" value="other" /> その他</label><br />
                </div>
            </fieldset>
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">誕生日</legend>
                <input id="birthdate" type="date" name="bdate" className="border" />
            </fieldset>
            <fieldset className="p-2 border bg-white">
                <legend className="text-center font-bold">身長</legend>
                <div className="flex justify-center">
                    <input id="height" type="number" name="height" defaultValue="160" step="0.1" min="30" max="270" className="border w-12 mr-2" />
                    <p>cm</p>
                </div>
            </fieldset>
            <fieldset className="p-2 border bg-white">
                <legend className="text-center font-bold">体重</legend>
                <div className="flex justify-center">
                    <input id="weight" type="number" name="weight" defaultValue="55" step="0.1" min="0" max="700" className="border w-12 mr-2" />
                    <p>kg</p>
                </div>
            </fieldset>
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">自画像</legend>
                <div className="mx-auto mb-4 h-16 w-16 rounded-full border">
                    {selectedImage &&
                    <Image src={window.URL.createObjectURL(selectedImage)} alt="" width={64} height={64} className="m-auto rounded-full"/>
                    }
                </div>
                <label htmlFor="selfImage" className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">画像を選択</label>
                <input id="selfImage" type="file" accept="image/*" onChange={(e) => (e.currentTarget.files ? setImage(e.currentTarget.files[0]) : setImage(selectedImage))} className="hidden" />
            </fieldset>
            <button type="button"
                className=" bg-orange-400 text-white rounded p-2 w-fit m-auto hover:bg-orange-300">
                サインイン
            </button>
        </form>
    </div>
    );
}

// export async function addUser(data: inputUserProp){
//         try {
//             const user = await prisma.User.create({
//                 name: data.name,
//                 gender: data.gender,
//                 bdate: data.bdate,
//                 height: data.height,
//                 weight: data.weight,
//                 image: data.image
//             });
//             return { success: true, message: `ようこそ ${user.name} さん!!`}
//         } catch (error) {
//             if (error instanceof PrismaClientKnownRequestError) {
//                 if (error.code === 'P2002') {
//                     return { success: false, message: `ユーザー名 ${data.name} は既に使われています` };
//                 }
//                 else {
//                     return { success: false, message: "予期せぬPrism内のエラーが生じました" };
//                 }
//             }
//             else {
//                 return { success: false, message: "予期せぬエラーが生じました" };
//             }
//         }
//     }