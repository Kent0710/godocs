"use server";

import { auth } from "@/lib/firebase/firebase";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin";

export async function getUserFromSession() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
        return null;
    }

    try {
        const decodedClaims = await adminAuth.verifySessionCookie(
            sessionCookie,
            true
        );
        return decodedClaims;
    } catch (error) {
        console.error("Error verifying session cookie:", error);
        return null;
    }
}

export async function setSession(idToken: string) {
    try {
        if (!idToken) throw new Error("ID token is required to set session");

        const expiresIn = 24 * 60 * 60 * 1000;
        const sessionCookie = await adminAuth.createSessionCookie(idToken, {
            expiresIn,
        });

        const cookieStore = await cookies();
        cookieStore.set("session", sessionCookie, {
            maxAge: expiresIn / 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        return {
            status: "success",
            message: "Session cookie set successfully",
        };
    } catch (error) {
        throw new Error("Error setting session: " + (error as Error).message);
    }
}

export async function signOut() {
    try {
        // Signs out the current user. This does not automatically revoke the user's ID token.
        // To fully sign out, you may also want to clear any session cookies on the server side.
        const cookieStore = await cookies();
        cookieStore.delete({
            name: "session",
            path: "/",
        });

        return auth.signOut();
    } catch (error) {
        throw new Error("Error signing out: " + (error as Error).message);
    }
}
