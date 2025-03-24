'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
// 検証を担うリゾルバー
import { yupResolver } from '@hookform/resolvers/yup';
// 検証ルールを定義する属性を持つ
import * as yup from 'yup';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { addUser } from '@/lib/actions'

// yup定義をファイル化するかどうかは後で決める
const schema = yup.object({
    name: yup
        .string()
        .label('ユーザーネーム')
        .required('${label}は必須入力です。')
        .max(20, '${label}は${max}文字以内で入力してください。'),
    gender: yup
        .string()
        .label('性別')
        .required('いずれかの${label}を選んでください。'),
    bdate: yup
        .date()
        .label('誕生日')
        .min(new Date('1908-05-23'), '${label}は{min}以降にしてください。')
        .max(new Date(), '${label}は{max}以前にしてください。'),
    height: yup
        .number()
        .label('身長')
        .min(0.1, '${label}は{min}cm以上にしてください。')
        .max(272, '${label}は{max}cm以下にしてください'),
    weight: yup
        .number()
        .label('体重')
        .min(0.1, '${label}は${min}kg以上にしてください。')
        .max(1000, '${label}は${max}kg以下にしてください。'),
    image: yup
        .mixed<File>()
        .test('image', '画像ファイルを選んでください',
            (value) => {
                if (!value) return true;
                return value.type.startsWith('/image/');
            }
        )
});

type InputUserValues = {
    name: string,
    gender: string,
    bdate?: Date,
    height?: number,
    weight?: number,
    image?: File,
}

export default function SignInPage(){
    const [errormessage, setErrorMessage] = useState<string>("");

    const { register, handleSubmit, getValues,
        formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    // onSubmitは非同期処理Promiseを返すのでasyncが可能
    const onsubmit = async (data: InputUserValues) => {
        const result = await addUser(data);
        
        if (result.success) {
            redirect('/');
        }
        else {
            setErrorMessage(result.message);
        }
    };

    return (
    // legendは横並びにできない
    <div className="w-full">
        <h2 className="text-2xl text-black text-center">サインイン</h2>
        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col mx-auto justify-center space-y-2 p-2 w-1/2 md:w-1/3 lg:w-1/4 bg-gray-200">
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">ユーザー名</legend>
                <input id="username" type="text" className="border w-32 rounded" {...register('name')}/>
            </fieldset>
            <fieldset className="p-2 border bg-white">
                <legend className="text-center font-bold">性別</legend>
                <div className="w-fit m-auto">
                    <label htmlFor="gender_male" className="m-2">
                        <input id="gender_male" type="radio" value="male" {...register('gender')}/> 男性
                    </label><br />                    
                    <label htmlFor="gender_female" className="m-2">
                        <input id="gender_female" type="radio" value="female" {...register('gender')} /> 女性
                    </label><br /> 
                    <label htmlFor="gender_private" className="m-2">
                        <input id="gender_private" type="radio" value="private" {...register('gender')} /> 非公開
                    </label><br />
                </div>
            </fieldset>
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">誕生日</legend>
                <input id="birthdate" type="date" className="border" {...register('bdate')}/>
            </fieldset>
            <fieldset className="p-2 border bg-white">
                <legend className="text-center font-bold">身長</legend>
                <div className="flex justify-center">
                    <input id="height" type="number" defaultValue="160" step="0.1" min="0.1" max="270" className="border w-12 mr-2" {...register('height')}/>
                    <p>cm</p>
                </div>
            </fieldset>
            <fieldset className="p-2 border bg-white">
                <legend className="text-center font-bold">体重</legend>
                <div className="flex justify-center">
                    <input id="weight" type="number" defaultValue="55" step="0.1" min="0.1" max="1000" className="border w-12 mr-2" {...register('weight')}/>
                    <p>kg</p>
                </div>
            </fieldset>
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">自画像</legend>
                <div className="mx-auto mb-4 h-16 w-16 rounded-full border">
                    {getValues('image') &&
                    <Image src={window.URL.createObjectURL(getValues('image'))} alt="" width={64} height={64} className="m-auto rounded-full"/>
                    }
                </div>
                <label htmlFor="selfImage" className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">画像を選択</label>
                <input id="selfImage" type="file" accept="image/*" className="hidden" {...register('image')}/>
            </fieldset>
            <div className="h-4">
                {errormessage &&
                <p>{errormessage}</p>
                }
            </div>
            <button type="submit" className=" bg-orange-400 text-white rounded p-2 w-fit m-auto hover:bg-orange-300">
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