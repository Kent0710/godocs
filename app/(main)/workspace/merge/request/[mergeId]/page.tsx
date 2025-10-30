import {
    PageContainer,
    PageContainerHeader,
    PageContainerMain,
} from "@/components/reusables/containers";
import { Title, Paragraph } from "@/components/reusables/texts";
import { getMerge } from "@/actions/merge/get-merge-action";
import { CommitDiffViewer } from "@/components/commit/commit-diff-viewer";
import { AcceptMergeButton } from "@/components/merge/accept-merge-button";

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

    const originBranchContent = originBranch.isCommitted
        ? originBranch.newContent
        : originBranch.oldContent;

    const targetBranchContent = targetBranch.isCommitted
        ? targetBranch.newContent
        : targetBranch.oldContent;

    return (
        <PageContainer>
            <PageContainerHeader>
                <Title>Merge Request: {mergeId}</Title>
                <Paragraph>
                    Here you can review and manage the merge request details.
                </Paragraph>
                <div className="mt-4 pt-4 border-t">
                    <AcceptMergeButton 
                        originBranchContent={originBranchContent}
                        targetBranchId={targetBranch.id}
                        mergeId={mergeId}
                    />
                </div>
            </PageContainerHeader>
            <PageContainerMain className="grid grid-cols-2 gap-6">
                <CommitDiffViewer
                    oldContent={targetBranchContent}
                    newContent={originBranchContent}
                />
            </PageContainerMain>
        </PageContainer>
    );
}
