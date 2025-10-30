"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader, X } from "lucide-react";
import { Button } from "../ui/button";
import { closeMerge } from "@/actions/merge/close-merge-action";

interface CloseMergeButtonProps {
    mergeId: string;
    workspaceId : string;
}

export default function CloseMergeButton({ mergeId, workspaceId }: CloseMergeButtonProps) {
    const [isClosing, setIsClosing] = useState(false);

    const handleCloseMerge = async () => {
        setIsClosing(true);

        const result = await closeMerge(mergeId, workspaceId);

        if (result.success) {
            toast.success("Merge request closed successfully.");
        } else {
            toast.error("Failed to close the merge request.");
        }

        setIsClosing(false);
    };

    return (
        <Button
            variant={"outline"}
            disabled={isClosing}
            onClick={handleCloseMerge}
        >
            {isClosing ? (
                <Loader className="animate-spin mr-2" />
            ) : (
                <>
                    <X className="mr-2" />
                    Close
                </>
            )}
        </Button>
    );
}
