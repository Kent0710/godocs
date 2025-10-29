"use server";

import { createNewBranchFormSchema } from "@/lib/form-schemas";
import { z } from "zod";
import { getUserFromSession } from "../auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { revalidatePath } from "next/cache";

export async function createBranchAction(
    workspaceId: string,
    data: z.infer<typeof createNewBranchFormSchema>
) {
    try {
        const user = await getUserFromSession();

        if (!user) {
            throw new Error("User not authenticated.");
        }

        const newBranch = await addDoc(collection(db, "branch"), {
            name: data.name,
            workspaceId: workspaceId,
            ownerId: user.uid,
        });

        revalidatePath(`/workspace/${workspaceId}`);
        return {
            branchId: newBranch.id,
            success: true,
        };
    } catch (error) {
        throw new Error("Error creating branch: " + (error as Error).message);
    }
}
