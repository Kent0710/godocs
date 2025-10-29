"use server";

import { db } from "@/lib/firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export async function deleteWorkspace(workspaceId: string) {
    try {
        await deleteDoc(doc(db, "workspace", workspaceId));
        return { success: true };
    } catch (error) {
        throw new Error("Failed to delete workspace: " + error);
    }
}
