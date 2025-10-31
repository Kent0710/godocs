import { getMergeHistory } from "@/actions/merge/get-merge-history-action";

interface MergeHistoryPageProps {
    params: Promise<{ workspaceId: string }>;
}

export default async function MergeHistoryPage({ params }: MergeHistoryPageProps) {
    const workspaceId = (await params).workspaceId;

    if (!workspaceId) return <div> workspace ID is missing </div>

    const mergeHistoryData = await getMergeHistory(workspaceId);

    return (
        <div>
            <pre>
                {JSON.stringify(mergeHistoryData, null, 2)}
            </pre>
        </div>
    );
}