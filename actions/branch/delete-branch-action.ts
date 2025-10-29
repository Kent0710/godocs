"use server";

import { db } from "@/lib/firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export async function deleteBranchAction(branchId: string) {
    try {
        await deleteDoc(doc(db, "branch", branchId));
        return { success: true };
    } catch (error) {
        throw new Error("Failed to delete branch: " + (error as Error).message);
    }
}
