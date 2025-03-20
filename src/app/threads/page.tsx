//import { useEffect, useState } from 'react';
import { getThreads } from '@/lib/getter';
import ThreadDetails from '@/components/ThreadDetails';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function ThreadsResult(req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'POST') {
        try {
            const { sports } = req.body;
            const threads = await getThreads(sports);
            return (
                <>
                <ThreadDetails threads={threads} />
                </>
            )
        } catch (error) {
            return (
                <>
                <p>表示できるスレッドがありません!!</p>
                </>
            )
        }
    }
    else {
        return (
            <>
            <p>表示できるスレッドがありません!!</p>
            </>
        )
    }
}
