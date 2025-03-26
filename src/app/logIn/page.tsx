'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
// 検証を担うリゾルバー
import { yupResolver } from '@hookform/resolvers/yup';
// 検証ルールを定義する属性を持つ
import * as yup from 'yup';

const schema = yup.object({
    name: yup
        .string()
        .required('ユーザー名を入力してください'),
    password: yup
        .string()
        .required('パスワードを入力してください'),
});

export default function LogInPage() {
    const [errormessage, setErrorMessage] = useState("");

    const defaultValues: {name: string, password: string} = {
        name: "",
        password: "",
    }
    const { register, handleSubmit,
        formState: { errors }} = useForm({ 
        defaultValues,
        resolver: yupResolver(schema), 
    });

    return (
    <div className="w-full">
        <h2 className="text-2xl text-black text-center">ログイン</h2>
        <form className="flex flex-col mx-auto justify-center space-y-2 p-2 w-2/3 md:w-1/2 lg:w-1/3 bg-gray-200">
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">ユーザー名</legend>
                <input id="username" type="text" className="border w-32 rounded" {...register('name')}/>
                <div>{errors.name?.message}</div>
            </fieldset>
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">パスワード</legend>
                <input id="password" type="password" className="border w-32 rounded" {...register('password')}/>
                <div>{errors.password?.message}</div>
            </fieldset>
            <div className="h-4">
                {errormessage &&
                <p>{errormessage}</p>
                }
            </div>
            <button type="submit" className=" bg-blue-600 text-white rounded p-2 w-fit m-auto hover:bg-blue-500">
                ログイン
            </button>
        </form>
    </div>
    );
}