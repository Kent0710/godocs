import {
    PageContainer,
    PageContainerHeader,
    PageContainerMain,
} from "@/components/reusables/containers";
import { Title, Paragraph } from "@/components/reusables/texts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileClock, Undo } from "lucide-react";

interface HistoryPageProps {
    params: Promise<{
        workspaceId: string;
    }>;
}

export default async function HistoryPage({ params }: HistoryPageProps) {
    const workspaceId = (await params).workspaceId;

    if (!workspaceId) return <div> Workspace ID is missing </div>;

    const sampleHistory = [
        {
            id: "v1",
            title: "Initial draft of document",
            authorName: "Alice",
            date: "2024-05-20",
            fromBranch: "main",
            toBranch: "feature",
        },
        {
            id: "v2",
            title: "Added project objectives",
            authorName: "Bob",
            date: "2024-05-22",
            fromBranch: "feature",
            toBranch: "main",
        },
        {
            id: "v3",
            title: "Revised timeline section",
            authorName: "Charlie",
            date: "2024-05-25",
            fromBranch: "main",
            toBranch: "feature",
        },
    ];

    return (
        <PageContainer>
            <PageContainerHeader className="pb-4 border-b mb-4">
                <Title>History for Workspace: {workspaceId}</Title>
                <Paragraph>
                    Here you can view the history of changes made within the
                    workspace.
                </Paragraph>
            </PageContainerHeader>
            <PageContainerMain>
                <ul className="flex flex-col gap-6">
                    {sampleHistory.map((history) => (
                        <li
                            className="flex items-center justify-between"
                            key={history.id}
                        >
                            {/* left section  */}
                            <section className="flex flex-col gap-2">
                                {/* the header of the left section  */}
                                <Badge variant={"outline"}>
                                    From {history.fromBranch} <ArrowRight />
                                    {history.toBranch}
                                </Badge>
                                {/* the profile and content  */}
                                <div className="flex items-center gap-3">
                                    {/* the profile  */}
                                    <div className="w-8 h-8 rounded-full bg-black" />
                                    {/* the content  */}
                                    <div>
                                        <p className="font-medium">
                                            {history.title}
                                        </p>
                                        <p className="text-muted-foreground">
                                            Edited on {history.date} by{" "}
                                            {history.authorName}
                                        </p>
                                    </div>
                                </div>
                            </section>
                            {/* right section  */}
                            <section className="flex gap-2">
                                <Button variant="outline">
                                    <Undo />
                                    Revert Version
                                </Button>
                                <Button variant="outline">
                                    <FileClock />
                                    See Changes
                                </Button>
                            </section>
                        </li>
                    ))}
                </ul>
            </PageContainerMain>
        </PageContainer>
    );
}
