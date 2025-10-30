import {
    FirestoreDataConverter,
    DocumentData,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue,
} from "firebase/firestore";
import {
    BranchType,
    CommitType,
    MergeRequestType,
    WorkspaceType,
} from "@/lib/types";

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
            code: workspace.code
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
            code: data.code
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
            isCommitted: branch.isCommitted || false,
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
            isCommitted: data.isCommitted || false,
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
            oldContent: commit.oldContent,
            content: commit.content,
            createdAt: commit.createdAt,
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
            oldContent: data.oldContent,
            content: data.content,
            createdAt: data.createdAt?.toDate
                ? data.createdAt.toDate()
                : data.createdAt,
        };
    },
};

export const mergeRequestConverter: FirestoreDataConverter<MergeRequestType> = {
    toFirestore(
        mergeRequest: WithFieldValue<Omit<MergeRequestType, "id">>
    ): DocumentData {
        return {
            title: mergeRequest.title,
            description: mergeRequest.description,
            ownerId: mergeRequest.ownerId,
            originBranchId: mergeRequest.originBranchId,
            targetBranchId: mergeRequest.targetBranchId,
            createdAt: mergeRequest.createdAt,
            status: mergeRequest.status,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options?: SnapshotOptions
    ): MergeRequestType {
        const data = snapshot.data(options)!;
        return {
            id: snapshot.id,
            title: data.title,
            description: data.description,
            ownerId: data.ownerId,
            originBranchId: data.originBranchId,
            targetBranchId: data.targetBranchId,
            createdAt: data.createdAt?.toDate
                ? data.createdAt.toDate()
                : data.createdAt,
            status: data.status,
        };
    },
};
