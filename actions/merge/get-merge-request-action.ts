"use server";

import { MergeRequestType } from "@/lib/types";
import { mergeRequestConverter } from "@/lib/firebase/converters";
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export async function getMergeRequests(
    workspaceId: string
): Promise<MergeRequestType[]> {
    const mergeCol = collection(db, "merge").withConverter(
        mergeRequestConverter
    );
    const q = query(mergeCol, where("workspaceId", "==", workspaceId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
}
