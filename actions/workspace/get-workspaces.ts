'use server'

/*
    THIS SERVER ACTION IS FOR GETTING A WORKSPACE OR WORKSPACES
*/

import { collection, getDocs, query, getDoc, where, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { branchConverter, workspaceConverter } from "@/lib/firebase/converters";
import { WorkspaceType } from "@/lib/types";
import { getUserFromSession } from "../auth";

export async function getWorkspaces(): Promise<WorkspaceType[]> {
    const user = await getUserFromSession();
    if (!user) throw new Error("User not authenticated.");

    const workspacesCol = collection(db, "workspace").withConverter(
        workspaceConverter
    );
    const q = query(workspacesCol, where("ownerId", "==", user.uid));

    // go on the branch col and look for the main branch and map each to its data

    const branchCol = collection(db, "branch").withConverter(branchConverter);
    const qBranch = query(
        branchCol,
        where("ownerId", "==", user.uid),
        where("name", "==", "main")
    );

    const branchSnapshot = await getDocs(qBranch);
    const workspaceSnapshot = await getDocs(q);

    const mainBranchMap: Record<string, string> = {};

    branchSnapshot.forEach((doc) => {
        const branchData = doc.data();
        mainBranchMap[branchData.workspaceId] = doc.id; // ✅ use doc.id
    });

    const workspaces = workspaceSnapshot.docs.map((doc) => {
        const workspaceData = doc.data();
        return {
            ...workspaceData,
            mainBranchId: mainBranchMap[doc.id] || '', // ✅ use doc.id
        };
    });
    
    return workspaces;
}

export async function getWorkspace(): Promise<WorkspaceType | null> {
    const user = await getUserFromSession();

    if (!user) throw new Error("User not authenticated.");

    const workspacesCol = collection(db, "workspace").withConverter(
        workspaceConverter
    );
    const q = query(workspacesCol, where("ownerId", "==", user.uid));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return null;
    }
    return snapshot.docs[0].data();
}

export async function getWorkspaceCode(workspaceId : string) {
    if (!workspaceId) throw new Error("Workspace ID is required.");

    try {

        const workspaceRef = doc(db, "workspace", workspaceId).withConverter(workspaceConverter);
        const snapshot = await getDoc(workspaceRef);

        if (!snapshot.exists()) {
            return "";
        }

        const workspaceData = snapshot.data();
        return workspaceData.code;
    } catch (error) {
        throw new Error("Failed to get workspace code: " + (error as Error).message);
    }
}