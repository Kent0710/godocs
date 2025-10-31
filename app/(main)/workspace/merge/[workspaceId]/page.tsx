import { getMergeRequests } from "@/actions/merge/get-merge-request-action";
import CloseMergeButton from "@/components/merge/close-merge-button";
import OpenMergeButton from "@/components/merge/open-merge-button";
import CreateMergeRequestDialog from "@/components/merge/request/create-merge-request-dialog";
import {
    PageContainer,
    PageContainerHeader,
    PageContainerMain,
} from "@/components/reusables/containers";
import { Title, Paragraph } from "@/components/reusables/texts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Pen } from "lucide-react";
import Link from "next/link";

interface MergePageProps {
    params: Promise<{
        workspaceId: string;
    }>;
}

export default async function MergePage({ params }: MergePageProps) {
    const workspaceId = (await params).workspaceId;

    if (!workspaceId) return <div> Workspace ID is missing </div>;

    const mergeRequests = await getMergeRequests(workspaceId);

    return (
        <PageContainer>
            <PageContainerHeader>
                <div className="pb-4 border-b mb-4">
                    <Title>Merge Requests for Workspace: {workspaceId}</Title>
                    <Paragraph>
                        Here you can manage and merge documents within the
                        workspace.
                    </Paragraph>
                </div>
                <div>
                    <CreateMergeRequestDialog />
                </div>
            </PageContainerHeader>
            <PageContainerMain>
                <ul className="flex flex-col gap-6">
                    {mergeRequests.map((mr) => (
                        <li
                            key={mr.id}
                            className="flex items-center justify-between"
                        >
                            {/* left section  */}
                            <div className="flex items-center gap-4">
                                <p>#{mr.id}</p>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            variant={"outline"}
                                            className="mb-2"
                                        >
                                            {formatDate(mr.createdAt)}
                                        </Badge>
                                        <Badge
                                            variant={"outline"}
                                            className="mb-2"
                                        >
                                            {mr.status}
                                        </Badge>
                                    </div>
                                    <p className="font-semibold">{mr.title}</p>
                                    <p className="text-muted-foreground">
                                        Opened no by no author
                                    </p>
                                </div>
                            </div>
                            {/* right section  */}
                            {mr.status === "merged" ? (
                                <div className="text-medium text-muted-foreground">
                                    {" "}
                                    Already Merged{" "}
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    {mr.status === "closed" ? (
                                        <OpenMergeButton
                                            mergeId={mr.id}
                                            workspaceId={workspaceId}
                                        />
                                    ) : (
                                        <CloseMergeButton
                                            mergeId={mr.id}
                                            workspaceId={workspaceId}
                                        />
                                    )}
                                </div>
                            )}

                            <Link href={`/workspace/merge/request/${mr.id}`}>
                                <Button variant={"outline"}>
                                    <Pen />
                                    See Changes
                                </Button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </PageContainerMain>
        </PageContainer>
    );
}
