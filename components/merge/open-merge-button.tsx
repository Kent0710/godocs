"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader, LockOpen, X } from "lucide-react";
import { Button } from "../ui/button";
import { openMerge } from "@/actions/merge/open-merge-action";

interface OpenMergeButtonProps {
    mergeId: string;
    workspaceId : string;
}

export default function OpenMergeButton({ mergeId, workspaceId }: OpenMergeButtonProps) {
    const [isOpening, setIsOpening] = useState(false);

    const handleOpenMerge = async () => {
        setIsOpening(true);

        const result = await openMerge(mergeId, workspaceId);

        if (result.success) {
            toast.success("Merge request open successfully.");
        } else {
            toast.error("Failed to open the merge request.");
        }

        setIsOpening(false);
    };

    return (
        <Button
            variant={"outline"}
            disabled={isOpening}
            onClick={handleOpenMerge}
        >
            {isOpening ? (
                <Loader className="animate-spin mr-2" />
            ) : (
                <>
                    <LockOpen className="mr-2" />
                    Open
                </>
            )}
        </Button>
    );
}
