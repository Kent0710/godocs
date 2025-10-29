/*
    COMPONENT RESPONSIBLE FOR FETCHING THE DATA OF THE WORKSPACE
*/

import { getWorkspaces } from "@/actions/workspace/get-workspaces";
import { WorkspaceClient } from "./workspace-client";

export default async function WorkspaceServer() {
    // Fetch workspaces from the database
    const workspaces = await getWorkspaces();
    return <WorkspaceClient workspaces={workspaces} />;
}
    