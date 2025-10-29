import Comparison from "@/components/merge/request/comparison";
import {
    PageContainer,
    PageContainerHeader,
    PageContainerMain,
} from "@/components/reusables/containers";
import { Title, Paragraph } from "@/components/reusables/texts";

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

    return (
        <PageContainer>
            <PageContainerHeader className="pb-4 border-b mb-4">
                <Title>Merge Request: {mergeId}</Title>
                <Paragraph>
                    Here you can review and manage the merge request details.
                </Paragraph>
            </PageContainerHeader>
            <PageContainerMain className="flex flex-col gap-4">
                <Comparison />
            </PageContainerMain>
        </PageContainer>
    );
}
