import {
    FirestoreDataConverter,
    DocumentData,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue,
} from "firebase/firestore";
import { BranchType, CommitType, WorkspaceType } from "@/lib/types";

export const workspaceConverter: FirestoreDataConverter<WorkspaceType> = {
    toFirestore(
        workspace: WithFieldValue<Omit<WorkspaceType, "id">>
    ): DocumentData {
        return {
            name: workspace.name,
            description: workspace.description ?? "",
            createdAt: workspace.createdAt,
            ownerId: workspace.ownerId,
            mainBranchId: workspace.mainBranchId,
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
            mainBranchId: data.mainBranchId,
        };
    },
};

export const branchConverter: FirestoreDataConverter<BranchType> = {
    toFirestore(branch: WithFieldValue<Omit<BranchType, "id">>): DocumentData {
        return {
            name: branch.name,
            workspaceId: branch.workspaceId,
            ownerId: branch.ownerId,
            oldContent: branch.oldContent,
            newContent: branch.newContent,
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
            ownerId: data.ownerId,
            oldContent: data.oldContent,
            newContent: data.newContent,
        };
    },
};

export const commitConverter: FirestoreDataConverter<CommitType> = {
    toFirestore(commit: WithFieldValue<Omit<CommitType, "id">>): DocumentData {
        return {
            branchId: commit.branchId,
            title: commit.title,
            description: commit.description,
            ownerId: commit.ownerId,
            content : commit.content,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options?: SnapshotOptions
    ): CommitType {
        const data = snapshot.data(options)!;
        return {
            id: snapshot.id,
            branchId: data.branchId,
            title: data.title,
            description: data.description,
            ownerId: data.ownerId,
            content : data.content,
        };
    },
};
