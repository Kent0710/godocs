"use server";

import { db } from "@/lib/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function acceptMerge(
    targetBranchId: string,
    originBranchContent: string,
) {
    if (!targetBranchId || !originBranchContent) {
        throw new Error("Missing required parameters for accepting merge.");
    }

    try {
        const branchRef = doc(db, "branch", targetBranchId);
        await updateDoc(branchRef, {
            oldContent: originBranchContent,
            newContent: originBranchContent,
            isCommitted: false,
        });

        return { success: true };
    } catch (error) {
        throw new Error(
            "Error creating merge request: " + (error as Error).message
        );
    }
}
