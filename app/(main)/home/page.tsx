import { PageContainer, PageContainerHeader, PageContainerMain } from "@/components/reusables/containers";
import { Paragraph, Title } from "@/components/reusables/texts";
import CreateNewWorkspace from "@/components/workspace/create-new-workspace";
import WorkspaceServer from "@/components/workspace/workspace-server";

export default function HomePage() {
    return (
        <PageContainer>
            {/* header  */}
            <PageContainerHeader>
                <Title>
                    Dashboard
                </Title>
                <Paragraph>
                    Welcome back! Here is an overview of your workspaces and recent activity.
                </Paragraph>
            </PageContainerHeader>

            {/* main content  */}
            <PageContainerMain className="grid grid-cols-2 gap-8">
                {/* left section  */}
                <CreateNewWorkspace />

                {/* right section  */}
                <section>
                    <WorkspaceServer />
                </section>
            </PageContainerMain>
        </PageContainer>
    );
}
