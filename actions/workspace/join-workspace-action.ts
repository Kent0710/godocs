"use server";

import {
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { getUserFromSession } from "../auth";
import { revalidatePath } from "next/cache";

export async function joinWorkspace(code: string) {
    if (!code) {
        throw new Error("Workspace code is required to join a workspace.");
    }

    try {
        const user = await getUserFromSession();

        if (!user) {
            throw new Error("User not authenticated.");
        }

        // Find the workspace by code
        const workspaceQuery = query(
            collection(db, "workspace"),
            where("code", "==", code)
        );

        const snapshot = await getDocs(workspaceQuery);

        if (snapshot.empty) {
            throw new Error("Invalid workspace code.");
        }

        // Get the workspace doc
        const workspaceDoc = snapshot.docs[0];
        const workspaceId = workspaceDoc.id;

        // Check if the user is already a member
        const memberRef = doc(
            db,
            "workspace",
            workspaceId,
            "member",
            user.uid
        );
        const memberSnapshot = await getDocs(
            query(
                collection(db, `workspace/${workspaceId}/member`),
                where("userId", "==", user.uid)
            )
        );

        if (!memberSnapshot.empty) {
            throw new Error("You are already a member of this workspace.");
        }

        // Add the user as a member
        await setDoc(memberRef, {
            userId: user.uid,
            role: "member",
            joinedAt: new Date(),
            name: user.name || "Unnamed User",
        });

        // get the main branch for the workspace
        const branchQuery = query(
            collection(db, "branch"),
            where("workspaceId", "==", workspaceId),
            where("name", "==", "main")
        );

        const branchSnapshot = await getDocs(branchQuery);

        let mainBranchId = null;
        if (!branchSnapshot.empty) {
            mainBranchId = branchSnapshot.docs[0].id;
        } else {
            throw new Error("Main branch not found for the workspace.");
        }


        revalidatePath('/home');

        return {
            success: true,
            workspaceId,
            message: "Successfully joined workspace.",
            defaultBranchId: mainBranchId,
        };
    } catch (error) {
        throw new Error("Error joining workspace: " + (error as Error).message);
    }
}
