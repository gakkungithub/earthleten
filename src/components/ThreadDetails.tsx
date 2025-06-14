import LinkedThreadDetails from "@/components/LinkedThreadDetails"
import ThreadsHeader from '@/components/ThreadsHeader';
import { Thread } from '@/typeDeclar/typeComp';

export default async function ThreadDetails({threads}: {threads: Thread[]}){
    return (
        <div className="relative w-full mx-auto">
            <div className="absolute z-10 w-full">
                <ThreadsHeader />
            </div>
            <div className="w-full h-128 border-2 pt-10 rounded overflow-y-auto">
            {threads.length > 0 ?
                <>
                    {threads.map((t: Thread) => (
                        <LinkedThreadDetails thread={t} key={t.id}/>
                    ))}
                </>:
                <div>表示できるスレッドがありません</div>
            }
            </div>
        </div>
    )
}