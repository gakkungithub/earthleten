import Link from 'next/link';
import type { Metadata } from "next";
import './globals.css';
// googleのフォントの一種であるInconsolataをインポートしている
import { Inconsolata } from 'next/font/google';

const fnt = Inconsolata({ subsets: ['latin']})

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
        <h1 className="text-4xl text-indigo-800 font-bold my-2">
          Earthlete
        </h1>
        <ul className="flex bg-blue-600 mb-4 pl-2">
        <li className="block px-4 py-2 my-1 hover:bg-gray-100 rounded">
          <Link className="no-underline text-blue-300" href="/">
            ホーム</Link></li>
        <li className="block text-blue-300 px-4 py-2 my-1 hover:bg-gray-100 rounded">
          <Link className="no-underline text-blue-300" href="/threads">
            掲示板</Link></li>
        </ul>
        <div className="ml-2">
          {children}
        </div>
      </body>
    </html>
  );
}
