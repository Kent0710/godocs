"use server";

import { branchConverter } from "@/lib/firebase/converters";
import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getBranchAutomations(branchId: string) {
    if (!branchId) {
        throw new Error("Branch ID is required to fetch automations.");
    }

    try {
        const branchRef = doc(db, "branch", branchId).withConverter(
            branchConverter
        );

        const branchDoc = await getDoc(branchRef);

        if (!branchDoc.exists()) {
            throw new Error("Branch not found.");
        }

        const branchData = branchDoc.data();

        return branchData.automations || [];
    } catch (error) {
        throw new Error(
            "Failed to get branch automations: " + (error as Error).message
        );
    }
}
