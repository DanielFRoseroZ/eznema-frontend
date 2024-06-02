import { NextResponse } from "next/server";
import parseJwt from "./utils/parseJWT";

export async function middleware(request) {
    const token = request.cookies.get('eznema');

    if (token !== undefined) {
        const user = parseJwt(token.value);
        if (user.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", request.url));
        } else if (user.role === "ADMIN") {
            return NextResponse.next();
        }
    } else if (token === undefined){
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: ['/admin/:path*']
}