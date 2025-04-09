'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
// 検証を担うリゾルバー
import { yupResolver } from '@hookform/resolvers/yup';
// 検証ルールを定義する属性を持つ
import * as yup from 'yup';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { editUserProfile } from '@/lib/actions'

import { useSession } from 'next-auth/react';

const validFileExtensions = ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'];

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
        .array()
        .of(yup
            .number()
            .nullable()
            .test('bdate', '正しい誕生日を入力してください', 
                (value, context) => {
                const [ year, month, day ] = context.parent;
                if (year && month && day) {
                    if ( year < 1908 || (month < 1 || month > 12)) {
                        return false;
                    }
    
                    const daysInMonth = new Date(year, month, 0).getDate();
                    
                    if (day < 1 || day > daysInMonth) {
                        return false;
                    }
                    return true;
                }
                return true;
                }
            )
        )
        .required(),
    height: yup
        .number()
        .label('身長')
        .required()
        .nullable()
        .transform((value) => ( value === "" ? null : value))
        .min(0.1, '${label}は{min}cm以上にしてください。')
        .max(272, '${label}は{max}cm以下にしてください'),
    weight: yup
        .number()
        .label('体重')
        .required()
        .nullable()
        .transform((value) => ( value === "" ? null : value))
        .min(0.1, '${label}は${min}kg以上にしてください。')
        .max(1000, '${label}は${max}kg以下にしてください。'),
    image: yup
        .mixed<FileList>()
        .test('image', '画像ファイルを選んでください',
            (value) => {
                if (value === undefined || value.length != 1) {
                    return true;
                }
                else {
                    const fileName = value[0].name.toLowerCase();
                    const fileExtension = fileName.split('.').pop();
                    return validFileExtensions.includes(fileExtension || '');
                }
            }
        )
});

type InputUserProfileValues = {
    name: string,
    gender: string,
    bdate: (number | null | undefined)[],
    height: number | null,
    weight: number | null,
    image?: FileList,
}

export default function EditProfilePage() {
    const [currentImage, setImage] = useState<string>("");
    const [errormessage, setErrorMessage] = useState<string>("");

    const { data: session, status } = useSession();
    const id = session?.user?.id || '';

    const defaultValues: InputUserProfileValues = {
        name: "",
        gender: "",
        bdate: [null, null, null],
        height: null,
        weight: null,
    }

    const { register, handleSubmit, setValue,
        formState: { errors } } = useForm<InputUserProfileValues>({
        defaultValues,
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const getUserProfileValues = async() => {
            if (status === "authenticated") {
                const response = await fetch('/api/editProfile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                });
        
                if (response.ok) {
                    const userProfile = await response.json();
                    const bdate = new Date (userProfile.bdate); 
                    
                    setValue('name', userProfile.name || "");
                    setValue('gender', userProfile.gender || "");
                    setValue('bdate', bdate instanceof Date ? 
                        [bdate.getFullYear() || null, bdate.getMonth() || null, bdate.getDate() || null] : [null, null, null]);
                    setValue('height', userProfile.height || "");
                    setValue('weight', userProfile.weight || "");
                    setImage(userProfile.image || "");
                }
                else {
                    setErrorMessage(await response.json());
                }
            }
        };
        getUserProfileValues();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // onSubmitは非同期処理Promiseを返すのでasyncが可能
    const onsubmit = async (data: InputUserProfileValues) => {
        const [year, month, day] = data.bdate;

        const userProfile = {
            id: id,
            name: data.name,
            gender: data.gender,
            bdate: (year !== null && month !== null && day !== null 
                    && year !== undefined && month !== undefined && day !== undefined) 
                    ? new Date(year, month, day) : null,
            height: data.height,
            weight: data.weight,
            image: currentImage,
        };

        // const abuff = await data.image?.[0].arrayBuffer()
        // if (abuff !== undefined) {
        //     console.log(Buffer.from(abuff));
        // }
        const result = await editUserProfile(userProfile);
        
        if (result.success) {
            redirect('/');
        }
        else {
            setErrorMessage(result.message || "");
        }
    };

    return (
    // legendは横並びにできない
    <div className="w-full">
        <h2 className="text-2xl text-black text-center">プロフィール設定</h2>
        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col mx-auto justify-center space-y-2 p-2 w-2/3 md:w-1/2 lg:w-1/3 bg-gray-200">
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">ユーザー名</legend>
                <input id="name" type="text" className="border w-32 rounded" {...register('name')}/>
                <div>{errors.name?.message}</div>
            </fieldset>
            <fieldset className="p-2 border bg-white">
                <legend className="text-center font-bold">性別</legend>
                <div className="w-fit m-auto">
                    <label htmlFor="gender-male" className="m-2">
                        <input id="gender-male" type="radio" value="male" {...register('gender')}/> 男性
                    </label><br />                    
                    <label htmlFor="gender-female" className="m-2">
                        <input id="gender-female" type="radio" value="female" {...register('gender')} /> 女性
                    </label><br /> 
                    <label htmlFor="gender-private" className="m-2">
                        <input id="gender-private" type="radio" value="private" {...register('gender')} /> 非公開
                    </label><br />
                </div>
                <div className="text-center">{errors.gender?.message}</div>
            </fieldset>
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">誕生日</legend>
                <div className="flex justify-center items-center">
                    <input id="bdate" type="number" step="1" className="border w-12 m-2" {...register('bdate.0')}/>
                    <p>年</p>
                    <input id="bdate" type="number" step="1" className="border w-12 m-2" {...register('bdate.1')}/>
                    <p>月</p>
                    <input id="bdate" type="number" step="1" className="border w-12 m-2" {...register('bdate.2')}/>
                    <p>日</p>                   
                </div>
                <div>{errors.bdate?.[0]?.message}</div>
            </fieldset>
            <fieldset className="p-2 border bg-white">
                <legend className="text-center font-bold">身長</legend>
                <div className="flex justify-center">
                    <input id="height" type="number" step="0.1" className="border w-12 mr-2" {...register('height')}/>
                    <p>cm</p>
                </div>
                <div>{errors.height?.message}</div>
            </fieldset>
            <fieldset className="p-2 border bg-white">
                <legend className="text-center font-bold">体重</legend>
                <div className="flex justify-center">
                    <input id="weight" type="number" step="0.1" className="border w-12 mr-2" {...register('weight')}/>
                    <p>kg</p>
                </div>
                <div>{errors.weight?.message}</div>
            </fieldset>
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">自画像</legend>
                <div className="mx-auto mb-4 h-16 w-16 rounded-full border">
                    {currentImage !== "" &&
                    <Image src={currentImage} alt="" width={64} height={64} className="m-auto rounded-full"/>
                    }
                </div>
                <label htmlFor="self-image" className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">画像を選択</label>
                <input id="self-image" type="file" accept="image/*" className="hidden" {...register('image', 
                    {onChange: (e) => {
                        const file = e.currentTarget.files ? window.URL.createObjectURL(e.currentTarget.files[0]) : currentImage;
                        setImage((prevImage) => file || prevImage)
                    }})}/>
                <div>{errors.image?.message}</div>
            </fieldset>
            <div className="h-4">
                {errormessage &&
                <p>{errormessage}</p>
                }
            </div>
            <button type="submit" className=" bg-orange-400 text-white rounded p-2 w-fit m-auto hover:bg-orange-300">
                登録
            </button>
        </form>
    </div>
    );
}