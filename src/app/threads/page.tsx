import LinkedThreadDetails from '@/components/LinkedThreadDetails';
import { getThreads } from '@/lib/getter';
import { Thread } from '@/typeDeclar/typeComp';

type StringProp = {
    genres: string[] | undefined
}
export default async function ThreadsResult(genres: StringProp) {
  // 本一覧を取得する
  const threads = await getThreads(genres);
  return (
    <>
    {threads.forEach((t: Thread) => (
      <LinkedThreadDetails thread={t} key={t.id} />
    ))}
    </>
  );
}