"use client";

import {
    DiffViewer,
    type DocumentVersion,
} from "@/components/merge/request/diff-viewer";

import { Button } from "@/components/ui/button";
import { FilePenLine, Merge, X } from "lucide-react";

// Sample document data to simulate different versions
const mainBranchDocument: DocumentVersion = {
    title: "Project Overview",
    branch: "main",
    lines: [
        "# Project Overview",
        "",
        "This document outlines the main objectives of our project.",
        "",
        "## Objectives",
        "- Improve user experience",
        "- Enhance performance",
        "- Reduce technical debt",
        "",
        "## Timeline",
        "The project is expected to be completed by Q4 2024.",
        "",
        "## Resources",
        "We will need the following resources:",
        "- 3 developers",
        "- 1 designer",
        "- 2 QA engineers",
        "- 1 DevOps engineer",
    ],
};

const featureBranchDocument: DocumentVersion = {
    title: "Project Overview",
    branch: "feature",
    lines: [
        "# Project Overview",
        "",
        "This document outlines the main objectives and scope of our project.",
        "",
        "## Objectives",
        "- Improve user experience significantly",
        "- Enhance performance and reliability",
        "- Reduce technical debt",
        "- Implement modern design patterns",
        "",
        "## Timeline",
        "The project is expected to be completed by Q4 2024.",
        "",
        "## Resources",
        "We will need the following resources:",
        "- 4 developers (increased from 3)",
        "- 1 senior designer",
        "- 2 QA engineers",
        "- 1 DevOps engineer",
        "Kent bayaani",
    ],
};

export default function Comparison() {
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
                leftDocument={mainBranchDocument}
                rightDocument={featureBranchDocument}
            />
        </section>
    );
}
