"use server";

import { db } from "@/lib/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function UpdateMergeAutomationsResult(
    mergeId: string,
    content: string,
    correctedInput: string,
    corrections: {
        endIndex: number;
        startIndex: number;
        replacement : string;
        label? : string | undefined;
        explanation? : string | undefined;
    }[]
) {
    if (!mergeId) {
        throw new Error("Merge ID is required.");
    }

    try {
        const mergeRef = doc(db, "merge", mergeId);

        await updateDoc(mergeRef, {
            automations: {
                status: "completed",
                content: content,
                comment: JSON.stringify({
                    correctedInput,
                    corrections,
                }),
            },
        });

        revalidatePath(`/workspace/merge/request/${mergeId}`);

        return { success: true };
    } catch (error) {
        throw new Error(
            "Failed to update merge automations result: " +
                (error as Error).message
        );
    }
}
