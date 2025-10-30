"use server";

import { getDoc,  doc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import {
    mergeRequestConverter,
    branchConverter,
} from "@/lib/firebase/converters";

export async function getMerge(mergeId: string) {
    if (!mergeId) {
        throw new Error("Merge ID is required");
    }

    try {
        const mergeRef = doc(db, "merge", mergeId).withConverter(
            mergeRequestConverter
        );
        const snapshot = await getDoc(mergeRef);

        if (!snapshot.exists()) {
            throw new Error("Merge request not found");
        }

        // the snapshot would have the data for originBranchId and targetBranchId
        // get the data

        const originBranch = snapshot.data().originBranchId
            ? await getDoc(
                  doc(
                      db,
                      "branch",
                      snapshot.data().originBranchId
                  ).withConverter(branchConverter)
              )
            : null;

        const targetBranch = snapshot.data().targetBranchId
            ? await getDoc(
                  doc(
                      db,
                      "branch",
                      snapshot.data().targetBranchId
                  ).withConverter(branchConverter)
              )
            : null;

        if (!originBranch || !originBranch.exists()) {
            throw new Error("Origin branch not found");
        }

        if (!targetBranch || !targetBranch.exists()) {
            throw new Error("Target branch not found");
        }

        return {
            mergeData: snapshot.data(),
            originBranch: originBranch.data(),
            targetBranch: targetBranch.data(),
        };
    } catch (error) {
        throw new Error(
            "Failed to fetch merge data: " + (error as Error).message
        );
    }
}
