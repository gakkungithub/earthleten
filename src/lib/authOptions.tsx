import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: { strategy: "jwt"},
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signIn",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    provider: "google",
                    role: "user",
                };
            },
        }),
        TwitterProvider({
            clientId: process.env.X_CLIENT_ID!,
            clientSecret: process.env.X_CLIENT_SECRET!,
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.profile_image_url,
                    provider: "twitter",
                    role: "user",
                }
            }
        }),
        CredentialsProvider({
            id: "Earthlete",
            name: "Earthlete",
            credentials: {
                name: { type: "text" },
                password: { type: "password" }
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signIn`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                });
                
                if (res.ok) {
                    const user = await res.json();
                    return user;
                }
                else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt( { token, user, account }) {
            if (account?.provider === "Earthlete") {
                token.id = user.id;
                token.name = user.name;
                token.picture = user.image;
            }
            return token;
        },
        async redirect( { baseUrl } ) {
            return baseUrl;
        },
        async session( { session, token } ) {
            if (token && session?.user) {
                if (session.user && typeof(token.id) === 'string') {
                    session.user.id = token.id || '';
                    session.user.image = token.picture;
                }
            }
            return session;
        }
    }
}