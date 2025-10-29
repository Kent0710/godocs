"use server";

import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { revalidatePath } from "next/cache";

export async function updateBranchContentAction(workspaceId : string, branchId: string, content: string) {
    try {
        const branchRef = doc(db, "branch", branchId);
        await updateDoc(branchRef, { content });

        revalidatePath(`/workspace/${workspaceId}`);

        return { success: true };
    } catch (error) {
        throw new Error(
            "Error updating branch content: " + (error as Error).message
        );
    }
}
