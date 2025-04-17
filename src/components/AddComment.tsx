'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Image from 'next/image';

import { redirect } from 'next/navigation'

const validFileExtensions = ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'];

const schema = yup.object({
    comment: yup
        .string()
        // .label('コメント')
        .required('コメントは必須入力です。'),
    commentImageList: yup
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

type CommentDataValues = {
    comment: string,
    imageList?: FileList,
}

export default function AddComment({uid, tid}: {uid: string, tid: string}) {
    const [commentImageList, setImageList] = useState<string[]>([]);

    const setCommentImageListOnChange = async (imageList: FileList | null) => {
        if (imageList) {
            const prevImageList = commentImageList;
            setImageList([...prevImageList, window.URL.createObjectURL(imageList[0])]);
        }
    }

    const deleteCommentImage = async (imageName: string) => {
        setImageList(prevCommentImageList => prevCommentImageList.filter(image => image !== imageName))
    }

    const { register, handleSubmit, setValue,
        formState: { errors, isDirty } } = useForm<CommentDataValues>({
        defaultValues: {comment: "",},
        resolver: yupResolver(schema),
    });

    const onsubmit = async (data: CommentDataValues) => {
        
        const commentData = {
            uid: uid,
            tid: tid,
            comment: data.comment,
            commentImageList: commentImageList,
        }

        const response = await fetch('/api/thread', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({commentData}),
        });
        
        if (response.ok) {
            setValue('comment', "");
            setImageList([]);
            redirect(`/thread/${tid}`);
        }
        else {
            // ここにエラーメッセージ表示用の関数を置く
        }
    };

    return (
        <form onSubmit={handleSubmit(onsubmit)} className="p-2">
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">コメント</legend>
                <input id="add_sports_comment1" type="textarea" placeholder="コメント" 
                {...register('comment')} className="border-2" /> 
            </fieldset>
            <fieldset className="border text-center py-2 bg-white w-full">
                <legend className="font-bold">画像</legend>
                {commentImageList.length >= 1 &&
                    <div className="flex w-full my-4 py-4 items-center overflow-x-auto border-y-2">
                        {commentImageList.map((image) => (
                        <div key={image} className="relative mx-4">
                            <Image src={image} alt="" width={128} height={128} className="h-auto"/>
                            <button onClick={() => deleteCommentImage(image)}
                            className="absolute top-0 right-0 w-4 h-4 rounded-full bg-gray-400 text-white text-2xl leading-4">
                            &times;</button>
                        </div>
                        ))}
                    </div>
                }
                <label htmlFor="add_commentImageList" className={`cursor-pointer px-4 py-2 text-white rounded
                    ${commentImageList.length >= 4 ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-500"}`}>画像を追加</label>
                <input id="add_commentImageList" type="file" accept="image/*"
                {...register('imageList', {onChange: (e) => {
                    setCommentImageListOnChange(e.currentTarget.files);}}
                )}
                disabled={commentImageList.length >= 4 ? true : false} className="hidden" />
                <p className="my-4">選択中: {commentImageList.length}/4</p>
            </fieldset>
            <button type="submit" disabled={!isDirty} className="mx-auto w-fit text-white rounded p-2
             bg-blue-600 hover:bg-blue-500">
                投稿
            </button>
        </form>
    );
}

// "bg-blue-600 hover:bg-blue-500" : "bg-blue-300"