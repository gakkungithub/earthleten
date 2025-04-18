import LinkedThreadDetails from "@/components/LinkedThreadDetails"
import { Thread } from '@/typeDeclar/typeComp';

export default function ThreadDetails({threads}: {threads: Thread[]}){
    return (
        <>
        {threads && threads.length > 0 ?
            <> {threads.map((t: Thread) => (
                <LinkedThreadDetails thread={t} key={t.id}/>
            ))} </>:
            <div>表示できるスレッドがありません!!</div>
        }
        </>
    )
}