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
import Merge from "@/components/merge/merge";
import History from "@/components/history/history";
import DeleteWorkspace from "@/components/workspace/delete-workspace";
import { DeleteBranch } from "@/components/branch/delete-branch";

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
                    />
                    <History workspaceId={workspaceId} />
                    <CreateNewBranch workspaceId={workspaceId} />
                    <Merge workspaceId={workspaceId} />
                    <DeleteBranch 
                        workspaceId={workspaceId} 
                        currentBranchId={currentBranch} 
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
