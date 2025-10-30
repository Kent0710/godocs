"use server";

import { createCommitFormSchema } from "@/lib/form-schemas";
import { getUserFromSession } from "../auth";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createCommitAction(
    workspaceId: string,
    branchId: string,
    data: z.infer<typeof createCommitFormSchema>,
    content: string,
    oldContent: string
) {
    if (!branchId) {
        throw new Error("Branch ID is required to create a commit.");
    }

    try {
        const user = await getUserFromSession();

        if (!user) {
            throw new Error("User not authenticated.");
        }

        // Create the commit
        const newCommit = await addDoc(collection(db, "commit"), {
            branchId: branchId,
            title: data.title,
            description: data.description,
            ownerId: user.uid,
            username: user.name,
            oldContent: oldContent,
            content: content,
            createdAt: new Date(),
        });

        const branchRef = doc(db, "branch", branchId);
        await updateDoc(branchRef, {
            isCommitted: true,
        });

        revalidatePath(`/workspace/${workspaceId}`);

        return {
            commitId: newCommit.id,
            success: true,
        };
    } catch (error) {
        throw new Error("Error creating commit: " + (error as Error).message);
    }
}
