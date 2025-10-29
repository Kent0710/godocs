/*
    THIS SERVER ACTION IS FOR GETTING A WORKSPACE OR WORKSPACES
*/

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { workspaceConverter } from "@/lib/firebase/converters";
import { WorkspaceType } from "@/lib/types";
import { getUserFromSession } from "../auth";

export async function getWorkspaces(): Promise<WorkspaceType[]> {
    const user = await getUserFromSession();
    if (!user) throw new Error("User not authenticated.");

    const workspacesCol = collection(db, "workspace").withConverter(
        workspaceConverter
    );
    const q = query(workspacesCol, where("ownerId", "==", user.uid));

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
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
