import { getCommitById } from "@/actions/commit/get-commits";
import {
    PageContainer,
    PageContainerHeader,
    PageContainerMain,
} from "@/components/reusables/containers";
import { CommitDiffViewer } from "@/components/commit/commit-diff-viewer";
import { Paragraph, Title } from "@/components/reusables/texts";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { RevertToCommitButton } from "@/components/commit/revert-to-commit-button";

interface CommitChangesPageProps {
    params: Promise<{ commitId: string }>;
}

export default async function CommitChangesPage({
    params,
}: CommitChangesPageProps) {
    const commitId = (await params).commitId;

    if (!commitId) return <div> Commit ID is missing </div>;

    const commitData = await getCommitById(commitId);

    return (
        <PageContainer>
            <PageContainerHeader>
                <Badge className="mb-2">
                    {formatDate(commitData.createdAt)}
                </Badge>
                <Title>{commitData.title}</Title>
                <Paragraph>{commitData.description}</Paragraph>
                {/* controls  */}
                <div className="flex gap-2 items-center mt-4 pt-4 border-t">
                    <RevertToCommitButton 
                        branchId={commitData.branchId} 
                        content={commitData.content}
                    />
                </div>
            </PageContainerHeader>

            {/* two section  */}
            <PageContainerMain className="grid grid-cols-2 gap-6">
                <CommitDiffViewer
                    oldContent={commitData.oldContent}
                    newContent={commitData.content}
                />
            </PageContainerMain>
        </PageContainer>
    );
}
