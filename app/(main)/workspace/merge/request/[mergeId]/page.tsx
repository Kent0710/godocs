import Comparison from "@/components/merge/request/comparison";
import {
    PageContainer,
    PageContainerHeader,
    PageContainerMain,
} from "@/components/reusables/containers";
import { Title, Paragraph } from "@/components/reusables/texts";
import { getMerge } from "@/actions/merge/get-merge-action";

interface MergeRequestPageProps {
    params: Promise<{
        mergeId: string;
    }>;
}

export default async function MergeRequestPage({
    params,
}: MergeRequestPageProps) {
    const mergeId = (await params).mergeId;

    if (!mergeId) return <div>Merge ID is missing </div>;

    const { originBranch, targetBranch } = await getMerge(mergeId);

    const originBranchWithLines = {
        ...originBranch,
        title: originBranch.name,
        branch: originBranch.name,
        lines: originBranch.isCommitted
            ? originBranch.newContent.split("\n")
            : originBranch.oldContent.split("\n"),
    };

    const targetBranchWithLines = {
        ...targetBranch,
        title: targetBranch.name,
        branch: targetBranch.name,
        lines: targetBranch.isCommitted
            ? targetBranch.newContent.split("\n")
            : targetBranch.oldContent.split("\n"),
    };

    return (
        <PageContainer>
            <PageContainerHeader className="pb-4 border-b mb-4">
                <Title>Merge Request: {mergeId}</Title>
                <Paragraph>
                    Here you can review and manage the merge request details.
                </Paragraph>
            </PageContainerHeader>
            <PageContainerMain className="flex flex-col gap-4">
                <Comparison
                    originBranch={originBranchWithLines}
                    targetBranch={targetBranchWithLines}
                />
            </PageContainerMain>
        </PageContainer>
    );
}
