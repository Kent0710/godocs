/*
    COMPONENT RESPONSIBLE FOR FETCHING THE DATA OF THE WORKSPACE
*/

import { WorkspaceType } from "@/lib/types";
import { WorkspaceClient } from "./workspace-client";

export default async function WorkspaceServer() {
    const exampleWorkspaces: WorkspaceType[] = [
        {
            id: "1",
            name: "Workspace One",
            description: "This is the first workspace.",
        },
        {
            id: "2",
            name: "Workspace Two",
            description: "This is the second workspace.",
        },
        {
            id: "3",
            name: "Workspace Three",
            description: "This is the third workspace.",
        },
    ];

    return <WorkspaceClient workspaces={exampleWorkspaces} />;
}
