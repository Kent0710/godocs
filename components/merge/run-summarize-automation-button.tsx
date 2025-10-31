"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { Loader, Workflow } from "lucide-react";
import { toast } from "sonner";
import { updateMergeAutomationsResult } from "@/actions/merge/update-merge-automations-result-action";
import { MergeAutomationType } from "@/lib/types";

interface RunSummarizeAutomationButtonProps {
    mergeId: string;
    newContent: string;
    setExistingAutomations: Dispatch<SetStateAction<MergeAutomationType[]>>;
}

export function RunSummarizeAutomationButton({
    mergeId,
    newContent,
    setExistingAutomations,
}: RunSummarizeAutomationButtonProps) {
    const [isRunning, setIsRunning] = useState(false);

    const handleRunSummarizeAutomation = async () => {
        setIsRunning(true);

        if (!("Summarizer" in self)) {
            toast.warning("Summarizer AI model is not available.");
            setIsRunning(false);
            return;
        };

        const availability = await Summarizer.availability();
        if (availability === "unavailable") {
            toast.error("Summarizer AI model is unavailable in this browser.");
            setIsRunning(false);
            return;
        };

        toast.message("Running summarize automation...");

        const summarizer = await Summarizer.create({
            type: "key-points",
            format: "plain-text",
            length: "medium",
        });

        const result = await summarizer.summarize(newContent);

        console.log("Summarizer result:", result);

        const response = await updateMergeAutomationsResult(
            "summarize",
            mergeId,
            newContent,
            result,
            []
        );

        setExistingAutomations((prev) => {
            const filtered = prev.filter((a) => a.name !== "summarize");
            return [
                ...filtered,
                {
                    name: "summarize",
                    status: "completed",
                    content: newContent,
                    correctedInput: result,
                    corrections: [],
                },
            ];
        });

        if (!response.success) {
            toast.error("Failed to update summarize automation result.");
            setIsRunning(false);
            return;
        } else {
            toast.success("Summarize automation result updated.");
        };

        setIsRunning(false);
    };

    return (
        <Button
            disabled={isRunning}
            onClick={handleRunSummarizeAutomation}
            variant="outline"
        >
            {isRunning ? (
                <>
                    <Loader className="animate-spin" /> Summarizing...
                </>
            ) : (
                <>
                    <Workflow />
                    Run Summarize Automation
                </>
            )}
        </Button>
    );
}
