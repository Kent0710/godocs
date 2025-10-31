"use client";

import { WorkflowIcon, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { updateMergeAutomationsResult } from "@/actions/merge/update-merge-automations-result-action";
import { MergeAutomationType } from "@/lib/types";

interface RunProofreadAutomationsButtonProps {
    mergeId: string;
    newContent: string;
    setExistingAutomations: Dispatch<SetStateAction<MergeAutomationType[]>>;
}

export function RunProofreadAutomationsButton({
    mergeId,
    newContent,
    setExistingAutomations,
}: RunProofreadAutomationsButtonProps) {
    const [isRunning, setIsRunning] = useState(false);

    const handleRunAutomations = async () => {
        setIsRunning(true);

        if (!("Proofreader" in self)) {
            toast.warning("Proofreader AI model is not available.");
            return;
        }

        // plug in the proofreader token
        const otMeta = document.createElement("meta");
        otMeta.httpEquiv = "origin-trial";
        otMeta.content =
            process.env.NEXT_PUBLIC_PROOFREADER_ORIGIN_TRIAL_TOKEN!;
        document.head.append(otMeta);

        if (otMeta.content === "") {
            toast.error("Proofreader Origin Trial token is missing.");
            setIsRunning(false);
            return;
        }

        const availability = await Proofreader.availability();
        if (availability === "unavailable") {
            toast.error("Proofreader AI model is unavailable in this browser.");
            setIsRunning(false);
            return;
        }

        toast.message("Running merge automations...");

        // the newContent is the one to be proofread

        const proofreader = await Proofreader.create();
        const result = await proofreader.proofread(newContent);

        console.log("Proofreader result:", result);

        const title = "Merge Automation (Proofread)";

        const response = await updateMergeAutomationsResult(
            title,
            mergeId,
            newContent,
            result.correctedInput,
            result.corrections
        );

        setExistingAutomations((prev) => {
            const filtered = prev.filter(
                (automation) => automation.name !== "proofread"
            );
            return [
                ...filtered,
                {
                    comment: result.correctedInput,
                    name: "proofread",
                    content: newContent,
                    status: "completed",
                },
            ];
        });
        
        if (!response.success) {
            toast.error("Failed to update merge automations result.");
            setIsRunning(false);
            return;
        } else {
            toast.success("Merge automations result updated.");
        }

        toast.success("Merge automations completed.");

        setIsRunning(false);
    };

    return (
        <>
            <Button
                variant={"outline"}
                disabled={isRunning}
                onClick={handleRunAutomations}
            >
                {isRunning ? (
                    <Loader className="animate-spin mr-2" />
                ) : (
                    <>
                        <WorkflowIcon /> Run Proof Automation
                    </>
                )}
            </Button>
        </>
    );
}
