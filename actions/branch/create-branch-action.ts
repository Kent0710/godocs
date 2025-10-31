"use server";

import { createNewBranchFormSchema } from "@/lib/form-schemas";
import { z } from "zod";
import { getUserFromSession } from "../auth";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { revalidatePath } from "next/cache";
import { branchConverter } from "@/lib/firebase/converters";

export async function createBranchAction(
    workspaceId: string,
    data: z.infer<typeof createNewBranchFormSchema>
) {
    try {
        const user = await getUserFromSession();

        if (!user) {
            throw new Error("User not authenticated.");
        }

        // get the origin branch content from data.originBranch
        const originBranch = doc(db, "branch", data.originBranch).withConverter(
            branchConverter
        );
        const originBranchSnap = await getDoc(originBranch);

        if (!originBranchSnap.exists()) {
            throw new Error("Origin branch does not exist.");
        }

        const newBranch = await addDoc(collection(db, "branch"), {
            name: data.name,
            workspaceId: workspaceId,
            ownerId: user.uid,
            oldContent: originBranchSnap.data().oldContent,
            newContent: originBranchSnap.data().oldContent,
            originBranch: data.originBranch,
            isCommitted: false,
            automations: ['none'],
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
