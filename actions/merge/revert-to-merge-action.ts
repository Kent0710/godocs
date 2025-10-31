"use server";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export async function revertToMerge(branchId: string, content: string) {
    if (!branchId) {
        throw new Error("Branch ID and Commit ID are required to revert.");
    }

    try {
        const branchRef = doc(db, "branch", branchId);

        await updateDoc(branchRef, {
            oldContent: content,
            newContent: content,
            isCommitted: true,
        });

        return { success: true };
    } catch (error) {
        throw new Error(
            "Failed to revert to merge: " + (error as Error).message
        );
    }
}
