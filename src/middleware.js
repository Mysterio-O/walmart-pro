import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server";

export const middleware = async (req) => {
    const token = await getToken({req});
    const isToken = Boolean(token);

    const userEmail = token?.email || '';
    const isAuthPage = req.nextUrl.pathname.startsWith('/dashboard');

    if (isAuthPage && !userEmail) {
        const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
        return NextResponse.redirect(new URL(`/api/auth/signin?callbackUrl=${callbackUrl}`, req.url))
    }
    return NextResponse.next();

}