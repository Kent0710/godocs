'use client'

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { deleteBranchAction } from "@/actions/branch/delete-branch-action";
import { toast } from "sonner";

interface DeleteBranchProps {
    workspaceId : string;
    currentBranchId: string;
}

export function DeleteBranch({workspaceId, currentBranchId}: DeleteBranchProps) {
    const router = useRouter();

    const handleDeleteBranch = async () => {
        const result = await deleteBranchAction(currentBranchId);

        if (result.success) {
            router.push(`/workspace/${workspaceId}`);
        } else {
            toast.error("Failed to delete branch.");
        }
    }

    return (
        <Button variant={'outline'} onClick={handleDeleteBranch}>
            <Trash />
            Delete Branch
        </Button>
    );
}