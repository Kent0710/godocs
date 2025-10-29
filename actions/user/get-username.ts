'use server'

import { getUserFromSession } from "../auth"

export async function getUsername() {
    const user = await getUserFromSession();
    return user?.name || "Guest";
}