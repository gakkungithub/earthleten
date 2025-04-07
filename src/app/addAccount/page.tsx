'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

// 検証を担うリゾルバー
import { yupResolver } from '@hookform/resolvers/yup';
// 検証ルールを定義する属性を持つ
import * as yup from 'yup';

import { redirect } from 'next/navigation';
import { addUser } from '@/lib/actions'

import { getHash } from '@/lib/getter';

const schema = yup.object({
    name: yup
        .string()
        .label('ユーザーネーム')
        .required('${label}を入力してください。')
        .max(20, '${label}は${max}文字以内にしてください。'),
    password: yup
        .string()
        .label('パスワード')
        .required('${label}を入力してください。')
        .min(10, '${label}は${min}文字以上にしてください。')
        .max(32, '${label}は${max}文字以内にしてください。')
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).+$/, '${label}には英字、数字、記号をそれぞれ1つ以上含めてください。'),
    passwordConfirm: yup
        .string()
        .label('確認用パスワード')
        .required('${label}を入力してください。')
});

type InputUserValues = {
    name: string,
    password: string,
    passwordConfirm: string,
}

// hookを使う関数は最初が大文字になる必要がある
export default function AddAccountPage() {
    const [errormessage, setErrorMessage] = useState<string>("");

    const defaultValues: InputUserValues = {
        name: "",
        password: "",
        passwordConfirm: "",
    }

    const { register, handleSubmit,
        formState: { errors } } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

    const onsubmit = async (data: InputUserValues) => {
        if (data.password !== data.passwordConfirm) {
            setErrorMessage("パスワードと確認用パスワードが合致していません");
        }
        
        else {
            const hashedPass = await getHash(data.password);

            const userData = {
                name: data.name,
                password: hashedPass,
                image: "",
            }

            const result = await addUser(userData);

            if (result.success) {
                redirect('/');
            }
            else {
                setErrorMessage(result.message || "");
            }
        }
    }

    return (
    <div className="w-full">
        <h2 className="text-2xl text-black text-center">アカウント登録</h2>
        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col mx-auto justify-center space-y-2 p-2 w-2/3 md:w-1/2 lg:w-1/3 bg-gray-200">
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">ユーザー名</legend>
                <input id="name" type="text" className="border w-32 rounded" {...register('name')}/>
                <div>{errors.name?.message}</div>
            </fieldset>
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">パスワード</legend>
                <input id="password" type="password" className="border w-32 rounded" {...register('password')}/>
                <div>{errors.password?.message}</div>
            </fieldset>
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">確認用パスワード</legend>
                <input id="password-confirm" type="password" className="border w-32 rounded" {...register('passwordConfirm')}/>
                <div>{errors.passwordConfirm?.message}</div>
            </fieldset>
            <div className="h-4">
                {errormessage &&
                <p>{errormessage}</p>
                }
            </div>
            <button type="submit" className=" bg-blue-600 text-white rounded p-2 w-fit m-auto hover:bg-blue-500">
                登録
            </button>
        </form>
    </div>
    )
}