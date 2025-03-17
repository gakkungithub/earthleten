import Link from 'next/link';
import './globals.css';
// googleのフォントの一種であるInconsolataをインポートしている
import { Inconsolata } from 'next/font/google';

const fnt = Inconsolata({ subsets: ['latin']})

export default function Home() {
  return (
    <html lang="ja">
      <body className={fnt.className}>
        <h1 className="text-4xl text-indigo-800 font-bold my-2">
          Earthlete
        </h1>
      </body>
    </html>
  );
}
