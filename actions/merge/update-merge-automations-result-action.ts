"use server";

import { mergeRequestConverter } from "@/lib/firebase/converters";
import { db } from "@/lib/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function updateMergeAutomationsResult(
    title: string,
    mergeId: string,
    content: string,
    correctedInput: string,
    corrections: {
        endIndex: number;
        startIndex: number;
        replacement: string;
        label?: string;
        explanation?: string;
    }[]
) {
    if (!mergeId) throw new Error("Merge ID is required.");

    try {
        const mergeRef = doc(db, "merge", mergeId).withConverter(
            mergeRequestConverter
        );
        const mergeSnap = await getDoc(mergeRef);

        if (!mergeSnap.exists()) throw new Error("Merge request not found.");

        const mergeData = mergeSnap.data();

        // Ensure automations is always an array
        const automations = Array.isArray(mergeData.automations)
            ? mergeData.automations
            : Object.values(mergeData.automations || {});

        // Find which automation you want to update
        const updatedAutomations = automations.map((a) => {
            if (a.name === "proofread") {
                return {
                    ...a,
                    status: "completed",
                    content,
                    correctedInput: correctedInput,
                    corrections: corrections,
                    title: title,
                };
            }
            return a;
        });

        await updateDoc(mergeRef, {
            automations: updatedAutomations, // ✅ store back as a real array
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
