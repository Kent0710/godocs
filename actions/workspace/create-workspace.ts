"use server";

import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { z } from "zod";
import { createNewWorkspaceFormSchema } from "@/lib/form-schemas";
import { revalidatePath } from "next/cache";
import { getUserFromSession } from "../auth";

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
            content :"",
        });

        revalidatePath("/home");

        return {
            workspaceId: newWorkspace.id,
            success: true,
        };
    } catch (error) {
        throw new Error(
            "Error creating workspace: " + (error as Error).message
        );
    }
}
