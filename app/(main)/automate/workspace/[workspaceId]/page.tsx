import { getWorkspaceBranches } from "@/actions/branch/get-branches-action";
import AutomateSectionOptions from "@/components/automate/automate-section-options";
import {
    PageContainer,
    PageContainerHeader,
    PageContainerMain,
} from "@/components/reusables/containers";
import {
    Paragraph,
    Subtitle,
    Title,
} from "@/components/reusables/texts";
import Link from "next/link";

interface AutomateWorkspacePageProps {
    params: Promise<{
        workspaceId: string;
    }>;
}

export default async function AutomateWorkspacePage({
    params,
}: AutomateWorkspacePageProps) {
    const workspaceId = (await params).workspaceId;

    if (!workspaceId) return <div> Workspace ID is missing </div>;

    const workspaceBranches = await getWorkspaceBranches(workspaceId);

    return (
        <PageContainer>
            <PageContainerHeader>
                <Title>Automation for Workspace: {workspaceId}</Title>
                <Paragraph>
                    Manage and automate your workflows effectively.
                </Paragraph>
            </PageContainerHeader>
            <PageContainerMain className="flex gap-6">
                {/* left section  */}
                <ul className="flex flex-col gap-2 w-[20%] border rounded p-4">
                    <Subtitle> Branches </Subtitle>
                    {workspaceBranches.map((branch) => (
                        <li key={branch.id}>
                            <Link
                                href={`/automate/workspace/${workspaceId}?branchId=${branch.id}`}
                            >
                                {branch.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* right rsection  */}
                <AutomateSectionOptions />
            </PageContainerMain>
        </PageContainer>
    );
}
