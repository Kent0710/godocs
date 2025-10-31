// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const sessionCookie = req.cookies.get("session")?.value;

    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/signIn", req.url));
    }

    // No firebase-admin here!
    return NextResponse.next();
}

export const config = {
    matcher: ["/home/:path*"], // protect /home and subpaths
};
