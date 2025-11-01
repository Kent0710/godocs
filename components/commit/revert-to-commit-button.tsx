"use client";

import { HistoryIcon } from "lucide-react";

import { useState } from "react";
import { revertBranchToCommit } from "@/actions/commit/revert-branch-to-commit-action";
import { toast } from "sonner";
import LoaderButton from "../reusables/loader-button";

interface RevertToCommitButtonProps {
    branchId: string;
    content: string;
}

export function RevertToCommitButton({
    branchId,
    content,
}: RevertToCommitButtonProps) {
    const [isReverting, setIsReverting] = useState(false);

    const handleRevert = async () => {
        setIsReverting(true);

        const response = await revertBranchToCommit(branchId, content);

        if (response.success) {
            toast.success("Branch successfully reverted to this version.");
        } else {
            toast.error("Failed to revert branch to this version.");
        }

        setIsReverting(false);
    };

    return (
        <LoaderButton
            loadingText="Reverting..."
            disabled={isReverting}
            variant={"outline"}
            onClick={handleRevert}
            isLoading={isReverting}
        >
            <HistoryIcon />
            Revert To This Version
        </LoaderButton>
    );
}
