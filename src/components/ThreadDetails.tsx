import LinkedThreadDetails from "@/components/LinkedThreadDetails"
import NarrowMenu from '@/components/NarrowMenu';
import { Thread } from '@/typeDeclar/typeComp';

export default function ThreadDetails({threads}: {threads: Thread[]}){
    return (
        <div className="relative w-full mx-auto">
            <div className="absolute top-1 left-1 z-10 w-1/2">
                <NarrowMenu />
            </div>
            <div className="w-3/5 border-2 mx-auto">
            {threads && threads.length > 0 ?
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