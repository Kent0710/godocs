"use client";

import { useState } from "react";
import {Undo } from "lucide-react";
import { toast } from "sonner";
import { revertToMerge } from "@/actions/merge/revert-to-merge-action";
import LoaderButton from "../reusables/loader-button";

interface RevertToMergeButtonProps {
    branchId: string;
    revertContent: string;
    targetBranchContent: string;
}

export function RevertToMergeButton({
    branchId,
    revertContent,
    targetBranchContent,
}: RevertToMergeButtonProps) {
    const [isReverting, setIsReverting] = useState(false);

    const handleRevert = async () => {
        setIsReverting(true);

        // check if the targetBranchContent is the same as revertContent
        if (targetBranchContent === revertContent) {
            toast.error("The branch is already in the desired merge state.");
            setIsReverting(false);
            return;
        }

        const result = await revertToMerge(branchId, revertContent);

        if (result.success) {
            toast.success("Branch successfully reverted to merge state.");
        } else {
            toast.error("An error occurred while reverting the branch.");
        }

        setIsReverting(false);
    };

    return (
        <LoaderButton
            loadingText="Reverting..."
            isLoading={isReverting}
            variant={"outline"}
            disabled={isReverting}
            onClick={handleRevert}
        >
            <Undo /> Revert to Merge
        </LoaderButton>
    );
}
