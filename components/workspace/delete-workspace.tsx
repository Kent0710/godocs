"use client";

import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { deleteWorkspace } from "@/actions/workspace/delete-workspace";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteWorkspaceProps {
    workspaceId: string;
}

export default function DeleteWorkspace({ workspaceId }: DeleteWorkspaceProps) {
    const router = useRouter();

    const handleDeleteWorkspace = async () => {
        const result = await deleteWorkspace(workspaceId);

        if (result.success) {
            toast.success("Workspace deleted successfully!");
            router.push("/home");
        }
    };

    return (
        <Button variant={"outline"} onClick={handleDeleteWorkspace}>
            <Trash />
            Delete Workspace
        </Button>
    );
}
