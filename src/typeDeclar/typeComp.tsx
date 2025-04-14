// コンポーネント用の型定義ファイル

export type Thread = {
    id: string;
    uid: string;
    title: string;
    bdate: Date;
};

export type Comment = {
    id: string;
    tid: string;
    uid: string;
    talk: string;
    cdate: Date;
}

export type User = {
    id: string;
    name: string;
    password: string;
    gender: string;
    bdate: Date;
    height: number;
    weight: number;
    image: string;
}

