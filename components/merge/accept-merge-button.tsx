"use client";

import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { acceptMerge } from "@/actions/merge/accept-merge";
import { Merge } from "lucide-react";
import { useState } from "react";

interface AcceptMergeButtonProps {
    originBranchContent: string;
    targetBranchId : string;
    mergeId : string;
}

export function AcceptMergeButton({
    originBranchContent,
    targetBranchId,
    mergeId,
}: AcceptMergeButtonProps) {
    const [isMerging, setIsMerging] = useState(false);

    const handleMerge = async () => {
        setIsMerging(true);

        const result = await acceptMerge(originBranchContent, targetBranchId, mergeId)

        if (result.success) {
            toast.success("Merge accepted successfully!");
        } else {
            toast.error("Failed to accept merge.");
        }

        setIsMerging(false);
    };

    return (
        <Button variant="outline" onClick={handleMerge} disabled={isMerging}>
            {isMerging ? (
                <>
                    <Loader className=" animate-spin" />
                    Merging...
                </>
            ) : (
                <>
                    <Merge className="" />
                    Accept Merge
                </>
            )}
        </Button>
    );
}
