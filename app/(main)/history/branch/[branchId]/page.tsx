import { getBranchHistory } from "@/actions/branch/get-branch-history";
import { BranchHistoryItem } from "@/components/history/branch-history-item";
import {
    PageContainer,
    PageContainerHeader,
} from "@/components/reusables/containers";
import { Paragraph, Title } from "@/components/reusables/texts";

interface BranchHistoryPageProps {
    params: Promise<{ branchId: string }>;
}

export default async function BranchHistoryPage({ params }: BranchHistoryPageProps) {
    const branchId = (await params).branchId;

    if (!branchId) return <div> Branch ID is missing </div>;

    const branchData = await getBranchHistory(branchId);

    return (
        <PageContainer>
            <PageContainerHeader>
                <Title>
                    History for Branch: {branchId} (Total Commits:{" "}
                    {branchData.length})
                </Title>
                <Paragraph>
                    Below is the history of commits made to this branch.
                </Paragraph>
            </PageContainerHeader>
            <ul className="flex flex-col gap-6">
                {branchData.length === 0 ? (
                    <Paragraph>No commits found for this branch.</Paragraph>
                ) : (
                    branchData.map((commit) => (
                        <BranchHistoryItem key={commit.id} commit={commit} />
                    ))
                )}
            </ul>
        </PageContainer>
    );
}
