import {
    FirestoreDataConverter,
    DocumentData,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue,
} from "firebase/firestore";
import { WorkspaceType } from "@/lib/types";

export const workspaceConverter: FirestoreDataConverter<WorkspaceType> = {
    toFirestore(
        workspace: WithFieldValue<Omit<WorkspaceType, "id">>
    ): DocumentData {
        return {
            name: workspace.name,
            description: workspace.description ?? "",
            created_at: workspace.createdAt,
        };
    },

    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options?: SnapshotOptions
    ): WorkspaceType {
        const data = snapshot.data(options)!;
        return {
            id: snapshot.id,
            name: data.name,
            description: data.description,
            createdAt: data.created_at?.toDate
                ? data.created_at.toDate()
                : data.created_at,
        };
    },
};
