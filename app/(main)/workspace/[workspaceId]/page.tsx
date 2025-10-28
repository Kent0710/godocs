import DocumentArea from "@/components/document/document-area";
import ToolBar from "@/components/document/toolbar";
import {
    PageContainer,
    PageContainerHeader,
    PageContainerMain,
} from "@/components/reusables/containers";
import { Paragraph, Title } from "@/components/reusables/texts";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Download, GitBranch } from "lucide-react";

interface WorkspacePageProps {
    params: Promise<{
        workspaceId: string;
    }>;
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
    const workspaceId = (await params).workspaceId;

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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'outline'}>
                                <GitBranch /> main <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Switch branches</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Introduction</DropdownMenuItem>
                            <DropdownMenuItem>Review of Related Literature</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button> <Download /> Download </Button>
                </div>
            </PageContainerHeader>

            <PageContainerMain className="space-y-4">
                <ToolBar />
                <DocumentArea />
            </PageContainerMain>
        </PageContainer>
    );
}
