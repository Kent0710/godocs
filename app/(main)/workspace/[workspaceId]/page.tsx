import { BranchDropdown } from "@/components/branch/branch-dropdown";
import DocumentArea from "@/components/document/document-area";
import ToolBar from "@/components/document/toolbar";
import {
    PageContainer,
    PageContainerHeader,
    PageContainerMain,
} from "@/components/reusables/containers";
import { Title } from "@/components/reusables/texts";
import CreateNewBranch from "@/components/branch/create-new-branch";
import DeleteWorkspace from "@/components/workspace/delete-workspace";
import { DeleteBranch } from "@/components/branch/delete-branch";
import { getWorkspaceBranches } from "@/actions/branch/get-branches-action";
import { MergeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import WorkspaceCodeBlock from "@/components/workspace/workspace-code-block";
import BranchHistoryButton from "@/components/history/branch-history-button";
import { AutomateNavigationButton } from "@/components/automate/automate-navigation-button";

interface WorkspacePageProps {
    params: Promise<{
        workspaceId: string;
    }>;
    searchParams?: Promise<{
        branch?: string;
    }>;
}

export default async function WorkspacePage({
    params,
    searchParams,
}: WorkspacePageProps) {
    const workspaceId = (await params).workspaceId;
    const currentBranch = (await searchParams)?.branch || "main";

    const workspaceBranches = await getWorkspaceBranches(workspaceId);

    if (!workspaceId) return <div> Workspace ID is missing </div>;

    return (
        <PageContainer>
            <PageContainerHeader>
                <div className="pb-4 border-b mb-4 flex justify-between items-center">
                    <Title>Workspace: {workspaceId}</Title>
                    <div>
                        <DeleteWorkspace workspaceId={workspaceId} />
                    </div>
                </div>
                <div className="flex gap-2">
                    <BranchDropdown
                        workspaceId={workspaceId}
                        currentBranch={currentBranch}
                        workspaceBranches={workspaceBranches}
                    />
                    <BranchHistoryButton
                        branchId={currentBranch}
                    />
                    <CreateNewBranch
                        workspaceId={workspaceId}
                        workspaceBranches={workspaceBranches}
                    />
                    <Link href={`/workspace/merge/${workspaceId}`}>
                        <Button variant={"outline"}>
                            <MergeIcon />
                            Merge Requests
                        </Button>
                    </Link>
                    <AutomateNavigationButton 
                        workspaceId={workspaceId}
                    />
                    <DeleteBranch
                        workspaceId={workspaceId}
                        currentBranchId={currentBranch}
                    />
                    <WorkspaceCodeBlock 
                        workspaceId={workspaceId}
                    />
                </div>
            </PageContainerHeader>

            <PageContainerMain className="space-y-4">
                <ToolBar />
                <DocumentArea />
            </PageContainerMain>
        </PageContainer>
    );
}
