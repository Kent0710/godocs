'use server'

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export async function checkOriginNotCommit(originBranchId : string) {
    if (!originBranchId) {
        throw new Error("Origin branch ID is required.");
    };

    try {
        const branchRef = doc(db, "branch", originBranchId);
        const branchSnap = await getDoc(branchRef);

        if (branchSnap.exists()) {
            const branchData = branchSnap.data();
            return { isCommitted: branchData.isCommitted };
        }else {
            throw new Error("Origin branch not found.");
        }
    } catch (error) {
        throw new Error("Error checking origin branch: " + (error as Error).message);
    }
}