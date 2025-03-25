import LinkedThreadDetails from "./LinkedThreadDetails"
import { Thread } from '@/typeDeclar/typeComp';

type ThreadsProp = {
    threads: Thread[];
}

export default function ThreadDetails({threads}: ThreadsProp){
    return (
        <>
        {threads.forEach((t: Thread) => (
            <LinkedThreadDetails thread={t} key={t.id} />
        ))}
        </>
    )
}