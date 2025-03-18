import Link from 'next/link';
import { Thread } from '@/typeDeclar/typeComp';

// 引数はPropなので、改めてPropにしないといけない
type ThreadProp = {
    thread: Thread;
};

export default function LinkedThreadDetails( {thread} : ThreadProp ){
    return (
        <Link href={`/chat/${thread.id}`}>
            <div className="hover:bg-green-50">
                {/* スレッドのリンク */}
                <div>
                    <ul className="list-none text-black ml-4">
                        <li>{thread.title} 【{thread.genre}】</li>
                        <li>{thread.ename}</li> {/* ここにユーザーのリンクをつける */}
                        <li>{thread.date.toString()}</li>
                    </ul>
                </div>
            </div>
        </Link>
    );
}