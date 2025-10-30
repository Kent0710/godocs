import { getWorkspaceCode } from "@/actions/workspace/get-workspaces";
import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";

interface WorkspaceCodeBlockProps {
    workspaceId : string;
}

export default async function WorkspaceCodeBlock({workspaceId}: WorkspaceCodeBlockProps) {
    const code = await getWorkspaceCode(workspaceId);

    return (
        <Button variant={'outline'}>
            <UserPlus />
            {code}
        </Button>
    );
}