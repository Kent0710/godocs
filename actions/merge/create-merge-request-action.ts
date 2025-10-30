'use server'

import { createMergeRequestFormSchema } from "@/lib/form-schemas";
import { getUserFromSession } from "../auth";
import { addDoc, collection,  } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase/firebase";
import {z} from 'zod'

export async function createMergeRequestAction(
    workspaceId: string,
    data: z.infer<typeof createMergeRequestFormSchema>
) {
    if (!workspaceId) {
        throw new Error("Workspace ID is required.");
    }

    if (!data.originBranchId || !data.targetBranchId) {
        throw new Error("Origin and target branches must be specified.");
    };

    try {
        const user = await getUserFromSession();

        if (!user) {
            throw new Error("User not authenticated.");
        }

        const newMergeRequest = await addDoc(collection(db, "merge"), {
            title: data.title,
            description: data.description,
            originBranchId: data.originBranchId,
            targetBranchId: data.targetBranchId,
            workspaceId: workspaceId,
            ownerId: user.uid,
        });

        revalidatePath(`/workspace/merge/${workspaceId}`);

        return {
            mergeRequestId: newMergeRequest.id,
            success: true,
        };
    } catch (error) {
        throw new Error(
            "Error creating merge request: " + (error as Error).message
        );
    }
}