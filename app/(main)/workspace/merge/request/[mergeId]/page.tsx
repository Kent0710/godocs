import {
    PageContainer,
    PageContainerHeader,
    PageContainerMain,
} from "@/components/reusables/containers";
import { Title, Paragraph } from "@/components/reusables/texts";
import { getMerge } from "@/actions/merge/get-merge-action";
import { CommitDiffViewer } from "@/components/commit/commit-diff-viewer";
import { AcceptMergeButton } from "@/components/merge/accept-merge-button";
import { RevertToMergeButton } from "@/components/merge/revert-to-merge-button";

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

    let targetBranchContent = "";
    const { mergeData, originBranch, targetBranch } = await getMerge(mergeId);

    const originBranchContent = originBranch.isCommitted
        ? originBranch.newContent
        : originBranch.oldContent;

    if (mergeData.status === "merged") {
        targetBranchContent = mergeData.originalContent;
    } else {
        targetBranchContent = targetBranch.isCommitted
            ? targetBranch.newContent
            : targetBranch.oldContent;
    }

    return (
        <PageContainer>
            <PageContainerHeader>
                <Title>Merge Request: {mergeId}</Title>
                <Paragraph>
                    Here you can review and manage the merge request details.
                </Paragraph>
                <div className="mt-4 pt-4 border-t">
                    {mergeData.status === "open" ? (
                        <AcceptMergeButton
                            originBranchId={originBranch.id}
                            originBranchContent={originBranchContent}
                            targetBranchId={targetBranch.id}
                            mergeId={mergeId}
                        />
                    ) : (
                        <div className="flex items-center gap-2">
                            <p className="text-medium text-muted-foreground">
                                {" "}
                                Already Merged{" "}
                            </p>
                            <RevertToMergeButton
                                branchId={targetBranch.id}
                                revertContent={mergeData.originalContent}
                                targetBranchContent={targetBranchContent}
                            />
                        </div>
                    )}
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
