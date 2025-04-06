'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function FormAddThreads(){
    const { data: session, status } = useSession();
    const uid = session?.user?.id || '';

    const [topImage, setTopImage] = useState<string>("");

    return (
        <form className="absolute h-full w-full flex flex-col bg-gray-300 text-black z-2
        transition-transform duration-300 ease-in-out">
            <input id="add_sports_uid" type="hidden" name="id" value={uid} />
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">タイトル</legend> 
                <input id="add_sports_title" type="text" name="title" placeholder="タイトル" className="border-2 ml-2" />
            </fieldset>
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">コメント</legend>
                <input id="add_sports_comment1" type="textarea" name="comment1" placeholder="最初のコメント" className="border-2 ml-2" /> 
            </fieldset>
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">トップ画像</legend>
                {topImage !== "" &&
                    <div className="block relative mx-auto mb-4 w-64">
                    <Image src={topImage} alt="" width={64} height={64} layout="responsive" className="mx-auto"/>
                    </div>
                }
                <label htmlFor="add_sports_topImage" className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">画像を選択</label>
                <input id="add_sports_topImage" type="file" accept="image/*" name="topImage" 
                onChange={(e) => {
                    const file = e.currentTarget.files ? window.URL.createObjectURL(e.currentTarget.files[0]) : topImage;
                    setTopImage((prevImage) => file || prevImage)
                }}
                className="hidden" />
            </fieldset>
            <button type="button"
            className="fixed bottom-4 left-1/2 bg-blue-600 text-white rounded px-2 py-1 hover:bg-blue-500">
                登録
            </button>
        </form>
    );
}

// model Thread {
//     id        String    @id @default(cuid())
//     user      User      @relation(fields: [uid], references: [id])
//     uid       String
//     title     String
//     genres    ThreadOnGenre[]
//     bdate     DateTime  @default(now())
//     comments  Comment[]
//   }