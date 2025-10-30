// types/workspace.ts
export interface WorkspaceType {
    id: string; // Firestore doc ID
    name: string;
    description?: string;
    createdAt: Date;
    ownerId: string;
    mainBranchId: string;
    code : string;
}

export interface BranchType {
    id: string; // Firestore doc ID
    name: string;
    workspaceId: string;
    ownerId: string;
    oldContent: string;
    newContent : string;
    isCommitted: boolean;
}

export interface CommitType {
    id: string; // Firestore doc ID
    branchId: string;
    title: string;
    description: string;
    ownerId: string;
    oldContent : string;
    content : string;
    createdAt: string;
}

export interface MergeRequestType {
    id: string; // Firestore doc ID
    title: string;
    description: string;
    ownerId : string;
    originBranchId : string;
    targetBranchId : string;
    status : 'open' | 'closed' | 'merged';
    createdAt : string;
}