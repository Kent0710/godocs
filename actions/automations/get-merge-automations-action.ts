'use server'

import { mergeRequestConverter } from "@/lib/firebase/converters";
import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getMergeAutomations(mergeRequestId: string) {
    if (!mergeRequestId) {
        throw new Error("Merge Request ID is required to fetch automations.");
    };

    try {

        const mergeRef = doc(db, "merge", mergeRequestId).withConverter(
            mergeRequestConverter
        );

        const mergeDoc = await getDoc(mergeRef);

        if (!mergeDoc.exists()) {
            throw new Error("Merge Request not found.");
        };

        const mergeData = mergeDoc.data();

        return mergeData.automations || [];

    } catch (error) {
        throw new Error(
            "Failed to get merge automations: " + (error as Error).message
        );
    }
}