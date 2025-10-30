"use client";

import {
    DiffViewer,
    type DocumentVersion,
} from "@/components/merge/request/diff-viewer";

import { Button } from "@/components/ui/button";
import { FilePenLine, Merge, X } from "lucide-react";

interface ComparisonProps {
    originBranch: DocumentVersion;
    targetBranch: DocumentVersion;
}

export default function Comparison({ originBranch, targetBranch }: ComparisonProps) {
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
                <Button variant={"outline"}>
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
