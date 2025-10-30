'use server'

import { db } from "@/lib/firebase/firebase"
import { doc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function closeMerge(mergeId: string, workspaceId : string)  {
    if (!mergeId) {
        throw new Error("Merge ID is required to close a merge.");
    };

    try {

        const mergeRef = doc(db, 'merge', mergeId);

        await updateDoc(mergeRef, {
            status: 'closed',
        })

        revalidatePath(`/workspace/merge/${workspaceId}`);

        return { success: true };
    } catch (error) {
        throw new Error("Failed to close merge: " + (error as Error).message);
    }
}