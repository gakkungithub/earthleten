'use client';

import { useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import { jwtVerify } from "jose";

type UserProfile = {
    id: string,
    name: string,
    gender: string,
    bdate: Date | null,
    height: number | null,
    weight: number | null,
    image?: string,
}
export default function UseAuth(pathname: string) {
    const [loginUser, setLoginUser] = useState<UserProfile>({
        id: "",
        name: "",
        gender: "",
        bdate: null,
        height: null,
        weight: null,
        image: "",
    });

    useEffect(() => {
        const checkToken = async () => {
            if (!['/', '/addAccount'].includes(pathname)){
                const token = localStorage.getItem("token");
                try {
                    const secretKey = new TextEncoder().encode("prisma-supabase");
                    const decodedJWT = await jwtVerify(token ?? "", secretKey);
                    const userProfile = decodedJWT.payload as UserProfile;
    
                    setLoginUser(userProfile);
                } catch {
                    redirect('/logIn');
                }
            }
        };
        checkToken();
    }, [pathname]);
    
    return loginUser;
}

// model User {
//     id        String    @id @default(cuid())
//     threads   Thread[]
//     comments  Comment[]
//     name      String    @unique
//     password  String    
//     gender    String    @default("private")
//     bdate     DateTime?
//     height    Float?
//     weight    Float?
//     image     String
//   }