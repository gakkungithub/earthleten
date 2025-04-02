import { DefaultSession } from "next-auth";
// import { DefaultJWT } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string | null;
        } & DefaultSession['user'];
    }
    // interface DefaultJWT {
    //     id?: string | null
    //     name?: string | null
    //     email?: string | null
    //     picture?: string | null
    //     sub?: string
    // }
}