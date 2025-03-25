import type { Metadata } from "next";

import './globals.css';
// googleのフォントの一種であるInconsolataをインポートしている
import { Inconsolata } from 'next/font/google';

const fnt = Inconsolata({ subsets: ['latin']})

import HeaderInClient from '@/components/HeaderInClient';

export const metadata: Metadata = {
  title: "Earthlete",
  description: "The App for athletes",
};

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ja">
      <body className={fnt.className}>
        <HeaderInClient />
        <div className="mx-2">
          {children}
        </div>
      </body>
    </html>
  );
}
