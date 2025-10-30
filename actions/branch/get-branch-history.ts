"use server";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { commitConverter } from "@/lib/firebase/converters";
import { CommitType } from "@/lib/types";

export async function getBranchHistory(
    branchId: string
): Promise<CommitType[]> {
    if (!branchId) {
        throw new Error("Branch ID is required to fetch branch history.");
    }

    try {
        const commitCol = collection(db, "commit").withConverter(
            commitConverter
        );

        const q = query(
            commitCol,
            where("branchId", "==", branchId)
            // TODO: set this up with index
            // orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
        throw new Error(
            "Failed to fetch branch history: " + (error as Error).message
        );
    }
}
