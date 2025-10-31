"use client";

import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { acceptMerge } from "@/actions/merge/accept-merge";
import { Merge } from "lucide-react";
import { useEffect, useState } from "react";

import { checkOriginNotCommit } from "@/actions/merge/check-origin-not-commit-action";

interface AcceptMergeButtonProps {
    originBranchId: string;
    originBranchContent: string;
    targetBranchId: string;
    mergeId: string;
}

export function AcceptMergeButton({
    originBranchId,
    originBranchContent,
    targetBranchId,
    mergeId,
}: AcceptMergeButtonProps) {
    const [originNotCommit, setOriginNotCommit] = useState(false);
    const [isMerging, setIsMerging] = useState(false);

    useEffect(() => {
        // handle merge conflict
        async function checkForOriginNotCommitted() {
            const isCommitted = await checkOriginNotCommit(originBranchId);
            if (!isCommitted.isCommitted) {
                setOriginNotCommit(true);
            }
        }

        checkForOriginNotCommitted();

        return () => {
            setOriginNotCommit(false);
        };
    }, [originBranchId]);

    const handleMerge = async () => {
        setIsMerging(true);

        const result = await acceptMerge(
            originBranchContent,
            targetBranchId,
            mergeId
        );

        if (result.success) {
            toast.success("Merge accepted successfully!");
        } else {
            toast.error("Failed to accept merge.");
        }

        setIsMerging(false);
    };

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                onClick={handleMerge}
                disabled={isMerging}
            >
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

            {originNotCommit && (
                <div>
                    <p>
                        There are uncommitted changes in the origin branch.{" "}
                        <span className="font-medium underline">
                            Commit them first
                        </span>{" "}
                        or the merge may{" "}
                        <span className="font-medium underline">overwrite</span>{" "}
                        those changes.
                    </p>
                </div>
            )}
        </div>
    );
}
