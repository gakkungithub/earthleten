'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Image from 'next/image';
import MenuNarrow from '@/components/MenuNarrow';

import { redirect } from 'next/navigation';

const validFileExtensions = ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'];

const schema = yup.object({
    title: yup
        .string()
        .label('タイトル')
        .required('${label}は必須入力です。')
        .max(80, '${label}は${max}文字以内で入力してください。'),
    comment1: yup
        .string()
        .required('最初のコメントを入力しましょう!!'),
    topImageList: yup
        .mixed<FileList>()
        .test('image', '画像ファイルを選んでください',
            (value) => {
                if (value === undefined || value.length !== 1) {
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

type threadDataValues = {
    title: string, 
    comment1: string, 
    topImageList?: FileList, 
}

export default function AddThreadsPage(){
    const { data: session, status } = useSession();
    const uid = session?.user?.id || '';

    const [genres, setGenres] = useState<string[]>([]);

    // #region imageController
    const [topImageList, setTopImageList] = useState<string[]>([]);

    const setTopImageListOnChange = async (imageList: FileList | null) => {
        if (imageList) {
            const prevImageList = topImageList;
            setTopImageList([...prevImageList, window.URL.createObjectURL(imageList[0])]);
        }
    }

    const deleteTopImage = async (imageName: string) => {
        setTopImageList(prevTopImageList => prevTopImageList.filter(image => image !== imageName))
    }

    // #endregion

    // #region videoController
    const [topVideo, setTopVideo] = useState<string>("");

    // #endregion

    const { register, handleSubmit,
        formState: { errors, isDirty } } = useForm<threadDataValues>({
        defaultValues: {title: "", comment1: "",},
        resolver: yupResolver(schema),
    });

    const onsubmit = async (data: threadDataValues) => {
        
        const threadData = {
            uid: uid,
            title: data.title,
            comment1: data.comment1,
            genres: genres,
            topImageList: topImageList,
        }

        const response = await fetch('/api/threads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({threadData}),
        });
        
        if (response.ok) {
            redirect('/threads');
        }
        else {
            // ここにエラーメッセージ表示用の関数を置く
        }
    };

    return (
        <div className="h-fit pb-15 bg-gray-300 text-black z-2 
        transition-transform duration-300 ease-in-out relative">
        <form onSubmit={handleSubmit(onsubmit)} className="h-fit w-full">
            <div className="mx-2">
                <fieldset className="p-2 border text-center bg-white">
                    <legend className="font-bold">タイトル</legend> 
                    <input id="add_sports_title" type="text" placeholder="タイトル" 
                    {...register('title')} className="border-2" />
                </fieldset>
                <fieldset className="p-2 border text-center bg-white">
                    <legend className="font-bold">コメント</legend>
                    <input id="add_sports_comment1" type="textarea" placeholder="最初のコメント" 
                    {...register('comment1')} className="border-2" /> 
                </fieldset>
                <fieldset className="border text-center py-2 bg-white w-full">
                    <legend className="font-bold">トップ画像</legend>
                    {topImageList.length >= 1 &&
                        <div className="flex w-full my-4 py-4 items-center overflow-x-auto border-y-2">
                            {topImageList.map((image) => (
                            <div key={image} className="relative mx-4 shrink-0">
                                <Image src={image} alt="" width={128} height={128} className="h-auto"/>
                                <button onClick={() => deleteTopImage(image)}
                                className="absolute top-0 right-0 w-4 h-4 rounded-full bg-gray-400 text-white text-2xl leading-4">
                                &times;</button>
                            </div>
                            ))}
                        </div>
                    }
                    <label htmlFor="add_sports_topImageList" className={`cursor-pointer px-4 py-2 text-white rounded
                        ${topImageList.length >= 4 ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-500"}`}>画像を追加</label>
                    <input id="add_sports_topImageList" type="file" accept="image/*"
                    {...register('topImageList', {onChange: (e) => {
                        setTopImageListOnChange(e.currentTarget.files);}}
                    )}
                    disabled={topImageList.length >= 4 ? true : false} className="hidden" />
                    <p className="my-4">選択中: {topImageList.length}/4</p>
                </fieldset>
                {
                // #region videoField 
                }
                {/* <fieldset className="border text-center py-2 bg-white w-full">
                    <legend className="font-bold">トップ動画</legend>
                    <label htmlFor="add_sports_topVideo" className={`cursor-pointer px-4 py-2 text-white rounded
                        ${topVideo !== "" ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-500"}`}>動画を投稿</label>
                    <input id="add_sports_topVideo" type="file" accept="video/*" name="topVideo"
                    onChange={(e) => {
                        const file = e.currentTarget.files?.item(0);

                        if (file) {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            console.log(reader);
                            reader.onload = () => {
                                console.log(reader.result);
                                setTopVideo(reader.result as string);
                            };
                        }
                    }}
                    disabled={topVideo !== "" ? true : false} className="hidden" />
                    {topVideo !== "" &&
                    <video width={240} height={160} controls preload="none" className="mx-auto">
                        <source src={topVideo} type="video/*" />
                        お使いのブラウザでは動画を再生できません。
                    </video>
                    }
                </fieldset> */}
                {
                // #endregion 
                }
            </div>
            <button type="submit" disabled={!isDirty}
            className={`absolute bottom-2 left-0 right-0 w-fit mx-auto text-white rounded p-2
            ${isDirty ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-300"}`}>
                登録
            </button>
        </form>
        <MenuNarrow setGenres={setGenres}/>
        </div>
    );
}