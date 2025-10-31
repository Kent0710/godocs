'use server'

import { MergeRequestType } from "@/lib/types";
import { collection, where, getDocs, query } from "firebase/firestore";
import { mergeRequestConverter } from "@/lib/firebase/converters";
import { db } from "@/lib/firebase/firebase";

export async function getMergeHistory(workspaceId: string) : Promise<MergeRequestType[]> {
    if (!workspaceId) {
        throw new Error("Workspace ID is required to fetch merge history.");
    }

    try {

        const branchCol = collection(db, "merge").withConverter(
            mergeRequestConverter
        );

        const q = query(
            branchCol,
            where("workspaceId", "==", workspaceId)
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
        throw new Error(
            "Failed to fetch merge history: " + (error as Error).message
        );
    }
}