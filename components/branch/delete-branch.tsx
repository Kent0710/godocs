"use client";

import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { deleteBranchAction } from "@/actions/branch/delete-branch-action";
import { toast } from "sonner";
import LoaderButton from "../reusables/loader-button";
import { useState } from "react";

interface DeleteBranchProps {
    workspaceId: string;
    currentBranchId: string;
}

export function DeleteBranch({
    workspaceId,
    currentBranchId,
}: DeleteBranchProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDeleteBranch = async () => {
        setIsDeleting(true);

        const result = await deleteBranchAction(currentBranchId);

        if (result.success) {
            router.push(`/workspace/${workspaceId}`);
        } else {
            toast.error("Failed to delete branch.");
        }

        setIsDeleting(false);
    };

    return (
        <LoaderButton
            loadingText="Deleting branch..."
            variant={"outline"}
            onClick={handleDeleteBranch}
            isLoading={isDeleting}
        >
            <Trash />
            Delete Branch
        </LoaderButton>
    );
}
