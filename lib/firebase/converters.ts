import {
    FirestoreDataConverter,
    DocumentData,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue,
} from "firebase/firestore";
import { BranchType, WorkspaceType } from "@/lib/types";

export const workspaceConverter: FirestoreDataConverter<WorkspaceType> = {
    toFirestore(
        workspace: WithFieldValue<Omit<WorkspaceType, "id">>
    ): DocumentData {
        return {
            name: workspace.name,
            description: workspace.description ?? "",
            createdAt: workspace.createdAt,
            ownerId: workspace.ownerId,
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
                ? data.createdAt.toDate()
                : data.createdAt,
            ownerId: data.ownerId,
        };
    },
};

export const branchConverter: FirestoreDataConverter<BranchType> = {
    toFirestore(
        branch: WithFieldValue<Omit<BranchType, "id">>
    ): DocumentData {
        return {
            name: branch.name,
            workspaceId: branch.workspaceId,
            ownerId : branch.ownerId,
            content : branch.content,
        };
    },

    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options?: SnapshotOptions
    ): BranchType {
        const data = snapshot.data(options)!;
        return {
            id: snapshot.id,
            name: data.name,
            workspaceId: data.workspaceId,
            ownerId : data.ownerId,
            content : data.content,
        };
    }
};