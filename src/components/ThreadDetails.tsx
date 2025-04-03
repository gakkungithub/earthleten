import LinkedThreadDetails from "./LinkedThreadDetails"
import { Thread } from '@/typeDeclar/typeComp';

export default function ThreadDetails({threads}: {threads: Thread[]}){
    return (
        <>
        {threads.forEach((t: Thread) => (
            <LinkedThreadDetails thread={t} key={t.id} />
        ))}
        </>
    )
}