import LinkedThreadDetails from "./LinkedThreadDetails"
import { Thread } from '@/typeDeclar/typeComp';

export default function ThreadDetails({threads}: {threads: Thread[]}){
    return (
        <>
        {threads.map((t: Thread) => (
            <LinkedThreadDetails thread={t} key={t.id}/>
        ))}
        </>
    )
}