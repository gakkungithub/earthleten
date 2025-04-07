'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function FormAddThreads(){
    const { data: session, status } = useSession();
    const uid = session?.user?.id || '';

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

    return (
        <form className="absolute h-full w-full flex flex-col bg-gray-300 text-black z-2
        transition-transform duration-300 ease-in-out">
            <input id="add_sports_uid" type="hidden" name="id" value={uid} />
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">タイトル</legend> 
                <input id="add_sports_title" type="text" name="title" placeholder="タイトル" className="border-2" />
            </fieldset>
            <fieldset className="p-2 border text-center bg-white">
                <legend className="font-bold">コメント</legend>
                <input id="add_sports_comment1" type="textarea" name="comment1" placeholder="最初のコメント" className="border-2" /> 
            </fieldset>
            <fieldset className="border text-center py-2 bg-white w-full">
                <legend className="font-bold">トップ画像</legend>
                {topImageList.length >= 1 &&
                    <div className="flex w-full my-4 py-4 items-center overflow-x-auto border-y-2">
                        {topImageList.map((image) => (
                        <div key={image} className="relative mx-4">
                            <Image src={image} alt="" width={128} height={128} className="h-auto"/>
                            <button onClick={() => deleteTopImage(image)}
                            className="absolute top-0 right-0 w-4 h-4 rounded-full bg-gray-400 text-white text-2xl leading-4">
                            &times;</button>
                        </div>
                        ))}
                    </div>
                }
                <label htmlFor="add_sports_topImage" className={`cursor-pointer px-4 py-2 text-white rounded
                    ${topImageList.length >= 4 ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-500"}`}>画像を追加</label>
                <input id="add_sports_topImage" type="file" accept="image/*" name="topImage"
                onChange={(e) => {
                    setTopImageListOnChange(e.currentTarget.files);
                }}
                disabled={topImageList.length >= 4 ? true : false} className="hidden" />
                <p className="my-4">選択中: {topImageList.length}/4</p>
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