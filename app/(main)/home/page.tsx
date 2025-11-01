import {
    PageContainer,
    PageContainerHeader,
    PageContainerMain,
} from "@/components/reusables/containers";
import { Paragraph, Title } from "@/components/reusables/texts";
import WorkspaceServer from "@/components/workspace/workspace-server";
import { Suspense } from "react";

export default function HomePage() {
    return (
        <PageContainer>
            {/* header  */}
            <PageContainerHeader className="pb-6 border-b mb-4">
                <Title className="text-primary">Dashboard</Title>
                <Paragraph>
                    Welcome back! Here is an overview of your workspaces and
                    recent activity.
                </Paragraph>
            </PageContainerHeader>

            {/* main content  */}
            <PageContainerMain>
                <Suspense fallback={<div>Loading workspaces...</div>}>
                    <WorkspaceServer />
                </Suspense>
            </PageContainerMain>
        </PageContainer>
    );
}