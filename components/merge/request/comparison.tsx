"use client";

import {
    BranchWithLines,
    DiffViewer,
} from "@/components/merge/request/diff-viewer";

import { Button } from "@/components/ui/button";
import { FilePenLine, Merge, X } from "lucide-react";
import { acceptMerge } from "@/actions/merge/accept-merge";
import { toast } from "sonner";

interface ComparisonProps {
    originBranch: BranchWithLines;
    targetBranch: BranchWithLines;
}

export default function Comparison({ originBranch, targetBranch }: ComparisonProps) {
    const handleMerge = async () => {
        // you will just set this to the content
        const originBranchContent = originBranch.isCommitted ? originBranch.newContent : originBranch.oldContent;

        const result = await acceptMerge(targetBranch.id, originBranchContent);
        if (result.success) {
            toast.success("Merge accepted successfully.");
        } else {
            toast.error("Failed to accept merge.");
        }
    }

    return (
        <section className="flex flex-col gap-4">
            <div className="flex gap-2">
                <Button variant={"outline"}>
                    <X />
                    Close
                </Button>
                <Button variant={"outline"}>
                    <FilePenLine />
                    Comment
                </Button>
                <Button variant={"outline"}
                    onClick={handleMerge}
                >
                    <Merge />
                    Merge
                </Button>
            </div>
            <DiffViewer
                leftDocument={targetBranch}
                rightDocument={originBranch}
            />
        </section>
    );
}
