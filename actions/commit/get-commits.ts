"use server";

import { commitConverter } from "@/lib/firebase/converters";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export async function getCommitById(commitId: string) {
    if (!commitId) {
        throw new Error("Commit ID is required to fetch the commit.");
    }

    try {
        const branchRef = doc(db, "commit", commitId).withConverter(
            commitConverter
        );

        const snapshot = await getDoc(branchRef);

        if (!snapshot.exists()) {
            throw new Error(`No commit found with ID: ${commitId}`);
        }

        return snapshot.data();
    } catch (error) {
        throw new Error("Failed to fetch commit: " + (error as Error).message);
    }
}
