import './globals.css';

import { Metadata } from 'next';

// googleのフォントの一種であるInconsolataをインポートしている
import { Inconsolata } from 'next/font/google';

import { headers } from 'next/headers';

import HeaderButtons from '@/components/HeaderButtons';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

const fnt = Inconsolata({ subsets: ['latin']});

export default async function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ja">
      <body className={fnt.className}>
      <h1 className="text-4xl text-indigo-800 font-bold my-2">Earthlete</h1>
        <HeaderButtons login={session !== null ? true : false} image={session?.user?.image || ''}/>
        <div className="mx-2">
            {children}
        </div>
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata>{
  let title = '';

  const pathname = (await headers()).get("x-url");
  switch (pathname) {
    case '/':
      title = 'ホームページ - Earthlete';
      break;
    case '/threads':
      title = 'スレッド一覧 - Earthlete';
      break;
    case '/logIn':
      title = 'ログイン - Earthlete';
      break;
    case '/logOut':
      title = 'ログアウト - Earthlete';
      break;
    case '/addAccount':
      title = 'アカウント登録 - Earthlete';
      break;
    case '/editProfile':
      title = 'プロフィール設定 - Earthlete';
      break;
    default:
      title = 'Earthlete';
  }

  return {
    title: title,
    description: 'The app for athletes'
  };
}
