import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "firebase-admin/auth";

export async function proxy(req: NextRequest) {
    const sessionCookie = req.cookies.get("session")?.value;

    // if no session cookie, redirect to login
    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/signIn", req.url));
    }

    try {
        await getAuth().verifySessionCookie(sessionCookie, true);
        return NextResponse.next(); // allow access
    } catch (error) {
        console.error("Invalid or expired session:", error);
        return NextResponse.redirect(new URL("/signIn   ", req.url));
    }
}

// Apply to protected routes only
export const config = {
    matcher: ["/home"], // protect everything under /dashboard and /admin
};
