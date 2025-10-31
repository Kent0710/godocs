"use server";

/*
    THIS SERVER ACTION IS FOR GETTING A WORKSPACE OR WORKSPACES
*/

import {
    collection,
    getDocs,
    query,
    getDoc,
    where,
    doc,
    collectionGroup,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { branchConverter, workspaceConverter } from "@/lib/firebase/converters";
import { WorkspaceType } from "@/lib/types";
import { getUserFromSession } from "../auth";

export async function getWorkspaces(): Promise<WorkspaceType[]> {
    const user = await getUserFromSession();
    if (!user) throw new Error("User not authenticated.");

    const userId = user.uid;

    // find all workspaces where the user is a member
    // (subcollection query – need to read from each workspace or track codes separately)
    // Since Firestore doesn’t support “collectionGroup” + parent lookup efficiently,
    // we can use collectionGroup query.

    const membersQuery = query(
        // 🔍 this searches all "members" subcollections in all workspaces
        collectionGroup(db, "member"),
        where("userId", "==", userId)
    );

    const membersSnapshot = await getDocs(membersQuery);
    if (membersSnapshot.empty) return [];

    const workspaceIds = membersSnapshot.docs
        .map(
            (docSnap) => docSnap.ref.parent.parent?.id // parent.parent = workspace/{workspaceId}
        )
        .filter(Boolean) as string[];

    // fetch workspace docs for each ID
    const workspacePromises = workspaceIds.map(async (workspaceId) => {
        const workspaceRef = doc(db, "workspace", workspaceId).withConverter(
            workspaceConverter
        );
        const workspaceDoc = await getDoc(workspaceRef);
        return workspaceDoc.exists() ? { ...workspaceDoc.data() } : null;
    });

    const workspaceList = (await Promise.all(workspacePromises)).filter(
        Boolean
    ) as WorkspaceType[];

    // find main branches owned by this user (optional)
    const branchCol = collection(db, "branch").withConverter(branchConverter);
    const qBranch = query(branchCol, where("name", "==", "main"));
    const branchSnapshot = await getDocs(qBranch);

    const mainBranchMap: Record<string, string> = {};
    branchSnapshot.forEach((docSnap) => {
        const branchData = docSnap.data();
        mainBranchMap[branchData.workspaceId] = docSnap.id;
    });

    // merge main branch IDs
    const workspaces = workspaceList.map((ws) => ({
        ...ws,
        mainBranchId: mainBranchMap[ws.id] || "",
    }));

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

export async function getWorkspaceCode(workspaceId: string) {
    if (!workspaceId) throw new Error("Workspace ID is required.");

    try {
        const workspaceRef = doc(db, "workspace", workspaceId).withConverter(
            workspaceConverter
        );
        const snapshot = await getDoc(workspaceRef);

        if (!snapshot.exists()) {
            return "";
        }

        const workspaceData = snapshot.data();
        return workspaceData.code;
    } catch (error) {
        throw new Error(
            "Failed to get workspace code: " + (error as Error).message
        );
    }
}

export async function getWorkspaceName(workspaceId: string) {
    if (!workspaceId) throw new Error("Workspace ID is required.");

    try {
        const workspaceRef = doc(db, "workspace", workspaceId).withConverter(
            workspaceConverter
        );
        const snapshot = await getDoc(workspaceRef);

        if (!snapshot.exists()) {
            return "Unnamed Workspace";
        }
        const workspaceData = snapshot.data();
        return workspaceData.name || "Unnamed Workspace";
    } catch (error) {
        throw new Error(
            "Failed to get workspace name: " + (error as Error).message
        );
    }
}
