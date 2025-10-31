"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Loader, Undo } from "lucide-react";
import { toast } from "sonner";
import { revertToMerge } from "@/actions/merge/revert-to-merge-action";

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
        <Button
            variant={"outline"}
            disabled={isReverting}
            onClick={handleRevert}
        >
            {isReverting ? (
                <>
                    <Loader className="animate-spin" />
                    Reverting...
                </>
            ) : (
                <>
                    <Undo /> Revert to Merge
                </>
            )}
        </Button>
    );
}
