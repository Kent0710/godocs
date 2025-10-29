import {
    PageContainer,
    PageContainerHeader,
    PageContainerMain,
} from "@/components/reusables/containers";
import { Paragraph, Title } from "@/components/reusables/texts";
import CreateNewWorkspace from "@/components/workspace/create-new-workspace";
import WorkspaceServer from "@/components/workspace/workspace-server";
import { Suspense } from "react";

export default function HomePage() {
    return (
        <PageContainer>
            {/* header  */}
            <PageContainerHeader>
                <Title>Dashboard</Title>
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
