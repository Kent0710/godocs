"use server";

import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { revalidatePath } from "next/cache";
import { BranchType } from "@/lib/types";
import { branchConverter } from "@/lib/firebase/converters";

export async function updateBranchContentAction(
    workspaceId: string,
    branchId: string,
    newContent: string
) {
    try {
        const branchRef = doc(db, "branch", branchId);
        await updateDoc(branchRef, { newContent: newContent });

        revalidatePath(`/workspace/${workspaceId}`);

        return { success: true };
    } catch (error) {
        throw new Error(
            "Error updating branch content: " + (error as Error).message
        );
    }
}

/*
    THIS SERVER ACTION WILL SWITCH THE NEW CONTENT TO OLD CONTENT AFTER A COMMIT IS MADE
    THIS KEEPS THE BRANCH CONTENT IN SYNC WITH THE LATEST COMMIT
*/

export async function updateBranchAfterCommit(
    workspaceId: string,
    branchId: string,
    newContent: string
): Promise<BranchType> {
    if (!branchId) {
        throw new Error("Branch ID is required to update branch after commit.");
    }

    try {
        const branchRef = doc(db, "branch", branchId).withConverter(
            branchConverter
        );

        await updateDoc(branchRef, {
            oldContent: newContent,
            newContent: newContent,
        });

        revalidatePath(`/workspace/${workspaceId}`);

        const updatedBranchSnap = await getDoc(branchRef);
        const updatedBranch = updatedBranchSnap.data();

        if (!updatedBranch) {
            throw new Error("Failed to retrieve updated branch data.");
        }

        return updatedBranch;
    } catch (error) {
        throw new Error(
            "Error updating branch after commit: " + (error as Error).message
        );
    }
}
