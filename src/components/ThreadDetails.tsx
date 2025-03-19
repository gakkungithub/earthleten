import LinkedThreadDetails from "./LinkedThreadDetails"
import { Thread } from '@/typeDeclar/typeComp';
import FormThreads from '@/components/FormThreads';

type ThreadsProp = {
    threads: Thread[];
}

export default function ThreadDetails({threads}: ThreadsProp){
    return (
    <>
    <FormThreads />
    {threads.forEach((t: Thread) => (
        <LinkedThreadDetails thread={t} key={t.id} />
    ))}
    </>
    )
}