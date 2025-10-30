"use server";

import { db } from "@/lib/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function acceptMerge(
    originBranchContent: string,
    targetBranchId: string,
    mergeId : string,
) {
    if (!targetBranchId || !originBranchContent) {
        throw new Error("Missing required parameters for accepting merge.");
    }

    try {
        const branchRef = doc(db, "branch", targetBranchId);
        await updateDoc(branchRef, {
            oldContent: originBranchContent,
            newContent: originBranchContent,
            isCommitted: true,
        });

        const mergeRef = doc(db, 'merge', mergeId);
        await updateDoc(mergeRef, {
            status: 'merged',
        })

        revalidatePath(`/workspace/merge/request/${mergeId}`);

        return { success: true };
    } catch (error) {
        throw new Error(
            "Error creating merge request: " + (error as Error).message
        );
    }
}
