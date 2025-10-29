/*
    COMPONENT RESPONSIBLE FOR DISPLAYING THE WORKSPACE CLIENT SIDE
*/

import { WorkspaceType } from "@/lib/types";
import { Subtitle } from "../reusables/texts";
import { WorkspaceCard } from "./workspace-card";
import { Input } from "../ui/input";
import { ReactNode } from "react";
import CreateNewWorkspace from "./create-new-workspace";

interface WorkspaceClientProps {
    workspaces: WorkspaceType[];
}

export function WorkspaceClient({ workspaces }: WorkspaceClientProps) {
    return (
        <div className="space-y-4">
            <WorkspaceHeader>
                <Subtitle>Existing Workspaces</Subtitle>
                <div className="flex items-center gap-4">
                    <Input placeholder="Search..." />
                    <CreateNewWorkspace />
                </div>
            </WorkspaceHeader>
            <ul className="grid grid-cols-4 gap-4">
                {workspaces.map((workspace) => (
                    <WorkspaceCard key={workspace.id} workspace={workspace} />
                ))}
            </ul>
        </div>
    );
}

interface WorkspaceHeaderProps {
    children: ReactNode;
}

export function WorkspaceHeader({ children }: WorkspaceHeaderProps) {
    return <div className="space-y-2">{children}</div>;
}
