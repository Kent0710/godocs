"use server";

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { z } from "zod";
import { createNewWorkspaceFormSchema } from "@/lib/form-schemas";
import { revalidatePath } from "next/cache";
import { getUserFromSession } from "../auth";
import { generateWorkspaceCode } from "@/lib/utils";

export async function createWorkspace(
    data: z.infer<typeof createNewWorkspaceFormSchema>
) {
    try {
        const user = await getUserFromSession();

        if (!user) {
            throw new Error("User not authenticated.");
        }

        const newWorkspace = await addDoc(collection(db, "workspace"), {
            name: data.name,
            description: data.description || "",
            createdAt: new Date(),
            ownerId: user.uid,
            code: generateWorkspaceCode(),
        });

        // create the main branch for the workspace
        // this is required for the workspace to function properly and would not be allowed to be deleted
        const defaultBranch = await addDoc(collection(db, "branch"), {
            name: "main",
            workspaceId: newWorkspace.id,
            ownerId: user.uid,
            oldContent: "",
            newContent: "",
        });

        // create members subcollection
        const memberRef = doc(
            db,
            "workspace",
            newWorkspace.id,
            "member",
            user.uid
        );
        await setDoc(memberRef, {
            userId: user.uid,
            role: "owner",
            joinedAt: new Date(),
            name: user.name || "",
        });

        revalidatePath("/home");

        return {
            workspaceId: newWorkspace.id,
            defaultBranchId: defaultBranch.id,
            success: true,
        };
    } catch (error) {
        throw new Error(
            "Error creating workspace: " + (error as Error).message
        );
    }
}
