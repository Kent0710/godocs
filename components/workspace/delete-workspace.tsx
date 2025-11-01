"use client";

import { Trash } from "lucide-react";
import { deleteWorkspace } from "@/actions/workspace/delete-workspace";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoaderButton from "../reusables/loader-button";
import { useState } from "react";

interface DeleteWorkspaceProps {
    workspaceId: string;
}

export default function DeleteWorkspace({ workspaceId }: DeleteWorkspaceProps) {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleDeleteWorkspace = async () => {
        setIsLoading(true);

        const result = await deleteWorkspace(workspaceId);

        if (result.success) {
            toast.success("Workspace deleted successfully!");
            router.push("/home");
        } else {
            toast.error("Failed to delete workspace.");
        }

        setIsLoading(false);
    };

    return (
        <LoaderButton
            variant={"outline"}
            onClick={handleDeleteWorkspace}
            isLoading={isLoading}
            loadingText="Deleting..."
        >
            <Trash />
            Delete Workspace
        </LoaderButton>
    );
}
