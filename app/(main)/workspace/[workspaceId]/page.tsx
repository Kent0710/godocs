import { BranchDropdown } from "@/components/branch/branch-dropdown";
import DocumentArea from "@/components/document/document-area";
import ToolBar from "@/components/document/toolbar";
import {
    PageContainer,
    PageContainerHeader,
    PageContainerMain,
} from "@/components/reusables/containers";
import { Paragraph, Title } from "@/components/reusables/texts";
import NewBranch from "@/components/workspace/new-branch";

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
                <div className="pb-4 border-b mb-4">
                    <Title>Workspace: {workspaceId}</Title>
                    <Paragraph>
                        Start writing and collaborating in your workspace.
                    </Paragraph>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <BranchDropdown
                            workspaceId={workspaceId}
                            currentBranch={currentBranch}
                        />
                        <NewBranch 
                            workspaceId={workspaceId}
                        />
                    </div>
                </div>
            </PageContainerHeader>

            <PageContainerMain className="space-y-4">
                <ToolBar />
                <DocumentArea />
            </PageContainerMain>
        </PageContainer>
    );
}
