type paramProp = {
    type: string,
}

export default function RedirectPage( params  : paramProp) {
    const type = params.type;

    return (
        <>
        {type === 'fromAddAcount'

        }
        </>
    );
}