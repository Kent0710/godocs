/*
    THIS SERVER ACTION IS FOR GETTING A BRANCH OR BRANCHES
*/

import { branchConverter } from "@/lib/firebase/converters";
import { db } from "@/lib/firebase/firebase";
import { BranchType } from "@/lib/types";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getWorkspaceBranches(
    workspaceId: string
): Promise<BranchType[]> {
    if (!workspaceId) {
        throw new Error("Workspace ID is required to fetch branches.");
    }

    try {
        const branchCol = collection(db, "branch").withConverter(
            branchConverter
        );

        const q = query(branchCol, where("workspaceId", "==", workspaceId));

        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
        throw new Error(
            "Failed to fetch branches: " + (error as Error).message
        );
    }
}
