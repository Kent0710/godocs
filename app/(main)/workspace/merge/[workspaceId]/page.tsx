import { getMergeRequests } from "@/actions/merge/get-merge-request-action";
import CreateMergeRequestDialog from "@/components/merge/request/create-merge-request-dialog";
import {
    PageContainer,
    PageContainerHeader,
    PageContainerMain,
} from "@/components/reusables/containers";
import { Title, Paragraph } from "@/components/reusables/texts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FilePenLine, Merge, X } from "lucide-react";
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
                        <li key={mr.id}>
                            <Link
                                className="flex items-center justify-between"
                                href={`/workspace/merge/request/${mr.id}`}
                            >
                                {/* left section  */}
                                <div className="flex items-center gap-4">
                                    <p>#{mr.id}</p>
                                    <div>
                                        <p className="font-semibold">
                                            {mr.title}
                                        </p>
                                        <p className="text-muted-foreground">
                                            Opened no by no author
                                        </p>
                                    </div>
                                </div>
                                {/* right section  */}
                                <div className="flex gap-2">
                                    <Button variant={"outline"}>
                                        <X />
                                        Close
                                    </Button>
                                    <Button variant={"outline"}>
                                        <FilePenLine />
                                        Comment
                                    </Button>
                                    <Button variant={"outline"}>
                                        <Merge />
                                        Merge
                                    </Button>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </PageContainerMain>
        </PageContainer>
    );
}
