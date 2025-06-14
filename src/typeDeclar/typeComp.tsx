// コンポーネント用の型定義ファイル
import { Color, Gender } from '@prisma/client';

export type Thread = {
    id: string;
    uid: string;
    title: string;
    bdate: Date;
    _count: {
        comments: number;
    };
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

export type Profile = {
    stats: Stats;
    scripts: Script[];
    data: Data;
    awards: Award[];
    themeColor: ThemeColor;
}

export type Stats = {
    name: string;
    teamnames: Teamname[];
    sports: string[];
    genres: string[];
    gender: Gender;
    bdate: [number, number, number];
    height: number;
    weight: number;
    isBdatePrivate: boolean;
    isHeightPrivate: boolean;
    isWeightPrivate: boolean;
}

export type Teamname = {
    name: string;
    start: number;
    end: number | null;
    id: string;
}

export type Script = {
    id: string;
    section: string;
    texts: string[];
}

export type Data = {
    results: Result[];
    highlightInfo: Partial<Record<Color, string>>;
}

export type Result = {
    id: string;
    position: string;
    columns: TableColCell[];
    rows: TableRow[];
};

export type TableColCell = {
    id: string;
    value: string;
}

export type TableRow = {
    id: string;
    cells: TableCell[];
}

export type TableCell = {
    value: string;
    id: string;
    highlightColor?: string;
}

export type Title = {
    id: string; 
    name: string; 
    years: number[];
}

export type Award = {
    id: string;
    section: string;
    titles: Title[];
}

export type ThemeColor = {
    bgColor: Color;
    textColor: Color;
}

