import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    const requestUrl = request.url;
    // window.location.reload();
    if (requestUrl && requestUrl.split('/').length > 1) {
        const currentpath = `/${requestUrl.split('/').pop()}` || '';
        requestHeaders.set("x-url", currentpath);
        
        return NextResponse.next({
            request: {
                headers: requestHeaders
            }
        });
    }
    else {
        requestHeaders.set("x-url", '');
        return NextResponse.next({
            request: {
                headers: requestHeaders
            }
        });
    }
}