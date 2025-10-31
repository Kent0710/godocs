'use server'

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { branchConverter } from "@/lib/firebase/converters";

export async function saveBranchAutomations(
    branchId: string,
    automations: string[]
) {
    if (!branchId) throw new Error("Branch ID is required.");

    try {

        const branchRef = doc(db, "branch", branchId).withConverter(branchConverter);
        await updateDoc(branchRef, {
            automations: automations,
        });

        return { success: true };
    } catch (error) {
            throw new Error(
            "Error updating branch after commit: " + (error as Error).message
        );
    }
} 

