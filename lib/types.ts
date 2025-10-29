// types/workspace.ts
export interface WorkspaceType {
    id: string; // Firestore doc ID
    name: string;
    description?: string;
    createdAt: Date;
}
