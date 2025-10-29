/*
    THIS SERVER ACTION IS FOR GETTING A WORKSPACE OR WORKSPACES
*/

import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { workspaceConverter } from "@/lib/firebase/converters";
import { WorkspaceType } from "@/lib/types";

export async function getWorkspaces(): Promise<WorkspaceType[]> {
    const workspacesCol = collection(db, "workspace").withConverter(
        workspaceConverter
    );
    const snapshot = await getDocs(workspacesCol);
    return snapshot.docs.map((doc) => doc.data());
}
