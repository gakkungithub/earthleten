'use client';

import { RoleType, Color, Gender } from '@prisma/client';

export default function PlayerCoachNarrow() {
    return (
        <>
            <div className="flex items-center">
                <button>選手</button>
                <button>監督</button>
            </div>
            <div className="flex items-center">
                <button>男性</button>
                <button>女性</button>
                <button>非公開</button>
            </div>
            <label>
                チーム名: <input type="text" />
            </label>
            <div className="flex items-center">
                <p>年齢: </p>
                <label>下: <input type="number" /></label>
                 ~ 
                <label>上: <input type="number" /></label>
                <label>降順?: <input type="checkbox" /></label>
            </div>
            <div className="flex items-center">
                <p>身長: </p>
                <label>下: <input type="number" /></label>
                 ~ 
                <label>上: <input type="number" /></label>
                <label>降順?: <input type="checkbox" /></label>
            </div>
            <div className="flex items-center">
                <p>体重: </p>
                <label>下: <input type="number" /></label>
                 ~ 
                <label>上: <input type="number" /></label>
                <label>降順?: <input type="checkbox" /></label>
            </div> 
            {/* ここにスポーツとジャンルの絞り込みが可能なコンポーネントを配置する */}
            {/* その下に自由入力欄を設ける */}
            <label>🔍 <input type="text" /></label>
        </>
    )
}