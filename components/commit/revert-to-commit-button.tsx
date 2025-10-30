"use client";

import { HistoryIcon, Loader } from "lucide-react";
import { Button } from "../ui/button";

import { useState } from "react";
import { revertBranchToCommit } from "@/actions/commit/revert-branch-to-commit-action";
import { toast } from "sonner";

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
        <Button variant={"outline"} onClick={handleRevert}>
            {isReverting ? (
                <>
                    <Loader
                        className="animate-spin"
                    />
                    Reverting...
                </>
            ) : (
                <>
                    <HistoryIcon />
                    Revert To This Version
                </>
            )}
        </Button>
    );
}
